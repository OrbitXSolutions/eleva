# Eleva Store - Premium Perfume E-commerce

A modern, high-performance perfume e-commerce website built with Next.js 15.3.4, featuring multi-language support, Supabase authentication, and Atomic Design architecture.

## 🚀 Features

- **Next.js 15.3.4** with App Router and Turbopack
- **Supabase** integration with SSR authentication
- **Prisma ORM** for database management
- **Multi-language support** (English/Arabic) with RTL support
- **Atomic Design Pattern** for component architecture
- **Motion.dev** for smooth animations
- **Shadcn/ui** components with custom theming
- **Form handling** with react-hook-form and next-safe-action
- **SEO optimized** with comprehensive metadata
- **Responsive design** with Tailwind CSS
- **High performance** with image optimization and caching

## 🛠️ Tech Stack

- **Framework**: Next.js 15.3.4
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: Supabase Auth with SSR
- **Styling**: Tailwind CSS with custom theme
- **Components**: Shadcn/ui with Atomic Design
- **Forms**: React Hook Form + Next Safe Action
- **Animations**: Motion.dev
- **Language**: TypeScript
- **Validation**: Zod

## 📦 Installation

1. **Clone and setup the project:**
   \`\`\`bash
   git clone <repository-url>
   cd eleva-store
   \`\`\`

2. **Install dependencies:**
   \`\`\`bash
   pnpm install
   \`\`\`

3. **Setup environment variables:**
   \`\`\`bash
   cp .env.example .env.local
   # Fill in your Supabase and database credentials
   \`\`\`

4. **Setup database:**
   \`\`\`bash
   # Copy the SQL schema to prisma/schema.sql
   # Then pull the schema from your database
   pnpm db:pull
   pnpm db:generate
   \`\`\`

5. **Start development server:**
   \`\`\`bash
   pnpm dev
   \`\`\`

## 🏗️ Project Structure

\`\`\`
eleva-store/
├── app/                          # Next.js App Router
│   ├── actions/                  # Server Actions
│   ├── globals.css              # Global styles with custom theme
│   ├── layout.tsx               # Root layout with i18n
│   └── page.tsx                 # Homepage
├── components/                   # Atomic Design Components
│   ├── atoms/                   # Basic building blocks
│   │   ├── Button/
│   │   └── Input/
│   ├── molecules/               # Simple component combinations
│   │   └── ProductCard/
│   └── organisms/               # Complex component sections
│       ├── Header/
│       ├── Hero/
│       └── ContactForm/
├── lib/                         # Utility libraries
│   ├── prisma.ts               # Prisma client
│   └── i18n.ts                 # Internationalization
├── utils/                       # Utility functions
│   └── supabase/               # Supabase clients
│       ├── client.ts           # Browser client
│       └── server.ts           # Server client
├── prisma/                      # Database schema
│   └── schema.prisma
└── middleware.ts                # Auth and i18n middleware
\`\`\`

## 🌐 Multi-language Support

The application supports English (default) and Arabic with RTL layout:

- **English**: Default language
- **Arabic**: Accessible via `?lang=ar` query parameter
- **RTL Support**: Automatic layout direction switching
- **Localized Content**: All text content is translatable

## 🔐 Authentication

Supabase authentication with SSR support:

- **Server-side rendering** compatible
- **Cookie-based sessions** for security
- **Automatic token refresh** via middleware
- **User management** integrated with database

## 📱 Responsive Design

- **Mobile-first** approach
- **Breakpoint system**: sm, md, lg, xl
- **Touch-friendly** interactions
- **Optimized performance** on all devices

## ⚡ Performance Features

- **Turbopack** for faster builds and development
- **Image optimization** with Next.js Image
- **Code splitting** and lazy loading
- **SEO optimization** with comprehensive metadata
- **Caching strategies** for optimal performance

## 🎨 Design System

Built with Atomic Design methodology:

- **Atoms**: Basic UI elements (Button, Input)
- **Molecules**: Simple combinations (ProductCard)
- **Organisms**: Complex sections (Header, Hero)
- **Templates**: Page layouts
- **Pages**: Complete pages

## 📊 Database Schema

The application uses the provided Eleva database schema with:

- **Users**: Customer management
- **Products**: Perfume catalog
- **Categories**: Product organization
- **Reviews**: Customer feedback
- **Cart Items**: Shopping cart
- **Favorites**: Wishlist functionality

## 🚀 Deployment

1. **Build the application:**
   \`\`\`bash
   pnpm build
   \`\`\`

2. **Deploy to Vercel:**
   - Connect your repository to Vercel
   - Add environment variables
   - Deploy automatically

## 📝 Development Commands

\`\`\`bash
# Development
pnpm dev              # Start development server with Turbopack
pnpm build            # Build for production with Turbopack
pnpm start            # Start production server
pnpm lint             # Run ESLint

# Database
pnpm db:generate      # Generate Prisma client
pnpm db:push          # Push schema changes
pnpm db:pull          # Pull schema from database
pnpm db:studio        # Open Prisma Studio
\`\`\`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
