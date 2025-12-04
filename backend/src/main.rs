use actix_web::{web, App, HttpServer};
use actix_files as af;

mod models;
mod routes;
mod db;
mod cv_generator;

use routes::health;
use routes::create_cv;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv::dotenv().ok();

    println!("Starting CV Maker Backend on http://127.0.0.1:8080");

    HttpServer::new(|| {
        App::new()
            .route("/health", web::get().to(health))
            .route("/create-cv", web::post().to(create_cv))
            .service(af::Files::new("/cv", "./").show_files_listing())
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
