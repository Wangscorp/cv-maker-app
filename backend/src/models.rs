use serde::{Deserialize, Serialize};
use diesel::prelude::*;
use chrono::NaiveDate;

table! {
    users (id) {
        id -> Int4,
        name -> Varchar,
        email -> Varchar,
        phone -> Varchar,
        profile_image_url -> Nullable<Text>,
    }
}

table! {
    education (id) {
        id -> Int4,
        user_id -> Int4,
        institution -> Varchar,
        degree -> Varchar,
        start_date -> Date,
        end_date -> Nullable<Date>,
    }
}

table! {
    experience (id) {
        id -> Int4,
        user_id -> Int4,
        company -> Varchar,
        role -> Varchar,
        description -> Nullable<Text>,
        start_date -> Date,
        end_date -> Nullable<Date>,
    }
}

table! {
    skills (id) {
        id -> Int4,
        user_id -> Int4,
        skill -> Varchar,
    }
}

#[derive(Queryable, Identifiable, Serialize, Deserialize)]
#[diesel(table_name = users)]
pub struct User {
    pub id: i32,
    pub name: String,
    pub email: String,
    pub phone: String,
    pub profile_image_url: Option<String>,
}

#[derive(Insertable, Serialize, Deserialize)]
#[diesel(table_name = users)]
pub struct NewUser {
    pub name: String,
    pub email: String,
    pub phone: String,
    pub profile_image_url: Option<String>,
}

#[derive(Queryable, Identifiable, Associations, Serialize, Deserialize)]
#[diesel(belongs_to(User))]
#[diesel(table_name = education)]
pub struct Education {
    pub id: i32,
    pub user_id: i32,
    pub institution: String,
    pub degree: String,
    pub start_date: NaiveDate,
    pub end_date: Option<NaiveDate>,
}

#[derive(Clone, Insertable, Serialize, Deserialize)]
#[diesel(table_name = education)]
pub struct NewEducation {
    pub user_id: i32,
    pub institution: String,
    pub degree: String,
    pub start_date: NaiveDate,
    pub end_date: Option<NaiveDate>,
}

#[derive(Queryable, Identifiable, Associations, Serialize, Deserialize)]
#[diesel(belongs_to(User))]
#[diesel(table_name = experience)]
pub struct Experience {
    pub id: i32,
    pub user_id: i32,
    pub company: String,
    pub role: String,
    pub description: Option<String>,
    pub start_date: NaiveDate,
    pub end_date: Option<NaiveDate>,
}

#[derive(Clone, Insertable, Serialize, Deserialize)]
#[diesel(table_name = experience)]
pub struct NewExperience {
    pub user_id: i32,
    pub company: String,
    pub role: String,
    pub description: Option<String>,
    pub start_date: NaiveDate,
    pub end_date: Option<NaiveDate>,
}

#[derive(Queryable, Identifiable, Associations, Serialize, Deserialize)]
#[diesel(belongs_to(User))]
#[diesel(table_name = skills)]
pub struct Skill {
    pub id: i32,
    pub user_id: i32,
    pub skill: String,
}

#[derive(Clone, Insertable, Serialize, Deserialize)]
#[diesel(table_name = skills)]
pub struct NewSkill {
    pub user_id: i32,
    pub skill: String,
}
