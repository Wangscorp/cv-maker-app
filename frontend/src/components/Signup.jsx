import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Link,
  InputAdornment,
  IconButton,
  Divider,
} from "@mui/material";
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Visibility,
  VisibilityOff,
  PersonAdd as PersonAddIcon,
} from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";

function Signup({ onLogin }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    try {
      const { confirmPassword, ...dataToSend } = formData;
      const response = await axios.post(
        "http://localhost:8080/auth/signup",
        dataToSend
      );
      localStorage.setItem("token", response.data.token);
      onLogin(response.data.user);
      setMessage("Signed up successfully!");
      setTimeout(() => navigate("/"), 500);
    } catch (error) {
      setMessage("Signup failed. Please try again.");
      console.error(error);
    }
  };

  return (
    <Box className="auth-page">
      <Box className="auth-container">
        <Box sx={{ textAlign: "center", mb: 4 }}>
          <Box
            className="navbar-logo"
            sx={{
              width: 64,
              height: 64,
              fontSize: "2rem",
              margin: "0 auto 1rem",
            }}
          >
            CV
          </Box>
          <Typography
            variant="h4"
            component="h1"
            sx={{
              fontWeight: 700,
              color: "#1f2937",
              mb: 1,
            }}
          >
            Create Account
          </Typography>
          <Typography variant="body1" sx={{ color: "#6b7280" }}>
            Start building your professional CV today
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            margin="normal"
            required
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon sx={{ color: "#6b7280" }} />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            margin="normal"
            required
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon sx={{ color: "#6b7280" }} />
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            margin="normal"
            required
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ color: "#6b7280" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            fullWidth
            label="Confirm Password"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={handleChange}
            margin="normal"
            required
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon sx={{ color: "#6b7280" }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            startIcon={<PersonAddIcon />}
            sx={{
              mt: 3,
              py: 1.5,
              background: "linear-gradient(135deg, #6366f1, #4f46e5)",
              boxShadow: "0 4px 6px -1px rgba(99, 102, 241, 0.3)",
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: 600,
              borderRadius: 2,
              "&:hover": {
                boxShadow: "0 10px 15px -3px rgba(99, 102, 241, 0.4)",
                transform: "translateY(-2px)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Create Account
          </Button>

          {message && (
            <Alert
              severity={message.includes("successfully") ? "success" : "error"}
              sx={{ mt: 2, borderRadius: 2 }}
            >
              {message}
            </Alert>
          )}

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: "#6b7280" }}>
              OR
            </Typography>
          </Divider>

          <Box sx={{ textAlign: "center" }}>
            <Typography variant="body2" sx={{ color: "#6b7280" }}>
              Already have an account?{" "}
              <Link
                component={RouterLink}
                to="/login"
                sx={{
                  color: "#6366f1",
                  fontWeight: 600,
                  textDecoration: "none",
                  "&:hover": { textDecoration: "underline" },
                }}
              >
                Sign in
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Signup;
