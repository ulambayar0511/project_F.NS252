import React, { FormEvent } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Head from "next/head";
import axios from "axios";
import swal from "sweetalert";
import ParticleBackground from "../../components/Particle-background";
import { useRouter } from "next/router";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00a087",
    },
    secondary: {
      main: "#0097cc",
    },
    background: {
      default: "#212121",
      paper: "#3c3c3c",
    },
    text: {
      primary: "#f9f9f9",
    },
    warning: {
      main: "#f44336",
    },
    info: {
      main: "#002270",
    },
    success: {
      main: "#00cb7d",
    },
  },
});

export default function App() {
  const router = useRouter();

  const onLogin = async (email: string, password: string) => {
    return await axios.post(
      "https://l01zlfesba.execute-api.us-east-1.amazonaws.com/login",
      JSON.stringify({
        email: email,
        password: password,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const data = new FormData(event.currentTarget);
    console.log(event.currentTarget["email"].value);
    console.log(event.currentTarget["password"].value);
    try {
      const response = await onLogin(
        event.currentTarget["email"].value,
        event.currentTarget["password"].value
      );
      if ("data" in response) {
        swal("Success", "success", {
          buttons: false,
          timer: 2000,
        }).then((value: any) => {
          localStorage.setItem("data", response["data"]);
          router.push("/login");
        });
      } else {
        swal("Failed", "error");
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (!err?.response) {
          console.log("No Server Response!");
        } else if (err.response?.status === 400) {
          console.log(err.response?.data);
        } else if (err.response?.status === 401) {
          console.log(err.response?.data);
        } else {
          console.log(err.response?.data);
        }
      }
    }
  };

  return (
    <>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <ParticleBackground />
      </div>

      <div id="login" style={{ paddingTop: 60, display: "block" }}>
        <ThemeProvider theme={theme}>
          <Container
            maxWidth="xs"
            sx={{
              display: "block",
              paddingTop: 1,
              paddingBottom: 5,
              alignItems: "center",
              bgcolor: "#3c3c3c",
              background: `rgba(60, 60, 60, 1)`,
              borderRadius: "10px",
              opacity: "initial",
            }}
          >
            <CssBaseline />
            <Box
              sx={{
                marginTop: 5,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3,
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  color="primary"
                  variant="outlined"
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  color="primary"
                  variant="outlined"
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
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2" underline="none">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid
                    item
                    sx={{
                      fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                      fontWeight: 400,
                      fontSize: "0.875rem",
                      lineHeight: 1.43,
                      letterSpacing: "0.01071em",
                      textDecoration: "none",
                    }}
                  >
                    {"Don't have an account?"}
                    <Link href="/signup" variant="body2" underline="none">
                      {" Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </ThemeProvider>
      </div>
    </>
  );
}
