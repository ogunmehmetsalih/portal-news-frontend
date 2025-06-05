import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Link,
} from "react-router-dom";
import "antd/dist/reset.css"; // Ant Design CSS
import DashboardPage from "./pages/DashboardPage";
import DuyurularPage from "./pages/DuyurularPage";
import HaberlerPage from "./pages/HaberlerPage";
import AnketlerPage from "./pages/AnketlerPage";
import TakvimPage from "./pages/TakvimPage";
import GorevlerPage from "./pages/GorevlerPage";
import GeribildirimPage from "./pages/GeribildirimPage";
import KullanicilarPage from "./pages/KullanicilarPage";
import ProfilPage from "./pages/ProfilPage";
import AyarlarPage from "./pages/AyarlarPage";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import {
  Sun,
  Moon,
  LayoutDashboard,
  Bell,
  Newspaper,
  BarChart3,
  CalendarRange,
  CheckSquare,
  MessageSquare,
  UserCog,
  ChevronDown,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import "./App.css";

function Navigation() {
  const { isDark, toggleTheme } = useTheme();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications] = useState([
    { id: 1, text: "Yeni görev atandı: Rapor hazırlama", time: "5 dk önce" },
    {
      id: 2,
      text: "Toplantı hatırlatması: Proje değerlendirme",
      time: "1 saat önce",
    },
    { id: 3, text: "Yeni duyuru: Şirket pikniği", time: "2 saat önce" },
    { id: 4, text: "Yeni mesaj: Ahmet Yılmaz", time: "3 saat önce" },
  ]);

  return (
    <div className={`flex h-screen ${isDark ? "dark" : ""}`}>
      {/* Sol Menü */}
      <nav className="sidebar group w-16 hover:w-64 transition-all duration-300 ease-in-out bg-[#1a1f37] dark:bg-gray-900 text-white p-4 flex flex-col">
        <div className="flex items-center justify-center mb-10">
          <img
            src="/30691intellium_logo_2.png"
            alt="Intellium"
            className="w-14 h-14 object-contain"
          />
        </div>

        <NavLink
          to="/"
          className={({ isActive }) => `
          flex items-center space-x-3 p-2 rounded-lg mb-2
          ${isActive ? "bg-blue-600" : "hover:bg-blue-500/20"}
          whitespace-nowrap overflow-hidden
        `}
        >
          <LayoutDashboard size={20} />
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Ana Sayfa
          </span>
        </NavLink>

        <NavLink
          to="/duyurular"
          className={({ isActive }) => `
          flex items-center space-x-3 p-2 rounded-lg mb-2
          ${isActive ? "bg-blue-600" : "hover:bg-blue-500/20"}
          whitespace-nowrap overflow-hidden
        `}
        >
          <Bell size={20} />
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Duyurular
          </span>
        </NavLink>

        <NavLink
          to="/haberler"
          className={({ isActive }) => `
          flex items-center space-x-3 p-2 rounded-lg mb-2
          ${isActive ? "bg-blue-600" : "hover:bg-blue-500/20"}
          whitespace-nowrap overflow-hidden
        `}
        >
          <Newspaper size={20} />
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Haberler
          </span>
        </NavLink>

        <NavLink
          to="/anketler"
          className={({ isActive }) => `
          flex items-center space-x-3 p-2 rounded-lg mb-2
          ${isActive ? "bg-blue-600" : "hover:bg-blue-500/20"}
          whitespace-nowrap overflow-hidden
        `}
        >
          <BarChart3 size={20} />
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Anketler
          </span>
        </NavLink>

        <NavLink
          to="/takvim"
          className={({ isActive }) => `
          flex items-center space-x-3 p-2 rounded-lg mb-2
          ${isActive ? "bg-blue-600" : "hover:bg-blue-500/20"}
          whitespace-nowrap overflow-hidden
        `}
        >
          <CalendarRange size={20} />
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Takvim
          </span>
        </NavLink>

        <NavLink
          to="/gorevler"
          className={({ isActive }) => `
          flex items-center space-x-3 p-2 rounded-lg mb-2
          ${isActive ? "bg-blue-600" : "hover:bg-blue-500/20"}
          whitespace-nowrap overflow-hidden
        `}
        >
          <CheckSquare size={20} />
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Görevler
          </span>
        </NavLink>

        <NavLink
          to="/geri-bildirim"
          className={({ isActive }) => `
          flex items-center space-x-3 p-2 rounded-lg mb-2
          ${isActive ? "bg-blue-600" : "hover:bg-blue-500/20"}
          whitespace-nowrap overflow-hidden
        `}
        >
          <MessageSquare size={20} />
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Geri Bildirim
          </span>
        </NavLink>

        <NavLink
          to="/kullanicilar"
          className={({ isActive }) => `
          flex items-center space-x-3 p-2 rounded-lg mb-2
          ${isActive ? "bg-blue-600" : "hover:bg-blue-500/20"}
          whitespace-nowrap overflow-hidden
        `}
        >
          <UserCog size={20} />
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Kullanıcılar
          </span>
        </NavLink>
      </nav>

      <div className="flex-1 flex flex-col">
        {/* Üst Çubuk */}
        <header className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
          <div className="flex items-center justify-end h-16 px-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-200"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Notifications Dropdown */}
            <div className="relative ml-4">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-200 relative"
              >
                <Bell size={20} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Bildirimler
                    </h3>
                    <div className="space-y-4">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className="flex items-start gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        >
                          <Bell size={16} className="text-blue-500 mt-1" />
                          <div>
                            <p className="text-sm text-gray-700 dark:text-gray-200">
                              {notification.text}
                            </p>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              {notification.time}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button className="w-full mt-4 text-sm text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 text-center">
                      Tüm bildirimleri gör
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative ml-4">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-200"
              >
                <img
                  src="https://ui-avatars.com/api/?name=Mehmet+Salih"
                  alt="Mehmet Salih"
                  className="w-8 h-8 rounded-full border-2 border-gray-200 dark:border-gray-600"
                />
                <ChevronDown size={16} />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-[9999]">
                  <div className="py-2">
                    <Link
                      to="/profil"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <User size={16} />
                      <span>Profil</span>
                    </Link>
                    <Link
                      to="/ayarlar"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <Settings size={16} />
                      <span>Ayarlar</span>
                    </Link>
                    <button
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-700"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <LogOut size={16} />
                      <span>Çıkış Yap</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Ana İçerik */}
        <main className="flex-1 bg-gray-50 dark:bg-gray-900 overflow-auto">
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/duyurular" element={<DuyurularPage />} />
            <Route path="/haberler" element={<HaberlerPage />} />
            <Route path="/anketler" element={<AnketlerPage />} />
            <Route path="/takvim" element={<TakvimPage />} />
            <Route path="/gorevler" element={<GorevlerPage />} />
            <Route path="/geri-bildirim" element={<GeribildirimPage />} />
            <Route path="/kullanicilar" element={<KullanicilarPage />} />
            <Route path="/profil" element={<ProfilPage />} />
            <Route path="/ayarlar" element={<AyarlarPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Navigation />
      </Router>
    </ThemeProvider>
  );
}

export default App;
