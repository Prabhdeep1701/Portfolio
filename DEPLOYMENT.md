# Deployment Guide

## Vercel (Recommended)

Vercel is the easiest way to deploy your Next.js portfolio.

### Steps:

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect Next.js settings
6. Click "Deploy"

Your site will be live at a Vercel URL (e.g., `your-portfolio.vercel.app`)

### Custom Domain

1. Go to your Vercel project settings
2. Under "Domains", add your custom domain
3. Update your DNS records pointing to Vercel

## Netlify

### Steps:

1. Install Netlify CLI: `npm install -g netlify-cli`
2. Build the project: `npm run build`
3. Deploy: `netlify deploy`

## Docker

### Dockerfile

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps --only=production
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["npm", "start"]
```

### Build and run:

```bash
docker build -t portfolio .
docker run -p 3000:3000 portfolio
```

## GitHub Pages (Static Export)

For static deployment:

1. Update `next.config.js`:
```javascript
const nextConfig = {
  output: 'export',
};
```

2. Build: `npm run build`
3. Push `out/` folder to GitHub Pages branch

## Environment Variables

For production deployments, configure:

```bash
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

## Performance Optimization

- Images are pre-optimized with Next.js Image component
- Code splitting happens automatically
- CSS is minified and purged
- JavaScript bundles are optimized

## Monitoring

- Use Vercel Analytics to track performance
- Monitor Core Web Vitals
- Check error logs in Vercel dashboard

## SSL/TLS

All major deployment platforms provide automatic SSL certificates (HTTPS).
