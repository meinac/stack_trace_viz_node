import React from "react";
import "./SpanList.css";
import Span from "./Span.js"

const SpanList = ({trace, level}) => {
  if(trace.spans.length === 0) return null;

  const spans = trace.spans.map((span) => {
    return <Span span={span} level={level} />
  });

  return (
    <ul className="span-list">
      {spans}
    </ul>
  );
};

export default SpanList;
