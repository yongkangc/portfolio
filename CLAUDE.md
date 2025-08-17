# CLAUDE.md

## Tech Stack
- **Framework**: Hugo 0.147.8 (static site generator)
- **Theme**: Modified "researcher" theme
- **Styling**: SCSS, Bootstrap 4, custom CSS
- **Deployment**: Vercel (automatic from main branch)
- **Testing**: Playwright for E2E tests

## Project Structure
- `content/articles/`: Markdown articles
- `data/articles.yml`: Article metadata for homepage
- `layouts/`: Custom template overrides
- `assets/sass/researcher.scss`: Main SCSS file
- `static/css/`: Custom CSS files (syntax.css, typography.css, articles-filter.css)
- `public/`: Built static files (DO NOT EDIT)
- `themes/researcher/`: Base theme (rarely edit directly)

## Commands
```bash
# Development
./scripts/serve.sh                    # Start dev server
hugo server --bind 0.0.0.0 --port 1313 --buildDrafts

# Build & Deploy
hugo --minify                         # Build for production
./scripts/deploy.sh                   # Build helper script

# Testing
node test-syntax-highlighting.js      # Run Playwright tests
npm test                              # Run all tests

# Git Workflow (IMPORTANT)
git add -A && git commit -m "type(scope): message" && git push origin main
```

## Critical Rules

### MUST DO
- **ALWAYS** commit and push after successful compilation
- **ALWAYS** test changes locally before committing
- **ALWAYS** follow Conventional Commits format
- **ALWAYS** update `data/articles.yml` when adding articles
- **ALWAYS** preserve existing code style and conventions

### DO NOT
- **NEVER** edit files in `public/` directory (auto-generated)
- **NEVER** modify theme files directly (use layout overrides)
- **NEVER** commit without testing locally first
- **NEVER** use emojis in commit messages or code
- **NEVER** break existing functionality without user approval

## Code Style Guidelines

### CSS/SCSS
- Use CSS variables for theming
- Mobile-first responsive design
- Prefer rem/em over px for spacing
- Follow existing color scheme variables

### JavaScript
- Use ES6+ syntax
- Wrap in IIFE for isolation
- Add event listeners properly
- Test across browsers

### Hugo Templates
- Use Go template syntax
- Override in `layouts/` not `themes/`
- Keep partials small and focused
- Use `{{ .Param }}` for config values

## Recent Features & Components

### Typography System (2024)
- **Font Stack**: Inter for body, JetBrains Mono for code
- **Files**: `static/css/typography.css`, `assets/sass/researcher.scss`
- **Color Scheme**: Modern minimalist dark theme
- Base font size: 16px, line-height: 1.75

### Syntax Highlighting
- **Theme**: One Dark Pro-inspired
- **File**: `static/css/syntax.css`
- **Config**: Line numbers enabled in `config.toml`
- Background: #0d0d0d, proper contrast ratios

### Article Filtering System
- **Files**: `static/js/articles-filter.js`, `static/css/articles-filter.css`
- **Features**: Tag filtering, toggleable sidebar, responsive design
- Sidebar hidden by default, floating panel design

## Testing

### Playwright Tests
- **Setup**: `npm install playwright && npx playwright install chromium`
- **Run**: `node test-syntax-highlighting.js`
- Tests verify syntax highlighting, CSS loading, typography

## Deployment Notes
- Vercel auto-deploys from main branch
- Hugo version pinned to 0.147.8 in `vercel.json`
- Build command: `hugo --minify`
- Output directory: `public`

## Quick Reference

### Add New Article
1. Create markdown file in `content/articles/`
2. Update `data/articles.yml` with metadata
3. Test locally with `./scripts/serve.sh`
4. Commit and push to deploy

### Modify Styling
1. SCSS changes: Edit `assets/sass/researcher.scss`
2. Custom CSS: Add to `static/css/` directory
3. Override templates: Create in `layouts/` directory
4. Test responsiveness before committing

### Debug Issues
1. Check Hugo build output: `hugo --verbose`
2. Verify CSS loading in browser DevTools
3. Run Playwright tests for visual regression
4. Check Vercel deployment logs if production differs

## Environment Variables
- `HUGO_ENV`: Set to "production" on Vercel
- Google Analytics ID: G-D5HBRC62LK (in config.toml)

## Dependencies
- Hugo 0.147.8
- Node.js (for Playwright tests)
- Git (with submodules for theme)