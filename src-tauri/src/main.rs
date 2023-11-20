#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

#[tauri::command]
fn calc_pix(width: i32, height: i32) -> i32 {
  width * height
}

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![calc_pix])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
