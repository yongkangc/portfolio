#!/bin/bash

echo "🚀 Building Hugo site for production..."

# Clean previous builds
rm -rf public/

# Build the site with minification
hugo --minify

echo "✅ Site built successfully!"
echo "📁 Output directory: public/"
echo "🌐 Ready for deployment to Vercel!"

# Check if public directory exists and has content
if [ -d "public" ] && [ "$(ls -A public)" ]; then
    echo "✅ Build output verified - public directory contains files"
    echo "📊 Site statistics:"
    echo "   Files: $(find public -type f | wc -l)"
    echo "   Size: $(du -sh public | cut -f1)"
else
    echo "❌ Build failed - public directory is empty or missing"
    exit 1
fi 