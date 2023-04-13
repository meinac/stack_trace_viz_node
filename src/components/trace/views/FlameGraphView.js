import React from "react";
import "./../../Trace.css"
import humanizeSpan from "./../../../utils/humanizeSpan.js"
import TraceCard from "./../TraceCard"
import FlameGraph from "./FlameGraph"

const comparaSpans = (a, b) => {
  if(`${a.self_class} ${a.method_name}` < `${b.self_class} ${b.method_name}`) {
    return -1;
  } else if(`${a.self_class} ${a.method_name}` > `${b.self_class} ${b.method_name}`) {
    return 1;
  } else {
    return 0;
  }
}

const mergeSpans = (spans) => {
  const sortedSpans = spans.sort(comparaSpans);
  const mergedSpans = [];

  for(let i = 0; i < sortedSpans.length; i++) {
    let current = sortedSpans[i];

    for(let j = i + 1; j < sortedSpans.length; j++) {
      if(comparaSpans(current, sortedSpans[j]) == 0) {
        current.duration += sortedSpans[j].duration;
        current.spans = current.spans.concat(sortedSpans[j].spans);

        i = j; // so it does not pass through same item.
      } else {
        break;
      }
    }

    mergedSpans.push(current);
  }

  return mergedSpans;
};

const flameGraphData = (spans) => {
  if(spans.length == 0) return [];

  return mergeSpans(spans).flatMap((span) => {
    const children = flameGraphData(span.spans);
    const data = { name: humanizeSpan(span), value: span.duration, children: children };

    return data;
  });
}

const totalDuration = (trace) => {
  return trace.spans.reduce((sum, span) => {
    return sum + span.duration
  }, 0);
};

const FlameGraphView = ({ trace, goBack }) => {
  const traceStr = JSON.stringify(trace.trace);
  const traceDup = JSON.parse(traceStr);

  const data = { children: flameGraphData(traceDup.spans), name: "root", value: totalDuration(traceDup) };

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
