import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useParams, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Partners from "./pages/Partners";
import Documents from "./pages/Documents";
import ResidentialBuildings from "./pages/ResidentialBuildings";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Referral from "./pages/Referral";

// Scroll to top on every route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
};

const BlogPostRoute = () => {
  const { slug } = useParams();
  return <Blog slug={slug} />;
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/usluge" element={<Services />} />
              <Route path="/saradnici" element={<Partners />} />
              <Route path="/dokumenta" element={<Documents />} />
              <Route path="/stambene-zgrade" element={<ResidentialBuildings />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPostRoute />} />
              <Route path="/saradnja" element={<Referral />} />
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
