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
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import { MobileDatePicker } from "@mui/x-date-pickers";
import CustomTable from "@/app/(DashboardLayout)/components/custom-table/table";

export default () => {
  const [auth, setAuth] = useState<any>({});

  const [penyewa, setPenyewa] = useState("");
  const [bangunan, setBangunan] = useState("");
  const [kamar, setKamar] = useState("");
  const [nominalShow, setNominalShow] = useState("");
  const [nominal, setNominal] = useState(0);
  const [periodePembayaran, setPeriodePembayaran] = useState("");
  const [tglPembayaran, setTglPembayaran] = useState<Dayjs | null>(null);

  const [listPenyewa, setListPenyewa] = useState([]);

  const HeaderItems = [
    { label: "No", value: "" },
    { label: "Penyewa", value: "penyewa" },
    { label: "Bangunan", value: "bangunan" },
    { label: "Kamar", value: "kamar" },
    { label: "Nominal", value: "nominal" },
    { label: "Periode Pembayaran (Bulan)", value: "periodePembayaran" },
    { label: "Tanggal Pembayaran", value: "tglPembayaran" },
    { label: "", value: "action" },
  ];

  const [DataRaw, setDataRaw] = useState([]);
  const [DataItems, setDataItems] = useState([]);

  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const [dialogCreate, setDialogCreate] = useState(false);
  const [dialogEdit, setDialogEdit] = useState(null);
  const [dialogDelete, setDialogDelete] = useState(false);

  useEffect(() => {
    if (dialogEdit) {
      const data: any = DataRaw.filter((data) => {
        return data.id == dialogEdit;
      })[0];
      if (data) {
        setPenyewa(data.penyewa.id);
        setBangunan(data.bangunan.id);
        setKamar(data.kamar.id);
        setNominal(data.nominal);
        formatCurrency(`${parseInt(data.nominal)}`);
        setPeriodePembayaran(data.periode_pembayaran);
        setTglPembayaran(dayjs(data.tgl_pembayaran));
        setDialogCreate(true);
      }
    }
  }, [dialogEdit]);

  const handleOpenDialogCreate = () => {
    setDialogCreate(true);
  };
  const handleCloseDialogCreate = () => {
    setPenyewa("");
    setBangunan("");
    setKamar("");
    setNominalShow("");
    setNominal(0);
    setPeriodePembayaran("");
    setTglPembayaran(null);
    setDialogEdit(null);
    setDialogCreate(false);
  };
  const handleOpenDialogDelete = () => {
    setDialogDelete(true);
  };
  const handleCloseDialogDelete = () => {
    setDialogDelete(false);
  };

  useEffect(() => {
    getData();
  }, [page]);
  useEffect(() => {
    setAuth(JSON.parse(localStorage.getItem("userData")));
    if (auth.nama) {
      getListPenyewa();
    }
  }, [auth.nama]);
  useEffect(() => {
    if (listPenyewa && auth.id) getData();
  }, [listPenyewa]);
  useEffect(() => {
    if (penyewa) {
      const selected = listPenyewa.filter((p) => {
        return p.id == penyewa;
      });
      setBangunan(selected[0].bangunan.id);
      setKamar(selected[0].kamar.id);
    }
  }, [penyewa]);

  const getData = async () => {
    try {
      let response;
      if (auth.role == "ADMIN") {
        response = await axios.get(`/api/transaksi?page=${page}&limit=10`);
      } else {
        const penyewaId = listPenyewa.filter((U) => {
          return U.nama.id == auth.id;
        })[0].id;
        response = await axios.get(
          `/api/transaksi/${penyewaId}?page=${page}&limit=10`
        );
      }
      const data = response.data;
      const dataItem: any = [];
      data.data.map((d: any) => {
        dataItem.push({
          ...d,
          bangunan: d.bangunan.bangunan,
          kamar: d.kamar.kamar,
          penyewa: listPenyewa.filter((P) => {
            return P.nama.id == d.penyewa.nama;
          })[0].nama.nama,
          nominal: `Rp ${Intl.NumberFormat("id-ID").format(d.nominal)}`,
          periodePembayaran: d.periode_pembayaran,
          tglPembayaran: dayjs(d.tgl_pembayaran).format("DD-MMM-YYYY"),
        });
      });
      setDataRaw(data.data);
      setDataItems(dataItem);
      setTotalItems(data.total);
      setTotalPages(data.totalPages);
    } catch (error) {}
  };

  const getListPenyewa = async () => {
    try {
      const response = await axios.get(`/api/penyewa/list`);
      const data = response.data.data;
      if (data) {
        setListPenyewa(data);
      }
    } catch (error) {
      console.error({ error });
    }
  };

  const createTransaksi = async () => {
    const payload = {
      penyewa,
      bangunan,
      kamar,
      nominal,
      periode_pembayaran: parseInt(periodePembayaran),
      tgl_pembayaran: tglPembayaran?.format("YYYY-MM-DD"),
    };

    try {
      setIsLoading(true);
      let response: any;
      if (dialogEdit) {
        response = await axios.put(`/api/transaksi/${dialogEdit}`, payload);
      } else {
        response = await axios.post("/api/transaksi", payload);
      }
      if (response) {
        setIsLoading(false);
        handleCloseDialogCreate();
        handleCloseDialogDelete();
        getData();
      }
    } catch (error) {
      console.error({ error });
    }
  };

  const actionDelete = async () => {
    setIsLoading(true);
    try {
      const response = await axios.delete(`/api/transaksi/${dialogEdit}`);
      if (response) {
        setIsLoading(false);
        handleCloseDialogCreate();
        handleCloseDialogDelete();
        getData();
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const formatCurrency = (value) => {
    value = value.replace(/[^0-9]/g, "");
    setNominal(parseFloat(value));

    value = new Intl.NumberFormat("id-ID").format(value);
    setNominalShow("Rp " + value);
  };

  return (
    <PageContainer title="Transaksi">
      <Card>
        <CardContent>
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography fontSize={16} fontWeight={700}>
              List Transaksi
            </Typography>
            {auth.role == "ADMIN" && (
              <Grid display="flex" gap={1}>
                <Button
                  variant="contained"
                  disableElevation
                  color="secondary"
                  sx={{ color: "white" }}
                  onClick={handleOpenDialogCreate}
                >
                  Tambah Data
                </Button>
              </Grid>
            )}
          </Grid>
        </CardContent>

        <Divider />

        <CustomTable
          title={"Transaksi"}
          page={page}
          setPage={setPage}
          isLoading={isLoading}
          totalItems={totalItems}
          totalPages={totalPages}
          HeaderItems={HeaderItems}
          DataItems={DataItems}
          noHeader={true}
          setDialogEdit={setDialogEdit}
        ></CustomTable>

        <Dialog open={dialogCreate} maxWidth="md" fullWidth>
          <DialogTitle>Tambah Transaksi Baru</DialogTitle>

          <DialogContent>
            <Stack gap={2}>
              <Box display="flex" flexDirection="column">
                <Typography
                  variant="subtitle1"
                  component="label"
                  htmlFor="alamat"
                  mb="5px"
                >
                  Nama Penyewa
                </Typography>

                <select
                  placeholder="Nama Penyewa"
                  style={{
                    border: "1px solid #648FFF",
                    borderRadius: "50px",
                    height: "38px",
                    padding: "0px 14px",
                    MozAppearance: "none",
                    WebkitAppearance: "none",
                    appearance: "none",
                  }}
                  value={penyewa}
                  onChange={(e) => setPenyewa(e.target.value)}
                >
                  <option value="">Pilih Penyewa</option>
                  {listPenyewa.map((list: any) => {
                    return (
                      <option value={list.id} key={list.id}>
                        {list.nama.nama}
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
                  Nominal
                </Typography>
                <InputBase
                  sx={{
                    border: "1px solid #648FFF",
                    borderRadius: "50px",
                    height: "38px",
                    padding: "0px 14px",
                    MozAppearance: "none",
                    WebkitAppearance: "none",
                    appearance: "none",
                  }}
                  placeholder="Rp 0"
                  fullWidth
                  value={nominalShow}
                  onChange={(e) => formatCurrency(e.target.value)}
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
                  Periode Pembayaran
                </Typography>
                <InputBase
                  sx={{
                    border: "1px solid #648FFF",
                    borderRadius: "50px",
                    height: "38px",
                    padding: "0px 14px",
                    MozAppearance: "none",
                    WebkitAppearance: "none",
                    appearance: "none",
                  }}
                  placeholder="Periode Pembayaran"
                  fullWidth
                  value={periodePembayaran}
                  onChange={(e) => setPeriodePembayaran(e.target.value)}
                  type="number"
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
                  Tanggal Pembayaran
                </Typography>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={["DatePicker"]}>
                    <MobileDatePicker
                      format="DD/MM/YYYY"
                      value={tglPembayaran}
                      onChange={(newValue) => {
                        setTglPembayaran(newValue);
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Box>
            </Stack>
          </DialogContent>

          <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
            {dialogEdit && (
              <Button
                variant="outlined"
                color="error"
                sx={{ width: "120px" }}
                onClick={handleOpenDialogDelete}
              >
                Hapus
              </Button>
            )}
            <Button
              variant="outlined"
              sx={{ width: "120px" }}
              onClick={handleCloseDialogCreate}
            >
              Batal
            </Button>
            <Button
              variant="contained"
              color="secondary"
              sx={{ width: "120px", color: "white" }}
              onClick={createTransaksi}
              disabled={
                isNaN(nominal) ||
                nominal == null ||
                nominal < 1000 ||
                tglPembayaran == null
              }
            >
              Kirim
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={dialogDelete} maxWidth="xs" fullWidth>
          <DialogTitle>Apakah anda yakin ingin menghapus?</DialogTitle>

          <DialogContent>
            Data yang sudah dihapus akan hilang secara permanen dan tidak bisa
            dikembalikan.
          </DialogContent>

          <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
            <Button sx={{ width: "120px" }} onClick={handleCloseDialogDelete}>
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
      </Card>
    </PageContainer>
  );
};
