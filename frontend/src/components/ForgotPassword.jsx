import React, { useState } from "react";
import axios from "axios";
import {
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Link,
  InputAdornment,
} from "@mui/material";
import {
  Email as EmailIcon,
  ArrowBack as ArrowBackIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/auth/forgot-password", { email });
      setMessage(
        "Password reset link sent to your email! Please check your inbox."
      );
      setSent(true);
    } catch (error) {
      setMessage("Failed to send reset link. Please try again.");
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
            Reset Password
          </Typography>
          <Typography variant="body1" sx={{ color: "#6b7280" }}>
            Enter your email and we'll send you a reset link
          </Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Email Address"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin="normal"
            required
            variant="outlined"
            disabled={sent}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon sx={{ color: "#6b7280" }} />
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={sent}
            startIcon={<SendIcon />}
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
            Send Reset Link
          </Button>

          {message && (
            <Alert
              severity={sent ? "success" : "error"}
              sx={{ mt: 2, borderRadius: 2 }}
            >
              {message}
            </Alert>
          )}

          <Box sx={{ mt: 3, textAlign: "center" }}>
            <Link
              component={RouterLink}
              to="/login"
              sx={{
                color: "#6366f1",
                fontWeight: 600,
                display: "inline-flex",
                alignItems: "center",
                gap: 0.5,
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              <ArrowBackIcon sx={{ fontSize: 18 }} />
              Back to Login
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default ForgotPassword;
