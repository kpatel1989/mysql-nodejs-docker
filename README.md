Edit mysql-microservice.start.sh
Update the line:
"--volume=<path to this folder from root>/mysql-microservice/data:/var/lib/mysql \"
Update your IP address in MYSQL_HOST in nodejs/start.sh

run ./start.sh

Once the command completes

Use the following apis to query the database

Home
localhost:4000/

Get Tasks
GET localhost:4000/tasks

Add Tasks
POST localhost:4000/tasks
BODY: {
	"description": "This is a new task",
	"dueDate": 1231231232
}


Update Tasks
PUT localhost:4000/tasks
{
    "taskId": 1
	"description": "This is a new task",
	"dueDate": 1231231232
}

Delete Tasks
DELETE localhost:4000/tasks
{
	"taskId": 1
}