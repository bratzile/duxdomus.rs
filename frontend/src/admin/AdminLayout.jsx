import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';
import {
  Building2, LayoutDashboard, FileText, Settings,
  LogOut, Menu, X, ChevronRight
} from 'lucide-react';

const navItems = [
  { href: '/zscms', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/zscms/blog', label: 'Blog', icon: FileText },
  { href: '/zscms/content', label: 'Sadržaj sajta', icon: Settings },
];

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logout } = useAdmin();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/zscms');
  };

  const isActive = (item) => {
    if (item.exact) return location.pathname === item.href;
    return location.pathname.startsWith(item.href);
  };

  const Sidebar = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-[#1a3d6e]">
        <div className="w-9 h-9 rounded-lg bg-[#28a8e0] flex items-center justify-center flex-shrink-0">
          <Building2 size={18} className="text-white" />
        </div>
        <div>
          <div className="font-bold text-white text-sm">DUX DOMUS</div>
          <div className="text-[#7dd3f8] text-xs">Admin panel</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const active = isActive(item);
          return (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
                ${active
                  ? 'bg-[#28a8e0] text-white'
                  : 'text-[#a8c8e8] hover:bg-[#1a3d6e] hover:text-white'
                }`}
            >
              <item.icon size={16} />
              {item.label}
              {active && <ChevronRight size={14} className="ml-auto" />}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 pb-4 border-t border-[#1a3d6e] pt-3">
        <Link
          to="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#a8c8e8] hover:bg-[#1a3d6e] hover:text-white transition-colors mb-1"
        >
          <Building2 size={16} />
          Pogledaj sajt
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[#a8c8e8] hover:bg-red-500/20 hover:text-red-300 transition-colors"
        >
          <LogOut size={16} />
          Odjavi se
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-[#f4f9ff] overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex flex-col w-56 bg-[#0a2d5e] flex-shrink-0">
        <Sidebar />
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="w-56 bg-[#0a2d5e] flex flex-col">
            <Sidebar />
          </div>
          <div className="flex-1 bg-black/50" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3 flex-shrink-0">
          <button
            className="lg:hidden p-1.5 rounded-md text-gray-500 hover:bg-gray-100"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={20} />
          </button>
          <div className="text-sm font-semibold text-[#0a2d5e]">
            {navItems.find(n => isActive(n))?.label || 'Admin'}
          </div>
        </div>

        {/* Page content */}
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
