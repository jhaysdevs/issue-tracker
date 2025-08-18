# Issue Tracker

A Next.js application for issue management with authentication, real-time updates, and comprehensive status tracking. Built with TypeScript, Prisma ORM, and Radix UI components.

## Version Information

- **Node.js**: v24.5.0
- **pnpm**: v10.14.0
- **Next.js**: 15.4.6
- **React**: 19.1.0
- **TypeScript**: Latest (strict mode enabled)
- **Prisma**: 6.14.0
- **MySQL**: MariaDB (via Docker)
- **Tailwind CSS**: 4.1.12
- **Radix UI Themes**: 3.2.1
- **NextAuth.js**: 4.24.11
- **TanStack Query**: 5.85.3
- **React Hook Form**: 7.62.0

## Features

- Issue CRUD operations with status tracking
- User authentication via Google OAuth
- Assignee system for issue ownership
- Markdown editor for issue descriptions
- Responsive UI with Radix UI components
- Type-safe database operations with Prisma
- Form validation with Zod schemas
- Toast notifications for user feedback

## Tech Stack

- **Frontend**: React 19.1.0 with TypeScript
- **Framework**: Next.js 15.4.6 (App Router)
- **UI**: Radix UI Themes 3.2.1
- **Styling**: Tailwind CSS 4.1.12
- **Database**: Prisma 6.14.0 with MySQL
- **Forms**: React Hook Form 7.62.0 with Zod validation
- **HTTP**: Axios
- **State**: TanStack Query 5.85.3
- **Auth**: NextAuth.js 4.24.11
- **Editor**: SimpleMDE for markdown
- **Package Manager**: pnpm

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
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   ├── auth/          # NextAuth.js endpoints
│   │   ├── issues/        # Issue management endpoints
│   │   └── users/         # User management endpoints
│   ├── auth/              # Authentication configuration
│   │   └── authOptions.ts # NextAuth.js configuration
│   ├── components/        # Reusable UI components
│   │   ├── BackButton.tsx
│   │   ├── ErrorMessage.tsx
│   │   ├── Link.tsx
│   │   ├── Skeleton.tsx
│   │   ├── Spinner.tsx
│   │   ├── TableCellLink.tsx
│   │   └── index.ts       # Component exports
│   ├── providers/         # React context providers
│   │   ├── AuthProvider.tsx
│   │   ├── QueryClientProvider.tsx
│   │   ├── ThemeProvider.tsx
│   │   ├── ToastProvider.tsx
│   │   ├── FontProvider.tsx
│   │   ├── IssueProvider.tsx
│   │   ├── StatusProvider.tsx
│   │   └── index.ts       # Provider exports
│   ├── issues/            # Issue management pages
│   │   ├── _components/   # Issue-specific components
│   │   │   ├── IssueStatusBadge.tsx
│   │   │   ├── IssueStatusFilter.tsx
│   │   │   ├── IssueStatusUpdate.tsx
│   │   │   ├── IssueForm.tsx
│   │   │   ├── IssueFormSkeleton.tsx
│   │   │   ├── IssuesTable.tsx
│   │   │   ├── IssuesTableClient.tsx
│   │   │   ├── IssueActions.tsx
│   │   │   ├── AssigneeSelect.tsx
│   │   │   ├── EditIssueButton.tsx
│   │   │   ├── DeleteIssueButton.tsx
│   │   │   └── UpdateIssueButton.tsx
│   │   ├── [id]/          # Dynamic issue detail pages
│   │   ├── edit/          # Issue editing pages
│   │   └── new/           # Issue creation pages
│   ├── lib/               # Utility functions
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

## Architecture

### State Management

- **React Context**: Centralized providers for global state
- **TanStack Query**: Server state management and caching
- **Local State**: Component-level state with React hooks

### Provider Structure

```
FontProvider
└── QueryClientProvider
    └── AuthProvider
        └── ThemeProvider
            └── StatusProvider
                └── ToastProvider
```

### Database Schema

- **Users**: Authentication and profile data
- **Issues**: Core issue data with status and assignee relationships
- **Accounts**: NextAuth.js account linking
- **Sessions**: User session management

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
2. **API Development**: Add new endpoints in `app/api/` with Zod validation
3. **Component Development**:
   - Reusable components in `app/components/`
   - Feature-specific components in `app/[feature]/_components/`
4. **Provider Development**: Add new providers in `app/providers/`
5. **Page Development**: Add pages in appropriate `app/` subdirectories

### Code Quality

- **ESLint**: Next.js configuration
- **Prettier**: Code formatting with import sorting
- **TypeScript**: Strict type checking
- **Import Sorting**: `@trivago/prettier-plugin-sort-imports`

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

- TypeScript strict mode with proper typing
- React Hook Form with Zod validation
- Error handling with toast notifications
- Prisma-generated types for database operations
- Radix UI components for consistency
- Feature-specific components in `_components` directories
- Centralized providers in `app/providers/`
- API validation with Zod schemas

## License

This project is licensed under the MIT License - see the LICENSE file for details.
