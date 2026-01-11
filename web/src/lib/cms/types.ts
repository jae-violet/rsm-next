export type Awards = {
	award_designation?: string | null;
	award_designation_short?: string | null;
	awards_page_sort?: number | null;
	awards_page_sort_behavior?: string | null;
	date_created?: string | null;
	date_updated?: string | null;
	id: number;
	name?: string | null;
	project?: (number & Projects) | null;
	project_location?: string | null;
	project_name?: string | null;
	project_page_sort?: number | null;
	project_page_sort_behavior?: string | null;
	slug?: string | null;
	user_created?: (string & DirectusUsers) | null;
	user_updated?: (string & DirectusUsers) | null;
	visibility: string;
	year?: number | null;
};

export type Books = {
	amazon_link?: string | null;
	authors?: string | null;
	banner_image?: (string & DirectusFiles) | null;
	banner_image_mobile?: (string & DirectusFiles) | null;
	body?: string | null;
	book_description?: string | null;
	date_created?: string | null;
	date_updated?: string | null;
	format?: string | null;
	grid_image?: (string & DirectusFiles) | null;
	hero_image?: (string & DirectusFiles) | null;
	home_page_blurb?: string | null;
	home_page_tagline?: string | null;
	id: number;
	page_count?: number | null;
	seo_page_description?: string | null;
	slug?: string | null;
	sort?: number | null;
	tag?: string | null;
	title?: string | null;
	user_created?: (string & DirectusUsers) | null;
	user_updated?: (string & DirectusUsers) | null;
	visual_profile_books_link?: string | null;
	visibility: string;
	weight?: number | null;
};

export type Careers = {
	date_created?: string | null;
	date_updated?: string | null;
	id: number;
	job_description?: string | null;
	name?: string | null;
	seo_page_description?: string | null;
	slug?: string | null;
	user_created?: (string & DirectusUsers) | null;
	user_updated?: (string & DirectusUsers) | null;
	visibility: string;
};

export type DirectusActivity = {
	action: string;
	collection: string;
	comment?: string | null;
	id: number;
	ip?: string | null;
	item: string;
	origin?: string | null;
	revisions?: (any[] & DirectusRevisions[]) | null;
	timestamp: string;
	user?: (string & DirectusUsers) | null;
	user_agent?: string | null;
};

export type DirectusCollections = {
	accountability?: string | null;
	archive_app_filter: boolean;
	archive_field?: string | null;
	archive_value?: string | null;
	collapse: string;
	collection: string;
	color?: string | null;
	display_template?: string | null;
	group?: (string & DirectusCollections) | null;
	hidden: boolean;
	icon?: string | null;
	item_duplication_fields?: unknown | null;
	note?: string | null;
	singleton: boolean;
	sort?: number | null;
	sort_field?: string | null;
	translations?: unknown | null;
	unarchive_value?: string | null;
};

export type DirectusDashboards = {
	color?: string | null;
	date_created?: string | null;
	icon: string;
	id: string;
	name: string;
	note?: string | null;
	panels?: (any[] & DirectusPanels[]) | null;
	user_created?: (string & DirectusUsers) | null;
};

export type DirectusFields = {
	collection?: (string & DirectusCollections) | null;
	conditions?: unknown | null;
	display?: string | null;
	display_options?: unknown | null;
	field: string;
	group?: (string & DirectusFields) | null;
	hidden: boolean;
	id: number;
	interface?: string | null;
	note?: string | null;
	options?: unknown | null;
	readonly: boolean;
	required?: boolean | null;
	sort?: number | null;
	special?: unknown | null;
	translations?: unknown | null;
	validation?: unknown | null;
	validation_message?: string | null;
	width?: string | null;
};

export type DirectusFiles = {
	charset?: string | null;
	description?: string | null;
	duration?: number | null;
	embed?: string | null;
	filename_disk?: string | null;
	filename_download: string;
	filesize?: number | null;
	folder?: (string & DirectusFolders) | null;
	height?: number | null;
	id: string;
	location?: string | null;
	metadata?: unknown | null;
	modified_by?: (string & DirectusUsers) | null;
	modified_on: string;
	storage: string;
	tags?: unknown | null;
	title?: string | null;
	type?: string | null;
	uploaded_by?: (string & DirectusUsers) | null;
	uploaded_on: string;
	width?: number | null;
};

export type DirectusFlows = {
	accountability?: string | null;
	color?: string | null;
	date_created?: string | null;
	description?: string | null;
	icon?: string | null;
	id: string;
	name: string;
	operation?: (string & DirectusOperations) | null;
	operations?: (any[] & DirectusOperations[]) | null;
	options?: unknown | null;
	status: string;
	trigger?: string | null;
	user_created?: (string & DirectusUsers) | null;
};

export type DirectusFolders = {
	id: string;
	name: string;
	parent?: (string & DirectusFolders) | null;
};

export type DirectusMigrations = {
	name: string;
	timestamp?: string | null;
	version: string;
};

export type DirectusNotifications = {
	collection?: string | null;
	id: number;
	item?: string | null;
	message?: string | null;
	recipient?: (string & DirectusUsers) | null;
	sender?: (string & DirectusUsers) | null;
	status?: string | null;
	subject: string;
	timestamp?: string | null;
};

export type DirectusOperations = {
	date_created?: string | null;
	flow?: (string & DirectusFlows) | null;
	id: string;
	key: string;
	name?: string | null;
	options?: unknown | null;
	position_x: number;
	position_y: number;
	reject?: (string & DirectusOperations) | null;
	resolve?: (string & DirectusOperations) | null;
	type: string;
	user_created?: (string & DirectusUsers) | null;
};

export type DirectusPanels = {
	color?: string | null;
	dashboard?: (string & DirectusDashboards) | null;
	date_created?: string | null;
	height: number;
	icon?: string | null;
	id: string;
	name?: string | null;
	note?: string | null;
	options?: unknown | null;
	position_x: number;
	position_y: number;
	show_header: boolean;
	type: string;
	user_created?: (string & DirectusUsers) | null;
	width: number;
};

export type DirectusPermissions = {
	action: string;
	collection: string;
	fields?: unknown | null;
	id: number;
	permissions?: unknown | null;
	presets?: unknown | null;
	role?: (string & DirectusRoles) | null;
	validation?: unknown | null;
};

export type DirectusPresets = {
	bookmark?: string | null;
	collection?: string | null;
	color?: string | null;
	filter?: unknown | null;
	icon: string;
	id: number;
	layout?: string | null;
	layout_options?: unknown | null;
	layout_query?: unknown | null;
	refresh_interval?: number | null;
	role?: (string & DirectusRoles) | null;
	search?: string | null;
	user?: (string & DirectusUsers) | null;
};

export type DirectusRelations = {
	id: number;
	junction_field?: string | null;
	many_collection: string;
	many_field: string;
	one_allowed_collections?: unknown | null;
	one_collection?: string | null;
	one_collection_field?: string | null;
	one_deselect_action: string;
	one_field?: string | null;
	sort_field?: string | null;
};

export type DirectusRevisions = {
	activity?: (number & DirectusActivity) | null;
	collection: string;
	data?: unknown | null;
	delta?: unknown | null;
	id: number;
	item: string;
	parent?: (number & DirectusRevisions) | null;
};

export type DirectusRoles = {
	admin_access: boolean;
	app_access: boolean;
	description?: string | null;
	enforce_tfa: boolean;
	icon: string;
	id: string;
	ip_access?: unknown | null;
	name: string;
	users?: (any[] & DirectusUsers[]) | null;
};

export type DirectusSessions = {
	expires: string;
	ip?: string | null;
	origin?: string | null;
	share?: (string & DirectusShares) | null;
	token: string;
	user?: (string & DirectusUsers) | null;
	user_agent?: string | null;
};

export type DirectusSettings = {
	auth_login_attempts?: number | null;
	auth_password_policy?: string | null;
	basemaps?: unknown | null;
	custom_aspect_ratios?: unknown | null;
	custom_css?: string | null;
	default_language: string;
	id: number;
	mapbox_key?: string | null;
	module_bar?: unknown | null;
	project_color?: string | null;
	project_descriptor?: string | null;
	project_logo?: (string & DirectusFiles) | null;
	project_name: string;
	project_url?: string | null;
	public_background?: (string & DirectusFiles) | null;
	public_foreground?: (string & DirectusFiles) | null;
	public_note?: string | null;
	storage_asset_presets?: unknown | null;
	storage_asset_transform?: string | null;
	storage_default_folder?: (string & DirectusFolders) | null;
	translation_strings?: unknown | null;
};

export type DirectusShares = {
	collection?: (string & DirectusCollections) | null;
	date_created?: string | null;
	date_end?: string | null;
	date_start?: string | null;
	id: string;
	item?: string | null;
	max_uses?: number | null;
	name?: string | null;
	password?: string | null;
	role?: (string & DirectusRoles) | null;
	times_used?: number | null;
	user_created?: (string & DirectusUsers) | null;
};

export type DirectusUsers = {
	auth_data?: unknown | null;
	avatar?: (string & DirectusFiles) | null;
	description?: string | null;
	email?: string | null;
	email_notifications?: boolean | null;
	external_identifier?: string | null;
	first_name?: string | null;
	id: string;
	language?: string | null;
	last_access?: string | null;
	last_name?: string | null;
	last_page?: string | null;
	location?: string | null;
	password?: string | null;
	provider: string;
	role?: (string & DirectusRoles) | null;
	status: string;
	tags?: unknown | null;
	tfa_secret?: string | null;
	theme?: string | null;
	title?: string | null;
	token?: string | null;
};

export type DirectusWebhooks = {
	actions: unknown;
	collections: unknown;
	data: boolean;
	headers?: unknown | null;
	id: number;
	method: string;
	name: string;
	status: string;
	url: string;
};

export type GeographicalRegions = {
	completed_projects_info?: string | null;
	date_created?: string | null;
	date_updated?: string | null;
	featured_projects?: (any[] & GeographicalRegionsProjects[]) | null;
	grid_image?: (string & DirectusFiles) | null;
	hero_images?: (any[] & GeographicalRegionsFiles[]) | null;
	id: number;
	name?: string | null;
	non_linked_completed_projects?: unknown | null;
	non_linked_services?: unknown | null;
	overview?: string | null;
	project_locations?: unknown | null;
	region_filter?: string | null;
	related_articles?: (any[] & GeographicalRegionsNewsPosts[]) | null;
	search_name?: string | null;
	seo_page_description?: string | null;
	slug?: string | null;
	sort?: number | null;
	sub_services?: (any[] & GeographicalRegionsServices[]) | null;
	user_created?: (string & DirectusUsers) | null;
	user_updated?: (string & DirectusUsers) | null;
	view_more_name?: string | null;
	visibility: string;
};

export type GeographicalRegionsFiles = {
	directus_files_id?: (string & DirectusFiles) | null;
	geographical_regions_id?: (number & GeographicalRegions) | null;
	id: number;
};

export type GeographicalRegionsNewsPosts = {
	geographical_regions_id?: (number & GeographicalRegions) | null;
	id: number;
	news_posts_id?: (number & NewsPosts) | null;
};

export type GeographicalRegionsProjects = {
	geographical_regions_id?: (number & GeographicalRegions) | null;
	id: number;
	projects_id?: (number & Projects) | null;
};

export type GeographicalRegionsServices = {
	geographical_regions_id?: (number & GeographicalRegions) | null;
	id: number;
	services_id?: (number & Services) | null;
};

export type HiddenMarkets = {
	date_created?: string | null;
	date_updated?: string | null;
	id: number;
	name?: string | null;
	slug?: string | null;
	sort?: number | null;
	user_created?: (string & DirectusUsers) | null;
	user_updated?: (string & DirectusUsers) | null;
	visibility: string;
};

export type HiddenServices = {
	date_created?: string | null;
	date_updated?: string | null;
	grid_image?: (string & DirectusFiles) | null;
	hero_images?: (any[] & HiddenServicesFiles[]) | null;
	id: number;
	name?: string | null;
	overview?: string | null;
	related_articles?: (any[] & HiddenServicesNewsPosts[]) | null;
	seo_page_description?: string | null;
	slug?: string | null;
	sort?: number | null;
	sub_services?: string | null;
	team_leaders?: (any[] & HiddenServicesTeam[]) | null;
	user_created?: (string & DirectusUsers) | null;
	user_updated?: (string & DirectusUsers) | null;
	visibility: string;
};

export type HiddenServicesFiles = {
	directus_files_id?: (string & DirectusFiles) | null;
	hidden_services_id?: (number & HiddenServices) | null;
	id: number;
};

export type HiddenServicesNewsPosts = {
	hidden_services_id?: (number & HiddenServices) | null;
	id: number;
	news_posts_id?: (number & NewsPosts) | null;
};

export type HiddenServicesTeam = {
	hidden_services_id?: (number & HiddenServices) | null;
	id: number;
	team_id?: (number & Team) | null;
};

export type Markets = {
	date_created?: string | null;
	date_updated?: string | null;
	default_sort?: boolean | null;
	featured_projects?: (any[] & MarketsProjects[]) | null;
	filter_button_name?: string | null;
	grid_image?: (string & DirectusFiles) | null;
	hero_images?: (any[] & MarketsFiles[]) | null;
	id: number;
	medium_name?: string | null;
	name?: string | null;
	overview?: string | null;
	related_articles?: (any[] & MarketsNewsPosts[]) | null;
	seo_page_description?: string | null;
	short_name?: string | null;
	slug?: string | null;
	sort?: number | null;
	sort_behavior?: string | null;
	sort_priority?: number | null;
	sub_services?: unknown | null;
	team_leaders?: (any[] & MarketsTeam[]) | null;
	team_leaders_text?: string | null;
	user_created?: (string & DirectusUsers) | null;
	user_updated?: (string & DirectusUsers) | null;
	view_more_name?: string | null;
	visibility: string;
};

export type MarketsFiles = {
	directus_files_id?: (string & DirectusFiles) | null;
	id: number;
	markets_id?: (number & Markets) | null;
};

export type MarketsNewsPosts = {
	id: number;
	markets_id?: (number & Markets) | null;
	news_posts_id?: (number & NewsPosts) | null;
};

export type MarketsProjects = {
	id: number;
	markets_id?: (number & Markets) | null;
	projects_id?: (number & Projects) | null;
};

export type MarketsTeam = {
	id: number;
	markets_id?: (number & Markets) | null;
	team_id?: (number & Team) | null;
};

export type Misc = {
	date_created?: string | null;
	date_updated?: string | null;
	grid_image?: (string & DirectusFiles) | null;
	id: number;
	name?: string | null;
	overview?: string | null;
	projects?: (any[] & MiscProjects[]) | null;
	seo_page_description?: string | null;
	slug?: string | null;
	sort?: number | null;
	team_leaders?: (any[] & MiscTeam[]) | null;
	user_created?: (string & DirectusUsers) | null;
	user_updated?: (string & DirectusUsers) | null;
	visibility: string;
};

export type MiscProjects = {
	id: number;
	misc_id?: (number & Misc) | null;
	projects_id?: (number & Projects) | null;
};

export type MiscTeam = {
	id: number;
	misc_id?: (number & Misc) | null;
	team_id?: (number & Team) | null;
};

export type NewsPosts = {
	article_preview?: string | null;
	authors?: (any[] & NewsPostsTeam[]) | null;
	date_created?: string | null;
	date_updated?: string | null;
	featured?: boolean | null;
	grid_image?: (string & DirectusFiles) | null;
	hero_image?: (string & DirectusFiles) | null;
	hero_image_crop_attachment?: string | null;
	hero_image_description?: string | null;
	hero_video?: string | null;
	id: number;
	page_content?: (any[] & NewsPostsPageContent[]) | null;
	post_body?: string | null;
	post_title?: string | null;
	published_date?: string | null;
	seo_page_description?: string | null;
	slug?: string | null;
	sort?: number | null;
	topics?: (any[] & NewsPostsNewsTopics[]) | null;
	topics_list?: string | null;
	user_created?: (string & DirectusUsers) | null;
	user_updated?: (string & DirectusUsers) | null;
	visibility: string;
};

export type NewsPostsNewsTopics = {
	id: number;
	news_posts_id?: (number & NewsPosts) | null;
	news_topics_id?: (number & NewsTopics) | null;
};

export type NewsPostsPageContent = {
	collection?: string | null;
	id: number;
	item?: (string & any) | null;
	news_posts_id?: (number & NewsPosts) | null;
};

export type NewsPostsTeam = {
	id: number;
	news_posts_id?: (number & NewsPosts) | null;
	team_id?: (number & Team) | null;
};

export type NewsTopics = {
	date_created?: string | null;
	date_updated?: string | null;
	id: number;
	name?: string | null;
	slug?: string | null;
	sort?: number | null;
	user_created?: (string & DirectusUsers) | null;
	user_updated?: (string & DirectusUsers) | null;
	visibility: string;
};

export type PageBlockBlockquote = {
	attribution?: string | null;
	body?: string | null;
	citation?: string | null;
	id: number;
};

export type PageBlockCta = {
	id: number;
	link?: string | null;
	text?: string | null;
};

export type PageBlockImageRow = {
	caption?: string | null;
	id: number;
	images?: (any[] & PageBlockImageRowFiles[]) | null;
	layout?: string | null;
};

export type PageBlockImageRowFiles = {
	directus_files_id?: (string & DirectusFiles) | null;
	id: number;
	page_block_image_row_id?: (number & PageBlockImageRow) | null;
};

export type PageBlockRichText = {
	content?: string | null;
	id: number;
};

export type Projects = {
	client?: unknown | null;
	collaborators?: string | null;
	date_created?: string | null;
	date_updated?: string | null;
	design_awards?: unknown | null;
	geographical_regions?: (any[] & ProjectsGeographicalRegions[]) | null;
	grid_image?: (string & DirectusFiles) | null;
	hero_image?: (string & DirectusFiles) | null;
	hero_image_crop_attachment?: string | null;
	hero_video_id?: string | null;
	home_page_slider?: boolean | null;
	id: number;
	location?: string | null;
	markets?: (any[] & ProjectsMarkets[]) | null;
	misc_filters_list?: string | null;
	non_linked_markets?: unknown | null;
	non_linked_services?: unknown | null;
	page_content?: (any[] & ProjectsPageContent[]) | null;
	project_body?: string | null;
	project_description?: string | null;
	project_opening_date?: string | null;
	project_title?: string | null;
	project_title_short?: string | null;
	regions_and_studio_locations_list?: string | null;
	seo_page_description?: string | null;
	services?: (any[] & ProjectsServices[]) | null;
	slider_images?: (any[] & ProjectsFiles[]) | null;
	slug?: string | null;
	sort?: number | null;
	studio_locations?: (any[] & ProjectsStudioLocations[]) | null;
	user_created?: (string & DirectusUsers) | null;
	user_updated?: (string & DirectusUsers) | null;
	visibility: string;
};

export type ProjectsFiles = {
	directus_files_id?: (string & DirectusFiles) | null;
	id: number;
	projects_id?: (number & Projects) | null;
};

export type ProjectsGeographicalRegions = {
	geographical_regions_id?: (number & GeographicalRegions) | null;
	id: number;
	projects_id?: (number & Projects) | null;
};

export type ProjectsHiddenMarkets = {
	hidden_markets_id?: (number & HiddenMarkets) | null;
	id: number;
	projects_id?: (number & Projects) | null;
};

export type ProjectsHiddenServices = {
	hidden_services_id?: (number & HiddenServices) | null;
	id: number;
	projects_id?: (number & Projects) | null;
};

export type ProjectsMarkets = {
	id: number;
	markets_id?: (number & Markets) | null;
	projects_id?: (number & Projects) | null;
};

export type ProjectsPageContent = {
	collection?: string | null;
	id: number;
	item?: (string & any) | null;
	projects_id?: (number & Projects) | null;
};

export type ProjectsServices = {
	id: number;
	projects_id?: (number & Projects) | null;
	services_id?: (number & Services) | null;
};

export type ProjectsStudioLocations = {
	id: number;
	projects_id?: (number & Projects) | null;
	studio_locations_id?: (number & StudioLocations) | null;
};

export type Services = {
	date_created?: string | null;
	date_updated?: string | null;
	default_sort?: boolean | null;
	featured_projects?: (any[] & ServicesProjects[]) | null;
	filter_button_name?: string | null;
	grid_image?: (string & DirectusFiles) | null;
	hero_images?: (any[] & ServicesFiles[]) | null;
	id: number;
	medium_name?: string | null;
	name?: string | null;
	overview?: string | null;
	related_articles?: (any[] & ServicesNewsPosts[]) | null;
	seo_page_description?: string | null;
	short_name?: string | null;
	slug?: string | null;
	sort_behavior?: string | null;
	sort_priority?: number | null;
	sub_services?: unknown | null;
	sub_services_truncated?: unknown | null;
	team_leaders?: (any[] & ServicesTeam[]) | null;
	user_created?: (string & DirectusUsers) | null;
	user_updated?: (string & DirectusUsers) | null;
	view_more_name?: string | null;
	visibility: string;
};

export type ServicesFiles = {
	directus_files_id?: (string & DirectusFiles) | null;
	id: number;
	services_id?: (number & Services) | null;
};

export type ServicesNewsPosts = {
	id: number;
	news_posts_id?: (number & NewsPosts) | null;
	services_id?: (number & Services) | null;
};

export type ServicesProjects = {
	id: number;
	projects_id?: (number & Projects) | null;
	services_id?: (number & Services) | null;
};

export type ServicesTeam = {
	id: number;
	services_id?: (number & Services) | null;
	team_id?: (number & Team) | null;
};

export type StudioLocations = {
	address?: string | null;
	contact_email?: string | null;
	contact_phone?: string | null;
	date_created?: string | null;
	date_updated?: string | null;
	featured_projects?: (any[] & StudioLocationsProjects[]) | null;
	grid_image?: (string & DirectusFiles) | null;
	hero_images?: (any[] & StudioLocationsFiles[]) | null;
	hubspot_tracking_email?: string | null;
	id: number;
	location?: string | null;
	location_abbreviated?: string | null;
	location_full?: string | null;
	noindex?: string | null;
	office_director?: (number & Team) | null;
	overview?: string | null;
	related_articles?: (any[] & StudioLocationsNewsPosts[]) | null;
	search_name?: string | null;
	seo_page_description?: string | null;
	slug?: string | null;
	sort_behavior?: string | null;
	sort_priority?: number | null;
	studio_filter?: string | null;
	user_created?: (string & DirectusUsers) | null;
	user_updated?: (string & DirectusUsers) | null;
	view_more_name?: string | null;
	visibility: string;
};

export type StudioLocationsFiles = {
	directus_files_id?: (string & DirectusFiles) | null;
	id: number;
	studio_locations_id?: (number & StudioLocations) | null;
};

export type StudioLocationsNewsPosts = {
	id: number;
	news_posts_id?: (number & NewsPosts) | null;
	studio_locations_id?: (number & StudioLocations) | null;
};

export type StudioLocationsProjects = {
	id: number;
	projects_id?: (number & Projects) | null;
	studio_locations_id?: (number & StudioLocations) | null;
};

export type Team = {
	banner_grid_image_bw?: (string & DirectusFiles) | null;
	banner_grid_image_color?: (string & DirectusFiles) | null;
	banner_grid_image_sort?: number | null;
	bio?: string | null;
	contact_email?: string | null;
	contact_phone_1?: string | null;
	contact_phone_1_extension?: string | null;
	contact_phone_2?: string | null;
	contact_phone_2_extension?: string | null;
	date_created?: string | null;
	date_updated?: string | null;
	display_latest_articles?: boolean | null;
	education?: unknown | null;
	expertise?: unknown | null;
	featured_image?: (string & DirectusFiles) | null;
	full_title?: string | null;
	headshot?: (string & DirectusFiles) | null;
	honors?: unknown | null;
	hubspot_tracking_email?: string | null;
	id: number;
	instagram_url?: string | null;
	linkedin_url?: string | null;
	name?: string | null;
	noindex?: string | null;
	recent_projects?: (any[] & TeamProjects[]) | null;
	seo_page_description?: string | null;
	short_title?: string | null;
	slug?: string | null;
	sort_behavior?: string | null;
	sort_priority?: number | null;
	speaking_publications_topics?: unknown | null;
	title_ranking?: number | null;
	user_created?: (string & DirectusUsers) | null;
	user_updated?: (string & DirectusUsers) | null;
	visibility: string;
};

export type TeamProjects = {
	id: number;
	projects_id?: (number & Projects) | null;
	team_id?: (number & Team) | null;
};

export type Testimonials = {
	associated_project?: (number & Projects) | null;
	banner_image?: (string & DirectusFiles) | null;
	banner_image_description?: string | null;
	company_name?: string | null;
	date_created?: string | null;
	date_updated?: string | null;
	id: number;
	quote?: string | null;
	quote_attribution?: string | null;
	quote_attribution_job_title?: string | null;
	slug?: string | null;
	sort?: number | null;
	sort_behavior?: string | null;
	sort_priority?: number | null;
	user_created?: (string & DirectusUsers) | null;
	user_updated?: (string & DirectusUsers) | null;
	visibility: string;
};

export type CustomDirectusTypes = {
	awards: Awards;
	books: Books;
	careers: Careers;
	directus_activity: DirectusActivity;
	directus_collections: DirectusCollections;
	directus_dashboards: DirectusDashboards;
	directus_fields: DirectusFields;
	directus_files: DirectusFiles;
	directus_flows: DirectusFlows;
	directus_folders: DirectusFolders;
	directus_migrations: DirectusMigrations;
	directus_notifications: DirectusNotifications;
	directus_operations: DirectusOperations;
	directus_panels: DirectusPanels;
	directus_permissions: DirectusPermissions;
	directus_presets: DirectusPresets;
	directus_relations: DirectusRelations;
	directus_revisions: DirectusRevisions;
	directus_roles: DirectusRoles;
	directus_sessions: DirectusSessions;
	directus_settings: DirectusSettings;
	directus_shares: DirectusShares;
	directus_users: DirectusUsers;
	directus_webhooks: DirectusWebhooks;
	geographical_regions: GeographicalRegions;
	geographical_regions_files: GeographicalRegionsFiles;
	geographical_regions_news_posts: GeographicalRegionsNewsPosts;
	geographical_regions_projects: GeographicalRegionsProjects;
	geographical_regions_services: GeographicalRegionsServices;
	hidden_markets: HiddenMarkets;
	hidden_services: HiddenServices;
	hidden_services_files: HiddenServicesFiles;
	hidden_services_news_posts: HiddenServicesNewsPosts;
	hidden_services_team: HiddenServicesTeam;
	markets: Markets;
	markets_files: MarketsFiles;
	markets_news_posts: MarketsNewsPosts;
	markets_projects: MarketsProjects;
	markets_team: MarketsTeam;
	misc: Misc;
	misc_projects: MiscProjects;
	misc_team: MiscTeam;
	news_posts: NewsPosts;
	news_posts_news_topics: NewsPostsNewsTopics;
	news_posts_page_content: NewsPostsPageContent;
	news_posts_team: NewsPostsTeam;
	news_topics: NewsTopics;
	page_block_blockquote: PageBlockBlockquote;
	page_block_cta: PageBlockCta;
	page_block_image_row: PageBlockImageRow;
	page_block_image_row_files: PageBlockImageRowFiles;
	page_block_rich_text: PageBlockRichText;
	projects: Projects;
	projects_files: ProjectsFiles;
	projects_geographical_regions: ProjectsGeographicalRegions;
	projects_hidden_markets: ProjectsHiddenMarkets;
	projects_hidden_services: ProjectsHiddenServices;
	projects_markets: ProjectsMarkets;
	projects_page_content: ProjectsPageContent;
	projects_services: ProjectsServices;
	projects_studio_locations: ProjectsStudioLocations;
	services: Services;
	services_files: ServicesFiles;
	services_news_posts: ServicesNewsPosts;
	services_projects: ServicesProjects;
	services_team: ServicesTeam;
	studio_locations: StudioLocations;
	studio_locations_files: StudioLocationsFiles;
	studio_locations_news_posts: StudioLocationsNewsPosts;
	studio_locations_projects: StudioLocationsProjects;
	team: Team;
	team_projects: TeamProjects;
	testimonials: Testimonials;
};
