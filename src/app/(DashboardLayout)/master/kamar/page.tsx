"use client";

import CustomTable from "../../components/custom-table/table";
import PageContainer from "../../components/container/PageContainer";
import { useEffect, useState } from "react";
import axios from "axios";

const Bangunan = () => {
  const HeaderItems = [
    { label: "No", value: "" },
    { label: "Nama Bangunan", value: "bangunan" },
    { label: "Nama Kamar", value: "kamar" },
    { label: "Jumlah Penghuni", value: "jumlahPenghuni" },
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
      const response = await axios.get(`/api/kamar?page=${page}&limit=10`);
      const data = response.data;
      if (data) {
        setIsLoading(false);
      }
      console.log(data);

      const dataItem: any = [];
      data.data.map((d: any) => {
        dataItem.push({
          ...d,
          bangunan: d.bangunan.bangunan,
          jumlahPenghuni: (
            <span
              style={{ color: d.jumlah_penghuni / 2 == 1 ? "red" : "green" }}
            >
              {d.jumlah_penghuni}/2
            </span>
          ),
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
    <PageContainer title="Kamar" description="this is Kamar">
      <CustomTable
        title={"Kamar"}
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
