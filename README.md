Project Overview

Console Rental Provider is a full-stack web application that allows users to rent video game consoles online. Users can browse available consoles, create rentals, track their active and past rentals, and return or cancel them. Admin users can manage console inventory and view analytical statistics such as top-rented consoles and monthly revenue.

The project was developed as a final assessment for the Advanced Databases (NoSQL) course and is focused on demonstrating proper MongoDB data modeling, advanced update operations, aggregation pipelines, and a RESTful API integrated with a React frontend.

Tech Stack
Frontend

React (Vite)

React Router

Axios

Backend

Node.js

Express

MongoDB (local)

Mongoose

JWT authentication (jsonwebtoken)

Password hashing (bcrypt)

System Architecture

The frontend communicates with the backend through REST API endpoints using Axios.
The backend is responsible for authentication, authorization, business logic, and database access.
MongoDB is used as the primary database and is accessed through Mongoose models.

Authentication is handled using JWT. After login, the token is stored on the client side and sent in the Authorization header for protected requests. Role-based authorization is implemented to separate user and admin functionality.

Database Design & Data Modeling

The application uses multiple MongoDB collections, designed using both embedded and referenced data models depending on access patterns and data ownership.

Embedded Documents

specs inside the Console document
Used for tightly coupled console specifications such as storage size or edition.

returnLog inside the Rental document
Stores return metadata such as return date, late days, and fines.

Embedding was chosen here to keep frequently accessed, tightly related data in a single document.

Referenced Documents

Rental → User (via userId)

Rental → Console (via consoleId)

Referencing is used to avoid data duplication and to allow efficient analytics across users, rentals, and consoles.

Example reference structure:

{
  "userId": "697b9e695054b298aa2f71bf",
  "consoleId": "697b9cae595fb226e26c1875"
}

MongoDB Features Used
CRUD Operations

Full Create, Read, Update, and Delete functionality is implemented across multiple collections including users, consoles, and rentals.

Advanced Update & Delete Operations

The project uses several advanced MongoDB operators:

$set – updating rental status, notes, and fields

$inc – calculating fines and late days

$push / $pull – adding and removing console tags

Positional $ operator – updating array elements

Soft delete pattern using:

$set: { status: "cancelled" }


Hard deletes are used only where appropriate via deleteOne().

Aggregation Framework

Multi-stage aggregation pipelines are used for real business analytics:

Top consoles by number of rentals and total revenue

Monthly revenue summaries

Aggregation stages used:

$match

$group

$lookup

$unwind

$project

$sort

$limit

These pipelines combine multiple collections and transform the data into meaningful analytical results.

Indexing & Optimization

Indexes are applied on frequently queried fields such as:

userId and status for fast access to active rentals

date fields used in revenue aggregations

Compound indexing is used to improve query performance for common access patterns.

REST API Documentation
Authentication

POST /api/auth/register – Create a new user

POST /api/auth/login – Login and receive JWT

Consoles

GET /api/consoles – Get all available consoles

POST /api/consoles – Create a console (admin only)

PATCH /api/consoles/:id/tags/add – Add console tag (admin only)

PATCH /api/consoles/:id/tags/remove – Remove console tag (admin only)

Rentals

POST /api/rentals – Create a rental
(total price = days × dailyPrice)

GET /api/rentals/my – Get current user rentals

PATCH /api/rentals/:id/return – Return rental

PATCH /api/rentals/:id/cancel – Cancel rental (soft delete)

Users

PATCH /api/users/favorites/note – Update favorite note

Analytics (Admin)

GET /api/admin/analytics/top-consoles

GET /api/admin/analytics/monthly-revenue

System

GET /api/health – Database and API health check

Frontend Pages

The frontend provides basic interaction with the backend and includes the required number of pages:

Login / Register

Console Catalog

My Rentals

Admin Dashboard (analytics and management)

All data operations are performed through real HTTP requests to the backend API.

Environment Configuration

Sensitive configuration values are stored using environment variables.
The repository includes .env.example files to demonstrate required configuration without exposing secrets.

Project Structure
console-rental-provider/
├── backend/
├── frontend/
├── report/
└── README.md

Contribution

This project was fully implemented by me, including backend logic, frontend development, database design, MongoDB queries, and documentation.
