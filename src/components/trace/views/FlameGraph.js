import React, { useEffect, useRef } from 'react';
import { flamegraph } from 'd3-flame-graph';
import * as d3 from 'd3';
import './FlameGraph.css';

const FlameGraph = ({ data }) => {
  const flameGraphRef = useRef(null);

  useEffect(() => {
    const flameGraph = flamegraph()
      .width(window.innerWidth)
      .minHeight(100)
      .cellHeight(25);

    const d3Chart = d3.select(flameGraphRef.current)
        .datum(data)
        .call(flameGraph);

    return () => {
      flameGraph.destroy();
      d3Chart.selectAll("*").remove();
    };
  }, [data]);

  return <div ref={flameGraphRef}></div>;
};

export default FlameGraph;
