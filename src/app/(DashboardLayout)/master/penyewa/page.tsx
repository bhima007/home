"use client";

import CustomTable from "../../components/custom-table/table";
import PageContainer from "../../components/container/PageContainer";
import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

const Bangunan = () => {
  const HeaderItems = [
    { label: "No", value: "" },
    { label: "Nama", value: "nama" },
    { label: "Nama Bangunan", value: "bangunan" },
    { label: "Nama Kamar", value: "kamar" },
    { label: "Tanggal Masuk", value: "tgl_masuk" },
    { label: "No Darurat", value: "no_darurat" },
    { label: "", value: "action" },
  ];

  const [DataItems, setDataItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalItems, setTotalItems] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getData();
  }, [page]);

  const getData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/api/penyewa?page=${page}&limit=10`);
      const data = response.data;
      if (data) {
        setIsLoading(false);
      }

      const dataItem: any = [];
      data.data.map((d: any) => {
        dataItem.push({
          ...d,
          nama: d.nama.nama,
          bangunan: d.bangunan.bangunan,
          kamar: d.kamar.kamar,
          tgl_masuk: dayjs(d.tgl_masuk).format("D-MMM-YYYY"),
        });
      });
      setDataItems(dataItem);
      setPage(response.data.page);
      setTotalItems(response.data.total);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <PageContainer title="Penyewa" description="this is Penyewa">
      <CustomTable
        title={"Penyewa"}
        page={page}
        setPage={setPage}
        isLoading={isLoading}
        totalItems={totalItems}
        totalPages={totalPages}
        HeaderItems={HeaderItems}
        DataItems={DataItems}
      ></CustomTable>
    </PageContainer>
  );
};

export default Bangunan;
