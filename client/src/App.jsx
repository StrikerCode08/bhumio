import { useState } from "react";
import axios from "axios";

import "./App.css";
import LabelInput from "./components/LabelInput";

function App() {
  const [data, setData] = useState([]);
  const loadPdf = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_APP_URL}/read/example.pdf`
    );
    setData(res.data);
  };
  return (
    <>
      <div className="container">
        <button onClick={loadPdf}>Load Pdf</button>
        <button>Save Pdf</button>
      </div>
      <div className="contents">
        {data.map((item,index)=>(
          <LabelInput key={item+index} label={item.question} type={item.options} options={item.options} />
        ))}
      </div>
    </>
  );
}

export default App;
