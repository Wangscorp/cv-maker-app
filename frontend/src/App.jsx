import React, { useState, useEffect } from "react";
import axios from "axios";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  AppBar,
  Toolbar,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Grid,
  Paper,
} from "@mui/material";
import {
  Person as PersonIcon,
  Work as WorkIcon,
  School as SchoolIcon,
  Star as StarIcon,
  Description as DescriptionIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import "./App.css";

function NavBar({ user, onLogout }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    onLogout();
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{ bgcolor: "white", borderBottom: "1px solid #e5e7eb" }}
    >
      <Toolbar>
        <Box className="navbar-logo">CV</Box>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, ml: 2, color: "#6366f1", fontWeight: 700 }}
        >
          CV Maker
        </Typography>
        {user && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              sx={{ display: { xs: "none", sm: "block" }, color: "#6b7280" }}
            >
              {user.email}
            </Box>
            <IconButton size="large" onClick={handleMenu} color="inherit">
              <Avatar sx={{ width: 36, height: 36, bgcolor: "#6366f1" }}>
                {user.name?.charAt(0).toUpperCase() ||
                  user.email?.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem disabled>
                <Typography variant="body2" color="text.secondary">
                  {user.email}
                </Typography>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleLogout}>
                <LogoutIcon sx={{ mr: 1, fontSize: 20 }} />
                Logout
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

function CVMaker({ user, onLogout }) {
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    education: "",
    experience: "",
    skills: "",
  });

  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState("info");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const data = {
        personal: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          profile_image_url: null,
        },
        education: [],
        experience: [],
        skills: [],
      };

      const response = await axios.post(
        "http://localhost:8080/create-cv",
        data,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage("CV created successfully! Opening in new tab...");
      setSeverity("success");

      setTimeout(() => {
        window.open(`http://localhost:8080${response.data.pdf_url}`);
      }, 500);
    } catch (error) {
      setMessage("Error creating CV. Please try again.");
      setSeverity("error");
      console.error(error);
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f9fafb" }}>
      <NavBar user={user} onLogout={onLogout} />
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box className="page-header">
          <Typography className="page-title">
            Create Your Professional CV
          </Typography>
          <Typography className="page-subtitle">
            Fill in your details below to generate a beautiful, professional CV
            in seconds
          </Typography>
        </Box>

        <Paper elevation={3} sx={{ borderRadius: 4, overflow: "hidden" }}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            className="cv-form-card"
          >
            <Box className="form-section">
              <Typography className="section-title">
                <PersonIcon className="section-icon" />
                Personal Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    placeholder="+1 (555) 123-4567"
                  />
                </Grid>
              </Grid>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box className="form-section">
              <Typography className="section-title">
                <SchoolIcon className="section-icon" />
                Education
              </Typography>
              <TextField
                fullWidth
                label="Education Details"
                name="education"
                value={formData.education}
                onChange={handleChange}
                multiline
                rows={3}
                variant="outlined"
                placeholder="e.g. Bachelor of Science in Computer Science, MIT, 2018-2022"
              />
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box className="form-section">
              <Typography className="section-title">
                <WorkIcon className="section-icon" />
                Work Experience
              </Typography>
              <TextField
                fullWidth
                label="Work Experience"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                multiline
                rows={4}
                variant="outlined"
                placeholder="e.g. Software Engineer at Google, 2022-Present&#10;- Developed scalable web applications&#10;- Led a team of 5 developers"
              />
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box className="form-section">
              <Typography className="section-title">
                <StarIcon className="section-icon" />
                Skills
              </Typography>
              <TextField
                fullWidth
                label="Skills"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                multiline
                rows={2}
                variant="outlined"
                placeholder="e.g. JavaScript, React, Node.js, Python, SQL, Git"
              />
            </Box>

            <Box className="form-actions">
              <Button
                type="submit"
                variant="contained"
                size="large"
                className="btn-gradient"
                startIcon={<DescriptionIcon />}
                sx={{
                  px: 4,
                  py: 1.5,
                  fontSize: "1rem",
                  fontWeight: 600,
                  textTransform: "none",
                  borderRadius: 2,
                }}
              >
                Generate CV
              </Button>
            </Box>
          </Box>
        </Paper>

        {message && (
          <Alert
            severity={severity}
            sx={{ mt: 3, borderRadius: 2 }}
            onClose={() => setMessage("")}
          >
            {message}
          </Alert>
        )}
      </Container>
    </Box>
  );
}

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  const handleLogin = (userData) => {
    setToken(localStorage.getItem("token"));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={handleLogin} />} />
      <Route path="/signup" element={<Signup onLogin={handleLogin} />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route
        path="/"
        element={
          token ? (
            <CVMaker user={user} onLogout={handleLogout} />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
}

export default App;
