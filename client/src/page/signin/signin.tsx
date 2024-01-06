/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Alert } from "@mui/material";
import { validateEmail } from "../../libs/utils";
import { loginApi, loginByGoogleApi, signupApi } from "../../apis/authApis";
import { AxiosError } from "axios";
import { useAppDispatch } from "../../hooks/hooks";
import { setLogin } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignIn() {
   const [errorMsg, setErrorMsg] = React.useState<string>("");

   const navigate = useNavigate();

   const dispatch = useAppDispatch();

   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);

      const formData = {
         email: data.get("email") as string,
         password: data.get("password") as string,
      };

      if (!validateEmail(formData.email)) {
         setErrorMsg(
            "Email invalid. Please submit correctly your email address."
         );
      } else setErrorMsg("");

      loginApi(formData)
         .then(async (res) => {
            dispatch(setLogin(res.data));
            navigate("/h");
         })
         .catch((ex: AxiosError) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            setErrorMsg((ex.response?.data as any)?.message as string);
         });
   };

   const handleLoginByGoogle = () => {
      window.location.href = loginByGoogleApi();
   };

   React.useEffect(() => {
      const urlParams = new URLSearchParams(window.location.search) as any;
      if (urlParams.has("authResult")) {
         if (urlParams.has("authResult")) {
            let authResult = JSON.parse(
               decodeURIComponent(urlParams.get("authResult"))
            );
            authResult = { ...authResult, isActive: true };

            const guidPassword = "c44b00de-1de2-4974-8f3f-0494dec482d7";

            loginApi({
               email: authResult.email,
               password: guidPassword,
            })
               .then((res) => {
                  dispatch(setLogin(res.data));
                  navigate("/h");
               })
               .catch(() => {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  signupApi({
                     email: authResult.email,
                     password: guidPassword,
                     username: authResult.firstName + " " + authResult.lastName,
                  })
                     .then(() => {
                        loginApi({
                           email: authResult.email,
                           password: guidPassword,
                        })
                           .then((res) => {
                              dispatch(setLogin(res.data));
                              navigate("/h");
                           })
                           .catch((ex: AxiosError) => {
                              toast.error(ex.response?.data as string);
                           });
                     })
                     .catch((ex: AxiosError) => {
                        toast.error(ex.response?.data as string);
                     });
               });

            // dispatch(setLogin(authResult));
            // navigate("/");
         }
      }
   }, []);

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
                  Sign in
               </Typography>
               <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                  {errorMsg && <Alert severity="error">{errorMsg}</Alert>}
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
                  <TextField
                     margin="normal"
                     required
                     fullWidth
                     name="password"
                     label="Password"
                     type="password"
                     id="password"
                     autoComplete="current-password"
                  />
                  <FormControlLabel
                     control={<Checkbox value="remember" color="primary" />}
                     label="Remember me"
                  />
                  <Button
                     type="submit"
                     fullWidth
                     variant="contained"
                     sx={{ mt: 3, mb: 2 }}
                  >
                     Sign In
                  </Button>
                  <Typography component="h2" className="text-center text-sm">
                     or
                  </Typography>
                  <Button
                     type="button"
                     fullWidth
                     variant="contained"
                     color="inherit"
                     className="bg-white"
                     sx={{ mb: 2 }}
                     onClick={handleLoginByGoogle}
                  >
                     <img
                        className="w-6 h-6 mr-2"
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        loading="lazy"
                        alt="google logo"
                     />
                     <span>Login with Google</span>
                  </Button>
                  <Grid container>
                     <Grid item xs>
                        <Link href="/forgot-password" variant="body2">
                           Forgot password?
                        </Link>
                     </Grid>
                     <Grid item>
                        <Link href="/signup" variant="body2">
                           {"Don't have an account? Sign Up"}
                        </Link>
                     </Grid>
                  </Grid>
               </Box>
            </Box>
         </Container>
      </ThemeProvider>
   );
}
