import React from "react";
import "./../../Trace.css"
import TraceCard from "./../TraceCard"
import SpanList from "./../SpanList"

const ListView = ({ trace, goBack }) => {
  return (
    <div>
      <TraceCard trace={ trace } />
      <div className="control-buttons">
        <div className="back-button"><button onClick={goBack} className="btn btn-light">Go Back</button></div>
      </div>
      <SpanList trace={ trace.trace } level={ 0 } />
    </div>
  );
};

export default ListView;
