# Console Rental Provider  
**Full-Stack Web Application (MongoDB / NoSQL)**

Console Rental Provider is a full-stack web application that simulates a real-world video game console rental service.  
Users can browse consoles, rent them for a selected period, manage their rentals, and return or cancel active rentals.  
Admin users have additional access to inventory management and analytical dashboards.

This project was developed as a **final assessment for the Advanced Databases (NoSQL) course** and focuses on practical usage of MongoDB, including data modeling, aggregation pipelines, indexing, and RESTful API design.

 
 
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

The application follows a classic client–server architecture.

The **frontend** communicates with the **backend** through REST API endpoints using Axios.  
The backend handles authentication, authorization, business logic, and database access.  
MongoDB is used as the primary database and is accessed via Mongoose models.

Authentication is implemented using JWT. After login, the token is stored on the client side and automatically attached to protected API requests. Role-based authorization is used to separate user and admin functionality.

---

## Core Use Cases

The application supports realistic rental workflows, including:

- User registration and login  
- Browsing available consoles  
- Renting a console using start and end dates  
- Automatic price calculation  
- Cancelling rentals (soft delete)  
- Returning consoles with late-fee calculation  
- Admin-only inventory tagging  
- Admin analytics for revenue and demand  

These use cases guided both the API design and the database schema.



## Database Design & Data Modeling

The database uses multiple collections and combines **embedded** and **referenced** data models based on access patterns.

### Collections Used
- Users
- Consoles
- Rentals

### Embedded Documents
- `specs` inside **Console**  
  Stores console-specific information such as storage or edition.
- `returnLog` inside **Rental**  
  Stores return metadata such as return date, late days, and fine.

Embedding was chosen for tightly related data that is usually accessed together.

### Referenced Documents
- **Rental → User** (`userId`)
- **Rental → Console** (`consoleId`)

Referencing avoids duplication and allows flexible analytics across collections.

Example:
```json
{
  "userId": "697b9e695054b298aa2f71bf",
  "consoleId": "697b9cae595fb226e26c1875"
}
