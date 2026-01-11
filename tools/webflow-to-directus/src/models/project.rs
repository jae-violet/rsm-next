use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize)]
pub struct Project {
    #[serde(alias = "Project Title")]
    pub project_title: String,

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

    #[serde(alias = "Project Title (Short)")]
    pub project_title_short: Option<String>,

    #[serde(alias = "SEO Page Description")]
    pub seo_page_description: String,

    #[serde(alias = "Sort Priority: General")]
    pub sort_priority_general: Option<u32>,

    #[serde(alias = "Home Page Slider")]
    pub home_page_slider: Option<bool>,

    #[serde(alias = "Grid Image")]
    pub grid_image: String,

    #[serde(alias = "Grid Image Description")]
    pub grid_image_description: String,

    #[serde(alias = "Hero Image")]
    pub hero_image: String,

    #[serde(alias = "Hero Image Description")]
    pub hero_image_description: String,

    #[serde(alias = "Hero Image Crop Attachment")]
    pub hero_image_crop_attachment: String,

    #[serde(alias = "Hero Video ID")]
    pub hero_video_id: Option<String>,

    #[serde(alias = "Location")]
    pub location: String,

    #[serde(alias = "Geographical Region")]
    pub geographical_region: String,

    #[serde(alias = "Studio Locations")]
    pub studio_locations: Vec<String>,

    #[serde(alias = "Regions and Studio Locations List")]
    pub regions_and_studio_locations_list: Vec<String>,

    #[serde(alias = "Project Description")]
    pub project_description: String,

    #[serde(alias = "Project Opening Date")]
    pub project_opening_date: String,

    #[serde(alias = "Markets")]
    pub markets: Vec<String>,

    #[serde(alias = "Non-Linked Markets")]
    pub non_linked_markets: String,

    #[serde(alias = "Hidden Markets")]
    pub hidden_markets: Vec<String>,

    #[serde(alias = "Markets List")]
    pub markets_list: Vec<String>,

    #[serde(alias = "Services")]
    pub services: Vec<String>,

    #[serde(alias = "Non-Linked Services")]
    pub non_linked_services: String,

    #[serde(alias = "Hidden Services")]
    pub hidden_services: Vec<String>,

    #[serde(alias = "Services List")]
    pub services_list: Vec<String>,

    #[serde(alias = "Misc Filters List")]
    pub misc_filters_list: Vec<String>,

    #[serde(alias = "Client")]
    pub client: Option<String>,

    #[serde(alias = "Design Awards")]
    pub design_awards: Option<String>,

    #[serde(alias = "Collaborators")]
    pub collaborators: Vec<String>,

    #[serde(alias = "Project Body")]
    pub project_body: String,

    #[serde(alias = "Slider Images")]
    pub slider_images: Vec<String>,

    #[serde(alias = "Sort Priority (Services): Environmental Graphic Design")]
    pub sort_priority_services_environmental_graphic_design: Option<u32>,

    #[serde(alias = "Sort Priority (Services): Branding & Logo Design")]
    pub sort_priority_services_branding_logo_design: Option<u32>,

    #[serde(alias = "Sort Priority (Services): Wayfinding Signage")]
    pub sort_priority_services_wayfinding_signage: Option<u32>,

    #[serde(alias = "Sort Priority (Services): Placemaking")]
    pub sort_priority_services_placemaking: Option<u32>,

    #[serde(alias = "Sort Priority (Services): Public Art & Murals")]
    pub sort_priority_services_public_art_murals: Option<u32>,

    #[serde(alias = "Sort Priority (Services): Master Sign Programs")]
    pub sort_priority_services_master_sign_programs: Option<u32>,

    #[serde(alias = "Sort Priority (Services): Digital Integration")]
    pub sort_priority_services_digital_integration: Option<u32>,

    #[serde(alias = "Sort Priority (Services): Exhibit Design")]
    pub sort_priority_services_exhibit_design: Option<u32>,

    #[serde(alias = "Sort Priority (Services): Donor Recognition")]
    pub sort_priority_services_donor_recognition: Option<u32>,

    #[serde(alias = "Sort Priority (Services): Criteria & Guidelines")]
    pub sort_priority_services_criteria_guidelines: Option<u32>,

    #[serde(alias = "Sort Priority (Services): Project Visioning")]
    pub sort_priority_services_project_visioning: Option<u32>,

    #[serde(alias = "Sort Priority (Services): Analysis & Strategy")]
    pub sort_priority_services_analysis_strategy: Option<u32>,

    #[serde(alias = "Sort Priority (Services): Graphic Architecture")]
    pub sort_priority_services_graphic_architecture: Option<u32>,

    #[serde(alias = "Sort Priority (Markets): Civic Design")]
    pub sort_priority_markets_civic_design: Option<u32>,

    #[serde(alias = "Sort Priority (Markets): Workplace Design")]
    pub sort_priority_markets_workplace_design: Option<u32>,

    #[serde(alias = "Sort Priority (Markets): Mixed Use Design")]
    pub sort_priority_markets_mixed_use_design: Option<u32>,
}
