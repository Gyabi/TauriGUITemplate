#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

mod brent;

use serde::{Deserialize, Serialize};
use csv::Writer;
use brent::brent_sample;


#[tauri::command]
fn brent_root() {
  println!("push!");
  brent_sample();
}

#[tauri::command]
fn calc_pix(width: i32, height: i32) -> i32 {
  width * height
}

#[tauri::command]
fn sample_method(path: String, datas: Vec<Data>) -> Result<(), String> {
  let mut wtr = match Writer::from_path(path) {
    Ok(writer) => writer,
    Err(e) => return Err(format!("Failed to create writer: {}", e)),
  };

  for data in datas {
    if let Err(e) = wtr.serialize((data.sample, data.sample3)) {
      return Err(format!("Failed to serialize data: {}", e));
    }
  }

  if let Err(e) = wtr.flush() {
    return Err(format!("Failed to flush writer: {}", e));
  }

  Ok(())
}

#[derive(Serialize, Deserialize)]
struct Data {
  sample: String,
  sample2: String,
  sample3: String,
}

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![brent_root, calc_pix, sample_method])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
