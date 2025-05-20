# BED Final Project Starter

This repository contains starter code for the Bookings project.

This is a simple RESTful API for managing bookings, users, properties, hosts, reviews, and amenities.

## Tech Stack

- Node.js + Express
- Prisma ORM
- SQLite (default database)
- JWT (authentication)
- dotenv (env variables)
- bcryptjs (password hashing)
- Winston & Sentry (logging)
- uuid (unique IDs)

## How to Run


1. **Clone the project:**
git clone https://github.com/anhlatyntseva/Booking-API.git
cd Booking-API

2. **Install dependencies:**
npm install

3. **Set environment variables:**
Open a .env file and add:

DATABASE_URL="file:./dev.db"
JWT_SECRET="your_secret"

4. **Run Prisma migrations:**
npx prisma migrate dev --name init

5. **Start the server:**
npm run dev

The API will run on http://localhost:3000.

**Testing** : 
To run Postman tests with Newman:
Check the postman/ folder for collections and environment files.
