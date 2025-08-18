# Issue Tracker

A modern web application for tracking and managing project issues. Built with Next.js 15, React 19, TypeScript, and Prisma with MySQL database.

## Features

- **Issue Management**: Create, edit, delete, and track project issues
- **Status Management**: Comprehensive status tracking with color-coded badges (Open, In Progress, Closed, On Hold, Cancelled, Completed, Archived)
- **Assignee System**: Assign issues to team members with user management
- **Rich Text Editing**: Markdown support for issue descriptions using SimpleMDE
- **Modern UI**: Clean and responsive interface built with Radix UI Themes and Tailwind CSS
- **Type Safety**: Full TypeScript support with Prisma-generated types
- **Form Validation**: Robust form validation using Zod schemas
- **Authentication**: Google OAuth integration with NextAuth.js
- **Real-time Updates**: Toast notifications and optimistic updates

## Tech Stack

- **Frontend**: React 19.1.0 with TypeScript
- **Framework**: Next.js 15.4.6 (App Router with Turbopack)
- **UI Components**: Radix UI Themes 3.2.1
- **Styling**: Tailwind CSS 4.1.12
- **Database**: Prisma ORM 6.14.0 with MySQL (MariaDB)
- **Form Management**: React Hook Form 7.62.0 with Zod validation
- **HTTP Client**: Axios for API requests
- **State Management**: TanStack Query 5.85.3 for server state
- **Authentication**: NextAuth.js 4.24.11 with Google OAuth
- **Rich Text Editor**: SimpleMDE with EasyMDE for markdown editing
- **Package Manager**: pnpm
- **Development**: ESLint, Prettier, and TypeScript for code quality

## Getting Started

### Prerequisites

- Node.js 24.5.0+
- pnpm (recommended package manager)
- Docker and Docker Compose (for database setup)
- Git

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd issue-tracker
```

2. Install dependencies:

```bash
pnpm i
```

3. Set up the database using Docker:

```bash
# Start MySQL database
pnpm db:up

# The database will be available at:
# - MySQL: localhost:33060
```

4. Configure your environment variables:

Create a `.env` file in the root directory with the following configuration:

```env
# Database
DATABASE_URL="mysql://issues:issues@localhost:33060/issue_tracker"

# NextAuth.js
NEXTAUTH_SECRET="your-secret-key"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

5. Run database migrations:

```bash
pnpm db:migrate
```

6. Run the development server:

```bash
pnpm dev
```

7. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

### Database Setup with Docker

The project includes a Docker Compose configuration that sets up:

- **MySQL Database** (MariaDB):
  - Port: 33060
  - Database: `issue_tracker`
  - Username: `issues`
  - Password: `issues`
  - Root Password: `root`

#### Database Commands

```bash
# Start the database services
pnpm db:up

# View logs
pnpm db:logs

# Stop the services
pnpm db:down

# Reset database (WARNING: This will delete all data)
pnpm db:reset

# Run migrations
pnpm db:migrate

# Open Prisma Studio (database GUI)
pnpm db:studio
```

#### Database Connection Details

- **Host**: localhost
- **Port**: 33060
- **Database**: issue_tracker
- **Username**: issues
- **Password**: issues

**Note**: The database data is persisted in a Docker volume, so your data will survive container restarts.

## Project Structure

```
issue-tracker/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   │   ├── auth/          # NextAuth.js endpoints
│   │   ├── issues/        # Issue management endpoints
│   │   └── users/         # User management endpoints
│   ├── auth/              # Authentication configuration
│   │   ├── authOptions.ts # NextAuth.js configuration
│   │   └── Provider.tsx   # Auth provider component
│   ├── components/        # Reusable UI components
│   │   ├── BackButton.tsx
│   │   ├── ErrorMessage.tsx
│   │   ├── Link.tsx
│   │   ├── QueryClientProvider.tsx
│   │   ├── Skeleton.tsx
│   │   ├── Spinner.tsx
│   │   ├── TableCellLink.tsx
│   │   └── index.ts       # Component exports
│   ├── issues/            # Issue management pages
│   │   ├── _components/   # Issue-specific components
│   │   │   ├── IssueStatusBadge.tsx
│   │   │   ├── IssueStatusFilter.tsx
│   │   │   ├── IssueStatusUpdate.tsx
│   │   │   ├── IssueForm.tsx
│   │   │   ├── IssueFormSkeleton.tsx
│   │   │   ├── IssuesTable.tsx
│   │   │   ├── IssueActions.tsx
│   │   │   ├── AssigneeSelect.tsx
│   │   │   ├── EditIssueButton.tsx
│   │   │   ├── DeleteIssueButton.tsx
│   │   │   └── UpdateIssueButton.tsx
│   │   ├── [id]/          # Dynamic issue detail pages
│   │   ├── edit/          # Issue editing pages
│   │   └── new/           # Issue creation pages
│   ├── lib/               # Utility functions and configurations
│   │   ├── status.ts      # Status management utilities
│   │   └── utils.ts       # General utilities
│   ├── users/             # User management pages
│   ├── generated/         # Prisma-generated types
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Home page
│   ├── globals.css        # Global styles
│   ├── theme-config.css   # Radix UI theme configuration
│   └── validationSchemas.ts # Zod validation schemas
├── prisma/                # Database schema and migrations
├── docker/                # Docker configuration for database
├── public/                # Static assets
└── package.json           # Dependencies and scripts
```

## Key Features Implemented

### Issue Management

- **CRUD Operations**: Full Create, Read, Update, Delete functionality for issues
- **Status Tracking**: 8 different statuses with color-coded badges
- **Assignee System**: Assign issues to team members with user relationship
- **Rich Descriptions**: Markdown editor for detailed issue descriptions

### User Interface

- **Responsive Design**: Mobile-friendly interface using Radix UI components
- **Status Badges**: Color-coded status indicators with centralized configuration
- **Form Validation**: Comprehensive validation using Zod schemas
- **Loading States**: Skeleton components and loading indicators
- **Error Handling**: Toast notifications and error messages

### Authentication & Authorization

- **Google OAuth**: Secure authentication with Google provider
- **Session Management**: JWT-based sessions with NextAuth.js
- **User Management**: User accounts with profile information
- **Protected Routes**: API endpoints with authentication checks

### Database & API

- **Prisma ORM**: Type-safe database operations with MySQL
- **RESTful API**: Clean API endpoints for issue and user management
- **Type Safety**: End-to-end TypeScript with Prisma-generated types
- **Migrations**: Database schema versioning and management

## Development

### Available Scripts

```bash
# Development
pnpm dev          # Start development server with Turbopack
pnpm build        # Build for production
pnpm start        # Start production server

# Database
pnpm db:up        # Start database with Docker
pnpm db:down      # Stop database
pnpm db:logs      # View database logs
pnpm db:reset     # Reset database (WARNING: deletes all data)
pnpm db:migrate   # Run database migrations
pnpm db:studio    # Open Prisma Studio

# Code Quality
pnpm lint         # Run ESLint
pnpm format       # Format code with Prettier
```

### Development Workflow

1. **Database Changes**: Update `prisma/schema.prisma` and run `pnpm db:migrate`
2. **API Development**: Add new endpoints in `app/api/` directory with proper validation
3. **Component Development**:
   - Create reusable components in `app/components/`
   - Create feature-specific components in `app/[feature]/_components/`
4. **Page Development**: Add new pages in the appropriate `app/` subdirectories
5. **Status Management**: Update `app/lib/status.ts` for centralized status configuration

### Code Quality

- **ESLint**: Code linting with Next.js configuration
- **Prettier**: Code formatting with import sorting
- **TypeScript**: Strict type checking enabled
- **Import Sorting**: Automatic import organization with `@trivago/prettier-plugin-sort-imports`

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Install dependencies (`pnpm i`)
4. Set up the database (`pnpm db:up && pnpm db:migrate`)
5. Make your changes following the project's coding standards
6. Run linting and formatting (`pnpm lint && pnpm format`)
7. Commit your changes (`git commit -m 'Add some amazing feature'`)
8. Push to the branch (`git push origin feature/amazing-feature`)
9. Open a Pull Request

### Coding Standards

- Follow TypeScript best practices with strict type checking
- Use React Hook Form with Zod validation for form management
- Implement proper error handling with toast notifications
- Add appropriate TypeScript types using Prisma-generated types
- Follow the existing component patterns and organization
- Use Radix UI components for consistency
- Organize feature-specific components in `_components` directories
- Use centralized status configuration from `app/lib/status.ts`
- Implement proper API validation using Zod schemas

## License

This project is licensed under the MIT License - see the LICENSE file for details.
