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

3. Run the development server:

```bash
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

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
