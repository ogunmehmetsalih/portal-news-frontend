import React, { useState } from 'react';
import { Card } from '../components/ui/card';
import { Settings, Bell, Moon, Globe, Lock, Shield } from 'lucide-react';

export default function AyarlarPage() {
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    desktop: false,
    sound: true
  });

  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showOnline: true,
    showActivity: true
  });

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center gap-2 mb-6">
        <Settings size={24} className="text-blue-600" />
        <h1 className="text-2xl font-bold">Ayarlar</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Bildirim Ayarları */}
        <Card className="p-6 dark:bg-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <Bell size={20} className="text-blue-600" />
            <h2 className="text-xl font-semibold">Bildirim Ayarları</h2>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <span className="text-gray-700 dark:text-gray-300">E-posta Bildirimleri</span>
              </label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={notifications.email}
                  onChange={() => handleNotificationChange('email')}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <span className="text-gray-700 dark:text-gray-300">Push Bildirimleri</span>
              </label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={notifications.push}
                  onChange={() => handleNotificationChange('push')}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <span className="text-gray-700 dark:text-gray-300">Masaüstü Bildirimleri</span>
              </label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={notifications.desktop}
                  onChange={() => handleNotificationChange('desktop')}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <span className="text-gray-700 dark:text-gray-300">Ses Bildirimleri</span>
              </label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={notifications.sound}
                  onChange={() => handleNotificationChange('sound')}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </Card>

        {/* Gizlilik Ayarları */}
        <Card className="p-6 dark:bg-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <Lock size={20} className="text-blue-600" />
            <h2 className="text-xl font-semibold">Gizlilik Ayarları</h2>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Profil Görünürlüğü
              </label>
              <select
                className="w-full p-2 border rounded-lg dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                value={privacy.profileVisibility}
                onChange={(e) => setPrivacy(prev => ({ ...prev, profileVisibility: e.target.value }))}
              >
                <option value="public">Herkese Açık</option>
                <option value="contacts">Sadece Bağlantılar</option>
                <option value="private">Gizli</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <span className="text-gray-700 dark:text-gray-300">Çevrimiçi Durumu Göster</span>
              </label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={privacy.showOnline}
                  onChange={() => setPrivacy(prev => ({ ...prev, showOnline: !prev.showOnline }))}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <span className="text-gray-700 dark:text-gray-300">Aktivite Durumunu Göster</span>
              </label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={privacy.showActivity}
                  onChange={() => setPrivacy(prev => ({ ...prev, showActivity: !prev.showActivity }))}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </Card>

        {/* Tema Ayarları */}
        <Card className="p-6 dark:bg-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <Moon size={20} className="text-blue-600" />
            <h2 className="text-xl font-semibold">Tema Ayarları</h2>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Tema Seçimi
              </label>
              <select
                className="w-full p-2 border rounded-lg dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              >
                <option value="light">Açık Tema</option>
                <option value="dark">Koyu Tema</option>
                <option value="system">Sistem Teması</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Dil Ayarları */}
        <Card className="p-6 dark:bg-gray-700">
          <div className="flex items-center gap-2 mb-4">
            <Globe size={20} className="text-blue-600" />
            <h2 className="text-xl font-semibold">Dil Ayarları</h2>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Uygulama Dili
              </label>
              <select
                className="w-full p-2 border rounded-lg dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              >
                <option value="tr">Türkçe</option>
                <option value="en">English</option>
                <option value="de">Deutsch</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Güvenlik Ayarları */}
        <Card className="p-6 dark:bg-gray-700 lg:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <Shield size={20} className="text-blue-600" />
            <h2 className="text-xl font-semibold">Güvenlik Ayarları</h2>
          </div>
          <div className="space-y-4">
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              Şifre Değiştir
            </button>
            <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
              İki Faktörlü Doğrulamayı Etkinleştir
            </button>
            <button className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">
              Tüm Oturumları Sonlandır
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
} 