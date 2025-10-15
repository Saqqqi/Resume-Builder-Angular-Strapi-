# Professional Resume Builder

A modern, full-stack resume building application that allows users to create, manage, and export professional resumes. Built with Angular 16 and Strapi 4, this application provides a seamless user experience with a powerful content management backend.

## 🚀 Technologies Used

### Frontend
- **Angular 16** - A robust frontend framework for building dynamic single-page applications
- **Bootstrap 5** - For responsive and modern UI components
- **NG-Bootstrap** - Angular-specific implementation of Bootstrap components
- **RxJS** - For reactive programming and state management
- **TypeScript** - For type-safe JavaScript development

### Backend
- **Strapi 4** - Headless CMS for managing resume content
- **SQLite** - Lightweight database for development (can be configured for production databases)
- **Node.js** - JavaScript runtime environment
- **RESTful API** - For communication between frontend and backend

## 🏗️ Project Structure

```
resume-builder/
├── backend/             # Strapi backend application
│   ├── config/         # Server configurations
│   ├── public/         # Publicly accessible files
│   └── src/            # Backend source code
│       ├── api/        # API endpoints and controllers
│       ├── extensions/ # Strapi extensions
│       └── policies/   # Authentication and authorization policies
└── frontend/           # Angular frontend application
    └── src/
        ├── app/        # Application components and modules
        ├── assets/     # Static assets
        └── environments/ # Environment configurations
```

## 🛠️ Setup and Installation

### Prerequisites
- Node.js (v16 or later)
- npm (v8 or later) or Yarn
- Angular CLI (for frontend development)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file based on the `.env.example` and configure your environment variables.

4. Start the Strapi development server:
   ```bash
   npm run develop
   # or
   yarn develop
   ```

5. The admin panel will be available at `http://localhost:1337/admin`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Update the API endpoint in `src/environments/environment.ts` if needed:
   ```typescript
   export const environment = {
     production: false,
     apiUrl: 'http://localhost:1337/api'
   };
   ```

4. Start the development server:
   ```bash
   ng serve
   ```

5. The application will be available at `http://localhost:4200`

## 🎯 Features

- **User Authentication** - Secure user registration and login
- **Resume Templates** - Multiple professional templates to choose from
- **Drag-and-Drop Editor** - Intuitive resume editing experience
- **Real-time Preview** - See changes as you make them
- **Multi-format Export** - Download as PDF, DOCX, or JSON
- **Responsive Design** - Works on desktop and mobile devices
- **Content Management** - Easy management of resume sections and templates

## 🤝 API Endpoints

### Authentication
- `POST /auth/local` - User login
- `POST /auth/local/register` - User registration
- `GET /users/me` - Get current user profile

### Resume Management
- `GET /resumes` - Get all resumes
- `POST /resumes` - Create a new resume
- `GET /resumes/:id` - Get a specific resume
- `PUT /resumes/:id` - Update a resume
- `DELETE /resumes/:id` - Delete a resume

## 🔧 Development

### Running Tests
```bash
# Frontend tests
cd frontend
ng test

# Backend tests
cd backend
npm run test
```

### Building for Production
```bash
# Build frontend
cd frontend
ng build --configuration production

# Build backend
cd ../backend
npm run build
```

## 🌐 Deployment

### Backend Deployment
1. Set up a production database (PostgreSQL/MySQL)
2. Update the database configuration in `config/database.js`
3. Set environment variables for production
4. Build and start the production server:
   ```bash
   NODE_ENV=production npm run build
   NODE_ENV=production npm start
   ```

### Frontend Deployment
1. Update the API endpoint in `environment.prod.ts`
2. Build the application:
   ```bash
   ng build --configuration production
   ```
3. Deploy the `dist` folder to your preferred hosting service (Netlify, Vercel, etc.)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Angular Team for the amazing frontend framework
- Strapi Team for the powerful headless CMS
- Bootstrap Team for the responsive design framework
- All open-source contributors whose work made this project possible
