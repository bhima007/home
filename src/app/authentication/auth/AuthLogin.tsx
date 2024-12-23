import React from "react";
import { Box, Typography, Button, Stack, InputBase } from "@mui/material";

import CustomTextField from "@/app/(DashboardLayout)/components/forms/theme-elements/CustomTextField";

interface loginType {
  title?: string;
  username?: string;
  setUsername?: any;
  password?: string;
  setPassword?: any;
  actionLogin?: any;
  isLoading?: boolean;
}

const AuthLogin = ({
  title,
  username,
  setUsername,
  password,
  setPassword,
  actionLogin,
  isLoading,
}: loginType) => {
  return (
    <>
      {title ? (
        <Typography fontWeight="700" variant="h2" mb={1}>
          {title}
        </Typography>
      ) : null}
      <form action={actionLogin}>
        <Stack gap={2}>
          <Box>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="username"
              mb="5px"
            >
              Username
            </Typography>
            <InputBase
              sx={{
                border: "1px solid #25BDB0",
                borderRadius: "6px",
                height: "38px",
                padding: "0px 14px",
              }}
              placeholder="Username"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isLoading}
            ></InputBase>
          </Box>
          <Box>
            <Typography
              variant="subtitle1"
              fontWeight={600}
              component="label"
              htmlFor="password"
              mb="5px"
            >
              Password
            </Typography>

            <InputBase
              sx={{
                border: "1px solid #25BDB0",
                borderRadius: "6px",
                height: "38px",
                padding: "0px 14px",
              }}
              placeholder="Password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            ></InputBase>
          </Box>
        </Stack>
        <Box my={2}>
          <Button
            color="secondary"
            variant="contained"
            size="large"
            fullWidth
            type="submit"
            disabled={isLoading}
          >
            <span style={{ color: "white" }}>LOGIN</span>
          </Button>
        </Box>
      </form>
    </>
  );
};

export default AuthLogin;
