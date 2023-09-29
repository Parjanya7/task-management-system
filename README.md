#Instructions to run the project (You'd need to have docker installed in your system):
  1) git clone https://github.com/Parjanya7/task-management-system.git
  2) docker-compose up -d --build
  3) docker exec -it task-management-system /bin/sh
  4) npx prisma generate
  5) npx prisma migrate dev --name first
  6) exit

--> Now, you can make a GET request to http://localhost:3000/ to see output: "Hello World!"
--> Which will make sure that our service is up and running.

Task Routes:
  1) Create Task: POST to http://localhost:3000/task
    --> body: { title: "", description: "" }
  2) Update Task: PUT to http://localhost:3000/task/:id
    --> :id is id of the task you want to update
    --> body: { title: "", description: "", status: "" }
    --> status can be either of "OPEN", "IN_PROGRESS", "COMPLETED"
  3) Fetch all the Tasks: GET to http://localhost:3000/task?page=1$limit=10
    --> page is for which page is required.
    --> limit is for number of tasks needs to be fetched.
  4) Task Metrics: GET to http://localhost:3000/task/metrics

You can close the application by running: docker-compose down