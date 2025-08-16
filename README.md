# Issue Tracker

A modern web application for tracking and managing issues for project management purposes. Built with React, TypeScript, and Next.js.

## Features

- **Issue Management**: Create, edit, and track project issues
- **Project Organization**: Organize issues by projects and categories
- **Status Tracking**: Monitor issue status (Open, In Progress, Resolved, Closed)
- **Modern UI**: Clean and responsive interface built with Next.js
- **Type Safety**: Full TypeScript support for better development experience

## Tech Stack

- **Frontend**: React 18 with TypeScript
- **Framework**: Next.js 15.4.6 (App Router)
- **Styling**: Tailwind CSS (latest)
- **Database**: Prisma ORM (latest)
- **Package Manager**: pnpm
- **Development**: ESLint for code quality

## Getting Started

### Prerequisites

- Node.js 24.5.0+
- pnpm (recommended package manager)
- Docker and Docker Compose (for database setup)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd issue-tracker
```

2. Install dependencies:

```bash
pnpm install
```

3. Set up the database using Docker:

```bash
# Navigate to the docker directory
cd docker

# Start MySQL database and PHPMyAdmin
docker-compose up -d

# The database will be available at:
# - MySQL: localhost:33060
# - PHPMyAdmin: http://localhost:8080
```

4. Configure your database connection:

Create a `.env` file in the root directory with the following database configuration:

```env
DATABASE_URL="mysql://issues:issues@localhost:33060/issue_tracker"
```

5. Run database migrations:

```bash
# From the root directory
pnpm prisma migrate dev
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

- **PHPMyAdmin**:
  - URL: http://localhost:8080
  - Username: `root`
  - Password: `root`

#### Docker Commands

You can use either the direct Docker Compose commands or the convenient npm scripts:

**Using npm scripts (recommended):**

```bash
# Start the database services
pnpm db:up

# View logs
pnpm db:logs

# Stop the services
pnpm db:down

# Reset database (WARNING: This will delete all data)
pnpm db:reset
```

**Using Docker Compose directly:**

```bash
# Start the database services
cd docker
docker-compose up -d

# View running containers
docker-compose ps

# View logs
docker-compose logs -f

# Stop the services
docker-compose down

# Stop and remove volumes (WARNING: This will delete all data)
docker-compose down -v
```

#### Database Connection Details

- **Host**: localhost
- **Port**: 33060
- **Database**: issue_tracker
- **Username**: issues
- **Password**: issues

#### PHPMyAdmin Access

- **URL**: http://localhost:8080
- **Server**: db
- **Username**: root
- **Password**: root

**Note**: The database data is persisted in a Docker volume, so your data will survive container restarts. If you need to reset the database completely, use `docker-compose down -v` to remove the volume.

#### Database Management

The project provides several tools for database management:

- **PHPMyAdmin**: Web-based MySQL administration tool at http://localhost:8080
- **Prisma Studio**: Modern database GUI (run `pnpm db:studio` to open)
- **Prisma Migrations**: Database schema management (run `pnpm db:migrate` to apply migrations)

## Development

The application uses Next.js App Router. You can start editing the main page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

### Project Structure

```
issue-tracker/
├── app/                 # Next.js App Router pages
│   ├── layout.tsx      # Root layout component
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── prisma/             # Database schema and migrations
├── public/             # Static assets
└── package.json        # Dependencies and scripts
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
