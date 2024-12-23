"use client";

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
  NativeSelect,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";

import dayjs, { Dayjs } from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import { MobileDatePicker } from "@mui/x-date-pickers";

export default () => {
  const router = useRouter();
  const { id } = useParams();

  const [nama, setNama] = useState("");
  const [bangunan, setBangunan] = useState("");
  const [kamar, setKamar] = useState("");
  const [tglMasuk, setTglMasuk] = useState<Dayjs | null>(null);

  const [listBangunan, setListBangunan] = useState([]);
  const [listKamar, setListKamar] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [dialog, setDialog] = useState(false);

  const handleOpenDialog = () => {
    setDialog(true);
  };
  const handleCloseDialog = () => {
    setDialog(false);
  };

  useEffect(() => {
    getListBangunan();
  }, []);
  useEffect(() => {
    if (bangunan) getListKamar();
  }, [bangunan]);
  useEffect(() => {
    const fetchUserById = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/api/penyewa/${id}`);
        const data = response.data;
        if (data) {
          setIsLoading(false);
        }

        setNama(data.nama);
        setBangunan(data.bangunan);
        setKamar(data.kamar);
        setTglMasuk(dayjs(data.tgl_masuk));
      } catch (err) {
        console.log({ err });
        setIsLoading(false);
      }
    };

    fetchUserById();
  }, [id]);

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
  const getListKamar = async () => {
    try {
      const response = await axios.get(
        `/api/kamar/list?bangunanId=${bangunan}`
      );
      const data = response.data;
      if (data) {
        setListKamar(data);
      }
    } catch (error) {
      console.error({ error });
    }
  };

  const actionEdit = async () => {
    const payload = {
      nama,
      bangunan,
      kamar,
      tgl_masuk: tglMasuk?.format("YYYY-MM-DD"),
    };

    try {
      setIsLoading(true);
      const response = await axios.put(`/api/penyewa/${id}`, payload);
      if (response) {
        setIsLoading(true);
        router.push("/master/penyewa");
      }
    } catch (error) {
      console.error({ error });
    }
  };

  const actionDelete = async () => {
    setIsLoading(true);

    try {
      const response = await axios.delete(`/api/penyewa/${id}`);
      setIsLoading(false);
      router.push("/master/penyewa");
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <PageContainer title="Tambah Penyewa">
      <Card>
        <CardContent>
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography fontWeight={700}>Edit Data</Typography>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              href="/master/penyewa"
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
              <Typography
                variant="subtitle1"
                component="label"
                htmlFor="alamat"
                mb="5px"
              >
                Kamar
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
                value={kamar}
                onChange={(e) => setKamar(e.target.value)}
                disabled={bangunan.length == 0}
              >
                <option value="">Pilih Kamar</option>
                {listKamar.map((list: any) => {
                  return (
                    <option value={list.id} key={list.id}>
                      {list.kamar}
                    </option>
                  );
                })}
              </select>
            </Box>

            <Box display="flex" flexDirection="column">
              <Typography
                variant="subtitle1"
                component="label"
                htmlFor="alamat"
                mb="5px"
              >
                Tanggal Masuk
              </Typography>

              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <MobileDatePicker
                    format="DD/MM/YYYY"
                    value={tglMasuk}
                    onChange={(newValue) => {
                      setTglMasuk(newValue);
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
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
                nama == "" ||
                bangunan == "" ||
                kamar == "" ||
                tglMasuk == null ||
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
