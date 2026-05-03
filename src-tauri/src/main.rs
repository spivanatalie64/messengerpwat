#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::{WebviewUrl, WebviewWindowBuilder};

static CHROME_UA: &str = "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36";

static ANTI_DETECT_JS: &str = include_str!("../../frontend/anti-detect.js");

fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_shell::init())
        .setup(|app| {
            let win = WebviewWindowBuilder::new(
                app,
                "main",
                WebviewUrl::External("https://www.messenger.com/".parse().unwrap()),
            )
            .title("Messenger")
            .inner_size(1200.0, 800.0)
            .center()
            .user_agent(CHROME_UA)
            .initialization_script(ANTI_DETECT_JS)
            .initialization_script_for_all_frames(ANTI_DETECT_JS)
            .devtools(true)
            .build()?;

            #[cfg(target_os = "linux")]
            {
                use webkit2gtk::{PermissionRequestExt, WebViewExt};
                let _ = win.with_webview(|webview| {
                    let w = webview.inner();
                    w.connect_permission_request(|_webview, request| {
                        request.allow();
                        true
                    });
                });
            }

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}