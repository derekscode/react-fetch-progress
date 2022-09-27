import React from "react";
import Toast from "@zoom/sun-ui-core/dist/cjs/Toast";
import IconFileFill from "@zoom/sun-ui-icon/dist/cjs/IconFileFill";
import axios from "axios";
import { Button } from "@mui/material";

export const AxiosExample = () => {
  const downloadCsvFile = (url) => {
    console.log("downloading file...");
    console.time("timer");

    axios({
      // 1  Event Details Page
      // 9  Registration Report
      url: "http://0.0.0.0:9001/api/v1/e/v/panel/control/download/csv/AbGqhiAeTDeUhq5yNPENjQ?csvType=9", //your url
      method: "GET",
      responseType: "blob", // important
    }).then((response) => {
      // create file link in browser's memory
      const href = URL.createObjectURL(response.data);

      // create "a" HTLM element with href to file & click
      const link = document.createElement("a");
      link.href = href;
      // link.setAttribute("download", "file.pdf"); //or any other extension
      document.body.appendChild(link);
      link.click();

      // clean up "a" element & remove ObjectURL
      document.body.removeChild(link);
      URL.revokeObjectURL(href);
      console.log("download finished!");
      console.timeEnd("timer");
    });
  };

  return <Button onClick={downloadCsvFile}>Download Csv</Button>;
};
