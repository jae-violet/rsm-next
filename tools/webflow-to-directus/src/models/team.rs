// create a team struct similar to Project and Service, to represent the following CSV headers:
// Name,Slug,Collection ID,Item ID,Created On,Updated On,Published On,SEO Page Description (principals only),Full Title,Short Title,Headshot,Headshot Description,Featured Image,Featured Image Description,Bio,Education,Honors,"Speaking, Publications & Abstract Topics",Expertise,Contact Phone 1,Contact Phone 1 Extension,Contact Phone 2,Contact Phone 2 Extension,Contact Email,Hubspot Tracking Email,Instagram URL,LinkedIn URL,NoIndex,Sort Priority,Title Ranking,Banner Grid Image B&W,Banner Grid Image Color,Banner Grid Image Description,Banner Grid Image Sort,Display latest articles?,Recent Projects

use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct Team {
    #[serde(alias = "Name")]
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

    #[serde(alias = "SEO Page Description (principals only)")]
    pub seo_page_description: String,

    #[serde(alias = "Full Title")]
    pub full_title: String,

    #[serde(alias = "Short Title")]
    pub short_title: String,

    #[serde(alias = "Headshot")]
    pub headshot: String,

    #[serde(alias = "Headshot Description")]
    pub headshot_description: Option<String>,

    #[serde(alias = "Featured Image")]
    pub featured_image: Option<String>,

    #[serde(alias = "Featured Image Description")]
    pub featured_image_description: Option<String>,

    #[serde(alias = "Bio")]
    pub bio: Option<String>,

    #[serde(alias = "Education")]
    pub education: Option<String>,

    #[serde(alias = "Honors")]
    pub honors: String,

    #[serde(alias = "Speaking, Publications & Abstract Topics")]
    pub speaking_publications_abstract_topics: Option<String>,

    #[serde(alias = "Expertise")]
    pub expertise: String,

    #[serde(alias = "Contact Phone 1")]
    pub contact_phone_1: String,

    #[serde(alias = "Contact Phone 1 Extension")]
    pub contact_phone_1_extension: Option<String>,

    #[serde(alias = "Contact Phone 2")]
    pub contact_phone_2: String,

    #[serde(alias = "Contact Phone 2 Extension")]
    pub contact_phone_2_extension: String,

    #[serde(alias = "Contact Email")]
    pub contact_email: String,

    #[serde(alias = "Hubspot Tracking Email")]
    pub hubspot_tracking_email: String,

    #[serde(alias = "Instagram URL")]
    pub instagram_url: String,

    #[serde(alias = "LinkedIn URL")]
    pub linkedin_url: String,

    #[serde(alias = "NoIndex")]
    pub no_index: String,

    #[serde(alias = "Sort Priority")]
    pub sort_priority: u32,

    #[serde(alias = "Title Ranking")]
    pub title_ranking: u32,

    #[serde(alias = "Banner Grid Image B&W")]
    pub banner_grid_image_bw: String,

    #[serde(alias = "Banner Grid Image Color")]
    pub banner_grid_image_color: String,

    #[serde(alias = "Banner Grid Image Description")]
    pub banner_grid_image_description: String,

    #[serde(alias = "Banner Grid Image Sort")]
    pub banner_grid_image_sort: u32,

    #[serde(alias = "Display latest articles?")]
    pub display_latest_articles: String,

    #[serde(alias = "Recent Projects")]
    pub recent_projects: Vec<String>,
}
