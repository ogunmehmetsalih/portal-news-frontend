import React, { useState } from 'react';
import { Card, CardContent } from "../components/ui/card";
import { Bell, Calendar, User, Plus, Send, Tag as TagIcon, X } from 'lucide-react';
import HeaderComponent from '../components/HeaderComponent';
import { Form, Input, Select, Button, DatePicker, Space, Drawer, message } from 'antd';

const { TextArea } = Input;
const { Option } = Select;

export default function DuyurularPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [form] = Form.useForm();
  const [announcements] = useState([
    {
      id: 1,
      title: "Yıllık İzin Planlaması",
      content: "2024 yılı izin planlamaları için tüm departmanların yöneticileri ile toplantı yapılacaktır.",
      date: "2024-04-05",
      author: "İK Departmanı"
    },
    {
      id: 2,
      title: "Ofis Taşınma Duyurusu",
      content: "Şirketimiz 1 Mayıs 2024 tarihinde yeni ofisine taşınacaktır. Detaylar mail ile paylaşılacaktır.",
      date: "2024-04-01",
      author: "Yönetim"
    },
    {
      id: 3,
      title: "Yeni Proje Başlangıcı",
      content: "XYZ Projesi için kick-off toplantısı 10 Nisan 2024 tarihinde yapılacaktır.",
      date: "2024-03-28",
      author: "Proje Yönetimi"
    }
  ]);

  const handleSubmit = (values) => {
    console.log('Yeni duyuru:', values);
    message.success('Duyuru başarıyla oluşturuldu!');
    form.resetFields();
    setIsDrawerOpen(false);
  };

  return (
    <div className="p-6">
      <HeaderComponent
        title={
          <div className="flex items-center gap-2">
            <Bell className="h-6 w-6" />
            <span>Duyurular</span>
          </div>
        }
        description="Kurum içi önemli duyurular"
        buttonText={
          <button
            onClick={() => setIsDrawerOpen(true)}
            style={{
              height: '40px',
              padding: '0 20px',
              backgroundColor: '#1890ff',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#40a9ff'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#1890ff'}
          >
            <Plus size={16} />
            Yeni Duyuru
          </button>
        }
      />

      <div className="grid gap-6">
        {announcements.map(announcement => (
          <Card key={announcement.id} className="dark:bg-gray-700">
            <CardContent className="p-6">
              <h2 className="text-lg font-semibold mb-3 dark:text-white">{announcement.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">{announcement.content}</p>
              
              <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{announcement.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{announcement.author}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Drawer
        title={
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            <span>Yeni Duyuru Oluştur</span>
          </div>
        }
        width={480}
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        extra={
          <Button
            onClick={() => setIsDrawerOpen(false)}
            icon={<X className="h-4 w-4" />}
          />
        }
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          className="space-y-4"
        >
          <Form.Item
            name="title"
            label="Duyuru Başlığı"
            rules={[{ required: true, message: 'Lütfen duyuru başlığını girin' }]}
          >
            <Input 
              placeholder="Başlık girin"
              size="large"
            />
          </Form.Item>

          <Form.Item
            name="content"
            label="Duyuru İçeriği"
            rules={[{ required: true, message: 'Lütfen duyuru içeriğini girin' }]}
          >
            <TextArea
              placeholder="Duyuru içeriğini girin..."
              rows={6}
              showCount
              maxLength={500}
            />
          </Form.Item>

          <Form.Item
            name="department"
            label="İlgili Departman"
            rules={[{ required: true, message: 'Lütfen departman seçin' }]}
          >
            <Select
              placeholder="Departman seçin"
              size="large"
            >
              <Option value="Yönetim">Yönetim</Option>
              <Option value="İK">İnsan Kaynakları</Option>
              <Option value="Yazılım">Yazılım</Option>
              <Option value="Tasarım">Tasarım</Option>
              <Option value="Pazarlama">Pazarlama</Option>
              <Option value="Operasyon">Operasyon</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="priority"
            label="Öncelik Düzeyi"
            rules={[{ required: true, message: 'Lütfen öncelik düzeyi seçin' }]}
          >
            <Select
              placeholder="Öncelik düzeyi seçin"
              size="large"
            >
              <Option value="low">
                <Space>
                  <TagIcon className="h-4 w-4 text-green-500 dark:text-green-400" />
                  <span className="text-black">Düşük</span>
                </Space>
              </Option>
              <Option value="medium">
                <Space>
                  <TagIcon className="h-4 w-4 text-yellow-500 dark:text-yellow-400" />
                  <span className="text-black">Orta</span>
                </Space>
              </Option>
              <Option value="high">
                <Space>
                  <TagIcon className="h-4 w-4 text-red-500 dark:text-red-400" />
                  <span className="text-black">Yüksek</span>
                </Space>
              </Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="validUntil"
            label="Geçerlilik Tarihi"
            rules={[{ required: true, message: 'Lütfen geçerlilik tarihi seçin' }]}
          >
            <DatePicker 
              placeholder="Tarih seçin"
              size="large"
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item className="mb-0">
            <Button
              type="primary"
              htmlType="submit"
              icon={<Send className="h-4 w-4" />}
              size="large"
              block
            >
              Duyuruyu Yayınla
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
} 