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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default () => {
  const router = useRouter();
  const { id } = useParams();

  const [nama, setNama] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const [dialog, setDialog] = useState(false);

  const handleOpenDialog = () => {
    setDialog(true);
  };
  const handleCloseDialog = () => {
    setDialog(false);
  };

  useEffect(() => {
    const fetchUserById = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/api/user/${id}`);
        const data = response.data;
        if (data) {
          setIsLoading(false);
        }
        setUsername(data.username);
        setNama(data.nama);
        setPassword(data.password);
      } catch (err) {
        console.log({ err });
        setIsLoading(false);
      }
    };

    fetchUserById();
  }, [id]);

  const actionEdit = async () => {
    const payload = {
      nama,
      username: username.replace(/\s+/g, ""),
      password,
    };
    try {
      setIsLoading(true);
      const response = await axios.put(`/api/user/${id}`, payload);
      if (response) {
        setIsLoading(false);
        router.push("/master/users");
      }
    } catch (error) {
      setIsLoading(false);
      console.error({ error });
    }
  };

  const actionDelete = async () => {
    setIsLoading(true);
    

    try {
      const response = await axios.delete(`/api/user/${id}`);
      setIsLoading(false);
      router.push("/master/users");
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <PageContainer title="Edit User">
      <Card>
        <CardContent>
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography fontWeight={700}>Edit Data</Typography>
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
              onClick={() => actionEdit()}
              disabled={
                username == "" || nama == "" || password == "" || isLoading
              }
            >
              Kirim
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{ height: "35px", width: "100px" }}
              disableElevation
              onClick={handleOpenDialog}
            >
              Hapus
            </Button>
          </Box>
        </CardContent>
      </Card>
      <Dialog open={dialog} maxWidth="xs" fullWidth>
        <DialogTitle>Apakah anda yakin ingin menghapus?</DialogTitle>

        <DialogContent>
          Data yang sudah dihapus akan hilang secara permanen dan tidak bisa
          dikembalikan.
        </DialogContent>

        <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
          <Button sx={{ width: "120px" }} onClick={handleCloseDialog}>
            Batal
          </Button>
          <Button
            variant="outlined"
            color="error"
            sx={{ width: "120px" }}
            onClick={actionDelete}
          >
            Ya
          </Button>
        </DialogActions>
      </Dialog>
    </PageContainer>
  );
};
