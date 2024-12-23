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

  const [bangunan, setBangunan] = useState("");
  const [kamar, setKamar] = useState("");

  const [listBangunan, setListBangunan] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  const createBangunan = async () => {
    const payload = {
      bangunan,
      kamar,
    };
    try {
      const response = await axios.post("/api/kamar", payload);
      router.push("/master/kamar");
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <PageContainer title="Tambah Kamar">
      <Card>
        <CardContent>
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography fontWeight={700}>Tambah Data</Typography>
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
              onClick={() => createBangunan()}
              disabled={bangunan == "" || kamar == "" || isLoading}
            >
              Kirim
            </Button>
            <Button
              variant="contained"
              color="error"
              sx={{ height: "35px", width: "100px" }}
              disableElevation
              onClick={() => {
                setBangunan("");
                setKamar("");
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
