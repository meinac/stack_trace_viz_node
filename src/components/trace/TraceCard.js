import React from "react";
import "./TraceCard.css"

const TraceCard = ({trace}) => {
  return (
    <table className="trace-card">
      <tr><td className="header">File Path:</td><td>{trace.file_path}</td></tr>
      <tr><td className="header">Line Number:</td><td>{trace.line_number}</td></tr>
      <tr><td className="header">Description:</td><td>{trace.description}</td></tr>
      <tr><td className="header">Full Description:</td><td>{trace.full_description}</td></tr>
    </table>
  );
};

export default TraceCard;
