# Todo App API

The Todo App API is a robust and scalable backend service built with Node.js and TypeScript. It empowers registered users to efficiently manage their daily tasks through a set of well-defined API endpoints. This API offers essential features including user registration, authentication, and comprehensive todo task management capabilities.

## Features

- User Registration: Users can create an account by providing necessary details. The registration process ensures that each user has a unique identity in the system.

- Authentication: Secure authentication using JWT tokens ensures that only registered users can access and manage their tasks. This helps maintain data privacy and security.

- Todo Task Management: Users can create, read, update, and delete (CRUD) their todo tasks. Each task can be given a title, description, and a due date, making it easier for users to organize and prioritize their daily activities.

## Benefits
- Organized Task Management: Users can keep track of their daily tasks in an organized manner, helping them improve productivity and time management.

- Secure Access: The use of JWT for authentication ensures that user data is secure and only accessible to authenticated users.

- Scalability: Built with Node.js and TypeScript, the API is designed to handle a growing number of users and tasks efficiently.

## Technical Stack
- Node.js: Provides a fast and efficient runtime environment for building scalable server-side applications.
- TypeScript: Ensures type safety and enhances code quality with its static type-checking features.
- Express.js: A minimalist web framework for Node.js, used to build the API endpoints.
- MongoDB: A NoSQL database used for storing user and task data.
- JWT: Used for secure authentication and authorization.

## Getting Started
To get started with the Todo App API, follow the setup instructions provided in the repository. This includes setting up the environment, installing dependencies, and running the server. Detailed API documentation is also available to help developers integrate the API with their applications.


### Installation

1. Clone the repository:
   ```git clone https://github.com/AxatSachani/Todo-App```

2. Install dependencies:
   ```npm install```

3. Create a .env file in the root directory and add the following environment variables
   - MONGO_URI=mongodb://localhost:27017/todoapp
   - JWT_SECRET=your_jwt_secret
   - POSRT=5000
   - MAILID = youmail@gmail.com
   - MAILPASS = app password (please refer https://support.google.com/accounts/answer/185833?hl=en) 
   
4. Create a build:
    ```npm run build```

5. Start Server:
    ```npm start```

   ## Postman Collection
   https://www.postman.com/security-meteorologist-8622904/workspace/todo-app/collection/30629510-c614d446-17a8-4aa6-a820-2e7f746f8c47?action=share&creator=30629510





