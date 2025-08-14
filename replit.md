# Overview

This is a full-stack web application built with React, TypeScript, and Express.js that includes a personal portfolio website. The project features a modern tech stack with shadcn/ui components, Drizzle ORM for database operations, and TanStack Query for state management. The application appears to be transitioning from a static HTML portfolio to a dynamic React-based application.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Library**: shadcn/ui components built on Radix UI primitives with Tailwind CSS for styling
- **Routing**: Wouter for client-side routing (lightweight React router)
- **State Management**: TanStack Query (React Query) for server state management and API interactions
- **Styling**: Tailwind CSS with CSS variables for theming, configured with neutral base color and New York style

## Backend Architecture
- **Framework**: Express.js with TypeScript running on Node.js
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Build System**: ESBuild for production builds, tsx for development
- **Middleware**: JSON parsing, URL encoding, and custom request logging

## Data Storage
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Connection**: Neon Database serverless PostgreSQL (based on @neondatabase/serverless dependency)
- **Schema**: Centralized schema definition in shared directory for type safety across frontend and backend
- **Migrations**: Managed through Drizzle Kit with migrations stored in ./migrations directory

## External Dependencies
- **Database**: Neon Database (serverless PostgreSQL)
- **UI Components**: Radix UI primitives for accessible component foundations
- **Fonts**: Google Fonts integration (Inter, Roboto Serif, and others)
- **Icons**: Lucide React for modern SVG icons
- **Development Tools**: Replit-specific development enhancements and error handling
- **Session Management**: PostgreSQL-based session storage with connect-pg-simple

## Key Architectural Decisions

1. **Monorepo Structure**: Frontend (client), backend (server), and shared code organized in separate directories with unified TypeScript configuration

2. **Type Safety**: Full-stack type safety achieved through shared schema definitions and Drizzle ORM integration

3. **Modern Development Experience**: Hot module replacement with Vite, TypeScript strict mode, and comprehensive ESLint configuration

4. **Responsive Design**: Mobile-first approach with Tailwind CSS breakpoints and responsive UI components

5. **Database Strategy**: PostgreSQL chosen for reliability and ACID compliance, with Drizzle providing type-safe queries and migrations

6. **API Design**: RESTful API structure with /api prefix, structured error handling, and request/response logging