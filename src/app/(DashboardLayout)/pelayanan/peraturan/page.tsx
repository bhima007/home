"use client";

import CustomTable from "../../components/custom-table/table";
import PageContainer from "../../components/container/PageContainer";
import { useEffect, useState } from "react";
import axios from "axios";

const Peraturan = () => {
  const HeaderItems = [
    { label: "No", value: "" },
    { label: "Aturan", value: "aturan" },
    { label: "Bangunan", value: "bangunan" },
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
      const response = await axios.get(`/api/peraturan?page=${page}&limit=10`);
      const data = response.data;
      if (data) {
        setIsLoading(false);
      }

      const dataItem: any = [];
      data.data.map((d: any) => {
        dataItem.push({
          ...d,
          bangunan: d.bangunan.bangunan,
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
    <PageContainer title="Peraturan" description="this is Peraturan">
      <CustomTable
        title={"Peraturan"}
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

export default Peraturan;
