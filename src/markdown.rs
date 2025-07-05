use crate::article::{Article, Frontmatter};
use chrono::NaiveDate;
use pulldown_cmark::{html, Options, Parser};
use std::collections::HashMap;
use std::fs;
use std::path::Path;
use walkdir::WalkDir;

pub struct MarkdownService {
    pub articles: HashMap<String, Article>,
}

impl MarkdownService {
    pub fn new() -> Result<Self, Box<dyn std::error::Error>> {
        let mut articles = HashMap::new();

        // Read all markdown files from content/articles
        let articles_dir = Path::new("content/articles");
        if articles_dir.exists() {
            for entry in WalkDir::new(articles_dir) {
                let entry = entry?;
                if entry.file_type().is_file() {
                    if let Some(extension) = entry.path().extension() {
                        if extension == "md" {
                            if let Ok(article) = Self::parse_markdown_file(entry.path()) {
                                // Skip draft articles
                                if article.frontmatter.draft.unwrap_or(false) {
                                    continue;
                                }
                                articles.insert(article.slug.clone(), article);
                            }
                        }
                    }
                }
            }
        }

        Ok(MarkdownService { articles })
    }

    fn parse_markdown_file(path: &Path) -> Result<Article, Box<dyn std::error::Error>> {
        let content = fs::read_to_string(path)?;

        // Split frontmatter and content
        let parts: Vec<&str> = content.splitn(3, "---").collect();
        if parts.len() < 3 {
            return Err("Invalid markdown format: missing frontmatter".into());
        }

        // Parse frontmatter
        let frontmatter: Frontmatter = serde_yaml::from_str(parts[1].trim())?;

        // Parse markdown content to HTML
        let markdown_input = parts[2].trim();
        let mut options = Options::empty();
        options.insert(Options::ENABLE_STRIKETHROUGH);
        options.insert(Options::ENABLE_TABLES);
        options.insert(Options::ENABLE_FOOTNOTES);

        let parser = Parser::new_ext(markdown_input, options);
        let mut content_html = String::new();
        html::push_html(&mut content_html, parser);

        // Generate slug from filename
        let slug = path
            .file_stem()
            .and_then(|s| s.to_str())
            .unwrap_or("untitled")
            .to_string();

        // Parse date
        let parsed_date = Self::parse_date(&frontmatter.date);

        Ok(Article {
            frontmatter,
            slug,
            content_html,
            parsed_date,
        })
    }

    fn parse_date(date_str: &str) -> Option<NaiveDate> {
        // Try different date formats
        let formats = [
            "%d %b %Y",  // "18 Feb 2024"
            "%Y-%m-%d",  // "2024-02-18"
            "%B %d, %Y", // "February 18, 2024"
        ];

        for format in &formats {
            if let Ok(date) = NaiveDate::parse_from_str(date_str, format) {
                return Some(date);
            }
        }
        None
    }

    pub fn get_article(&self, slug: &str) -> Option<&Article> {
        self.articles.get(slug)
    }

    pub fn get_all_articles(&self) -> Vec<&Article> {
        let mut articles: Vec<&Article> = self.articles.values().collect();
        // Sort by date, newest first
        articles.sort_by(|a, b| match (a.parsed_date, b.parsed_date) {
            (Some(a_date), Some(b_date)) => b_date.cmp(&a_date),
            (Some(_), None) => std::cmp::Ordering::Less,
            (None, Some(_)) => std::cmp::Ordering::Greater,
            (None, None) => a.slug.cmp(&b.slug),
        });
        articles
    }
}
