import "./styles/App.scss";
import Form from "./components/Form";
import Graph from "./components/Graph";
import { useSelector } from "react-redux";
import { selectData } from "./components/Form/formSlice";

function App() {
  const formData = useSelector(selectData);

  return (
    <div className="body">
      <Form />
      {typeof formData === "object" ? <Graph data={formData} /> : ""}
    </div>
  );
}

export default App;
