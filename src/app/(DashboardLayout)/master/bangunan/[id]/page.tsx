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
  const [lokasi, setLokasi] = useState("");
  const [bangunan, setBangunan] = useState("");
  const [alamat, setAlamat] = useState("");
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
        const response = await axios.get(`/api/bangunan/${id}`);
        const data = response.data;
        if (data) {
          setIsLoading(false);
        }
        setLokasi(data.lokasi);
        setBangunan(data.bangunan);
        setAlamat(data.alamat);
      } catch (err) {
        console.log({ err });
        setIsLoading(false);
      }
    };

    fetchUserById();
  }, [id]);

  const actionEdit = async () => {
    const payload = {
      lokasi,
      bangunan,
      alamat,
    };

    try {
      const response = await axios.put(`/api/bangunan/${id}`, payload);
      router.push("/master/bangunan");
    } catch (error) {
      console.error({ error });
    }
  };

  const actionDelete = async () => {
    setIsLoading(true);
    

    try {
      const response = await axios.delete(`/api/bangunan/${id}`);
      setIsLoading(false);
      router.push("/master/bangunan");
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <PageContainer title="Edit Bangunan">
      <Card>
        <CardContent>
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography fontWeight={700}>Edit Data</Typography>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              href="/master/bangunan"
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
                htmlFor="lokasi"
                mb="5px"
              >
                Lokasi
              </Typography>
              <InputBase
                sx={{
                  border: "1px solid #648FFF",
                  borderRadius: "50px",
                  height: "38px",
                  padding: "0px 14px",
                }}
                placeholder="Lokasi"
                fullWidth
                value={lokasi}
                onChange={(e) => setLokasi(e.target.value)}
                disabled={isLoading}
              ></InputBase>
            </Box>

            <Box display="flex" flexDirection="column">
              <Typography
                variant="subtitle1"
                component="label"
                htmlFor="bangunan"
                mb="5px"
              >
                Nama Bangunan
              </Typography>
              <InputBase
                sx={{
                  border: "1px solid #648FFF",
                  borderRadius: "50px",
                  height: "38px",
                  padding: "0px 14px",
                }}
                placeholder="Nama Bangunan"
                fullWidth
                value={bangunan}
                onChange={(e) => setBangunan(e.target.value)}
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
                Alamat
              </Typography>
              <InputBase
                sx={{
                  border: "1px solid #648FFF",
                  borderRadius: "50px",
                  height: "38px",
                  padding: "0px 14px",
                }}
                placeholder="Alamat"
                fullWidth
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
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
                lokasi == "" || bangunan == "" || alamat == "" || isLoading
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
