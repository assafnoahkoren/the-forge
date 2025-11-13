# @repo/ui

Shared UI component library for The Forge monorepo, built with shadcn/ui, Radix UI, and Tailwind CSS.

## Overview

This package provides reusable React components that can be imported across all apps in the monorepo. Components are built using shadcn/ui, which offers beautifully designed, accessible components built on Radix UI primitives and styled with Tailwind CSS.

## Using Components

Import components from the shared package in any app:

```tsx
import { Button } from "@repo/ui/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@repo/ui/components/ui/card"

function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Hello World</CardTitle>
      </CardHeader>
      <CardContent>
        <Button>Click me</Button>
      </CardContent>
    </Card>
  )
}
```

## Available Components

- **Button** - Versatile button component with variants (default, destructive, outline, secondary, ghost, link) and sizes (default, sm, lg, icon)
- **Card** - Container component with subcomponents (CardHeader, CardTitle, CardDescription, CardContent, CardFooter)

## Adding New Components

Use the shadcn CLI to add components to this package:

```bash
# Navigate to the UI package
cd packages/ui

# Add a new component (e.g., badge)
npx shadcn@latest add badge
```

The component will be automatically added to `src/components/ui/` and will be immediately available for import in any app.

## Setting Up in a New App

To use this UI package in a new app, follow these steps:

### 1. Install Required Dependencies

```bash
npm install react
```

### 2. Configure Tailwind CSS

Create or update your app's `tailwind.config.ts`:

```typescript
import type { Config } from "tailwindcss"
import sharedConfig from "@repo/ui/tailwind.config"

const config: Config = {
  ...sharedConfig,  // Import shared theme configuration
  content: [
    // Your app's content paths
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // IMPORTANT: Include the UI package so Tailwind processes its components
    "../../packages/ui/src/**/*.{ts,tsx}",
  ],
}

export default config
```

**Why this is needed:** Tailwind needs to know which files to scan for class names. Without this config, it won't generate CSS for any Tailwind classes you use in your app or in the UI components.

### 3. Configure PostCSS

Create `postcss.config.mjs`:

```javascript
export default {
  plugins: {
    tailwindcss: {},    // Process @tailwind directives
    autoprefixer: {},   // Add vendor prefixes
  },
}
```

**Why this is needed:** PostCSS with the Tailwind plugin processes the `@tailwind` directives at build time. Without it, the directives would be ignored.

### 4. Import Styles

Create your app's entry CSS file (e.g., `src/index.css`) with just this single line:

```css
@import "@repo/ui/styles";
```

**That's it!** This import gives you:
- All Tailwind directives (`@tailwind base/components/utilities`)
- All CSS variables for theming (--background, --foreground, etc.)
- Base styles for body and elements
- Support for light and dark modes

**Do NOT duplicate the @tailwind directives** - they're already in the imported stylesheet.

Then import this CSS file in your app's entry point (e.g., `main.tsx`):

```typescript
import './index.css'
```

### 5. Import and Use Components

Now you can import and use components from `@repo/ui`:

```tsx
import { Button } from "@repo/ui/components/ui/button"

function App() {
  return <Button>Hello World</Button>
}
```

## Configuration Summary

**What you NEED in your app:**
- ✅ `tailwind.config.ts` - To tell Tailwind which files to scan
- ✅ `postcss.config.mjs` - To process Tailwind directives
- ✅ Import `@repo/ui/styles` in your CSS - To get all styles and variables

**What you DON'T need (already in shared package):**
- ❌ Duplicate `@tailwind` directives - Already in `@repo/ui/styles`
- ❌ Duplicate CSS variables - Already in `@repo/ui/styles`
- ❌ Duplicate theme configuration - Import it from `@repo/ui/tailwind.config`

## Customizing the Theme

The Tailwind theme is configured in `tailwind.config.ts` and uses CSS variables for colors. To customize the theme:

1. Edit `packages/ui/src/styles/globals.css` to modify CSS variables
2. Update `packages/ui/tailwind.config.ts` to add custom theme extensions

The theme supports both light and dark modes out of the box.

## Utility Functions

The package includes helpful utility functions:

### cn() - Class Name Merger

Combines Tailwind classes intelligently, handling conflicts:

```typescript
import { cn } from "@repo/ui/lib/utils"

// Later classes override earlier ones
cn("text-red-500", "text-blue-500") // => "text-blue-500"

// Conditional classes
cn("base-class", condition && "conditional-class")
```

## Development

### Type Checking

```bash
npm run check-types
```

### Linting

```bash
npm run lint
```

## Package Exports

The package exports the following:

- `@repo/ui/components/*` - Individual component files
- `@repo/ui/lib/*` - Utility functions
- `@repo/ui/styles` - Global CSS styles
- `@repo/ui/tailwind.config` - Shared Tailwind configuration

## Dependencies

### Core Dependencies
- `react` - React library (peer dependency)
- `@radix-ui/react-slot` - Radix UI primitive for component composition
- `class-variance-authority` - For managing component variants
- `clsx` - Utility for constructing className strings
- `tailwind-merge` - For merging Tailwind classes intelligently

### Dev Dependencies
- `tailwindcss` - Utility-first CSS framework
- `autoprefixer` - PostCSS plugin for vendor prefixes
- `postcss` - CSS transformation tool
- `typescript` - TypeScript compiler
- `eslint` - Code linting

## Resources

- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Radix UI Documentation](https://www.radix-ui.com/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
