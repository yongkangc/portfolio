use chrono::NaiveDate;
use serde::Deserialize;

#[derive(Debug, Deserialize, Clone)]
pub struct Frontmatter {
    pub title: String,
    pub description: String,
    pub date: String, // We'll parse this manually since the format varies
    pub author: Option<String>,
    pub draft: Option<bool>,
    pub category: Option<String>,
}

#[derive(Debug, Clone)]
pub struct Article {
    pub frontmatter: Frontmatter,
    pub slug: String,
    pub content_html: String,
    pub parsed_date: Option<NaiveDate>,
}
