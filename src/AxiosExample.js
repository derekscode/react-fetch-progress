import React from "react";
import Toast from "@zoom/sun-ui-core/dist/cjs/Toast";
import IconFileFill from "@zoom/sun-ui-icon/dist/cjs/IconFileFill";
import axios from "axios";
import { Button } from "@mui/material";

const tenThousand = "rfdf_zFfQjS7l4HUcck2Ng"; // 12 seconds
const thirtyThousand = "AbGqhiAeTDeUhq5yNPENjQ"; // 47 seconds
// BE timeout usually occurs around 35-40k records
const oneHundredThousand = "ROzwtfXAQP6-IJueEDNoWw"; // times out

const CSVDownloadType = {
  EVENT_DETAIL: 1,
  REGISTRATION_REPORT: 9,
};

export const AxiosExample = () => {
  const downloadCsvFile = (url) => {
    console.log("downloading file...");
    Toast.info({
      content: "Downloading file",
      duration: 0,
      closable: true,
      icon: <IconFileFill style={{ color: "#0E72ED" }} />,
      key: "unique key for this download toast",
    });
    const start = Date.now();

    axios({
      // 1  Event Details Page
      // 9  Registration Report
      url: `http://0.0.0.0:9001/api/v1/e/v/panel/control/download/csv/${oneHundredThousand}?csvType=${CSVDownloadType.REGISTRATION_REPORT}`, //your url
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

      const end = Date.now();
      console.log(`Time elapsed:  ${(end - start) / 1000} seconds`);
    });
  };

  return <Button onClick={downloadCsvFile}>Download Csv</Button>;
};
