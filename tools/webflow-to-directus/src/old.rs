use convert_case::{Case, Casing};
use csv::ReaderBuilder;
use serde::{Deserialize, Serialize};
use serde_yaml;
use std::collections::HashMap;
use std::fs::File;
use std::io::{BufReader, BufWriter, Write};
use std::path::Path;

#[derive(Debug, Deserialize, Serialize)]
struct Mapping {
    files: HashMap<String, HashMap<String, String>>,
}

fn main() {
    let mut mappings_path = String::new();
    println!(
        "Enter the path to the existing mappings.yml file or press enter to create a new one:"
    );
    std::io::stdin().read_line(&mut mappings_path).unwrap();
    let mappings_path = mappings_path.trim();

    let mut input_folder = String::new();
    println!("Enter the input folder path:");
    std::io::stdin().read_line(&mut input_folder).unwrap();
    let input_folder = Path::new(input_folder.trim());

    let existing_mapping = if !mappings_path.is_empty() {
        load_mappings(Path::new(mappings_path)).ok()
    } else {
        None
    };

    let mut mapping = Mapping {
        files: HashMap::new(),
    };
    for entry in input_folder
        .read_dir()
        .expect("Unable to read input folder.")
    {
        if let Ok(entry) = entry {
            if let Some(ext) = entry.path().extension() {
                if ext == "csv" {
                    let file_name = entry
                        .path()
                        .file_stem()
                        .unwrap()
                        .to_str()
                        .expect("Invalid file name.")
                        .to_owned();
                    let header_mapping =
                        generate_header_mapping(&entry.path(), existing_mapping.as_ref());
                    mapping.files.insert(file_name, header_mapping);
                }
            }
        }
    }

    save_mappings(&mapping, "mappings.yml");

    if existing_mapping.is_none() {
        println!("mappings.yml created. Edit this file and re-run the tool.");
        return;
    }

    let mut output_folder = String::new();
    println!("Enter the output folder path:");
    std::io::stdin().read_line(&mut output_folder).unwrap();
    let output_folder = Path::new(output_folder.trim());

    for (file_name, header_mapping) in mapping.files {
        let input_file_path = input_folder.join(format!("{}.csv", file_name));
        let output_file_path = output_folder.join(format!("{}_MAPPED.csv", file_name));
        process_csv(&input_file_path, &output_file_path, &header_mapping);
    }
}

fn load_mappings(path: &Path) -> Result<Mapping, Box<dyn std::error::Error>> {
    let file = File::open(path)?;
    let mapping: Mapping = serde_yaml::from_reader(file)?;
    Ok(mapping)
}

fn save_mappings(mapping: &Mapping, file_name: &str) {
    let file = File::create(file_name).expect("Unable to create mappings.yml file.");
    serde_yaml::to_writer(file, &mapping).expect("Unable to write mappings.yml file.");
}

fn generate_header_mapping(
    csv_path: &Path,
    existing_mapping: Option<&Mapping>,
) -> HashMap<String, String> {
    let reader = BufReader::new(File::open(csv_path).expect("Unable to open CSV file."));
    let mut csv_reader = ReaderBuilder::new()
        .flexible(true)
        .has_headers(true)
        .from_reader(reader);

    let headers = csv_reader
        .headers()
        .expect("Unable to read CSV headers.")
        .clone();

    let file_name = csv_path
        .file_stem()
        .unwrap()
        .to_str()
        .expect("Invalid file name.")
        .to_owned();

    let mut header_mapping = HashMap::new();
    for header in headers.iter() {
        if let Some(mapping) = existing_mapping {
            if let Some(file_mapping) = mapping.files.get(&file_name) {
                if let Some(mapped_header) = file_mapping.get(header) {
                    header_mapping.insert(header.to_owned(), mapped_header.clone());
                    continue;
                }
            }
        }

        let default_header = match header {
            "Created On" => "date_created".to_string(),
            "Updated On" => "date_updated".to_string(),
            _ => header.to_case(Case::Snake),
        };

        header_mapping.insert(header.to_owned(), default_header);
    }

    header_mapping
}

fn process_csv(
    input_file_path: &Path,
    output_file_path: &Path,
    header_mapping: &HashMap<String, String>,
) {
    let input_reader =
        BufReader::new(File::open(&input_file_path).expect("Unable to open input CSV file."));
    let mut csv_reader = ReaderBuilder::new()
        .flexible(true)
        .has_headers(true)
        .from_reader(input_reader);

    let mut output_writer =
        BufWriter::new(File::create(&output_file_path).expect("Unable to create output CSV file."));
    let headers = csv_reader
        .headers()
        .expect("Unable to read CSV headers.")
        .clone();

    let mut new_headers: Vec<String> = headers
        .iter()
        .map(|header| header_mapping.get(header).unwrap().clone())
        .collect();

    writeln!(output_writer, "{}", new_headers.join(",")).expect("Unable to write headers.");

    for record in csv_reader.records() {
        let record = record.expect("Unable to read CSV record.");
        let new_record: Vec<String> = record.iter().map(|field| field.to_string()).collect();
        writeln!(output_writer, "{}", new_record.join(",")).expect("Unable to write record.");
    }
}
