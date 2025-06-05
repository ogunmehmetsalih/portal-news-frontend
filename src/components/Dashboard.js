import React, { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Bell, Calendar, MessageSquare, Settings, UserCheck, Users, Plus, Clock3, Megaphone, ThumbsUp, MessageCircle, LayoutDashboard, Newspaper, BarChart, Sun, Moon, MessageCircleMore, ClipboardList, Languages, CheckCircle, AlertCircle, CheckSquare, TrendingUp, Clock, CheckCircle2, X, MoreVertical } from "lucide-react";

export default function Dashboard() {
  const [selectedTheme, setSelectedTheme] = useState("light");
  const [selectedLanguage, setSelectedLanguage] = useState("TR");
  const [quote] = useState("Verimlilik; zamanı iyi yönetmekle, ekibi doğru yönlendirmekle başlar.");
  const [tasks, setTasks] = useState([
    { id: 1, text: "Toplantı notlarını yükle", completed: false },
    { id: 2, text: "Yeni duyuruyu planla", completed: true }
  ]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [newFeedback, setNewFeedback] = useState("");
  const [activeTab, setActiveTab] = useState("dashboard");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: '',
    content: '',
    date: '',
    department: '',
    priority: 'normal'
  });
  const [isTaskDrawerOpen, setIsTaskDrawerOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'normal',
    assignees: []
  });

  const toggleTask = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, completed: !task.completed } : task));
  };

  const addFeedback = () => {
    if (newFeedback.trim()) {
      setFeedbacks([...feedbacks, newFeedback]);
      setNewFeedback("");
    }
  };

  const handleAnnouncementSubmit = (e) => {
    e.preventDefault();
    console.log('Yeni duyuru:', newAnnouncement);
    setIsDrawerOpen(false);
    setNewAnnouncement({
      title: '',
      content: '',
      date: '',
      department: '',
      priority: 'normal'
    });
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    console.log('Yeni görev:', newTask);
    setIsTaskDrawerOpen(false);
    setNewTask({
      title: '',
      description: '',
      dueDate: '',
      priority: 'normal',
      assignees: []
    });
  };

  return (
    <div className={`flex ${selectedTheme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <aside className="w-64 min-h-screen bg-[#1E1F29] text-white p-4 space-y-6 flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight mb-6"> Intellium</h2>
          <nav className="space-y-2">
            <div className={`flex items-center gap-3 text-sm p-2 rounded cursor-pointer ${activeTab === "dashboard" ? "bg-[#2A2B38]" : "hover:bg-[#2A2B38]"}`} onClick={() => setActiveTab("dashboard")}><LayoutDashboard className="h-4 w-4" /> Dashboard</div>
            <div className={`flex items-center gap-3 text-sm p-2 rounded cursor-pointer ${activeTab === "duyurular" ? "bg-[#2A2B38]" : "hover:bg-[#2A2B38]"}`} onClick={() => setActiveTab("duyurular")}><Megaphone className="h-4 w-4" /> Duyurular</div>
            <div className={`flex items-center gap-3 text-sm p-2 rounded cursor-pointer ${activeTab === "haberler" ? "bg-[#2A2B38]" : "hover:bg-[#2A2B38]"}`} onClick={() => setActiveTab("haberler")}><Newspaper className="h-4 w-4" /> Haberler</div>
            <div className={`flex items-center gap-3 text-sm p-2 rounded cursor-pointer ${activeTab === "anketler" ? "bg-[#2A2B38]" : "hover:bg-[#2A2B38]"}`} onClick={() => setActiveTab("anketler")}><BarChart className="h-4 w-4" /> Anketler</div>
            <div className={`flex items-center gap-3 text-sm p-2 rounded cursor-pointer ${activeTab === "takvim" ? "bg-[#2A2B38]" : "hover:bg-[#2A2B38]"}`} onClick={() => setActiveTab("takvim")}><Calendar className="h-4 w-4" /> Takvim</div>
            <div className={`flex items-center gap-3 text-sm p-2 rounded cursor-pointer ${activeTab === "gorevler" ? "bg-[#2A2B38]" : "hover:bg-[#2A2B38]"}`} onClick={() => setActiveTab("gorevler")}><ClipboardList className="h-4 w-4" /> Görevler</div>
            <div className={`flex items-center gap-3 text-sm p-2 rounded cursor-pointer ${activeTab === "geribildirim" ? "bg-[#2A2B38]" : "hover:bg-[#2A2B38]"}`} onClick={() => setActiveTab("geribildirim")}><MessageCircleMore className="h-4 w-4" /> Geri Bildirim</div>
            <div className={`flex items-center gap-3 text-sm p-2 rounded cursor-pointer ${activeTab === "kullanicilar" ? "bg-[#2A2B38]" : "hover:bg-[#2A2B38]"}`} onClick={() => setActiveTab("kullanicilar")}><Users className="h-4 w-4" /> Kullanıcılar</div>
          </nav>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span>Dil:</span>
            <select className="bg-[#2A2B38] text-white rounded px-2 py-1 text-xs" value={selectedLanguage} onChange={(e) => setSelectedLanguage(e.target.value)}>
              <option value="TR">TR</option>
              <option value="EN">EN</option>
            </select>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span>Tema:</span>
            <Button variant="ghost" size="sm" onClick={() => setSelectedTheme(selectedTheme === "light" ? "dark" : "light")}>{selectedTheme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}</Button>
          </div>
        </div>
      </aside>

      <div className="flex-1 p-6 min-h-screen space-y-8">
       {activeTab === "dashboard" && (
  <>
    {/* Header - Daha modern ve çekici */}
    <header className="flex items-center justify-between bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-xl shadow-sm">
      <h1 className="text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-400 dark:to-blue-200">
        Dashboard
      </h1>
      <div className="flex gap-4 items-center">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 text-center text-lg font-semibold flex items-center justify-center text-white shadow-lg">
          Z
        </div>
        <Button className="bg-red-500 hover:bg-red-600 text-white shadow-lg transition-all duration-200">
          <Bell className="mr-2 h-4 w-4" />
          Bildirim
        </Button>
      </div>
    </header>

    {/* Motivasyon Sözü - Daha çekici tasarım */}
    <Card className="bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-xl">
      <CardContent className="p-6">
        <p className="text-lg font-medium italic">
          "Zorluklar seni durdurmak için değil, seni güçlendirmek için vardır."
        </p>
      </CardContent>
    </Card>

    {/* İstatistik Kartları - Daha modern ve interaktif */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white transform hover:scale-105 transition-all duration-200 shadow-xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Toplam Kullanıcı</p>
              <h3 className="text-3xl font-bold mt-2">256</h3>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <Users className="h-8 w-8" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white transform hover:scale-105 transition-all duration-200 shadow-xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Aktif Görevler</p>
              <h3 className="text-3xl font-bold mt-2">18</h3>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <ClipboardList className="h-8 w-8" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white transform hover:scale-105 transition-all duration-200 shadow-xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Yeni Duyurular</p>
              <h3 className="text-3xl font-bold mt-2">12</h3>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <Megaphone className="h-8 w-8" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white transform hover:scale-105 transition-all duration-200 shadow-xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm opacity-80">Aktif Projeler</p>
              <h3 className="text-3xl font-bold mt-2">8</h3>
            </div>
            <div className="bg-white/20 p-3 rounded-lg">
              <BarChart className="h-8 w-8" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>

    {/* Son Duyurular - Daha modern ve interaktif */}
    <div className="mt-6">
      <h2 className="text-xl font-bold text-blue-700 dark:text-blue-400 mb-4 flex items-center gap-2">
        <Megaphone className="h-5 w-5" />
        Son Duyurular
      </h2>
      <div className="space-y-3">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-lg">
              <Bell className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="font-medium">Sistem bakımı duyurusu yayınlandı</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">1 Nisan</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="bg-green-100 dark:bg-green-900/30 p-2 rounded-lg">
              <Calendar className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="font-medium">Seminer duyurusu güncellendi</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">2 Nisan</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
              <MessageSquare className="h-5 w-5 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="font-medium">Yeni anket eklendi: Uzaktan çalışma tercihleri</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">3 Nisan</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
)}
{activeTab === "gorevler" && (
  <div className="space-y-8">
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold text-blue-800 flex items-center gap-2">
        <ClipboardList className="h-6 w-6" /> Görevler
      </h2>
      <Button 
        onClick={() => setIsTaskDrawerOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
      >
        <Plus size={20} />
        Yeni Görev
      </Button>
    </div>

    {/* Drawer */}
    <div className={`fixed inset-y-0 right-0 w-96 bg-white dark:bg-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out ${isTaskDrawerOpen ? 'translate-x-0' : 'translate-x-full'} z-50`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Yeni Görev Ekle</h2>
          <button 
            onClick={() => setIsTaskDrawerOpen(false)}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X size={24} />
          </button>
        </div>
        
        <form onSubmit={handleTaskSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Başlık</label>
            <input
              type="text"
              value={newTask.title}
              onChange={(e) => setNewTask({...newTask, title: e.target.value})}
              className="w-full p-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Açıklama</label>
            <textarea
              value={newTask.description}
              onChange={(e) => setNewTask({...newTask, description: e.target.value})}
              rows={4}
              className="w-full p-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Bitiş Tarihi</label>
            <input
              type="datetime-local"
              value={newTask.dueDate}
              onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
              className="w-full p-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">Öncelik</label>
            <select
              value={newTask.priority}
              onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
              className="w-full p-2 rounded-lg border dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              required
            >
              <option value="low">Düşük</option>
              <option value="normal">Normal</option>
              <option value="high">Yüksek</option>
            </select>
          </div>

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg">
            Görev Ekle
          </button>
        </form>
      </div>
      {isTaskDrawerOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity z-40"
          onClick={() => setIsTaskDrawerOpen(false)}
        />
      )}
    </div>
  </div>
)}
      </div>
    </div>
  );
}