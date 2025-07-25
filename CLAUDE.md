# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with Hugo static site generator, using the "researcher" theme. The site showcases technical articles, projects, and professional experience in blockchain engineering and quantitative trading. It's deployed on Vercel with automatic builds.

## Development Commands

### Local Development
```bash
# Start development server (with helper script)
./scripts/serve.sh

# Or manually
hugo server --bind 0.0.0.0 --port 1313 --buildDrafts --buildFuture
```

### Building and Deployment
```bash
# Build for production (with helper script)
./scripts/deploy.sh

# Or manually
hugo --minify
```

### Prerequisites
- Hugo static site generator (version 0.147.8 specified in vercel.json)
- Git submodules for themes

### Initial Setup
```bash
git submodule update --init --recursive
```

## Architecture and Code Structure

### Content Management
- **Articles**: Written in Markdown in `content/articles/` directory
- **Article metadata**: Managed in `data/articles.yml` for homepage display
- **Main content**: Personal bio and experience in `content/_index.md`
- **Static assets**: Images, videos, CSS in `static/` directory

### Theme Architecture
- Uses modified "researcher" theme located in `themes/researcher/`
- Custom overrides in root `layouts/` directory take precedence over theme layouts
- Custom styling in `assets/sass/researcher.scss` and `static/css/`

### Key Layout Structure
- `layouts/_default/baseof.html`: Base template with Bootstrap 4 and jQuery
- `layouts/partials/`: Reusable components (head, header, footer, math, mermaid)
- `layouts/articles/list.html`: Custom article listing page
- `layouts/shortcodes/`: Custom Hugo shortcodes

### Configuration
- `config.toml`: Main Hugo configuration with theme settings, menu structure, and styling parameters
- `vercel.json`: Deployment configuration specifying Hugo version
- `.cursor/rules/webdev.mdc`: Contains detailed rules for front-end development with Hugo, emphasizing accessibility and component reusability

### Special Features
- **Math rendering**: KaTeX support enabled globally
- **Mermaid diagrams**: Enabled for technical content
- **Syntax highlighting**: Dracula theme with line numbers
- **Google Analytics**: Integrated with ID G-D5HBRC62LK
- **Custom content types**: Articles with tags and descriptions

### Deployment
- Hosted on Vercel with automatic builds from main branch
- Hugo version pinned to 0.147.8
- Public directory serves built static files

## Development Guidelines

When working with this codebase:

1. **Content updates**: Add new articles to `content/articles/` and update `data/articles.yml` for homepage display
2. **Layout modifications**: Override theme layouts by creating corresponding files in root `layouts/` directory
3. **Styling**: Custom CSS goes in `static/css/` or SCSS in `assets/sass/researcher.scss`
4. **Theme compatibility**: The theme has been updated for newer Hugo versions (hugo.IsServer instead of .Site.IsServer)
5. **Follow Cursor rules**: Refer to `.cursor/rules/webdev.mdc` for component development guidelines emphasizing accessibility and reusability