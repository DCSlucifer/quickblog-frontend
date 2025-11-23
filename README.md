# QuickBlog Platform

## Project Overview

QuickBlog is a production-grade, full-stack blogging platform engineered to deliver a seamless content management experience. It leverages the power of the MERN stack (MongoDB, Express.js, React, Node.js) integrated with advanced AI capabilities for content generation and robust media optimization pipelines. This repository contains the complete source code for both the RESTful API server and the responsive client application.

## System Architecture

The application follows a decoupled client-server architecture:

-   **Backend (Server)**: A RESTful API built with Express.js, handling business logic, database interactions, authentication, and third-party integrations (AI, Image CDN).
-   **Frontend (Client)**: A Single Page Application (SPA) built with React 19 and Vite, communicating with the backend via secure API endpoints.
-   **Database**: MongoDB Atlas for scalable, document-based data storage.

## Technology Stack

### Backend
-   **Runtime**: Node.js
-   **Framework**: Express.js v5
-   **Database**: MongoDB (Mongoose ODM)
-   **Authentication**: JWT (JSON Web Tokens)
-   **AI Integration**: Google Gemini API (Generative AI)
-   **Media Storage**: ImageKit (CDN & Optimization)
-   **Documentation**: Swagger / OpenAPI

### Frontend
-   **Core**: React 19
-   **Build System**: Vite
-   **Styling**: Tailwind CSS v4
-   **State Management**: Context API
-   **HTTP Client**: Axios
-   **Rich Text Editor**: Quill.js

## Prerequisites

Ensure the following are installed on your local development environment:
-   **Node.js**: v18.0.0 (LTS) or higher
-   **npm**: v9.0.0 or higher
-   **MongoDB**: Local instance or Atlas connection string

## Installation & Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd QuickBlog-FullStack
```

### 2. Backend Configuration
Navigate to the server directory and install dependencies:
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory with the following configurations:
```env
# Server
PORT=3000
NODE_ENV=development

# Database
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/quickblog

# Security
JWT_SECRET=<your_secure_random_string>
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=secure_password

# Third-Party Services
GEMINI_API_KEY=<your_google_gemini_key>
IMAGEKIT_PUBLIC_KEY=<your_public_key>
IMAGEKIT_PRIVATE_KEY=<your_private_key>
IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/<your_id>

# CORS
CLIENT_URL=http://localhost:5173
```

Start the backend server:
```bash
npm run server
```
*The API will be available at `http://localhost:3000`.*

### 3. Frontend Configuration
Open a new terminal, navigate to the client directory, and install dependencies:
```bash
cd ../client
npm install
```

Create a `.env` file in the `client` directory:
```env
VITE_BASE_URL=http://localhost:3000
```

Start the development server:
```bash
npm run dev
```
*The application will launch at `http://localhost:5173`.*

## API Documentation

Comprehensive API documentation is available via Swagger UI.
Once the server is running, navigate to:
`http://localhost:3000/api-docs`

## Key Features

-   **AI-Powered Content**: Generate blog drafts automatically using Google Gemini.
-   **Full-Text Search**: High-performance search with relevance scoring.
-   **Role-Based Access Control**: Secure Admin dashboard for content moderation.
-   **Media Optimization**: Automatic image compression and format conversion (WebP).
-   **Request Logging**: Detailed tracking of API performance and errors.

## Deployment

### Backend
Recommended platforms: **Render**, **Railway**, or **AWS EC2**.
-   Ensure all environment variables from `.env` are configured in the deployment dashboard.

### Frontend
Recommended platforms: **Vercel** or **Netlify**.
-   Build Command: `npm run build`
-   Output Directory: `dist`
-   Environment Variable: Set `VITE_BASE_URL` to your production backend URL.

## License

This project is licensed under the MIT License.
