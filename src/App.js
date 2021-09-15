import "./App.scss";
import Form from "./components/Form";
import Graph from "./components/Graph";
import { useState } from "react";

function App() {
  const [data, setData] = useState();
  return (
    <div className="body">
      <Form setData={setData} />
      {typeof data === "object" ? <Graph data={data} /> : ""}
    </div>
  );
}

export default App;
