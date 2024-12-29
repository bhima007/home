"use client";

import CustomTable from "../../components/custom-table/table";
import PageContainer from "../../components/container/PageContainer";
import { useEffect, useState } from "react";
import axios from "axios";

const nama = () => {
  const HeaderItems = [
    { label: "No", value: "" },
    { label: "Nama", value: "nama" },
    { label: "Username", value: "username" },
    { label: "Role", value: "role" },
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
      const response = await axios.get(`/api/user?page=${page}&limit=10`);
      const data = response.data;
      if (data) {
        setIsLoading(false);
      }
      setDataItems(data.data);
      setPage(response.data.page);
      setTotalItems(response.data.total);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <PageContainer title="Users" description="this is Users">
      <CustomTable
        title={"Users"}
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

export default nama;
