import React, { useState } from "react";
import "./Trace.css"
import TraceCard from "./TraceCard"
import SpanList from "./SpanList"
import ObjectMap from "./ObjectMap"

const Trace = ({ trace, goBack }) => {
  const [listView, setListView] = useState(true);
  const switchView = () => { setListView(!listView); };
  const view = !listView ? <SpanList trace={ trace.trace } level={ 0 } /> : <ObjectMap trace={trace.trace} />

  return (
    <div>
      <TraceCard trace={ trace } />
      <div className="control-buttons">
        <div className="switch-button"><button onClick={switchView} className="btn btn-light">Switch View</button></div>
        <div className="back-button"><button onClick={goBack} className="btn btn-light">Go Back</button></div>
      </div>
      {view}
    </div>
  );
};

export default Trace;
