import React from "react";
import "./../../Trace.css"
import TraceCard from "./../TraceCard"
import FlameGraph from "./FlameGraph"

const flameGraphData = (spans) => {
  if(spans.length == 0) return [];

  return spans.flatMap((span) => {
    const children = flameGraphData(span.spans);
    const data = { name: `${span.defined_class} ${span.method_name}`, value: 1, children: children };

    return data;
  });
}

const FlameGraphView = ({ trace, goBack }) => {
  const data = { children: flameGraphData(trace.trace.spans) };

  console.log(data);

  return (
    <div>
      <TraceCard trace={ trace } />
      <div className="control-buttons">
        <div className="back-button"><button onClick={goBack} className="btn btn-light">Go Back</button></div>
      </div>
      <FlameGraph data={data} />
    </div>
  );
};

export default FlameGraphView;
