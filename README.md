# Console Rental Provider (Full-Stack Web App)

A full-stack web application for renting video game consoles. Users can browse available consoles, create rentals, view their rental history, and return/cancel active rentals. Admin users can manage inventory tags and view analytics dashboards.

This project was built to demonstrate MongoDB data modeling, advanced update operators, aggregation pipelines, indexing, and a RESTful API integrated with a React frontend.

---

## Tech Stack

**Frontend**
- React (Vite)
- react-router-dom
- Axios

**Backend**
- Node.js + Express
- MongoDB (local)
- Mongoose
- JWT authentication (jsonwebtoken)
- Password hashing (bcrypt)

---

## Features

### User Features
- Register/Login (JWT)
- View consoles catalog
- Rent a console (creates a rental + calculates total price)
- View "My Rentals"
- Return rental (writes returnLog + fine/lateDays if applicable)
- Cancel rental (soft delete via status)

### Admin Features
- Add/remove console tags (array updates)
- View analytics:
  - Top consoles by rentals + revenue
  - Monthly revenue summary

---

## Project Structure

