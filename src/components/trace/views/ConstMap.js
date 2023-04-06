import React from "react";
import { Graphviz } from "graphviz-react";
import "./ObjectMap.css"

const ConstMap = ({ trace }) => {
  const constName = (span) => {
    return span.defined_class.startsWith("#") ? span.receiver : span.defined_class;
  }

  const getLines = (from, spans, memo) => {
    if(spans.length === 0) return [];

    return spans.flatMap((span) => {
      if(from !== null) {
        const from_name = constName(from);
        const to_name = constName(span);


        if(memo[from_name] === undefined) memo[from_name] = {};
        if(memo[from_name][to_name] !== undefined) return getLines(span, span.spans, memo);

        memo[from_name][to_name] = true;
        const line = `"${from_name}" -> "${to_name}"`;

        return [line, getLines(span, span.spans, memo)].flat();
      } else {
        return getLines(span, span.spans, memo);
      }
    });
  };

  const lines = getLines(null, trace.spans, {});

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

export default ConstMap;
