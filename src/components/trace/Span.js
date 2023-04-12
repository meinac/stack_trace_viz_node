import React, { useState } from "react";
import "./Span.css";
import SpanList from "./SpanList.js"
import maxDepth from "./../../utils/maxDepth.js"
import humanizeDuration from "./../../utils/humanizeDuration.js"

const exceptionVisualizer = (exception) => {
  if(exception === null) return "N/A";

  return exception;
}

const argumentVisularizer = (key, value) => {
  return (
    <tr><td className="nested-table-key">{key}:</td><td>{value.slice(0, 100)}</td></tr>
  );
}

const argsVisularizer = (args) => {
  if(typeof args === "undefined") return;

  return (<table>{Object.keys(args).map((key, index) => { return argumentVisularizer(key, args[key]) })}</table>);
}

const Span = ({ span, level }) => {
  const depth = maxDepth(span.spans);
  const padding = level * 50;
  const paddingStyle = { "padding-left": `${padding}px` };

  const [showNested, setShowNested] = useState(false);
  const nestedSpansStyle = { "display": showNested ? "inline" : "none" };
  const changeSpansSytle = () => { setShowNested(!showNested) };
  const showNestedButtonStyle = { "display": span.spans.length > 0 ? "inline" : "none" };
  const showNestedButtonContent = `${depth} ` + (showNested ? "↧" : "↦");

  const [showDetails, setShowDetails] = useState(false);
  const spanDetailsStyle = { "display": showDetails ? "table" : "none" };
  const switchDetails = () => { setShowDetails(!showDetails) }

  return (
    <li className={(typeof span.exception === "undefined" || span.exception === null) ? "success" : "exception"}>
      <div className="span-info" style={paddingStyle}>
        <div className="span-basic">
          <button
            className="nested-spans-button"
            style={showNestedButtonStyle}
            onClick={changeSpansSytle}>
              {showNestedButtonContent}
          </button>
          <button
            className="switch-details-button"
            onClick={switchDetails}>{span.receiver}#{span.method_name}</button>
        </div>
        <div className="span-details" style={spanDetailsStyle}>
          <table>
            <tr>
              <td className="detail-key" valign="top">Time Taken:</td><td>{humanizeDuration(span.duration)}</td>
            </tr>
            <tr>
              <td className="detail-key" valign="top">Arguments:</td><td>{argsVisularizer(span.arguments)}</td>
            </tr>
            <tr>
              <td className="detail-key" valign="top">Value:</td><td>{span.return_value}</td>
            </tr>
            <tr>
              <td className="detail-key" valign="top">Exception:</td><td>{exceptionVisualizer(span.exception)}</td>
            </tr>
          </table>
        </div>
      </div>
      {showNested &&
        (<div className="nested-spans" style={nestedSpansStyle}><SpanList trace={span} level={level + 1}/></div>)
      }
    </li>
  );
};

export default Span;
