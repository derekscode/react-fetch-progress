import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import LinearProgress from "@mui/material/LinearProgress";

function App() {
  const [percentage, setPercentage] = useState(0);
  const [progress, setProgress] = useState(null);

  const download = () => {
    const documentStyles = document.documentElement.style;
    let progress = 0;

    setProgress("in-progress");

    axios({
      url: "https://www.placecage.com/3499/3499",
      onDownloadProgress(progressEvent) {
        progress = Math.round(
          (progressEvent.loaded / progressEvent.total) * 100
        );

        setPercentage(progress);

        documentStyles.setProperty("--progress", `${progress}%`);
      },
    }).then((response) => {
      setProgress("finished");
    });
  };

  return (
    <LinearProgress variant="determinate" value={progress} />

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
