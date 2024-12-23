"use client";

import CustomTable from "../../components/custom-table/table";
import PageContainer from "../../components/container/PageContainer";
import { useEffect, useState } from "react";
import axios from "axios";

const Bangunan = () => {
  const HeaderItems = [
    { label: "No", value: "" },
    { label: "Lokasi", value: "lokasi" },
    { label: "Nama Bangunan", value: "bangunan" },
    { label: "Alamat", value: "alamat" },
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
      const response = await axios.get(`/api/bangunan?page=${page}&limit=10`);
      if (response.data.data) {
        setIsLoading(false);
      }
      setDataItems(response.data.data);
      setPage(response.data.page);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <PageContainer title="Bangunan" description="this is Bangunan">
      <CustomTable
        title={"Bangunan"}
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

export default Bangunan;
