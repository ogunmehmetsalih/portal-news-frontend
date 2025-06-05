import React, { useState } from 'react';
import { Card, CardContent } from "../components/ui/card";
import { LayoutDashboard, Bell, CheckSquare } from 'lucide-react';
import HeaderComponent from '../components/HeaderComponent';

export default function DashboardPage() {
  const [announcements] = useState([
    { id: 1, title: "Yeni Ofis Açılışı", date: "2025-03-25", content: "İzmir'de yeni ofisimiz açılıyor." },
    { id: 2, title: "İK Politikası Güncellemesi", date: "2025-03-18", content: "İzin kullanım detayları güncellendi." }
  ]);
  const [tasks] = useState([
    { id: 1, title: "Rapor Hazırlama", completed: false },
    { id: 2, title: "Toplantı Planı", completed: true },
    { id: 3, title: "Proje Sunumu", completed: false }
  ]);
  const [stats] = useState({
    visitors: 1250,
    newUsers: 45,
    activeProjects: 8,
    completedTasks: 23
  });

  return (
    <div className="p-6">
      <HeaderComponent
        title={
          <div className="flex items-center gap-2">
            <LayoutDashboard className="h-6 w-6" />
            <span>Dashboard</span>
          </div>
        }
        description="Genel istatistikler ve özet bilgiler"
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* İstatistik Kartları */}
        <Card className="dark:bg-gray-700">
          <CardContent className="p-6">
            <h3 className="text-base font-medium text-gray-600 dark:text-gray-300 mb-2">Ziyaretçiler</h3>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">{stats.visitors}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Son 30 gün</p>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-700">
          <CardContent className="p-6">
            <h3 className="text-base font-medium text-gray-600 dark:text-gray-300 mb-2">Yeni Kullanıcılar</h3>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">{stats.newUsers}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Bu ay</p>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-700">
          <CardContent className="p-6">
            <h3 className="text-base font-medium text-gray-600 dark:text-gray-300 mb-2">Aktif Projeler</h3>
            <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">{stats.activeProjects}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Devam eden</p>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-700">
          <CardContent className="p-6">
            <h3 className="text-base font-medium text-gray-600 dark:text-gray-300 mb-2">Tamamlanan Görevler</h3>
            <p className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-1">{stats.completedTasks}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Bu hafta</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Son Duyurular */}
        <Card className="dark:bg-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <Bell className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              <h2 className="text-lg font-semibold dark:text-white">Son Duyurular</h2>
            </div>
            <div className="space-y-4">
              {announcements.map(announcement => (
                <div key={announcement.id} className="border-b dark:border-gray-600 pb-4 last:border-b-0 last:pb-0">
                  <h3 className="font-medium text-base dark:text-gray-200 mb-1">{announcement.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{announcement.content}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{announcement.date}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Görevler */}
        <Card className="dark:bg-gray-700">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <CheckSquare className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              <h2 className="text-lg font-semibold dark:text-white">Günlük Görevler</h2>
            </div>
            <div className="space-y-3">
              {tasks.map(task => (
                <div key={task.id} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => {}}
                    className="mr-3 h-4 w-4 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <span className={`text-sm ${task.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'dark:text-gray-200'}`}>
                    {task.title}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 