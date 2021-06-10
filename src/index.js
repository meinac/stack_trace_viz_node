import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css"
import "./index.css";
import Header from "./components/Header";
import Container from "./components/Container";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { traces: window.trace_data }
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <Container traces={this.state.traces}/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
