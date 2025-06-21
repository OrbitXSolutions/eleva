# Create Next.js 15.3.4 project
pnpm dlx create-next-app@latest eleva-store --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

cd eleva-store

# Install required dependencies
pnpm install @supabase/supabase-js @supabase/ssr
pnpm install prisma @prisma/client
pnpm install next-safe-action react-hook-form @hookform/resolvers @next-safe-action/adapter-react-hook-form
pnpm install zod
pnpm install motion
pnpm install @radix-ui/react-slot @radix-ui/react-form @radix-ui/react-label
pnpm install class-variance-authority clsx tailwind-merge
pnpm install lucide-react

# Install shadcn/ui
pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest add button input textarea form label card select separator

# Initialize Prisma
npx prisma init

echo "Setup complete! Next steps:"
echo "1. Copy the SQL schema to prisma/schema.sql"
echo "2. Configure environment variables"
echo "3. Run prisma db pull to generate schema"
echo "4. Run pnpm dev to start development"
