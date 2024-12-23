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

  const [pengumuman, setPengumuman] = useState("");
  const [bangunan, setBangunan] = useState("");

  const [listBangunan, setListBangunan] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [dialog, setDialog] = useState(false);

  const handleOpenDialog = () => {
    setDialog(true);
  };
  const handleCloseDialog = () => {
    setDialog(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/api/pengumuman/${id}`);
      const data = response.data;
      if (data) {
        setIsLoading(false);
      }
      setPengumuman(data.pengumuman);
      setBangunan(data.bangunan);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getListBangunan();
  }, []);

  const getListBangunan = async () => {
    try {
      const response = await axios.get("/api/bangunan/list");
      const data = response.data;
      if (data) {
        setListBangunan(data);
      }
    } catch (error) {
      console.error({ error });
    }
  };

  const actionEdit = async () => {
    const payload = {
      pengumuman,
      bangunan,
    };

    try {
      setIsLoading(true);
      const response = await axios.put(`/api/pengumuman/${id}`, payload);
      if (response) {
        setIsLoading(false);
        router.push("/pelayanan/pengumuman");
      }
    } catch (error) {
      setIsLoading(false);
      console.error({ error });
    }
  };

  const actionDelete = async () => {
    setIsLoading(true);
    

    try {
      const response = await axios.delete(`/api/pengumuman/${id}`);
      setIsLoading(false);
      router.push("/pelayanan/pengumuman");
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };
  return (
    <PageContainer title="Edit Pengumuman">
      <Card>
        <CardContent>
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography fontWeight={700}>Edit Data</Typography>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              href="/pelayanan/pengumuman"
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
                Bangunan
              </Typography>
              <select
                placeholder="Nama Bangunan"
                style={{
                  border: "1px solid #648FFF",
                  borderRadius: "50px",
                  height: "38px",
                  padding: "0px 14px",
                  MozAppearance: "none",
                  WebkitAppearance: "none",
                  appearance: "none",
                }}
                value={bangunan}
                onChange={(e) => setBangunan(e.target.value)}
              >
                <option value="">Pilih Bangunan</option>
                {listBangunan.map((list: any) => {
                  return (
                    <option value={list.id} key={list.id}>
                      {list.bangunan}
                    </option>
                  );
                })}
              </select>
            </Box>

            <Box display="flex" flexDirection="column">
              <Typography variant="subtitle1" component="label" mb="5px">
                Pengumuman
              </Typography>
              <InputBase
                sx={{
                  border: "1px solid #648FFF",
                  borderRadius: "16px",
                  padding: "4px 14px",
                }}
                placeholder="Pengumuman"
                fullWidth
                multiline
                rows={4}
                value={pengumuman}
                onChange={(e) => setPengumuman(e.target.value)}
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
              disabled={pengumuman == "" || bangunan == "" || isLoading}
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
