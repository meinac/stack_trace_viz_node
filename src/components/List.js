import React  from "react";
import BootstrapTable from "react-bootstrap-table-next";
import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit.min";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "./List.css"
import maxDepth from "./../utils/maxDepth.js"
import humanizeDuration from "./../utils/humanizeDuration.js"

const List = ({traces, setTrace}) => {
  if(traces !== null) {
    if(!Array.isArray(traces)) traces = [traces];

    const { SearchBar, ClearSearchButton } = Search;
    const durationFormatter = (cell, row, rowIndex, formatExtraData) => { return row.trace ? humanizeDuration((row.trace.spans.reduce((sum, span) => { return sum + span.duration }, 0)).toFixed(1)) : "N/A" };
    const spanCountFormatter = (cell, row, rowIndex, formatExtraData) => { return (row.trace ? row.trace.spans.length : 0) };
    const depthFormatter = (cell, row, rowIndex, formatExtraData) => { return (row.trace ? maxDepth(row.trace.spans) : 0) };
    const listViewactionFormatter = (cell, row, rowIndex, formatExtraData) => { return <button onClick={ () => { setTrace({ trace: row, view: "list" }) } } className="btn btn-light">List View</button> };
    const mapViewactionFormatter = (cell, row, rowIndex, formatExtraData) => { return <button onClick={ () => { setTrace({ trace: row, view: "map" }) } } className="btn btn-light">Object Map View</button> };
    const constMapViewactionFormatter = (cell, row, rowIndex, formatExtraData) => { return <button onClick={ () => { setTrace({ trace: row, view: "constMap" }) } } className="btn btn-light">Const Map View</button> };

    const columns = [
      {
        dataField: "file_path",
        text: "File Name",
        sort: true,
        searchable: true,
        classes: "file-path-column"
      }, {
        dataField: "line_number",
        text: "Line",
        sort: true,
        headerStyle: (colum, colIndex) => {
          return { width: "80px", textAlign: "center" };
        }
      }, {
        dataField: "description",
        text: "Description",
        classes: "description-column"
      }, {
        dataField: "time_taken",
        text: "Duration",
        formatter: durationFormatter,
        headerStyle: (colum, colIndex) => {
          return { width: "90px", textAlign: "center" };
        }
      }, {
        dataField: "span_count",
        text: "Spans",
        sort: true,
        formatter: spanCountFormatter,
        headerStyle: (colum, colIndex) => {
          return { width: "80px", textAlign: "center" };
        }
      }, {
        dataField: "depth",
        text: "Depth",
        formatter: depthFormatter,
        headerStyle: (colum, colIndex) => {
          return { width: "80px", textAlign: "center" };
        }
      }, {
        dataField: "",
        text: "",
        formatter: listViewactionFormatter,
        headerStyle: (colum, colIndex) => {
          return { width: "80px", textAlign: "center" };
        }
      }, {
        dataField: "",
        text: "",
        formatter: mapViewactionFormatter,
        headerStyle: (colum, colIndex) => {
          return { width: "80px", textAlign: "center" };
        }
      }, {
        dataField: "",
        text: "",
        formatter: constMapViewactionFormatter,
        headerStyle: (colum, colIndex) => {
          return { width: "80px", textAlign: "center" };
        }
      }
    ];

    return (
      <ToolkitProvider
        keyField="id"
        data={ traces }
        columns={ columns }
        search
      >
        {
          props => (
            <div className="trace-table">
              <label>Search file path:</label>
              <SearchBar { ...props.searchProps } />
              <ClearSearchButton { ...props.searchProps } />

              <BootstrapTable { ...props.baseProps }/>
            </div>
          )
        }
      </ToolkitProvider>
    );
  } else {
    return (<div>No trace found!</div>);
  }
};

export default List;
