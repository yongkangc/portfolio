# Blog Migration & Modernization Plan

This document outlines the plan to migrate your existing Hugo-based blog to a new, modern tech stack inspired by the `namishh-me` project. The new stack will be built with Rust (Actix), Tera, and TailwindCSS.

The primary goals are:

1.  Keep all existing article content.
2.  Recreate the blog with a new style and structure.
3.  Build a fast, efficient, and maintainable blog platform.

---

## **Phase 1: Project Scaffolding & Setup**

This phase focuses on creating the foundational structure for the new blog.

1.  **Initialize Project Directory:**
    Create a new directory for the project and set up the following structure:

    ```
    /new-blog
    |-- content/
    |   |-- articles/
    |-- src/
    |-- static/
    |   |-- css/
    |   |-- js/
    |   |-- images/
    |-- templates/
    |-- .gitignore
    |-- Cargo.toml
    |-- package.json
    |-- Dockerfile
    |-- docker-compose.yml
    |-- README.md
    ```

2.  **Setup Rust Backend:**

    - Run `cargo init` in the `new-blog` directory.
    - Add the necessary dependencies to `Cargo.toml`:
      ```toml
      [dependencies]
      actix-web = "4"
      actix-files = "0.6"
      tera = "1"
      pulldown-cmark = { version = "0.9", default-features = false, features = ["html"] }
      serde = { version = "1.0", features = ["derive"] }
      serde_yaml = "0.9"
      chrono = { version = "0.4", features = ["serde"] }
      walkdir = "2"
      ```

3.  **Setup Frontend:**
    - Run `npm init -y`.
    - Install frontend dependencies:
      ```bash
      npm install -D tailwindcss autoprefixer postcss
      ```
    - Create `tailwind.config.js`, `postcss.config.js`, and `static/css/input.css`.
    - Add a build script to `package.json` for compiling CSS:
      ```json
      "scripts": {
        "build:css": "tailwindcss -i ./static/css/input.css -o ./static/css/style.css",
        "watch:css": "tailwindcss -i ./static/css/input.css -o ./static/css/style.css --watch"
      }
      ```

---

## **Phase 2: Core Backend Development (Rust & Actix)**

This phase involves building the server-side logic to handle content.

1.  **Article Data Structures:**
    In a new `src/article.rs` module, define structs to represent an article and its frontmatter.

    ```rust
    // src/article.rs
    use serde::Deserialize;
    use chrono::NaiveDate;

    #[derive(Debug, Deserialize)]
    pub struct Frontmatter {
        pub title: String,
        pub description: String,
        #[serde(with = "chrono::serde::ts_seconds")]
        pub date: NaiveDate,
        pub author: Option<String>,
        pub draft: Option<bool>,
        pub category: Option<String>,
    }

    #[derive(Debug)]
    pub struct Article {
        pub frontmatter: Frontmatter,
        pub slug: String,
        pub content_html: String,
    }
    ```

2.  **Markdown Service:**
    Create a service in `src/markdown.rs` to read all markdown files from `content/articles`, parse the frontmatter, convert the markdown to HTML, and store them. This service can be initialized at startup and stored in the application state.

3.  **Actix Web Server:**
    In `src/main.rs`, set up the Actix server.
    - Initialize the Tera templating engine.
    - Initialize the markdown service to load all articles into memory.
    - Create application state to hold the templates and articles.
    - Define HTTP handlers (routes):
      - `GET /`: Homepage that lists all articles.
      - `GET /articles/{slug}`: Displays a single article.
      - `GET /static/{filename..}`: Serves static files (CSS, JS, images).

---

## **Phase 3: Templating & Frontend Design**

This phase connects the backend with the frontend and implements the new design.

1.  **Tera Templates:**

    - Create `templates/base.html` with the main HTML structure (head, header, footer).
    - Create `templates/index.html` to iterate over the list of articles and display them. This will be for the homepage.
    - Create `templates/article.html` to render the title, metadata, and HTML content of a single article.

2.  **Styling with TailwindCSS:**
    - Design a new, clean, and modern UI for the blog.
    - Use `static/css/input.css` to write any custom base styles and use Tailwind directives.
    - Use the `watch:css` script during development for live CSS reloading.
    - Style all components: header, footer, article list items, article content (prose styling), etc.

---

## **Phase 4: Content Migration**

This is a straightforward phase to bring your existing content into the new system.

1.  **Copy Articles:**

    - Copy all markdown files from your current `portfolio/content/articles/` directory to the new `new-blog/content/articles/` directory.

2.  **Verify Frontmatter:**
    - Ensure the YAML frontmatter in your articles matches the `Frontmatter` struct defined in Phase 2. Adjust the struct or the files if needed. The current structure seems standard.

---

## **Phase 5: Containerization & Deployment**

The final phase is to prepare the application for deployment.

1.  **Create Dockerfile:**

    - Write a multi-stage `Dockerfile`.
    - **Build Stage 1 (Frontend):** Use a `node` image to run `npm install` and `npm run build:css` to generate the final `style.css`.
    - **Build Stage 2 (Backend):** Use a `rust` image to compile the Rust application in release mode.
    - **Final Stage:** Use a minimal base image (e.g., `debian:slim`). Copy the compiled Rust binary from the backend stage, and the `static`, `content`, and `templates` directories. Expose the application port.

2.  **Local Development with Docker Compose:**

    - Create a `docker-compose.dev.yml` for local development. This will mount local directories into the container for live-reloading of code, templates, and content. It can also run the `watch:css` command.

3.  **Deployment:**
    - The final Docker image can be deployed to any container hosting service (e.g., DigitalOcean, AWS ECS, Fly.io, Railway).
    - Create a simple `deploy.sh` script to build and push the Docker image and run it on your chosen platform.

---

This plan provides a structured approach to rebuilding your blog. Each phase can be tackled sequentially to ensure a smooth transition.
