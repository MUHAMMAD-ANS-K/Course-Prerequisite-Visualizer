from database import SessionLocal, engine
import models, schemas

db = SessionLocal()
db.query(models.Course).delete()
db.query(models.Prerequisite).delete()
db.commit()