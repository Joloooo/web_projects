// src/components/survey/survey.js

import React, { useEffect } from "react";
import surveyData from "./surveyData";

function Survey() {
  useEffect(() => {
    // Dynamically import survey.css when the component mounts
    import("./survey.css");

    // Optional: clean up styles if needed when the component unmounts
    return () => {
      const styleSheet = [...document.styleSheets].find(
        (sheet) => sheet.href && sheet.href.includes("survey.css")
      );
      if (styleSheet) {
        styleSheet.disabled = true;
      }
    };
  }, []);

  return (
    <div className="surveyContainer">
      <video autoPlay muted loop className="hackedVideo">
        <source src={surveyData.videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <main>
        <div className="pink">
          <h1 id="title">{surveyData.title}</h1>
          <p id="description">{surveyData.description}</p>
        </div>

        <form id="survey-form">
          <fieldset>
            <legend>Jolochoices</legend>
            {/* Form contents */}
          </fieldset>
        </form>
      </main>
    </div>
  );
}

export default Survey;
