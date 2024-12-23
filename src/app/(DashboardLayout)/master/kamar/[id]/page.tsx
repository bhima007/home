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
  NativeSelect,
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

  const [bangunan, setBangunan] = useState("");
  const [kamar, setKamar] = useState("");

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
    const fetchUserById = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/api/kamar/${id}`);
        const data = response.data;
        if (data) {
          setIsLoading(false);
        }
        setBangunan(data.bangunan);
        setKamar(data.kamar);
      } catch (err) {
        console.log({ err });
        setIsLoading(false);
      }
    };

    fetchUserById();
  }, [id]);

  useEffect(() => {
    const getListBangunan = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`/api/bangunan/list`);
        if (response.data) {
          setIsLoading(false);
        }
        setListBangunan(response.data);
      } catch (err) {
        console.log({ err });
        setIsLoading(false);
      }
    };

    getListBangunan();
  }, []);

  const actionEdit = async () => {
    const payload = {
      bangunan,
      kamar,
    };
    try {
      const response = await axios.put(`/api/kamar/${id}`, payload);
      router.push("/master/kamar");
    } catch (error) {
      console.error({ error });
    }
  };

  const actionDelete = async () => {
    setIsLoading(true);
    

    try {
      const response = await axios.delete(`/api/kamar/${id}`);
      setIsLoading(false);
      router.push("/master/kamar");
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <PageContainer title="Edit Kamar">
      <Card>
        <CardContent>
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography fontWeight={700}>Edit Data</Typography>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              href="/master/kamar"
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
                htmlFor="bangunan"
                mb="5px"
              >
                Nama Bangunan
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
              <InputBase
                sx={{
                  border: "1px solid #648FFF",
                  borderRadius: "50px",
                  height: "38px",
                  padding: "0px 14px",
                }}
                placeholder="Kamar"
                fullWidth
                value={kamar}
                onChange={(e) => setKamar(e.target.value)}
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
              disabled={bangunan == "" || kamar == "" || isLoading}
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
