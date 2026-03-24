import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Partners from "./pages/Partners";
import Documents from "./pages/Documents";
import ResidentialBuildings from "./pages/ResidentialBuildings";
import Contact from "./pages/Contact";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/usluge" element={<Services />} />
              <Route path="/saradnici" element={<Partners />} />
              <Route path="/dokumenta" element={<Documents />} />
              <Route path="/stambene-zgrade" element={<ResidentialBuildings />} />
              <Route path="/kontakt" element={<Contact />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
