use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]

pub struct Service {
    // Name (Service Page),Slug,Collection ID,Item ID,Created On,Updated On,Published On,SEO Page Description,Medium Name (Expertise Page),Short Name (Home Page),Name (View More Button),Name (Filter Button),Sort Priority,Grid Image,Grid Image Description,Hero Images,Overview,Sub-Services,Sub-Services Truncated,Team Leaders,Related Articles,Featured Projects,Default Sort
    #[serde(alias = "Name (Service Page)")]
    pub name: String,

    #[serde(alias = "Slug")]
    pub slug: String,

    #[serde(alias = "Collection ID")]
    pub collection_id: String,

    #[serde(alias = "Item ID")]
    pub item_id: String,

    #[serde(alias = "Created On")]
    pub created_on: String,

    #[serde(alias = "Updated On")]
    pub updated_on: String,

    #[serde(alias = "Published On")]
    pub published_on: String,

    #[serde(alias = "SEO Page Description")]
    pub seo_page_description: String,

    #[serde(alias = "Medium Name (Expertise Page)")]
    pub medium_name: String,

    #[serde(alias = "Short Name (Home Page)")]
    pub short_name: String,

    #[serde(alias = "Name (View More Button)")]
    pub name_view_more_button: String,

    #[serde(alias = "Name (Filter Button)")]
    pub name_filter_button: String,

    #[serde(alias = "Sort Priority")]
    pub sort_priority: u32,

    #[serde(alias = "Grid Image")]
    pub grid_image: String,

    #[serde(alias = "Grid Image Description")]
    pub grid_image_description: String,

    #[serde(alias = "Hero Images")]
    pub hero_images: Vec<String>,

    #[serde(alias = "Overview")]
    pub overview: String,

    #[serde(alias = "Sub-Services")]
    pub sub_services: String,

    #[serde(alias = "Sub-Services Truncated")]
    pub sub_services_truncated: String,

    #[serde(alias = "Team Leaders")]
    pub team_leaders: String,

    #[serde(alias = "Related Articles")]
    pub related_articles: String,

    #[serde(alias = "Featured Projects")]
    pub featured_projects: String,

    #[serde(alias = "Default Sort")]
    pub default_sort: bool,
}
