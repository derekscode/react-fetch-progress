import React from "react";
import Toast from "@zoom/sun-ui-core/dist/cjs/Toast";
import IconFileFill from "@zoom/sun-ui-icon/dist/cjs/IconFileFill";
import axios from "axios";
import { Button } from "@mui/material";

export const AxiosExample = () => {
  const downloadCsvFile = (url) => {
    console.log({ url });
    if (url) {
      Toast.info({
        content: "downloading file",
        duration: 3000,
        closable: true,
      });
      const link = document.createElement("a");
      link.href = url;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      Toast.error("error");
    }
  };

  axios({
    url: "http://0.0.0.0:9001/api/v1/e/v/panel/control/download/csv/AbGqhiAeTDeUhq5yNPENjQ?csvType=1", //your url
    method: "GET",
    responseType: "blob", // important
  }).then((response) => {
    // create file link in browser's memory
    const href = URL.createObjectURL(response.data);

    // create "a" HTLM element with href to file & click
    const link = document.createElement("a");
    link.href = href;
    link.setAttribute("download", "file.pdf"); //or any other extension
    document.body.appendChild(link);
    link.click();

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  });

  return <Button>Download Csv</Button>;
};
