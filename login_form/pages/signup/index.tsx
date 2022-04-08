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
import Head from "next/head";
import { useRouter } from "next/router";
import axios from "axios";
import swal from "sweetalert";
import ParticleBackground from "../../components/Particle-background";

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

const SignUp = () => {
  const router = useRouter();

  const onLogin = async (email: string, password: string) => {
    return await axios.post(
      "https://l01zlfesba.execute-api.us-east-1.amazonaws.com/users",
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    console.log({
      username: data.get("username"),
      email: data.get("email"),
      password: data.get("password"),
    });
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
          router.push("/");
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
        <title>Register</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id="particle-background">
        <ParticleBackground />
      </div>
      <div id="login" style={{ paddingTop: 60 }}>
        <ThemeProvider theme={theme}>
          <Container
            component="main"
            maxWidth="xs"
            sx={{
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
                Sign up
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      autoComplete="user-name"
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
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Sign Up
                </Button>
                <Grid container justifyContent="flex-end">
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
                    {"Already have an account?"}
                    <Link href="/login" variant="body2" underline="none">
                      {" Sign in"}
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
};

export default SignUp;
