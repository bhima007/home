"use client";
import {
  Grid,
  Box,
  Card,
  Stack,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import AuthLogin from "../auth/AuthLogin";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState("");

  const actionLogin = async () => {
    const payload = {
      username,
      password,
    };

    try {
      const response = await axios.post(`/api/auth`, payload);
      const data = response.data;
      if (data.length > 0) {
        localStorage.setItem("userData", JSON.stringify(data[0]));
        router.push("/");
      } else {
        setIsError(true);
        setMessage("Username atau Password Salah");
      }
    } catch (err) {
      setIsError(true);
      setMessage(err.response.statusText);
    }
  };
  return (
    <PageContainer title="Login" description="this is Login page">
      <Snackbar
        open={isError}
        autoHideDuration={2000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        onClose={() => {
          setIsError(false);
          setMessage("");
        }}
      >
        <Alert
          severity="error"
          variant="filled"
          onClose={() => {
            setIsError(false);
            setMessage("");
          }}
        >
          {message}
        </Alert>
      </Snackbar>
      <Box
        sx={{
          position: "relative",
          "&:before": {
            content: '""',
            background: "radial-gradient(#d2f1df, #d3d7fa, #bad8f4)",
            backgroundSize: "400% 400%",
            animation: "gradient 15s ease infinite",
            position: "absolute",
            height: "100%",
            width: "100%",
            opacity: "0.3",
          },
        }}
      >
        <Grid
          container
          spacing={0}
          justifyContent="center"
          sx={{ height: "100vh" }}
        >
          <Grid
            item
            xs={12}
            sm={12}
            lg={4}
            xl={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card
              elevation={9}
              sx={{ p: 4, zIndex: 1, width: "100%", maxWidth: "500px" }}
            >
              <AuthLogin
                title="Login to Account"
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                actionLogin={actionLogin}
              />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};
export default Login;
