"use client";

import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Divider,
  Stack,
  Box,
  InputBase,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default () => {
  const router = useRouter();

  const [nama, setNama] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const listRole = ["ADMIN", "CLIENT"];

  const createUsers = async () => {
    const payload = {
      nama,
      username: username.replace(/\s+/g, ""),
      password,
      role,
    };
    try {
      setIsLoading(true);
      const response = await axios.post("/api/user", payload);
      if (response) {
        setIsLoading(false);
        router.push("/master/users");
      }
    } catch (error) {
      setIsLoading(false);
      console.error({ error });
    }
  };

  return (
    <PageContainer title="Tambah User">
      <Card>
        <CardContent>
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography fontWeight={700}>Tambah Data</Typography>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              href="/master/users"
            >
              Kembali
            </Button>
          </Grid>
        </CardContent>

        <Divider />

        <CardContent>
          <Stack gap={2}>
            <Box display="flex" flexDirection="column">
              <Typography
                variant="subtitle1"
                component="label"
                htmlFor="alamat"
                mb="5px"
              >
                Username
              </Typography>
              <InputBase
                sx={{
                  border: "1px solid #648FFF",
                  borderRadius: "50px",
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

            <Box display="flex" flexDirection="column">
              <Typography
                variant="subtitle1"
                component="label"
                htmlFor="alamat"
                mb="5px"
              >
                Nama
              </Typography>
              <InputBase
                sx={{
                  border: "1px solid #648FFF",
                  borderRadius: "50px",
                  height: "38px",
                  padding: "0px 14px",
                }}
                placeholder="Nama"
                fullWidth
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                disabled={isLoading}
              ></InputBase>
            </Box>

            <Box display="flex" flexDirection="column">
              <Typography
                variant="subtitle1"
                component="label"
                htmlFor="alamat"
                mb="5px"
              >
                Password
              </Typography>
              <InputBase
                sx={{
                  border: "1px solid #648FFF",
                  borderRadius: "50px",
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

            <Box display="flex" flexDirection="column">
              <Typography
                variant="subtitle1"
                component="label"
                htmlFor="alamat"
                mb="5px"
              >
                Role
              </Typography>

              <select
                placeholder="Role"
                style={{
                  border: "1px solid #648FFF",
                  borderRadius: "50px",
                  height: "38px",
                  padding: "0px 14px",
                  MozAppearance: "none",
                  WebkitAppearance: "none",
                  appearance: "none",
                }}
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="">Pilih Role</option>
                {listRole.map((list: any) => {
                  return (
                    <option value={list} key={list}>
                      {list}
                    </option>
                  );
                })}
              </select>
            </Box>
          </Stack>
        </CardContent>

        <Divider />

        <CardContent>
          <Box display="flex" gap={2}>
            <Button
              variant="contained"
              color="primary"
              sx={{ height: "35px", width: "100px" }}
              disableElevation
              onClick={() => createUsers()}
              disabled={
                username == "" ||
                nama == "" ||
                password == "" ||
                role == "" ||
                isLoading
              }
            >
              Kirim
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{ height: "35px", width: "100px" }}
              disableElevation
              onClick={() => {
                setUsername("");
                setNama("");
                setPassword("");
              }}
            >
              Reset
            </Button>
          </Box>
        </CardContent>
      </Card>
    </PageContainer>
  );
};
