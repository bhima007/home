"use client";
import { Grid, Box, Card, Typography } from "@mui/material";
import PageContainer from "@/app/(DashboardLayout)/components/container/PageContainer";
import {
  IconFriends,
  IconMailExclamation,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  AnnouncementOutlined,
  Apartment,
  BedroomParentOutlined,
  ListAlt,
  ReceiptLongOutlined,
} from "@mui/icons-material";

const Dashboard = () => {
  const [data, setData] = useState<any>({});

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get("/api/dashboard");
      const data = response.data.data;
      setData(data);
    };

    fetchUsers();
  }, []);
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4} md={3}>
            <Card
              elevation={2}
              sx={{
                p: 1,
              }}
            >
              <Grid
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Apartment sx={{ fontSize: "46px" }}></Apartment>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="end"
                >
                  <Typography
                    color="primary"
                    fontWeight={700}
                    display="flex"
                    flexDirection="column"
                    alignItems="end"
                  >
                    <span>Total Bangunan</span>
                    <span>{data.dataBangunan}</span>
                  </Typography>
                </Box>
              </Grid>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4} md={3}>
            <Card
              elevation={2}
              sx={{
                p: 1,
              }}
            >
              <Grid
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <BedroomParentOutlined sx={{ fontSize: "46px" }}></BedroomParentOutlined>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="end"
                >
                  <Typography
                    color="primary"
                    fontWeight={700}
                    display="flex"
                    flexDirection="column"
                    alignItems="end"
                  >
                    <span>Total Kamar</span>
                    <span>{data.dataKamar}</span>
                  </Typography>
                </Box>
              </Grid>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4} md={3}>
            <Card
              elevation={2}
              sx={{
                p: 1,
              }}
            >
              <Grid
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <IconFriends size={46}></IconFriends>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="end"
                >
                  <Typography
                    color="primary"
                    fontWeight={700}
                    display="flex"
                    flexDirection="column"
                    alignItems="end"
                  >
                    <span>Total Penyewa</span>
                    <span>{data.dataPenyewa}</span>
                  </Typography>
                </Box>
              </Grid>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4} md={3}>
            <Card
              elevation={2}
              sx={{
                p: 1,
              }}
            >
              <Grid
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <ReceiptLongOutlined sx={{ fontSize: "46px" }}></ReceiptLongOutlined>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="end"
                >
                  <Typography
                    color="primary"
                    fontWeight={700}
                    display="flex"
                    flexDirection="column"
                    alignItems="end"
                  >
                    <span>Total Transaksi</span>
                    <span>{data.dataTransaksi}</span>
                  </Typography>
                </Box>
              </Grid>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4} md={3}>
            <Card
              elevation={2}
              sx={{
                p: 1,
              }}
            >
              <Grid
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <IconMailExclamation size={46}></IconMailExclamation>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="end"
                >
                  <Typography
                    color="primary"
                    fontWeight={700}
                    display="flex"
                    flexDirection="column"
                    alignItems="end"
                  >
                    <span>Total Pengaduan</span>
                    <span>{data.dataPengaduan}</span>
                  </Typography>
                </Box>
              </Grid>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4} md={3}>
            <Card
              elevation={2}
              sx={{
                p: 1,
              }}
            >
              <Grid
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <ListAlt sx={{ fontSize: "46px" }}></ListAlt>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="end"
                >
                  <Typography
                    color="primary"
                    fontWeight={700}
                    display="flex"
                    flexDirection="column"
                    alignItems="end"
                  >
                    <span>Total Peraturan</span>
                    <span>{data.dataPeraturan}</span>
                  </Typography>
                </Box>
              </Grid>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4} md={3}>
            <Card
              elevation={2}
              sx={{
                p: 1,
              }}
            >
              <Grid
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <AnnouncementOutlined sx={{ fontSize: "46px" }}></AnnouncementOutlined>
                <Box
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="end"
                >
                  <Typography
                    color="primary"
                    fontWeight={700}
                    display="flex"
                    flexDirection="column"
                    alignItems="end"
                  >
                    <span>Total Pengumuman</span>
                    <span>{data.dataPengumuman}</span>
                  </Typography>
                </Box>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
