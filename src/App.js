import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import { Button } from "@mui/material";
import { AxiosExample } from "./AxiosExample";
// import LinearProgress from "@mui/material/LinearProgress";

function App() {
  const [percentage, setPercentage] = useState(0);
  const [progress, setProgress] = useState(null);

  // https://www.webtips.dev/how-to-make-a-download-progress-indicator-in-react
  const download = () => {
    const documentStyles = document.documentElement.style;
    let progress = 0;

    setProgress("in-progress");

    axios({
      // url: "https://www.placecage.com/3499/3499",
      // 1  Event Details Page
      // 9  Registration Report
      url: "http://0.0.0.0:9001/api/v1/e/v/panel/control/download/csv/AbGqhiAeTDeUhq5yNPENjQ?csvType=9",
      onDownloadProgress(progressEvent) {
        console.log("starting download...");
        progress = Math.round(
          (progressEvent.loaded / progressEvent.total) * 100
        );

        setPercentage(progress);

        documentStyles.setProperty("--progress", `${progress}%`);
      },
    }).then((response) => {
      console.log("download finished!");
      setProgress("finished");
    });
  };

  return (
    <AxiosExample />

    // <div>
    //   <Button onClick={download}>download</Button>
    // </div>
    // <LinearProgress variant="determinate" value={progress} />

    // <div className={`progress-button ${progress}`}>
    //     <span className="loading-text">Loading</span>
    //         <button className="download-button" onClick={download}>
    //             <span className="button-text">{progress === 'finished' ? '🎉 Done' : 'Download'}</span>
    //         </button>
    //     <span className="percentage">{percentage}%</span>
    // </div>
  );
}

export default App;
