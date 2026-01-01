from pydantic import BaseModel, EmailStr
from typing import List

class CourseCreate(BaseModel):
    code: str
    title: str

class PrerequisiteCreate(BaseModel):
    course_code: str
    prereq_code: str

class BulkPrerequisite(BaseModel):
    links: List[PrerequisiteCreate]


class Email_signin(BaseModel):
    email: EmailStr


class OTP_verification(Email_signin):
    otp : str
