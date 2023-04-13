import React, { useState } from "react";
import List from "./List";
import ListView from "./trace/views/ListView";
import MapView from "./trace/views/MapView";
import ConstMapView from "./trace/views/ConstMapView";
import FlameGraphView from "./trace/views/FlameGraphView";

const Container = ({traces}) => {
  const [{ trace, view }, setTrace] = useState({ trace: null, view: null });

  if(trace !== null) {
    if(view === "list")
      return (<ListView trace={trace} goBack={() => { setTrace({ trace: null, view: null }) }} />);
    else if(view === "heatmap")
      return (<HeatMapView trace={trace} goBack={() => { setTrace({ trace: null, view: null }) }} />);
    else if(view === "map")
      return (<MapView trace={trace} goBack={() => { setTrace({ trace: null, view: null }) }} />);
    else if(view === "constMap")
      return (<ConstMapView trace={trace} goBack={() => { setTrace({ trace: null, view: null }) }} />);
    else if(view === "flameGraph")
      return (<FlameGraphView trace={trace} goBack={() => { setTrace({ trace: null, view: null }) }} />);
  } else {
    return (<List traces={traces} setTrace={setTrace} />)
  }
};

export default Container;
