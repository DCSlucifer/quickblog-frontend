# Quick Blog: MERN Full-Stack Blog Platform with Gemini AI & Optimized Media

This project delivers a production-ready, full-stack blog application leveraging the **MERN stack** (MongoDB, Express, React, Node). It features powerful integrations designed to streamline content creation via **Google Gemini AI** and ensure optimal media delivery through **ImageKit**. The application provides a comprehensive user experience alongside a fully featured administrative dashboard.

The entire application structure is configured for seamless deployment using **Vercel**.

## Feature Highlights

### Content Management & AI

- **AI-Powered Content Generation:** Administrators can automatically generate descriptive blog content and summaries using the integrated **Google Gemini API**, significantly speeding up the content creation workflow.
- **Optimized Media Pipeline:** Integrates **ImageKit** for real-time media processing, including image storage, compression, and format conversion (e.g., converting to `.webp` format) to reduce file size and ensure fast loading across devices.
- **Admin Dashboard:** Centralized panel for managing content, where admins can publish new blogs, manage existing posts (toggle publish/unpublish status), and monitor key metrics such (total blogs, comments, drafts).
- **Secure Authentication:** Admin routes are protected using **JSON Web Tokens (JWT)** authentication.

### User Experience (Frontend)

- **Dynamic Filtering:** Users can filter blog lists by predefined categories such as Technology, Startup, Lifestyle, and Finance.
- **Search Functionality:** Includes a search box for querying blogs by title or category.
- **Interaction:** Supports reading posts, submitting comments, and utilizing social media icons for article sharing.
- **Modern Frontend:** Built with **ReactJS (Vite)**, styled with **Tailwind CSS**, and features smooth UI transitions powered by **Motion**.

## Technology Stack

| Component          | Key Technologies                                       | Detail                                                                                                                             |
| :----------------- | :----------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend**       | **ReactJS (Vite)**, **Tailwind CSS**, React Router DOM | Client-side application development and efficient routing. Includes **Quill** (Rich Text Editor) and **Moment** (Date formatting). |
| **Backend**        | **NodeJS, ExpressJS**                                  | High-performance server-side environment.                                                                                          |
| **Database**       | **MongoDB, Mongoose**                                  | Data persistence layer for storing blog and comment data.                                                                          |
| **AI/Media**       | **Google Gemini** API, **ImageKit**, **Multer**        | AI content generation; Real-time media optimization; File handling middleware.                                                     |
| **Authentication** | **JSON Web Token (JWT)**                               | Securing admin access and API routes.                                                                                              |
| **Deployment**     | **Vercel**                                             | Hosting environment for both client and server applications.                                                                       |

## Getting Started

### Prerequisites

- Node.js & npm
- MongoDB Atlas Account
- ImageKit Account
- Google AI Studio Account (for Gemini API Key)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [repository-url]
    cd quick-blog
    ```
2.  **Install Dependencies:** Run `npm install` in both the `client` and `server` directories.
    ```bash
    cd client && npm install
    cd ../server && npm install
    ```

### Configuration

1.  **Server `.env`:** Configure necessary credentials for database connection (`MONGODB_URI`), admin credentials, authentication (`JWT_SECRET`), and external services (`IMAGEKIT_*` keys, `GEMINI_API_KEY`).
2.  **Client `.env`:** Set the base URL for the backend server (`VITE_BASE_URL`).

### Running Locally

Run the client and server concurrently in separate terminal sessions:

| Component             | Command                          | Default Port            |
| :-------------------- | :------------------------------- | :---------------------- |
| **Backend (Server)**  | `npm run server` (using Nodemon) | `http://localhost:3000` |
| **Frontend (Client)** | `npm run dev` (using Vite)       | `http://localhost:5173` |
