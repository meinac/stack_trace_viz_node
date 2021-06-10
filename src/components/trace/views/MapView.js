import React from "react";
import "./../../Trace.css"
import TraceCard from "./../TraceCard"
import ObjectMap from "./ObjectMap"

const MapView = ({ trace, goBack }) => {
  return (
    <div>
      <TraceCard trace={ trace } />
      <div className="control-buttons">
        <div className="back-button"><button onClick={goBack} className="btn btn-light">Go Back</button></div>
      </div>
      <ObjectMap trace={trace.trace} />
    </div>
  );
};

export default MapView;
