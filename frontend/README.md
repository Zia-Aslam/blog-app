# Blog Application with Angular 17 & NestJS

A full-stack blog application built with Angular 17 (using Sakai-NG template) and NestJS backend.

## 🛠 Tech Stack

### Frontend

-   **Angular 17** - Modern web framework
-   **Sakai-NG** - PrimeNG-based UI starter template
-   **PrimeNG** - Rich UI component library
-   **AG Grid** - High-performance data grid
-   **JWT Authentication** - Secure token-based auth

### Backend

-   **NestJS** - Progressive Node.js framework
-   **TypeORM** - Object-relational mapping
-   **PostgreSQL** - Robust relational database
-   **JWT** - JSON Web Token authentication
-   **Passport.js** - Authentication middleware

## 🚀 Features

-   ✅ User Registration & Login
-   ✅ JWT-based Authentication
-   ✅ Create, Read, Update, Delete Blog Posts
-   ✅ Paginated Blog Post Listing (AG Grid)
-   ✅ Rich Text Blog Post Creation
-   ✅ User Profile Management
-   ✅ Responsive Design
-   ✅ Protected Routes
-   ✅ Form Validation

## 📋 Prerequisites

-   Node.js (v18 or higher)
-   PostgreSQL (v12 or higher)
-   npm or yarn

## 🔧 Installation & Setup

### 1. Database Setup

First, install and start PostgreSQL, then create a database:

```sql
CREATE DATABASE blog_db;
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# Start the backend server
npm run start:dev
```

The backend will run on `http://localhost:3000`

### 3. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

The frontend will run on `http://localhost:4200`

## 🔐 Environment Configuration

Create a `.env` file in the backend directory:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=blog_db

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key

# Server Configuration
PORT=3000
```

## 📊 API Endpoints

### Authentication

-   `POST /api/auth/register` - User registration
-   `POST /api/auth/login` - User login

### Blog Posts

-   `GET /api/posts` - Get paginated posts
-   `GET /api/posts/:id` - Get single post
-   `POST /api/posts` - Create new post (protected)
-   `PATCH /api/posts/:id` - Update post (protected)
-   `DELETE /api/posts/:id` - Delete post (protected)

## 🎯 Usage

1. **Register/Login**: Create an account or sign in
2. **View Posts**: Browse blog posts on the home page
3. **Create Posts**: Click "New Post" to create content
4. **Edit Posts**: Edit your own posts from the detail view
5. **Manage Profile**: Access profile options from the navbar

## 🏗 Project Structure

```
├── frontend/                 # Angular 17 application
│   ├── src/
│   │   ├── app/
│   │   │   ├── demo/
│   │   │   │   ├── api/      # TypeScript interfaces
│   │   │   │   ├── components/
│   │   │   │   │   ├── auth/ # Login/Register components
│   │   │   │   │   └── blog/ # Blog components
│   │   │   │   └── service/  # Angular services
│   │   │   └── layout/       # Layout components
│   │   └── assets/          # Static assets
│   └── package.json
│
├── backend/                  # NestJS application
│   ├── src/
│   │   ├── auth/            # Authentication module
│   │   ├── posts/           # Blog posts module
│   │   ├── entities/        # Database entities
│   │   └── main.ts          # Application entry point
│   └── package.json
│
└── README.md
```

## 🎨 Features Showcase

### Frontend Components

-   **Blog Home**: Paginated AG Grid with post listing
-   **Blog Detail**: Full post view with author info
-   **Blog Create**: Rich form with preview mode
-   **Authentication**: Login/Register with validation
-   **Navbar**: Profile dropdown with user management

### Backend Features

-   **JWT Authentication**: Secure token-based auth
-   **Password Hashing**: Bcrypt encryption
-   **Database Relations**: User-Post relationships
-   **Input Validation**: Class-validator DTOs
-   **Error Handling**: Comprehensive exception handling

## 🔧 Development

### Frontend Development

```bash
cd frontend
npm start                    # Start dev server
npm run build               # Build for production
npm run test                # Run unit tests
```

### Backend Development

```bash
cd backend
npm run start:dev           # Start in watch mode
npm run build              # Build for production
npm run test               # Run unit tests
```

## 🚀 Deployment

### Frontend (Angular)

```bash
cd frontend
npm run build
# Deploy dist/ contents to your web server
```

### Backend (NestJS)

```bash
cd backend
npm run build
npm run start:prod
```

## 🤝 Contributing

1. Fork the project
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

-   [Angular](https://angular.io/)
-   [NestJS](https://nestjs.com/)
-   [PrimeNG](https://primeng.org/)
-   [Sakai-NG](https://github.com/primefaces/sakai-ng)
-   [AG Grid](https://www.ag-grid.com/)

---

**Happy Blogging! 📝**
