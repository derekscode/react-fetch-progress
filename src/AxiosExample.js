import React from "react";
import Toast from "@zoom/sun-ui-core/dist/cjs/Toast";
import IconFileFill from "@zoom/sun-ui-icon/dist/cjs/IconFileFill";
import axios from "axios";
import { Button } from "@mui/material";

const tenThousand = "rfdf_zFfQjS7l4HUcck2Ng";
const thirtyThousand = "AbGqhiAeTDeUhq5yNPENjQ";
const oneHundredThousand = "ROzwtfXAQP6-IJueEDNoWw";

const CSVDownloadType = {
  EVENT_DETAIL: 1,
  REGISTRATION_REPORT: 9,
};

export const AxiosExample = () => {
  const downloadCsvFile = (url) => {
    console.log("downloading file...");
    // console.time("timer");
    const start = Date.now();

    axios({
      // 1  Event Details Page
      // 9  Registration Report
      url: `http://0.0.0.0:9001/api/v1/e/v/panel/control/download/csv/${thirtyThousand}?csvType=${CSVDownloadType.EVENT_DETAIL}`, //your url
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
      // console.timeEnd("timer");
      const end = Date.now();
      console.log(`Time elapsed:  ${(end - start) / 1000} seconds`);
    });
  };

  return <Button onClick={downloadCsvFile}>Download Csv</Button>;
};
