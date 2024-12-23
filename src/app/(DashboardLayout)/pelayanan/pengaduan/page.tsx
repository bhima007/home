"use client";

import CustomTable from "../../components/custom-table/table";
import PageContainer from "../../components/container/PageContainer";
import { useEffect, useState } from "react";
import axios from "axios";

const Pengaduan = () => {
  const HeaderItems = [
    { label: "No", value: "" },
    { label: "Nama", value: "nama" },
    { label: "Nama Bangunan", value: "bangunan" },
    { label: "Kamar", value: "kamar" },
    { label: "Pengaduan", value: "pengaduan" },
    { label: "Status", value: "status" },
    { label: "", value: "action" },
  ];

  const [DataItems, setDataItems] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getData();
  }, [page]);

  const getData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`/api/pengaduan?page=${page}&limit=10`);
      const data = response.data;
      if (data) {
        setIsLoading(false);
      }

      const dataItem: any = [];
      data.data.map((d: any) => {
        dataItem.push({
          ...d,
          bangunan: d.bangunan.bangunan,
          kamar: d.kamar.kamar,
        });
      });
      setDataItems(dataItem);
      setPage(page);
      setTotalPages(totalPages);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };
  return (
    <PageContainer title="Pengaduan" description="this is Pengaduan">
      <CustomTable
        title={"Pengaduan"}
        page={page}
        setPage={setPage}
        isLoading={isLoading}
        totalPages={totalPages}
        HeaderItems={HeaderItems}
        DataItems={DataItems}
      ></CustomTable>
    </PageContainer>
  );
};

export default Pengaduan;
