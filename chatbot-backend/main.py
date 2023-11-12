import uvicorn
from fastapi import FastAPI
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from msgsend import send_email

# Initialize the fast API
app = FastAPI()


headers = {
    "Accept-Language": "en-US,en;q=0.9",
    "Connection": "keep-alive",
    "Sec-Fetch-Dest": "empty",
    "Sec-Fetch-Mode": "cors",
    "Sec-Fetch-Site": "same-origin",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
    "accept": "application/json",
    "sec-ch-ua": '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
}

# Added multiple origins to remove the cors errors which we may encounter later

origins = [
    "http://localhost",
    "http://127.0.0.1",
    "http://localhost:3000",
    "http://192.168.140.47:3000/",
]


# Middleware to pass on the cors error and to check the credentials
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Create the data model to define the data types of the json data we will accept.
class YourDataModel(BaseModel):
    question: str
    username: str
    email_support: str | None = None


import time


@app.post("/postquestion")
async def your_endpoint(your_data: YourDataModel):
    # Access the JSON data within the endpoint
    question = your_data.question
    email_support = your_data.email_support

    # print(username)
    # print(question)
    # msg = chroma_embedding(question)
    msg = """Welcome to Circuithon, a two-day hackathon organized by IEEE IEM Circuits and Systems Society where you get to showcase your skills in circuit design and testing alongside your fellow engineering peers. Team Up today and register for this grand opportunity!

    A 2-day team hackathon for UG and PG Electronics and Electrical Engineering students
Maximum 3 members in each team \n\n
Day 1 - Online MCQ based screening test\n
Day 2 - Offline Hardware design round after qualifying screening test (All components to be provided by organizers; This round may include the use of microcontrollers like Arduino and ESP32)\n
The winner will be selected on the basis of the performance of each individual team member
Syllabus for Online test: (following standard GATE syllabus for EC)


Guidelines:

A 2-day team hackathon for UG and PG Electronics and Electrical Engineering students
Maximum 3 members in each team
Day 1 - Online MCQ based screening test
Day 2 - Offline Hardware design round after qualifying screening test (All components to be provided by organizers; This round may include the use of microcontrollers like Arduino and ESP32)
The winner will be selected on the basis of the performance of each individual team member
Syllabus for Online test: (following standard GATE syllabus for EC)

Analog and Digital Circuits
Circuit Theory
Control Systems
Signal and Systems"""
    # time.sleep(5)
    if email_support != None and len(email_support) != 0:
        send_email(email_support, msg)
    return {"response": msg}


# Driving code of the file.
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=5000)
