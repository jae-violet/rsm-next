pub mod entities;
pub mod models;

use sea_orm::ActiveValue::{NotSet, Set, Unchanged};

fn main() {
    // read the Projects csv from the data folder to a string
    let projects_csv = std::fs::read_to_string("data/projects.csv").unwrap();

    // deserialize projects_csv to a Vec<Projects>
    let projects: Vec<entities::projects::Model> = csv::ReaderBuilder::new()
        .has_headers(true)
        // .flexible(true)
        .from_reader(projects_csv.as_bytes())
        .deserialize()
        .map(|result| result.unwrap())
        .collect();

    for project in projects {
        dbg!(project);
    }
}
