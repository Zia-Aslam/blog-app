
// I have use chatGpt and cursor


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



<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
