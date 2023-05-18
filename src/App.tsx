import "./App.css";
import { useEffect, useState } from "react";
import { Info } from "./Model/Info";
import Header from "./components/Header";
import InputField from "./Screens/InputField";
import { Data } from "./Model/Data";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import axios from "axios";
import DataPage from "./Screens/DataPage";

function App() {
  const [info, setInfo] = useState<Info>({ name: "", phone: "", email: "" });
  const [data, setData] = useState<Data[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const fetchData = async (): Promise<void> => {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    setData(response.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <InputField
                info={info}
                setInfo={setInfo}
                setOpen={setOpen}
                open={open}
              />
            }
          />
          <Route
            path="/show"
            element={
              <DataPage data={data} info={info} open={open} setOpen={setOpen} />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
