import React from "react";

const ObjectTable = ({ objectCounts }) => {
  return (
    <table>
      <tr>
        {Object.keys(objectCounts).map(type => <th style={ { textAlign: "center" } }>{type}</th>)}
      </tr>
      <tr>
        {Object.values(objectCounts).map(type => <td style={ { textAlign: "center" } }>{type}</td>)}
      </tr>
    </table>
  )
}

export default ObjectTable;
