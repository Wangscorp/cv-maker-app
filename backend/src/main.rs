use actix_web::{web, App, HttpServer};
use actix_files as af;
use actix_cors::Cors;

mod models;
mod routes;
mod db;
mod cv_generator;

use routes::{health, create_cv, login, signup, forgot_password};

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv::dotenv().ok();

    println!("Starting CV Maker Backend on http://127.0.0.1:8080");

    HttpServer::new(|| {
        let cors = Cors::default()
            .allowed_origin("http://localhost:5173")
            .allowed_origin("http://localhost:5174")
            .allowed_origin("http://localhost:5175")
            .allowed_methods(vec!["GET", "POST", "PUT", "DELETE"])
            .allowed_headers(vec![
                actix_web::http::header::AUTHORIZATION,
                actix_web::http::header::ACCEPT,
                actix_web::http::header::CONTENT_TYPE,
            ])
            .max_age(3600);

        App::new()
            .wrap(cors)
            .route("/health", web::get().to(health))
            .route("/create-cv", web::post().to(create_cv))
            .route("/auth/login", web::post().to(login))
            .route("/auth/signup", web::post().to(signup))
            .route("/auth/forgot-password", web::post().to(forgot_password))
            .service(af::Files::new("/cv", "./").show_files_listing())
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
