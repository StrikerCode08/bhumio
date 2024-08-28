import { useState } from "react";
import axios from "axios";

import "./App.css";
import LabelInput from "./components/LabelInput";

function App() {
  const [data, setData] = useState([]);
  const loadPdf = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_APP_URL}/read/example.pdf`
      );
      setData(res.data);
    } catch (error) {
      alert(error.message)
    }
  };
  const savePdf = async () =>{
    try {
      await axios.post(`${import.meta.env.VITE_APP_URL}/update`,data)
    } catch (error) {
      alert(error.message)
    }
  }
  const handleChange=(id, value) => {
    setData(prevQuestions =>
      prevQuestions.map(q =>
        q.id === id ? { ...q, answer: value } : q
      )
    );
  };
  return (
    <>
      <div className="container">
        <button onClick={loadPdf}>Load Pdf</button>
        <button onClick={savePdf}>Save Pdf</button>
      </div>
      <div className="contents">
        {data.map((item)=>(
          <LabelInput key={item.id} label={item.question} type={item.options} options={item.options} handleChange={handleChange} answer={item.answer} id={item.id}/>
        ))}
      </div>
    </>
  );
}

export default App;
