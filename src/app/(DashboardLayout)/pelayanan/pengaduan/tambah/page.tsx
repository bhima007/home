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

  const [auth, setAuth] = useState<any>({});

  const [nama, setNama] = useState("");
  const [bangunan, setBangunan] = useState("");
  const [kamar, setKamar] = useState("");
  const [pengaduan, setPengaduan] = useState("");
  const [status, setStatus] = useState("");

  const [listBangunan, setListBangunan] = useState([]);
  const [listKamar, setListKamar] = useState([]);
  const [listStatus, setListStatus] = useState([
    "SELESAI",
    "DALAM PROSES",
    "TINDAK LANJUT",
  ]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setAuth(JSON.parse(localStorage.getItem("userData")));
    if (auth.Penyewa) {
      setNama(auth.nama);
      setBangunan(auth.Penyewa.bangunan);
      setKamar(auth.Penyewa.kamar);
    }
    setStatus("1");
  }, [auth.nama]);
  useEffect(() => {
    getListBangunan();
  }, []);
  useEffect(() => {
    if (bangunan) getListKamar();
  }, [bangunan]);

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

  const createData = async () => {
    const payload = {
      nama,
      bangunan,
      kamar,
      pengaduan,
      status: listStatus[status],
    };
    // console.log({ payload });

    try {
      setIsLoading(true);
      const response = await axios.post("/api/pengaduan", payload);
      if (response) {
        setIsLoading(false);
        router.push("/pelayanan/pengaduan");
      }
    } catch (error) {
      setIsLoading(false);
      console.error({ error });
    }
  };

  return (
    <PageContainer title="Tambah Pengaduan">
      <Card>
        <CardContent>
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography fontWeight={700}>Tambah Data</Typography>
            <Button
              variant="contained"
              color="primary"
              disableElevation
              href="/pelayanan/pengaduan"
            >
              Kembali
            </Button>
          </Grid>
        </CardContent>

        <Divider />

        <CardContent>
          <Stack gap={2}>
            {auth.role == "ADMIN" && (
              <>
                <Box display="flex" flexDirection="column">
                  <Typography variant="subtitle1" component="label" mb="5px">
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
              </>
            )}
            <Box display="flex" flexDirection="column">
              <Typography variant="subtitle1" component="label" mb="5px">
                Pengaduan
              </Typography>
              <InputBase
                sx={{
                  border: "1px solid #648FFF",
                  borderRadius: "16px",
                  padding: "4px 14px",
                }}
                placeholder="Pengaduan"
                fullWidth
                multiline
                rows={4}
                value={pengaduan}
                onChange={(e) => setPengaduan(e.target.value)}
              ></InputBase>
            </Box>

            {auth.role == "ADMIN" && (
              <Box display="flex" flexDirection="column">
                <Typography variant="subtitle1" component="label" mb="5px">
                  Status
                </Typography>
                <select
                  placeholder="Status"
                  style={{
                    border: "1px solid #648FFF",
                    borderRadius: "50px",
                    height: "38px",
                    padding: "0px 14px",
                    MozAppearance: "none",
                    WebkitAppearance: "none",
                    appearance: "none",
                  }}
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="">Pilih Status</option>
                  {listStatus.map((list: any, idx: number) => {
                    return (
                      <option value={idx} key={idx}>
                        {list}
                      </option>
                    );
                  })}
                </select>
              </Box>
            )}
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
                nama == "" ||
                bangunan == "" ||
                pengaduan == "" ||
                status == "" ||
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
                if (auth.role == "ADMIN") {
                  setNama("");
                  setBangunan("");
                  setKamar("");
                  setPengaduan("");
                  setStatus("");
                } else {
                  setPengaduan("");
                }
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
