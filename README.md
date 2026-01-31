# Console Rental Provider  
**Full-Stack Web Application (MongoDB / NoSQL)**

A full-stack web application for renting video game consoles.  
Users can browse available consoles, create rentals, view their rental history, and return or cancel active rentals.  
Admin users can manage inventory tags and view analytics dashboards.

This project was built as a final assessment for the **Advanced Databases (NoSQL)** course and focuses on practical usage of **MongoDB data modeling**, **advanced update operators**, **aggregation pipelines**, and a **RESTful API** integrated with a React frontend.



## Tech Stack

### Frontend
- React (Vite)
- React Router
- Axios

### Backend
- Node.js
- Express
- MongoDB (local)
- Mongoose
- JWT authentication (`jsonwebtoken`)
- Password hashing (`bcrypt`)



## System Architecture

The frontend communicates with the backend through REST API endpoints using Axios.  
The backend handles authentication, authorization, business logic, and database operations.  
MongoDB is used as the primary database and is accessed via Mongoose models.

Authentication is implemented using JWT. After login, a token is stored on the client side and automatically attached to protected requests.  
Role-based authorization separates **user** and **admin** functionality.



## Database Design & Data Modeling

The application uses multiple MongoDB collections and combines **embedded** and **referenced** models depending on the use case.

### Embedded Documents
- `specs` inside **Console**  
  Stores console-specific information such as storage or edition.
- `returnLog` inside **Rental**  
  Stores return metadata (return date, late days, fine).

Embedding was chosen to keep tightly related data in a single document and avoid unnecessary joins.

### Referenced Documents
- **Rental → User** (`userId`)
- **Rental → Console** (`consoleId`)

Referencing avoids duplication and allows flexible analytics across users, rentals, and consoles.

Example:
```json
{
  "userId": "697b9e695054b298aa2f71bf",
  "consoleId": "697b9cae595fb226e26c1875"
}
