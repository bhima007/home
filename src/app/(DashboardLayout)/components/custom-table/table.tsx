import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { IconPencil, IconReceipt, IconSettings } from "@tabler/icons-react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Divider,
  Grid,
  IconButton,
  Pagination,
  Tooltip,
  Typography,
} from "@mui/material";
import Link from "next/link";

export default function CustomTable({
  title,
  page,
  totalItems,
  totalPages,
  isLoading,
  HeaderItems,
  DataItems,
  setPage,
  noHeader,
  setDialogEdit,
}: {
  title: any;
  page?: any;
  totalItems?: any;
  totalPages?: any;
  isLoading?: boolean;
  HeaderItems: any;
  DataItems: any;
  setPage?: any;
  actionDelete?: any;
  noHeader?: boolean;
  setDialogEdit?: any;
}) {
  const [auth, setAuth] = React.useState<any>({});

  const listStatus = ["SELESAI", "DALAM PROSES", "TINDAK LANJUT"];

  React.useEffect(() => {
    setAuth(JSON.parse(localStorage.getItem("userData")));
  }, [auth.nama]);

  const dataShow = (data: any, idx: number) => {
    const showCell: any = [];
    for (let i = 0; i < HeaderItems.length - 2; i++) {
      showCell[i] = (
        <TableCell key={HeaderItems[i + 1].value} style={{ minWidth: "140px" }}>
          {HeaderItems[i + 1].value == "status" ? (
            <Chip
              label={data[HeaderItems[i + 1].value].toLowerCase()}
              style={{
                backgroundColor: `${
                  data[HeaderItems[i + 1].value] == listStatus[0]
                    ? "#52B850"
                    : data[HeaderItems[i + 1].value] == listStatus[1]
                    ? "#FCFF50"
                    : "#65EDFF"
                }`,
                color: `${
                  data[HeaderItems[i + 1].value] == listStatus[0]
                    ? "white"
                    : "black"
                }`,
                textTransform: "capitalize",
              }}
              size="small"
            ></Chip>
          ) : (
            <pre style={{ textWrap: "wrap" }}>
              <Typography color="initial">
                {data[HeaderItems[i + 1].value]}
              </Typography>
            </pre>
          )}
        </TableCell>
      );
    }
    return showCell;
  };

  return (
    <Card>
      {noHeader ? (
        <></>
      ) : (
        <>
          <CardContent
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography fontSize={16} fontWeight={700}>
              List {title}
            </Typography>
            {auth.role == "ADMIN" ? (
              title.toLowerCase() == "pengaduan" ? (
                ""
              ) : (
                <Button
                  variant="contained"
                  component={Link}
                  href={`${title.toLowerCase()}/tambah`}
                  disableElevation
                  color="secondary"
                  sx={{ color: "white" }}
                >
                  Tambah Data
                </Button>
              )
            ) : title.toLowerCase() == "pengaduan" ? (
              <Button
                variant="contained"
                component={Link}
                href={`${title.toLowerCase()}/tambah`}
                disableElevation
                color="secondary"
                sx={{ color: "white" }}
              >
                Tambah Data
              </Button>
            ) : (
              ""
            )}
          </CardContent>
          <Divider />
        </>
      )}
      <CardContent>
        <TableContainer style={{ borderRadius: "0" }}>
          <Table size="small" aria-label="a dense table">
            <TableHead style={{ backgroundColor: "#5059B8" }}>
              <TableRow>
                {HeaderItems.map((h: any, idx: number) => {
                  return (
                    <TableCell
                      key={idx}
                      style={{ color: "white", height: "60px" }}
                    >
                      {h.value == "action" && auth.role == "ADMIN" ? (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <IconSettings size={16}></IconSettings>
                        </div>
                      ) : (
                        h.label
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {DataItems.map((data: any, idx: number) => (
                <TableRow
                  key={idx}
                  sx={{
                    minHeight: "35px",
                    bgcolor: "#EEEEF9",
                  }}
                >
                  <TableCell sx={{ width: "40px", textAlign: "center" }}>
                    {idx + 1}
                  </TableCell>

                  {dataShow(data, idx)}

                  <TableCell>
                    <Grid display="flex" justifyContent="center">
                      <Tooltip title="Edit Data">
                        {title.toLowerCase() != "transaksi" &&
                          auth.role == "ADMIN" && (
                            <IconButton
                              href={`/${
                                title.toLowerCase() == "pengaduan" ||
                                title.toLowerCase() == "peraturan" ||
                                title.toLowerCase() == "pengumuman"
                                  ? "pelayanan"
                                  : "master"
                              }/${title.toLowerCase()}/${data.id}`}
                            >
                              <IconPencil size={16}></IconPencil>
                            </IconButton>
                          )}
                      </Tooltip>
                      <Tooltip title="Edit Data">
                        {title.toLowerCase() == "transaksi" &&
                          auth.role == "ADMIN" && (
                            <IconButton onClick={() => setDialogEdit(data.id)}>
                              <IconPencil size={16}></IconPencil>
                            </IconButton>
                          )}
                      </Tooltip>
                      {/* {title.toLowerCase() == "penyewa" && (
                        <Tooltip title="Transaksi">
                          <IconButton
                            href={`/master/penyewa/${data.id}/transaksi`}
                          >
                            <IconReceipt size={16}></IconReceipt>
                          </IconButton>
                        </Tooltip>
                      )} */}
                    </Grid>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>

      <CardActions sx={{ px: "14px" }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Typography>
            Total: <span>{totalItems}</span> Data {title}
          </Typography>

          <Pagination
            page={page}
            count={totalPages}
            color="primary"
            variant="outlined"
            shape="rounded"
            onChange={(e, v) => setPage(v)}
            disabled={isLoading}
          />
        </Grid>
      </CardActions>
    </Card>
  );
}
