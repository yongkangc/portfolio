mod article;
mod markdown;

use actix_files::Files;
use actix_web::{web, App, HttpResponse, HttpServer, Result};
use markdown::MarkdownService;
use std::sync::Arc;
use tera::Tera;

// Application state
pub struct AppState {
    pub tera: Tera,
    pub markdown_service: Arc<MarkdownService>,
}

// Route handlers
async fn index(data: web::Data<AppState>) -> Result<HttpResponse> {
    let articles = data.markdown_service.get_all_articles();
    
    let mut context = tera::Context::new();
    context.insert("articles", &articles);
    context.insert("title", "Blog");
    
    match data.tera.render("index.html", &context) {
        Ok(rendered) => Ok(HttpResponse::Ok().content_type("text/html").body(rendered)),
        Err(err) => {
            eprintln!("Template error: {}", err);
            Ok(HttpResponse::InternalServerError().body("Template error"))
        }
    }
}

async fn article_detail(
    path: web::Path<String>,
    data: web::Data<AppState>,
) -> Result<HttpResponse> {
    let slug = path.into_inner();
    
    match data.markdown_service.get_article(&slug) {
        Some(article) => {
            let mut context = tera::Context::new();
            context.insert("article", article);
            context.insert("title", &article.frontmatter.title);
            
            match data.tera.render("article.html", &context) {
                Ok(rendered) => Ok(HttpResponse::Ok().content_type("text/html").body(rendered)),
                Err(err) => {
                    eprintln!("Template error: {}", err);
                    Ok(HttpResponse::InternalServerError().body("Template error"))
                }
            }
        }
        None => Ok(HttpResponse::NotFound().body("Article not found")),
    }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    println!("Starting blog server...");
    
    // Initialize Tera templates
    let tera = match Tera::new("templates/**/*") {
        Ok(t) => t,
        Err(e) => {
            println!("Parsing error(s): {}", e);
            std::process::exit(1);
        }
    };
    
    // Initialize markdown service
    let markdown_service = match MarkdownService::new() {
        Ok(service) => Arc::new(service),
        Err(e) => {
            println!("Failed to initialize markdown service: {}", e);
            std::process::exit(1);
        }
    };
    
    println!("Loaded {} articles", markdown_service.articles.len());
    
    // Create application state
    let app_state = AppState {
        tera,
        markdown_service,
    };
    
    // Start HTTP server
    HttpServer::new(move || {
        App::new()
            .app_data(web::Data::new(app_state.clone()))
            .route("/", web::get().to(index))
            .route("/articles/{slug}", web::get().to(article_detail))
            .service(Files::new("/static", "static").show_files_listing())
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}

// Make AppState cloneable
impl Clone for AppState {
    fn clone(&self) -> Self {
        AppState {
            tera: self.tera.clone(),
            markdown_service: Arc::clone(&self.markdown_service),
        }
    }
} 