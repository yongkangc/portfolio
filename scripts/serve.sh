#!/bin/bash

# Build and serve the Hugo site
echo "🚀 Starting Hugo development server..."

# Check if Hugo is installed
if ! command -v hugo &> /dev/null; then
    echo "❌ Hugo is not installed. Please install Hugo first:"
    echo "   brew install hugo  # On macOS"
    echo "   or visit https://gohugo.io/getting-started/installing/"
    exit 1
fi

# Start the development server
hugo server --bind 0.0.0.0 --port 1313 --buildDrafts --buildFuture

echo "✅ Hugo server started successfully!"
echo "📖 View your site at: http://localhost:1313" 