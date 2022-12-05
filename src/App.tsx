import React, { createContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Form from "./pages/Form/Form";
import "./App.scss";
import AppContext from "./context/context";

function App() {
  return (
    <BrowserRouter>
      <AppContext>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/forms" element={<Form />} />
        </Routes>
      </AppContext>
    </BrowserRouter>
  );
}

export default App;
