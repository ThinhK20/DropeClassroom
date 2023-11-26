/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Alert, MenuItem, Select } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { signupApi } from "../../apis/authApis";
import { SignUpUser } from "../../models/User";
import { AxiosError } from "axios";
import { validateEmail } from "../../libs/utils";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignUp() {
   const [dateOfBirth, setDateOfBirth] = React.useState<Date | null>(
      new Date()
   );
   const [errorMsg, setErrorMsg] = React.useState<string>("");
   const [successMsg, setSuccessMsg] = React.useState<string>("");

   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setSuccessMsg("");
      setErrorMsg("");

      const data = new FormData(event.currentTarget);

      let isValid = true;

      if (data.get("password") !== data.get("confirm-password")) {
         setErrorMsg(
            (oldMsg) =>
               oldMsg + "Your password and confirm password must match.\n"
         );
         isValid = false;
      }

      if (!validateEmail(data.get("email") as string)) {
         setErrorMsg(
            (oldMsg) =>
               oldMsg +
               "Email invalid. Please fill correctly your email address.\n"
         );
         isValid = false;
      }

      if (!isValid) return;
      else setErrorMsg("");

      const formData = {
         email: data.get("email"),
         password: data.get("password"),
         username: data.get("username"),
         gender: data.get("gender"),
         dateOfBirth,
         role: "user",
      } as SignUpUser;

      signupApi(formData)
         .then((res) => {
            (event.target as HTMLFormElement).reset();
            setSuccessMsg(res.data);
         })
         .catch((ex: AxiosError) => {
            setErrorMsg((ex.response?.data as any)?.message as string);
         });
   };

   return (
      <ThemeProvider theme={defaultTheme}>
         <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
               sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
               }}
            >
               <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
               </Avatar>
               <Typography component="h1" variant="h5">
                  Sign up
               </Typography>
               {successMsg && <Alert severity="success">{successMsg}</Alert>}
               {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
               <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                     <Grid item xs={12}>
                        <TextField
                           autoComplete="given-name"
                           name="username"
                           required
                           fullWidth
                           id="username"
                           label="Username"
                           autoFocus
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <TextField
                           required
                           fullWidth
                           id="email"
                           label="Email Address"
                           name="email"
                           type="email"
                           autoComplete="email"
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <TextField
                           required
                           fullWidth
                           name="password"
                           label="Password"
                           type="password"
                           id="password"
                           autoComplete="new-password"
                        />
                     </Grid>
                     <Grid item xs={12}>
                        <TextField
                           required
                           fullWidth
                           name="confirm-password"
                           label="Confirm Password"
                           type="password"
                           id="confirm-password"
                           autoComplete="confirm-password"
                        />
                     </Grid>
                     <Grid item xs={12} md={6}>
                        <Select
                           labelId="gender-select-label"
                           id="gender-label"
                           placeholder="Gender"
                           fullWidth
                           value="m"
                           name="gender"
                           label="Gender"
                        >
                           <MenuItem value={"m"}>Male</MenuItem>
                           <MenuItem value={"f"}>Female</MenuItem>
                        </Select>
                     </Grid>
                     <Grid item xs={12} md={6}>
                        <DatePicker
                           label="Date of birth"
                           format={"DD/MM/YYYY"}
                           onChange={(date: any) => {
                              let d: Date | string = new Date(date);
                              d = `${d.getDate()}-${d.getMonth()}-${d.getFullYear()}`;
                              setDateOfBirth(new Date(d));
                           }}
                           slotProps={{
                              textField: {
                                 helperText: "DD/MM/YYYY",
                              },
                           }}
                        />
                     </Grid>
                  </Grid>
                  <Button
                     type="submit"
                     fullWidth
                     variant="contained"
                     sx={{ mt: 3, mb: 2 }}
                  >
                     Sign Up
                  </Button>
                  <Grid container justifyContent="center">
                     <Grid item>
                        <Link href="/signin" variant="body2">
                           Already have an account? Sign in
                        </Link>
                     </Grid>
                  </Grid>
               </Box>
            </Box>
         </Container>
      </ThemeProvider>
   );
}
