# Architecture Documentation

## Project Structure

```
portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with metadata
│   │   ├── page.tsx            # Main entry point
│   │   └── globals.css         # Global styles & animations
│   ├── components/
│   │   ├── BootSequence.tsx    # Linux boot loader simulation
│   │   ├── Desktop.tsx         # Main desktop environment shell
│   │   ├── Taskbar.tsx         # Bottom floating dock
│   │   ├── FloatingWindow.tsx  # Reusable draggable window wrapper
│   │   ├── Terminal.tsx        # Terminal emulator component
│   │   ├── ParticleBackground.tsx # Animated particle effects
│   │   └── windows/            # Content windows
│   │       ├── About.tsx       # Profile information
│   │       ├── Projects.tsx    # Portfolio projects
│   │       ├── Skills.tsx      # Technical skills display
│   │       └── Contact.tsx     # Contact information
│   └── lib/
│       └── utils.ts            # Utility functions & hooks
├── public/                     # Static assets
├── package.json               # Dependencies
├── tailwind.config.ts         # Tailwind configuration
├── next.config.js             # Next.js configuration
├── tsconfig.json              # TypeScript configuration
└── README.md                  # Documentation
```

## Component Hierarchy

```
page.tsx
├── BootSequence (shows for ~8 seconds)
└── Desktop
    ├── ParticleBackground
    ├── Top Bar (clock, status indicators)
    ├── Main Content Area
    │   └── FloatingWindow (multiple instances)
    │       ├── About.tsx
    │       ├── Projects.tsx
    │       ├── Skills.tsx
    │       └── Contact.tsx
    ├── Taskbar (floating dock)
    └── Terminal (toggle on/off)
```

## Key Technologies

### Frontend Framework
- **Next.js 16**: React framework with SSR capabilities, App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework

### Animation & Interactions
- **Framer Motion**: Declarative animation library
- **CSS Animations**: For complex and repeating animations

### UI Components
- **Lucide React**: Lightweight SVG icon library

## State Management

Uses React's built-in `useState` and `useRef` hooks:

- `Desktop.tsx`: Manages window open/close/minimize states
- `Taskbar.tsx`: Reactive to window states
- `Terminal.tsx`: Command history and output state
- `BootSequence.tsx`: Boot progress and login state

## Styling Strategy

### Colors
- Primary: Neon Purple (`#b700ff`)
- Secondary: Neon Blue (`#00ffff`)
- Background: Dark (`#0a0e27`)
- Grid lines: `#1a1f3a`

### Effects
1. **Glassmorphism**: Transparent backgrounds with blur
2. **Neon Glow**: Box-shadow with neon colors
3. **Grid Background**: Radial gradient pattern
4. **Animations**: Keyframe animations for typing, glitching, floating

## Performance Considerations

### Optimization Techniques
1. **Code Splitting**: Components are split with Next.js
2. **Dynamic Imports**: Heavy components load on demand
3. **Hardware Acceleration**: CSS transforms use `translate3d`
4. **Particle Limiting**: Max 30 particles for smooth animation
5. **Lazy Evaluation**: Boot sequence uses timers, not initial renders

### Animation Performance
- GPU-accelerated transforms (scale, translate, rotate)
- CSS animations for complex keyframes
- Framer Motion's optimized rendering

## Window Management System

### FloatingWindow Component
- **Props**: title, icon, isMinimized, callbacks
- **Features**:
  - Dragging with mouse interaction
  - Minimize/maximize states
  - Close functionality
  - Auto-scrolling content area
  - Z-index managed by render order

### Desktop Window State
```typescript
interface Window {
  id: string;
  title: string;
  icon: string;
  isOpen: boolean;
  isMinimized: boolean;
  component: React.ReactNode;
}
```

## Boot Sequence Flow

1. **Initialization** (0s): Display boot terminal
2. **Kernel Loading** (0-3s): Show boot logs with typing animation
3. **Authentication** (3-5s): Display login screen
4. **Password Entry** (5-7s): Auto-type password dots
5. **Success Screen** (7-8s): Show access granted
6. **Desktop Fade-in** (8s+): Transition to desktop

## Terminal Command System

Commands are processed through a simple router:

```typescript
const commandHelp: Record<string, string[]> = {
  help: [...],
  about: [...],
  projects: [...],
  contact: [...],
  // ...
}
```

## Responsive Design Strategy

Current: Desktop-first (1920x1080 minimum)

Future mobile support would include:
- Responsive window sizing
- Touch-friendly dragging
- Collapsed taskbar for small screens
- Simplified particle effects on mobile

## Security Considerations

- No sensitive data stored in frontend code
- External links open in new tabs with `rel="noopener noreferrer"`
- Environment variables for API endpoints (future)
- CSP headers can be configured in `next.config.js`

## Future Enhancements

1. **Window Snapping**: Snap windows to grid/edges
2. **Window Tiling**: AMD/i3 window manager modes
3. **Theme Switcher**: Light/dark themes
4. **Sound Effects**: Boot/notification sounds
5. **Fullscreen Windows**: Maximize to full desktop
6. **Keyboard Shortcuts**: Alt+Tab, Esc to close
7. **Mobile Responsive**: Touch-optimized layout
8. **Analytics Integration**: Page view tracking
9. **Blog System**: Markdown blog window
10. **API Integration**: Dynamic project fetching from GitHub

## Configuration Files

### tailwind.config.ts
- Custom colors, fonts
- Animation definitions
- Extension of default theme

### next.config.js
- Basic Next.js settings
- Can add: redirects, rewrites, headers

### tsconfig.json
- Strict mode enabled
- Path aliases (`@/*`)
- Target ES2020

## Build & Deployment

### Development
```bash
npm run dev       # Start with Turbopack
npm run lint      # Check code quality
```

### Production
```bash
npm run build     # Create optimized build
npm run start     # Start production server
```

### Deployment
- Vercel: Recommended for Next.js
- Netlify: Can export as static
- Self-hosted: Docker or Node.js server
