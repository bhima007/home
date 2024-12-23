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
import { useState } from "react";

export default () => {
  const [lokasi, setLokasi] = useState("");
  const [bangunan, setBangunan] = useState("");
  const [alamat, setAlamat] = useState("");

  const createBangunan = async () => {
    const payload = {
      lokasi,
      bangunan,
      alamat,
    };

    try {
      const response = await axios.post("/api/bangunan", payload);
      console.log({ response });
      // setUsers(response.data);
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <PageContainer title="Tambah Bangunan">
      <Card>
        <CardContent>
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography fontWeight={700}>Tambah Data</Typography>
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
              onClick={() => createBangunan()}
              disabled={lokasi == "" || bangunan == "" || alamat == ""}
            >
              Kirim
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{ height: "35px", width: "100px" }}
              disableElevation
              onClick={() => {
                setLokasi("");
                setBangunan("");
                setAlamat("");
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
