# Copilot Instructions for Futuristic Portfolio

This workspace contains a futuristic Linux-based portfolio website built with Next.js, Tailwind CSS, and Framer Motion.

## Project Overview

- **Type**: Next.js Web Application
- **Purpose**: Interactive portfolio website with OS-style UI
- **Target**: Desktop-first (1920x1080 minimum)
- **Performance**: Optimized animations with Framer Motion

## Development Guidelines

### Code Style
- Use TypeScript strict mode
- Component names in PascalCase
- Utility functions in camelCase
- CSS classes follow Tailwind conventions

### Components
- All components are "use client" (client-side)
- Use Framer Motion for animations
- Maintain reusable and composable structure
- Keep window components in `src/components/windows/`

### Styling
- Primary: Tailwind CSS
- Animations: Framer Motion + CSS keyframes
- Colors: Use CSS custom properties defined in config
- Responsive: Desktop-first approach

### Animation Performance
- Use `whileHover`, `whileTap`, `animate` for interactions
- GPU-accelerated transforms preferred
- Avoid excessive DOM mutations
- Test animation performance on slower devices

## Common Tasks

### Adding New Window
1. Create component in `src/components/windows/[name].tsx`
2. Export React component
3. Add to `Desktop.tsx` windows array
4. Update Taskbar icon

### Custom Styling
1. Add to Tailwind config if global
2. Use `@layer` utilities for custom classes
3. Define animations in config or globals.css

### Testing
```bash
npm run dev    # Development server
npm run build  # Build production
npm run lint   # Check for errors
```

## Important Files

- `tailwind.config.ts` - Theme and animation config
- `src/app/globals.css` - Global styles and keyframes
- `src/components/BootSequence.tsx` - Boot animation logic
- `src/components/Desktop.tsx` - Main app shell
- `src/components/FloatingWindow.tsx` - Window management

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [TypeScript](https://www.typescriptlang.org/docs/)
