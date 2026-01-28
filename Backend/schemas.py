from pydantic import BaseModel, EmailStr
from typing import List

class CourseCreate(BaseModel):
    code: str
    title: str
    preReqs : List[str]

class CourseUpdate(BaseModel):
    code: str
    title: str
    preReqs : List[str]

class PrerequisiteCreate(BaseModel):
    courseCode: str
    prereqCode: str

class Email_signin(BaseModel):
    email: EmailStr

class Add_user(BaseModel):
    email : EmailStr
    username : str

class OTP_verification(Email_signin):
    otp : str
