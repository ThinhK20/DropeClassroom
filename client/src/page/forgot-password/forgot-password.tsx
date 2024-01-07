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
import { Alert } from "@mui/material";
import { validateEmail } from "../../libs/utils";
import { useSearchParams } from "react-router-dom";
import {
   renewPasswordApi,
   sendForgotPasswordEmailApi,
} from "../../apis/authApis";
import { AxiosError } from "axios";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function ForgotPassword() {
   const [errorMsg, setErrorMsg] = React.useState<string>("");
   const [successMsg, setSuccessMsg] = React.useState<string>("");
   const [searchParams] = useSearchParams();
   const [isShow, setIsShow] = React.useState<boolean>(true);
   const params = {
      token: searchParams.get("token"),
      id: searchParams.get("id"),
   };

   const handleSendEmailLink = async (
      event: React.FormEvent<HTMLFormElement>
   ) => {
      event.preventDefault();
      setErrorMsg("");
      const data = new FormData(event.currentTarget);

      const formData = {
         email: data.get("email") as string,
      };

      if (!validateEmail(formData.email)) {
         setErrorMsg(
            "Email invalid. Please submit correctly your email address."
         );
      } else {
         await sendForgotPasswordEmailApi(formData.email)
            .then((res) => {
               (event.target as HTMLFormElement).reset();
               setSuccessMsg(res.data);
               setIsShow(false);
            })
            .catch((ex: AxiosError) => {
               // eslint-disable-next-line @typescript-eslint/no-explicit-any
               setErrorMsg((ex.response?.data as any)?.message as string);
            });
      }
   };

   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setErrorMsg("");
      const data = new FormData(event.currentTarget);
      const formData = {
         password: data.get("password") as string,
         confirmPassword: data.get("confirm-password") as string,
      };
      if (formData.password !== formData.confirmPassword)
         setErrorMsg("Password and confirm password must be match.");
      else {
         await renewPasswordApi({
            password: formData.password,
            ...(params as any),
         })
            .then((res) => {
               (event.target as HTMLFormElement).reset();
               setSuccessMsg(res.data);
               setIsShow(false);
            })
            .catch((ex: AxiosError) => {
               // eslint-disable-next-line @typescript-eslint/no-explicit-any
               setErrorMsg((ex.response?.data as any)?.message as string);
            });
      }
   };

   const validateParams = () => {
      if (!params || !params.token || !params.id) return false;
      return true;
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
                  Forgot Password
               </Typography>
               {successMsg && <Alert severity="success">{successMsg}</Alert>}
               {errorMsg && <Alert severity="error">{errorMsg}</Alert>}

               {validateParams()
                  ? isShow && (
                       <Box component="form" onSubmit={handleSubmit}>
                          <TextField
                             margin="normal"
                             required
                             fullWidth
                             id="password"
                             label="New Password"
                             name="password"
                             type="password"
                             autoFocus
                          />
                          <TextField
                             margin="normal"
                             required
                             fullWidth
                             id="confirm-password"
                             label="Confirm New Password"
                             name="confirm-password"
                             type="password"
                          />

                          <Button
                             type="submit"
                             fullWidth
                             variant="contained"
                             sx={{ mt: 3, mb: 2 }}
                          >
                             Change Password
                          </Button>
                       </Box>
                    )
                  : isShow && (
                       <Box
                          component="form"
                          onSubmit={handleSendEmailLink}
                          sx={{ mt: 1 }}
                       >
                          <TextField
                             margin="normal"
                             required
                             fullWidth
                             id="email"
                             label="Email Address"
                             name="email"
                             type="email"
                             autoComplete="email"
                             autoFocus
                          />

                          <Button
                             type="submit"
                             fullWidth
                             variant="contained"
                             sx={{ mt: 3, mb: 2 }}
                          >
                             Send reset link
                          </Button>
                          <Grid container>
                             <Grid item xs>
                                <Link href="/signin" variant="body2">
                                   Back to Sign In
                                </Link>
                             </Grid>
                          </Grid>
                       </Box>
                    )}
            </Box>
         </Container>
      </ThemeProvider>
   );
}
