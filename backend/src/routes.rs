use actix_web::{web, HttpResponse, Error};
use serde::{Deserialize, Serialize};
use crate::models::*;
use crate::db::establish_connection;
use diesel::prelude::*;

#[derive(Deserialize, Serialize)]
pub struct CreateCVRequest {
    pub personal: NewUser,
    pub education: Vec<NewEducation>,
    pub experience: Vec<NewExperience>,
    pub skills: Vec<NewSkill>,
}

#[derive(Serialize)]
pub struct CVResponse {
    pub user_id: i32,
    pub pdf_url: String,
}

// Handler for creating a CV
pub async fn create_cv(cv_data: web::Json<CreateCVRequest>) -> Result<HttpResponse, Error> {
    let conn = &mut establish_connection();

    // Insert user
    let new_user = diesel::insert_into(users::table)
        .values(&cv_data.personal)
        .get_result::<User>(conn)
        .expect("Error saving new user");

    // Insert education
    for ed in &cv_data.education {
        let mut new_ed = ed.clone();
        new_ed.user_id = new_user.id;
        diesel::insert_into(education::table)
            .values(new_ed)
            .execute(conn)
            .expect("Error saving education");
    }

    // Insert experience
    for exp in &cv_data.experience {
        let mut new_exp = exp.clone();
        new_exp.user_id = new_user.id;
        diesel::insert_into(experience::table)
            .values(new_exp)
            .execute(conn)
            .expect("Error saving experience");
    }

    // Insert skills
    for sk in &cv_data.skills {
        let mut new_sk = sk.clone();
        new_sk.user_id = new_user.id;
        diesel::insert_into(skills::table)
            .values(new_sk)
            .execute(conn)
            .expect("Error saving skill");
    }

    // TODO: Generate PDF and get URL
    let pdf_url = format!("/cv/{}.pdf", new_user.id);

    let response = CVResponse {
        user_id: new_user.id,
        pdf_url,
    };

    Ok(HttpResponse::Ok().json(response))
}

// Health check
pub async fn health() -> Result<HttpResponse, Error> {
    Ok(HttpResponse::Ok().json("OK"))
}

// Authentication structures
#[derive(Deserialize)]
pub struct LoginRequest {
    pub email: String,
    pub password: String,
}

#[derive(Deserialize)]
pub struct SignupRequest {
    pub name: String,
    pub email: String,
    pub password: String,
}

#[derive(Deserialize)]
pub struct ForgotPasswordRequest {
    pub email: String,
}

#[derive(Serialize)]
pub struct AuthResponse {
    pub token: String,
    pub user: UserInfo,
}

#[derive(Serialize)]
pub struct UserInfo {
    pub id: i32,
    pub name: String,
    pub email: String,
}

// Placeholder authentication handlers (TODO: Implement proper auth)
pub async fn login(login_data: web::Json<LoginRequest>) -> Result<HttpResponse, Error> {
    // TODO: Implement actual authentication logic
    // For now, return a mock response
    let response = AuthResponse {
        token: format!("mock_token_{}", login_data.email),
        user: UserInfo {
            id: 1,
            name: "Mock User".to_string(),
            email: login_data.email.clone(),
        },
    };
    Ok(HttpResponse::Ok().json(response))
}

pub async fn signup(signup_data: web::Json<SignupRequest>) -> Result<HttpResponse, Error> {
    // TODO: Implement actual user registration
    // For now, return a mock response
    let response = AuthResponse {
        token: format!("mock_token_{}", signup_data.email),
        user: UserInfo {
            id: 1,
            name: signup_data.name.clone(),
            email: signup_data.email.clone(),
        },
    };
    Ok(HttpResponse::Ok().json(response))
}

pub async fn forgot_password(forgot_data: web::Json<ForgotPasswordRequest>) -> Result<HttpResponse, Error> {
    // TODO: Implement password reset logic
    Ok(HttpResponse::Ok().json(format!("Password reset link sent to {}", forgot_data.email)))
}
