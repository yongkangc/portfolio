# Portfolio

A minimalistic portfolio website built with Hugo and the researcher theme, deployed with Vercel.

## Running Locally

### Prerequisites

- **Hugo**: Install Hugo static site generator

  ```bash
  # On macOS using Homebrew
  brew install hugo

  # On other platforms, see: https://gohugo.io/installation/
  ```

### Setup

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd portfolio
   ```

2. **Initialize and update theme submodules**

   ```bash
   git submodule update --init --recursive
   ```

3. **Start the development server**

   ```bash
   hugo server -D
   ```

4. **View the site**
   Open your browser and navigate to `http://localhost:1313/`

### Available Pages

- **Home**: `http://localhost:1313/` - About page with your profile and experience
- **Contact**: `http://localhost:1313/contact` - Contact information

### Development

- The site will automatically reload when you make changes to content files
- Content is stored in the `content/` directory as Markdown files
- Configuration is in `config.toml`

### Theme Compatibility Notes

This site uses the [researcher theme](https://github.com/ojroques/hugo-researcher) with some compatibility fixes for newer Hugo versions:

- Updated deprecated `.Site.IsServer` to `hugo.IsServer` in theme templates
- Updated permalink configuration from `:filename` to `:contentbasename`

### Troubleshooting

If you encounter template errors related to `.Site.IsServer`, ensure the theme templates use `hugo.IsServer` instead of the deprecated syntax.
