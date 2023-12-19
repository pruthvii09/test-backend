# Quiz Application API Documentation

#### Base URL
All API requests should be made to `http://localhost:4000/api`


## Installation

#### Prerequisites
Make sure you have Node.js and npm installed
#### Clone Repository
```bash
  git clone https://github.com/pruthvii09/test-backend.git
  cd test-backend
```
#### Install Node Modules
```bash
  npm install
```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`
`MONGO_URI`
`JWT_SECRET`
`GMAIL`
`PASSWORD`

## Table of Content
Route | Description 
--- | --- | 
User | Login, Signup 
Exam | GetAllExam,Create Exam, Make Exam Live 
Question | Add, Get, Update And Delete 
Submission | SubmitTest 
Admin | calculateScore,sendMail 

    
## User

#### Signup

```http
  POST /api/user/signup
```
#### login

```http
  POST /api/user/login
```

## Exam(Admin Only)

#### Get All Exam
Get all Exams Avaliable
```http
  GET /api/exam
  Authorization : Beaerer Token
```
#### Create Exam
```http
  POST /api/exam
  Authorization : Beaerer Token
```
#### Update Status
Make exam Live so It is Avaliable
```http
  POST /api/exam
  Authorization : Beaerer Token
```
## Questions(Admin Only)

#### Add Question
Add All Questions
```http
  POST /api/question
  Authorization : Beaerer Token
```
#### Get question from ExamId
```http
  GET /api/question/:examId
  Authorization : Beaerer Token
```
#### Update Status
Make exam Live so It is Avaliable
```http
  PATCH /api/question/:examId
  Authorization : Beaerer Token
```
#### Delete Question
```http
  DELETE /api/question/:questionId
  Authorization : Beaerer Token
```
## Submission

#### Submit Test
```http
  POST /api/submit
```
## Admin 

#### Calculate Score
```http
  GET /api/admin/:examId
  Authorization : Beaerer Token
```
#### Send Score by Email
```http
  GET /api/admin/send-mail/:examId
  Authorization : Beaerer Token
```
