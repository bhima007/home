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
import { useEffect, useState } from "react";

export default () => {
  const router = useRouter();

  const [aturan, setAturan] = useState("");
  const [bangunan, setBangunan] = useState("");
  const [fasilitas, setFasilitas] = useState("");

  const [listBangunan, setListBangunan] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

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

  const createData = async () => {
    const payload = {
      aturan,
      bangunan,
      fasilitas,
    };

    try {
      setIsLoading(true);
      const response = await axios.post("/api/peraturan", payload);
      if (response) {
        setIsLoading(false);
        router.push("/pelayanan/peraturan");
      }
    } catch (error) {
      setIsLoading(false);
      console.error({ error });
    }
  };

  return (
    <PageContainer title="Tambah Peraturan">
      <Card>
        <CardContent>
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography fontWeight={700}>Tambah Data</Typography>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              href="/pelayanan/peraturan"
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
                Aturan
              </Typography>
              <InputBase
                sx={{
                  border: "1px solid #648FFF",
                  borderRadius: "16px",
                  padding: "4px 14px",
                }}
                placeholder="Aturan"
                fullWidth
                multiline
                rows={4}
                value={aturan}
                onChange={(e) => setAturan(e.target.value)}
              ></InputBase>
            </Box>

            <Box display="flex" flexDirection="column">
              <Typography variant="subtitle1" component="label" mb="5px">
                Fasilitas
              </Typography>
              <InputBase
                sx={{
                  border: "1px solid #648FFF",
                  borderRadius: "16px",
                  padding: "4px 14px",
                }}
                placeholder="Fasilitas"
                fullWidth
                multiline
                rows={4}
                value={fasilitas}
                onChange={(e) => setFasilitas(e.target.value)}
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
              onClick={() => createData()}
              disabled={
                aturan == "" ||
                bangunan == "" ||
                aturan == "" ||
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
                setAturan("");
                setBangunan("");
                setAturan("");
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
