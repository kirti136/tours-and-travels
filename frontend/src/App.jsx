import React from "react";
import "./app.css";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import DashboardPage from "./Pages/DashboardPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
