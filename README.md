# Professional Resume Builder - Technical Documentation

## 🏗️ System Architecture

### High-Level Architecture
```
┌─────────────────────────────────────────────────────────────────┐
│                        Client (Angular 16)                      │
│  ┌─────────────┐  ┌─────────────┐  ┌───────────────────────┐   │
│  │   Auth      │  │   Resume    │  │     Templates        │   │
│  │  Module     │  │  Builder    │  │     Module           │   │
│  └──────┬──────┘  └──────┬──────┘  └──────────┬────────────┘   │
│         │                │                    │                │
│  ┌──────▼──────┐  ┌──────▼──────┐  ┌──────────▼────────────┐   │
│  │   NgRx      │  │   Shared    │  │     Core             │   │
│  │   Store     │  │   Module    │  │     Module           │   │
│  └─────────────┘  └─────────────┘  └───────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                        API Gateway                              │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                     Strapi 4 (Node.js)                  │   │
│  │  ┌─────────────┐  ┌─────────────────┐  ┌─────────────┐  │   │
│  │  │  Auth       │  │  Content Types  │  │  Plugins    │  │   │
│  │  │  System     │◄─►│  (Resume,      │◄─►│  (Upload,   │  │   │
│  │  │             │   │   Templates)   │   │   Email, etc)│  │   │
│  │  └─────────────┘   └─────────────────┘   └─────────────┘  │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                        Database Layer                           │
│  ┌─────────────────┐  ┌─────────────────┐  ┌───────────────┐   │
│  │  PostgreSQL     │  │  Redis Cache    │  │   File       │   │
│  │  (Production)   │  │  (Sessions,     │  │   Storage    │   │
│  │                 │  │   Rate Limiting)│  │   (S3/Cloud) │   │
│  └─────────────────┘  └─────────────────┘  └───────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

## 🚀 Core Technical Features

### Frontend (Angular 16)

#### State Management
- **NgRx Store** - Centralized state management
  - Actions, Reducers, and Effects for side effects
  - Entity Adapters for normalized state
  - Selectors for optimized data retrieval

```typescript
// Example NgRx State
interface ResumeState extends EntityState<Resume> {
  selectedResumeId: string | null;
  loading: boolean;
  error: string | null;
  activeTemplate: TemplateType;
  formState: FormGroupState<ResumeFormValue>;
  validationErrors: ValidationErrors | null;
}
```

#### Dynamic Form Generation
- **Reactive Forms** with custom form controls
- Dynamic field generation based on template schema
- Cross-field validation and async validation
- Form persistence and auto-save functionality

```typescript
// Dynamic form field configuration
const resumeFormConfig: DynamicFormFieldConfig[] = [
  {
    type: 'group',
    name: 'personalInfo',
    label: 'Personal Information',
    fields: [
      {
        type: 'text',
        name: 'fullName',
        label: 'Full Name',
        validators: [Validators.required, Validators.minLength(3)]
      },
      // More fields...
    ]
  }
];
```

### Backend (Strapi 4)

#### Custom Controllers & Services
- **Resume Generation Service**
  - PDF generation with Puppeteer
  - Template rendering with Handlebars
  - Async job processing with Bull Queue

```javascript
// Example Strapi service method
async generatePdf(resumeData, templateId) {
  const job = await this.queue.add('generate-pdf', {
    resumeData,
    templateId,
    userId: this.ctx.state.user.id
  });
  
  return new Promise((resolve, reject) => {
    job.finished().then(resolve).catch(reject);
  });
}
```

#### Database Schema
```sql
-- Core Tables
CREATE TABLE resumes (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  title VARCHAR(255) NOT NULL,
  template_id UUID REFERENCES templates(id),
  content JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Full-text search index
CREATE INDEX idx_resume_search ON resumes 
  USING GIN (to_tsvector('english', content->>'text'));
```

## 🔒 Security Implementation

### Authentication Flow
1. User logs in with email/password
2. Server validates credentials and issues JWT + Refresh Token
3. Access token is stored in memory, refresh token in HTTP-only cookie
4. Token rotation and refresh mechanism

### Security Headers
```nginx
# Example security headers
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header X-Content-Type-Options "nosniff" always;
add_header Referrer-Policy "no-referrer-when-downgrade" always;
add_header Content-Security-Policy "default-src 'self' https: data: 'unsafe-inline'" always;
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload" always;
```

## 🛠 Development Setup

### Prerequisites
- Node.js 18+
- npm 9+ or Yarn 1.22+
- Docker & Docker Compose
- Redis
- PostgreSQL 14+

### Environment Variables
```env
# Frontend
NG_APP_API_URL=http://localhost:1337
NG_APP_ENV=development
NG_APP_GA_TRACKING_ID=UA-XXXXX-X

# Backend
DATABASE_CLIENT=postgres
DATABASE_HOST=postgres
DATABASE_PORT=5432
DATABASE_NAME=resume_builder
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
JWT_SECRET=your_jwt_secret
ADMIN_JWT_SECRET=your_admin_jwt_secret
API_TOKEN_SALT=your_api_token_salt
APP_KEYS=your_app_keys
NODE_ENV=development
```

### Running with Docker Compose
```yaml
version: '3.8'

services:
  postgres:
    image: postgres:14-alpine
    environment:
      POSTGRES_DB: resume_builder
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    environment:
      DATABASE_CLIENT: postgres
      DATABASE_HOST: postgres
      DATABASE_PORT: 5432
      DATABASE_NAME: resume_builder
      DATABASE_USERNAME: postgres
      DATABASE_PASSWORD: postgres
      JWT_SECRET: your_jwt_secret
    ports:
      - "1337:1337"
    depends_on:
      - postgres
      - redis

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "4200:80"
    environment:
      NG_APP_API_URL: http://localhost:1337
    depends_on:
      - backend

volumes:
  postgres_data:
  redis_data:
```

## 📊 Performance Optimization

### Frontend
- **Lazy Loading**: Split application into feature modules
- **Preloading Strategy**: Preload all modules for faster navigation
- **AOT Compilation**: Ahead-of-Time compilation for production
- **Bundle Analysis**: Webpack Bundle Analyzer for optimization
- **Service Worker**: Caching strategy for offline support

### Backend
- **Database Indexing**: Optimized queries with proper indexes
- **Caching Layer**: Redis for frequent queries
- **Connection Pooling**: Optimized database connections
- **Compression**: Gzip/Brotli compression for API responses
- **Rate Limiting**: Protect against abuse

## 🧪 Testing Strategy

### Unit Tests
- **Jest** for backend testing
- **Jasmine/Karma** for frontend testing
- **Test Coverage**: 80%+ coverage required

### E2E Testing
- **Cypress** for end-to-end testing
- **API Contract Testing**: Pact for consumer-driven contracts
- **Performance Testing**: k6 for load testing

## 📦 Deployment

### CI/CD Pipeline
```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run test:ci
      - run: npm run build:prod

  deploy:
    needs: test
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run deploy:prod
        env:
          AWS_ACCESS_KEY_ID: ${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: ${{ secrets.AWS_SECRET_ACCESS_KEY }}
          NODE_ENV: production
```

## 📚 Additional Documentation

### API Documentation
- Swagger UI at `/documentation`
- Postman Collection available in `/docs`

### Architecture Decision Records (ADRs)
1. [ADR-001: Microservices vs Monolith](./docs/adr/001-microservices-vs-monolith.md)
2. [ADR-002: State Management Solution](./docs/adr/002-state-management.md)
3. [ADR-003: Authentication Strategy](./docs/adr/003-authentication-strategy.md)

## 📞 Support

For support, please contact [your-email@example.com] or create an issue in our [GitHub repository](https://github.com/yourusername/resume-builder).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
