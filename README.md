# Futuristic Linux-Based Portfolio

A cinematic, immersive portfolio website that feels like a futuristic Linux-based operating system UI for Prabhdeep Singh, combining minimal terminal aesthetics with neon cyberpunk design.

## Features

- **Boot Sequence**: Cinematic Linux-style bootloader with scrolling kernel logs
- **Desktop Environment**: Full OS-style interface with taskbar and floating windows  
- **Draggable Windows**: macOS-style window management with glass morphism panels
- **Terminal-Style UI**: Authentic Linux terminal aesthetics with neon glows
- **Animated Components**: Smooth animations using Framer Motion
- **Responsive Design**: Desktop-first design with graceful degradation

## Project Structure

```
src/
  app/
    layout.tsx         # Root layout with fonts
    page.tsx           # Main page component
    globals.css        # Global styles and animations
  components/
    BootSequence.tsx   # Linux boot simulation
    Desktop.tsx        # Main desktop environment
    Taskbar.tsx        # Floating dock-style taskbar
    FloatingWindow.tsx # Draggable window wrapper
    windows/
      About.tsx        # Profile/whoami window
      Projects.tsx     # Portfolio projects window
      Skills.tsx       # Technical skills display
      Contact.tsx      # Contact information window
```

## Technologies Used

- **Framework**: Next.js 16 with TypeScript
- **Styling**: Tailwind CSS with custom animations
- **Animation**: Framer Motion
- **Icons**: Lucide React

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
npm install --legacy-peer-deps
```

### Development

```bash
npm run dev
```

The site will be available at `http://localhost:3000`

### Production Build

```bash
npm run build
npm run start
```

## Key Features

### Boot Sequence
- Realistic kernel logging with typing animations
- Glitch effects and flicker animations
- Authentication overlay with password prompt
- Smooth transitions to desktop environment

### Desktop Interface
- System clock and status indicators
- Menu bar showing user and active app
- Glass-morphic floating windows
- Smooth dragging interactions
- Window controls (minimize, close)

### Content Windows
- **About (whoami)**: Terminal-style profile with typed animation
- **Projects**: Expandable project cards with GitHub links
- **Skills**: Animated skill bars with proficiency levels
- **Contact**: Interactive contact form and direct links

## Customization

### Colors
Customize neon colors in `tailwind.config.ts`:
- `neon-purple`: `#b700ff`
- `neon-blue`: `#00ffff`
- `dark-bg`: `#0a0e27`

### Animations
Global animations defined in `tailwind.config.ts` and `globals.css`

### Boot Logs
Edit boot sequence in `src/components/BootSequence.tsx`

## Keyboard Shortcuts

- `Alt + Tab`: Cycle windows (planned feature)
- `Esc`: Close active window (planned feature)

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## Performance

- Optimized animations with GPU acceleration
- Code splitting with Next.js App Router
- Image optimization with Next.js Image component
- Dynamic imports for heavy components

## Future Enhancements

- Terminal command interface
- Theme switcher (light/dark mode)
- Window snapping and tiling
- Keyboard navigation
- Mobile responsive design
- Sound effects toggle
- Code syntax highlighting

## License

MIT License - Feel free to use this as a template for your own portfolio

## Credits

Designed and built with a focus on immersive UX and cyberpunk aesthetics inspired by Kali Linux, Hyprland, and modern hacker tools.
