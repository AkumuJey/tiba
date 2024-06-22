"use client";
import { useAuth } from "@/utils/AuthContextProvider";
import {
  LockOutlined as LockOutlinedIcon,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Box,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { ChangeEvent, FormEvent, useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { z } from "zod";

const signupDataSchema = z.object({
  title: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  dateOfBirth: z.string(), // Date of Birth
  phoneNo: z.string(),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  confirmPassword: z.string(),
});

const passwordRequirements = [
  {
    label: "At least 6 characters long",
    test: (pw: string) => pw.length >= 6,
  },
  {
    label: "Contains a non-alphabet character",
    test: (pw: string) => /\W/.test(pw),
  },
  { label: "Contains a letter", test: (pw: string) => /[a-zA-Z]/.test(pw) },
  {
    label: "Passwords match",
    test: (pw: string, confirmPw: string) =>
      pw === confirmPw && (pw.length > 0 || confirmPw.length > 0),
  },
];

const checkPasswordStrength = (password: string, confirmPassword: string) => {
  return passwordRequirements.map((req, index) => (
    <li
      key={index}
      style={{
        color: req.test(password, confirmPassword) ? "green" : "red",
      }}
      className={`text-[10px] ${
        req.test(password, confirmPassword) ? "text-green-700" : "text-red-600"
      }`}
    >
      {req.label}
    </li>
  ));
};

const SignupPage = () => {
  const [formData, setFormData] = useState({
    title: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    phoneNo: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const [phoneNo, setPhoneNo] = useState<string>("");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const { handleSignup } = useAuth();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setLoading(true);
      setErr(false);
      const newData = { ...formData, phoneNo };
      const validatedData = signupDataSchema.parse(newData);
      if (validatedData.password !== validatedData.confirmPassword) {
        alert("Passwords do not match");
        setLoading(false);
        return;
      }

      await handleSignup(validatedData);
    } catch (error) {
      setErr(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Paper elevation={1} sx={{ p: 4, mt: 8 }} className="bg-transparent">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  autoComplete="given-name"
                  name="title"
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  value={formData.title}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  autoComplete="family-name"
                  name="lastName"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="dateOfBirth"
                  label="Date of Birth"
                  type="date"
                  name="dateOfBirth"
                  InputLabelProps={{ shrink: true }}
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <PhoneInput
                  international
                  defaultCountry="KE"
                  value={phoneNo}
                  onChange={(value) => setPhoneNo(value || "")}
                  placeholder="Enter phone number"
                  className="phone-input outline-none py-[2] px-[2] focus:outline-none bg-transparent"
                  style={{ width: "100%" }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  autoComplete="new-password"
                  value={formData.password}
                  onChange={handleInputChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleTogglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  autoComplete="new-password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle confirm password visibility"
                          onClick={handleToggleConfirmPasswordVisibility}
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>
            <Grid className="text-center py-1">
              {err && (
                <span className="text-red-400">Error creating account</span>
              )}
            </Grid>
            <Box mt={2}>
              <Typography variant="body2" color="textSecondary">
                Password requirements:
              </Typography>
              <ul>
                {checkPasswordStrength(
                  formData.password,
                  formData.confirmPassword
                )}
              </ul>
            </Box>
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              loading={loading}
            >
              Sign Up
            </LoadingButton>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignupPage;
