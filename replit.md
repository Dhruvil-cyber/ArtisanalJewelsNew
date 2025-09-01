# Artisanal Jewels E-commerce Platform

## Overview

This is a full-stack e-commerce platform for luxury jewelry sales, built with modern web technologies. The application provides a complete jewelry shopping experience with product catalogs, shopping cart functionality, user authentication, and administrative features. It follows a monorepo structure with a React frontend, Express backend, and PostgreSQL database.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety
- **Routing**: Wouter for lightweight client-side routing
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent design
- **State Management**: 
  - TanStack Query for server state management and caching
  - Zustand for client-side state (cart, wishlist, filters)
- **Form Handling**: React Hook Form with Zod validation
- **Build Tool**: Vite for fast development and optimized builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Authentication**: Replit Auth integration with session-based authentication
- **API Design**: RESTful endpoints with middleware for logging and error handling
- **File Structure**: Modular organization with separate routing, storage, and authentication layers

### Database Design
- **Database**: PostgreSQL with Neon serverless hosting
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Key Entities**:
  - Users (authentication and profile data)
  - Categories (hierarchical product organization)
  - Products (jewelry items with variants and metadata)
  - Cart/Wishlist (user shopping state)
  - Orders (transaction records)
  - Reviews (product feedback)

### Authentication & Authorization
- **Provider**: Replit Auth with OpenID Connect
- **Session Management**: Express sessions with PostgreSQL storage
- **User Roles**: Customer and admin role-based access control
- **Security**: HTTP-only cookies, CSRF protection, and secure session configuration

### Development & Deployment
- **Environment**: Development server with hot reloading via Vite
- **TypeScript**: Strict type checking across frontend, backend, and shared schemas
- **Path Aliases**: Organized imports with @ prefixes for cleaner code
- **Error Handling**: Comprehensive error boundaries and API error responses

## External Dependencies

### Core Infrastructure
- **Database**: Neon PostgreSQL serverless database
- **Authentication**: Replit Auth service for user management
- **Build & Development**: Vite development server with React plugin

### UI & Styling
- **Component Library**: Radix UI primitives via shadcn/ui
- **Icons**: Lucide React icon library
- **Fonts**: Google Fonts (Inter, Playfair Display, Fira Code)
- **CSS Framework**: Tailwind CSS with PostCSS processing

### Data & State Management
- **ORM**: Drizzle ORM with PostgreSQL adapter
- **HTTP Client**: TanStack Query for API calls and caching
- **Validation**: Zod for runtime type validation
- **State**: Zustand for client-side state persistence

### Development Tools
- **TypeScript**: Full-stack type safety
- **ESBuild**: Production bundling for server code
- **WebSocket**: For database connections via Neon serverless