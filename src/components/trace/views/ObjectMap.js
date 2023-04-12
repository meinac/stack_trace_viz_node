import React from "react";
import { Graphviz } from "graphviz-react";
import "./ObjectMap.css"

const ObjectMap = ({ trace }) => {
  const getLines = (from, spans) => {
    if(spans.length === 0) return [];

    return spans.flatMap((span) => {
      if(from !== null) {
        const line = `"${from.receiver}" -> "${span.receiver}" [label="${span.method_name}"]`;
        return [line, getLines(span, span.spans)].flat();
      } else {
        return getLines(span, span.spans);
      }
    });
  };

  const lines = getLines(null, trace.spans);

  if(lines.length > 0) {
    const dotSrc = `digraph {${lines.join("; ")}}`;
    const options = {
      fit: true,
      height: 500,
      width: "100%",
      zoom: true
    };

    return (<Graphviz dot={dotSrc} options={options} />);
  } else {
    return (<div>No relation found!</div>)
  }
};

export default ObjectMap;
