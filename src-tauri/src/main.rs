#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use serde::{Deserialize, Serialize};
use csv::Writer;

#[tauri::command]
fn calc_pix(width: i32, height: i32) -> i32 {
  width * height
}

#[tauri::command]
fn sample_method(path: String, datas: Vec<Data>)->Result<(), String>{
  // pathにdatasをcsvにして書き込む
  let mut wtr = Writer::from_path(path).unwrap();
  
  // dataを順に取り出して、メンバの1つ目と3つ目だけをcsvとして書き込む
  for data in datas {
    wtr.serialize((data.sample, data.sample3)).unwrap();
  }

  // 書き込み終了
  wtr.flush().unwrap();

  // エラーが起きなければ終了
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
    .invoke_handler(tauri::generate_handler![calc_pix, sample_method])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
