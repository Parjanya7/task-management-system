#Instructions to run the project (You'd need to have docker installed in your system):
  1) git clone https://github.com/Parjanya7/task-management-system.git
  2) cd task-management-system
  3) docker-compose up -d --build
  4) docker exec -it task-management-system /bin/sh
  5) npx prisma generate
  6) npx prisma migrate dev --name first
  7) exit

Now, you can make a GET request to http://localhost:3000/ to see output: "Hello World!", Which will make sure that our service is up and running.

Task Routes:
  1) Create Task:
      POST to http://localhost:3000/task
      body: { title: "", description: "" }
  
  3) Update Task: 
      PUT to http://localhost:3000/task/:id
      :id is id of the task you want to update
      body: { title: "", description: "", status: "" }
      status can be either of "OPEN", "IN_PROGRESS", "COMPLETED"
  
  4) Fetch all the Tasks (Paginated):
      GET to http://localhost:3000/task?page=1$limit=10
      page is for which page is required.
      limit is for number of tasks needs to be fetched.

  5) Task Metrics: 
      GET to http://localhost:3000/task/metrics

You can close the application by running: docker-compose down
