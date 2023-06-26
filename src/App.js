import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Contacts from "./components/Contacts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Contacts />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
