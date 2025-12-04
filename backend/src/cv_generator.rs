use printpdf::*;
use std::fs::File;
use std::io::BufWriter;

use crate::models::*;

#[allow(dead_code)]
pub fn generate_cv_pdf(user: &User, education: &[Education], experience: &[Experience], skills: &[Skill]) -> Result<String, Box<dyn std::error::Error>> {
    let (doc, page1, layer1) = PdfDocument::new("CV", Mm(210.0), Mm(297.0), "Layer1");
    let current_layer = doc.get_page(page1).get_layer(layer1);

    // Add font (using built-in Courier as fallback since custom font not available)
    let font = doc.add_builtin_font(BuiltinFont::Courier).unwrap();

    // Add text

    current_layer.use_text(user.name.clone(), 24.0, Mm(10.0), Mm(280.0), &font);
    current_layer.use_text(format!("Email: {}, Phone: {}", user.email, user.phone), 14.0, Mm(10.0), Mm(270.0), &font);

    let mut y_pos = 250.0;
    for ed in education {
        let text = format!("{} - {}: {} ({})", ed.institution, ed.degree, ed.start_date.format("%Y-%m-%d"), ed.end_date.map_or("Present".to_string(), |d| d.format("%Y-%m-%d").to_string()));
        current_layer.use_text(text, 12.0, Mm(10.0), Mm(y_pos), &font);
        y_pos -= 10.0;
    }

    // Similarly for experience and skills

    y_pos -= 20.0;
    for exp in experience {
        let text = format!("{} at {}: {} ({}) - {}", exp.role, exp.company, exp.start_date.format("%Y-%m-%d"), exp.end_date.map_or("Present".to_string(), |d| d.format("%Y-%m-%d").to_string(),), exp.description.as_deref().unwrap_or(""));
        current_layer.use_text(text, 12.0, Mm(10.0), Mm(y_pos), &font);
        y_pos -= 10.0;
    }

    y_pos -= 20.0;

    for skill in skills {
        current_layer.use_text(skill.skill.clone(), 12.0, Mm(10.0), Mm(y_pos), &font);
        y_pos -= 10.0;
    }

    // Save PDF
    let file = File::create(format!("cv_{}.pdf", user.id))?;
    doc.save(&mut BufWriter::new(file))?;

    Ok(format!("cv_{}.pdf", user.id))
}
