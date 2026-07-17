import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useParams, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { AdminProvider, useAdmin } from "./contexts/AdminContext";
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
import AdminLogin from "./admin/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import AdminBlog from "./admin/AdminBlog";
import AdminContent from "./admin/AdminContent";

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [pathname]);
  return null;
};

// Blog post route
const BlogPostRoute = () => {
  const { slug } = useParams();
  return <Blog slug={slug} />;
};

// Protected admin route
const ProtectedAdmin = ({ children }) => {
  const { isAuthenticated, loading } = useAdmin();
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#28a8e0]/30 border-t-[#28a8e0] rounded-full animate-spin" />
    </div>
  );
  if (!isAuthenticated) return <Navigate to="/zscms" replace />;
  return <AdminLayout>{children}</AdminLayout>;
};

// /zscms root — login or dashboard
const AdminRoot = () => {
  const { isAuthenticated, loading } = useAdmin();
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#28a8e0]/30 border-t-[#28a8e0] rounded-full animate-spin" />
    </div>
  );
  if (!isAuthenticated) return <AdminLogin />;
  return <AdminLayout><AdminDashboard /></AdminLayout>;
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Admin routes — wrapped in AdminProvider, no Navbar/Footer */}
          <Route path="/zscms/*" element={
            <AdminProvider>
              <Routes>
                <Route index element={<AdminRoot />} />
                <Route path="blog" element={<ProtectedAdmin><AdminBlog /></ProtectedAdmin>} />
                <Route path="content" element={<ProtectedAdmin><AdminContent /></ProtectedAdmin>} />
              </Routes>
            </AdminProvider>
          } />

          {/* Public routes — completely independent of AdminProvider */}
          <Route path="*" element={
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
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
