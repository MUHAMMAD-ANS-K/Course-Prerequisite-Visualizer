from fastapi import FastAPI, Depends, HTTPException, Cookie, Response, status
from emailsend import send_otp
import random
import jwt
from sqlalchemy import select
from datetime import datetime, timezone
import time
from sqlalchemy.orm import Session
from database import SessionLocal, engine
import models, schemas
from models import Users, OTP_entry, Admins
from schemas import  OTP_verification, Email_signin
from pydantic import BaseModel
from typing import List
from dotenv import load_dotenv
import os
from fastapi.middleware.cors import CORSMiddleware
from typing import Annotated
load_dotenv()

origins = [
    "http://localhost:5173",
]

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(bind=engine)

ALGORITHM = "HS256"
PRIVATE_KEY = os.getenv("PRIVATE_KEY")
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

async def create_session_token(data:dict):
    token = jwt.encode(data, PRIVATE_KEY, algorithm=ALGORITHM)
    return token

async def verify_session_token(session_token: Annotated[str | None, Cookie()] = None):
    if not session_token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=[{"msg" : "No session found."}])
    try:
        payload = jwt.decode(session_token, PRIVATE_KEY, ALGORITHM)
        if not payload:
            raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=[{"msg": "Payload not found"}])
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=[{"msg": "Invalid Token"}])
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail=[{"msg" : "Expired Token"}])
    return payload



# Read (user) - FR-2.1.3
@app.get("/courses")
def list_courses(db: Session = Depends(get_db)):
    return db.query(models.Course).all()


@app.get("/courses/{code}")
def get_course(code: str, db: Session = Depends(get_db)):
    course = db.query(models.Course).filter(models.Course.code == code).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course


# Update (admin) - FR-2.1.4
@app.put("/courses/{code}")
def update_course(
    code: str,
    course: schemas.CourseCreate,
    db: Session = Depends(get_db),message = Depends(verify_session_token)
):
    db_course = db.query(models.Course).filter(models.Course.code == code).first()
    if not db_course:
        raise HTTPException(status_code=404, detail="Course not found")

    db_course.title = course.title
    db.commit()
    return db_course


# Delete (admin) - FR-2.1.5
@app.delete("/courses/{code}")
def delete_course(code: str, db: Session = Depends(get_db), message = Depends(verify_session_token)):
    course = db.query(models.Course).filter(models.Course.code == code).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")

    # delete related prerequisites first
    db.query(models.Prerequisite).filter(
        (models.Prerequisite.course_code == code) |
        (models.Prerequisite.prereq_code == code)
    ).delete()

    db.delete(course)
    db.commit()
    return {"detail": "Course deleted"}


@app.post("/courses")
def add_course(course: schemas.CourseCreate, db: Session = Depends(get_db)):
    print("hi")
    db_course = models.Course(**course.dict())
    db.add(db_course)
    db.commit()
    return course

@app.post("/prerequisites/bulk")
def add_links(data: schemas.BulkPrerequisite, db: Session = Depends(get_db)):
    for link in data.links:
        db.add(models.Prerequisite(**link.dict()))
    db.commit()
    return {"status": "ok"}

@app.get("/graph")
def get_graph(db: Session = Depends(get_db)):
    return{
  "nodes": [
    { "id": 'CS101', "label": 'Intro to CS' },
    { "id": 'CS102', "label": 'Data Structures' },
    { "id": 'CS103', "label": 'Algorithms' },
    { "id": 'CS104', "label": 'Databases' },
    { "id": 'CS105', "label": 'Operating Systems' }
  ],
  "links": [
    { "source": 'CS101', "target": 'CS102' },
    { "source": 'CS101', "target": 'CS103' },
    { "source": 'CS102', "target": 'CS104' },
    { "source": 'CS103', "target": 'CS105' }
  ]
}

    courses = db.query(models.Course).all()
    prereqs = db.query(models.Prerequisite).all()

    return {
        "nodes": [{"id": c.code, "label": c.title} for c in courses],
        "links": [{"source": p.prereq_code, "target": p.course_code} for p in prereqs]
    }


@app.post("/signin") 
async def signin(data : Email_signin, db : Session = Depends(get_db)):
    random_otp = str(random.randint(10, 99)) + chr(65 + random.randint(0, 26)) + str(random.randint(10, 99)) + chr(65 + random.randint(0, 26))
    # user = db.query(Users).filter_by(email = data.email).first()
    user = db.execute(select(Users).where(Users.email == data.email)).scalar_one_or_none()
    if not user:
        raise HTTPException(status_code=404, detail=[{"msg":"User Not Found"}])
    # already_exists = db.query(OTP_entry).filter_by(email = data.email).update({"otp":random_otp})
    already_exists = db.execute(select(OTP_entry).where(OTP_entry.email == data.email)).scalar_one_or_none()
    try:
        email_response = await send_otp(data.email, random_otp)
    except:
        raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail=[{"msg" : "Service not available. Try Later."}])
    if already_exists:
        already_exists.otp = random_otp
        already_exists.expiry_time=OTP_entry.get_expiry_time()
        already_exists.creation_time = datetime.now(timezone.utc)
    else:
        data_for_dbadd = OTP_entry(
            email = data.email,
            username = user.username,
            otp = random_otp
        )
        db.add(data_for_dbadd)
    db.commit()
        
    return {"msg" : "Success"}

@app.post("/acc-verify")
async def verify(verification_data : OTP_verification, response: Response, db : Session = Depends(get_db)):
    # otp_entry = db.query(OTP_entry).filter_by(email=verification_data.email, otp=verification_data.otp).first()   #.order_by(OTP_entry.creation_time.desc())
    otp_entry = db.execute(select(OTP_entry).where((OTP_entry.email == verification_data.email) & (OTP_entry.otp == verification_data.otp))).scalar_one_or_none()
    if not otp_entry:
        raise HTTPException(status_code=401, detail=[{"msg":"Invalid OTP"}])
    if otp_entry.expiry_time < (datetime.now(timezone.utc)):
        raise HTTPException(status_code=401, detail=[{"msg":"OTP expired"}])
    
    # user = db.query(Users).filter_by(email = verification_data.email).first()
    user = db.execute(select(Users).where(Users.email == verification_data.email)).scalar_one()
    payload = {"username" : user.username, "type" : "Permanent", "exp" : int(time.time()) + 1800}
    # admin_check = db.query(Admins).filter(email=verification_data.email).first()
    admin_check = db.execute(select(Admins).where(Admins.email == verification_data.email)).scalar_one_or_none()
    if admin_check:
        payload = {"username" : user.username, "type" : "admin", "exp" : int(time.time()) + 1800}
    token = await create_session_token(payload)
    response.set_cookie(
        key="session_token",
        value = token,
        httponly = True,
        secure = True,
        samesite = "none",
        max_age=1800,
        path="/",
        domain=".yappyyap.xyz"
        )
    db.delete(otp_entry)
    db.commit()
    return {"msg":"Success", "username" : user.username}



@app.get("/logincheck")
async def logincheck(message = Depends(verify_session_token), db : Session = Depends(get_db)):
    username = message["username"]
    return {
        "msg" : "Success",
        "username" : username
    }