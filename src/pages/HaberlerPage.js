import React, { useState } from 'react';
import { Card, CardContent } from "../components/ui/card";
import { Newspaper, Calendar, Eye, Plus, Search, X, Upload, Tag as TagIcon, Send } from 'lucide-react';
import HeaderComponent from '../components/HeaderComponent';
import { Form, Input, Select, Button, DatePicker, Space, Drawer, message, Upload as AntUpload } from 'antd';

const { TextArea } = Input;
const { Option } = Select;

export default function HaberlerPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [form] = Form.useForm();
  const [newNews, setNewNews] = useState({
    title: '',
    content: '',
    image: null
  });
  const [news] = useState([
    {
      id: 1,
      title: "Yeni Teknoloji Yatırımları",
      content: "Şirketimiz, yapay zeka ve bulut teknolojileri alanında yeni yatırımlar yapacağını duyurdu.",
      date: "2024-04-02",
      views: 245,
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=400&fit=crop"
    },
    {
      id: 2,
      title: "Sürdürülebilirlik Projesi Başarısı",
      content: "Yeşil enerji projemiz, uluslararası sürdürülebilirlik ödülüne layık görüldü.",
      date: "2024-03-30",
      views: 189,
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop"
    },
    {
      id: 3,
      title: "Yeni İş Ortaklığı",
      content: "Global teknoloji firması ABC Corp. ile stratejik ortaklık anlaşması imzaladık.",
      date: "2024-03-28",
      views: 312,
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=400&fit=crop"
    }
  ]);

  // Arama fonksiyonu
  const filteredNews = news.filter(item => {
    const searchLower = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(searchLower) ||
      item.content.toLowerCase().includes(searchLower) ||
      item.date.includes(searchLower)
    );
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNews(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (values) => {
    console.log('Yeni haber:', { ...values, image: newNews.image });
    message.success('Haber başarıyla oluşturuldu!');
    setIsDrawerOpen(false);
    form.resetFields();
    setNewNews({ title: '', content: '', image: null });
  };

  return (
    <div className="p-6 relative bg-gray-50 dark:bg-gray-900 min-h-screen">
      <HeaderComponent
        title={
          <div className="flex items-center gap-2">
            <Newspaper className="h-6 w-6" />
            <span>Haberler</span>
          </div>
        }
        description="Kurum içi haberler ve duyurular"
        buttonText={
          <div className="flex items-center gap-4">
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center'
            }}>
              <Search size={16} className="text-gray-500 dark:text-gray-400" style={{
                position: 'absolute',
                left: '12px',
                zIndex: 1
              }} />
              <input
                type="text"
                placeholder="Haber ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400"
                style={{
                  width: '280px',
                  height: '40px',
                  paddingLeft: '40px',
                  paddingRight: '12px',
                  borderRadius: '6px',
                  fontSize: '14px',
                  outline: 'none'
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = '#9ca3af';
                  e.target.style.boxShadow = '0 0 0 1px #9ca3af';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = '';
                  e.target.style.boxShadow = 'none';
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
                  style={{
                    position: 'absolute',
                    right: '8px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '2px'
                  }}
                >
                  <X size={14} />
                </button>
              )}
            </div>
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
              Yeni Haber
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNews.map(item => (
          <Card key={item.id} className="overflow-hidden bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <div className="relative h-48">
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-2 dark:text-white">{item.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{item.content}</p>
              
              <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{item.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  <span>{item.views} görüntülenme</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {filteredNews.length === 0 && (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          Arama sonucu bulunamadı
        </div>
      )}

      <Drawer
        title={
          <div className="flex items-center gap-2">
            <Newspaper className="h-5 w-5" />
            <span>Yeni Haber Oluştur</span>
          </div>
        }
        width={520}
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        className="dark:bg-gray-800"
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
            label="Haber Başlığı"
            rules={[{ required: true, message: 'Lütfen haber başlığını girin' }]}
          >
            <Input 
              placeholder="Başlık girin"
              size="large"
              className="bg-white dark:bg-gray-600 border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white"
            />
          </Form.Item>

          <Form.Item
            name="content"
            label="Haber İçeriği"
            rules={[{ required: true, message: 'Lütfen haber içeriğini girin' }]}
          >
            <TextArea
              placeholder="Haber içeriğini girin..."
              rows={6}
              showCount
              maxLength={1000}
              className="bg-white dark:bg-gray-600 border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white"
            />
          </Form.Item>

          <Form.Item
            name="category"
            label="Haber Kategorisi"
            rules={[{ required: true, message: 'Lütfen kategori seçin' }]}
          >
            <Select
              placeholder="Kategori seçin"
              size="large"
              className="dark:bg-gray-600"
            >
              <Option value="teknoloji">
                <Space>
                  <TagIcon className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                  <span className="text-black">Teknoloji</span>
                </Space>
              </Option>
              <Option value="kurumsal">
                <Space>
                  <TagIcon className="h-4 w-4 text-purple-500 dark:text-purple-400" />
                  <span className="text-black">Kurumsal</span>
                </Space>
              </Option>
              <Option value="etkinlik">
                <Space>
                  <TagIcon className="h-4 w-4 text-orange-500 dark:text-orange-400" />
                  <span className="text-black">Etkinlik</span>
                </Space>
              </Option>
              <Option value="duyuru">
                <Space>
                  <TagIcon className="h-4 w-4 text-green-500 dark:text-green-400" />
                  <span className="text-black">Duyuru</span>
                </Space>
              </Option>
              <Option value="haber">
                <Space>
                  <TagIcon className="h-4 w-4 text-indigo-500 dark:text-indigo-400" />
                  <span className="text-black">Haber</span>
                </Space>
              </Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="image"
            label="Haber Görseli"
            rules={[{ required: true, message: 'Lütfen bir görsel yükleyin' }]}
          >
            <AntUpload.Dragger
              accept="image/*"
              maxCount={1}
              listType="picture"
              showUploadList={{ showPreviewIcon: true, showRemoveIcon: true }}
              beforeUpload={(file) => {
                const isImage = file.type.startsWith('image/');
                if (!isImage) {
                  message.error('Sadece resim dosyaları yükleyebilirsiniz!');
                }
                const isLt5M = file.size / 1024 / 1024 < 5;
                if (!isLt5M) {
                  message.error('Görsel 5MB\'dan küçük olmalıdır!');
                }
                return false;
              }}
              className="p-8"
            >
              <div className="text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-2 text-base">Görseli buraya sürükleyin veya seçin</p>
                <p className="mt-1 text-sm text-gray-500">PNG, JPG, GIF (max: 5MB)</p>
              </div>
            </AntUpload.Dragger>
          </Form.Item>

          <Form.Item
            name="publishDate"
            label="Yayın Tarihi"
            rules={[{ required: true, message: 'Lütfen yayın tarihi seçin' }]}
          >
            <DatePicker 
              placeholder="Tarih seçin"
              size="large"
              style={{ width: '100%' }}
              className="bg-white dark:bg-gray-600 border-gray-300 dark:border-gray-500"
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
              Haberi Yayınla
            </Button>
          </Form.Item>
        </Form>
      </Drawer>

      {isDrawerOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity z-40"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      <style jsx global>{`
        /* Dark mode Upload styling */
        .dark .ant-upload-drag {
          background-color: #374151 !important;
          border: 2px dashed #6b7280 !important;
        }

        .dark .ant-upload-drag:hover {
          border-color: #1890ff !important;
        }

        .dark .ant-upload-drag .ant-upload-btn {
          color: white !important;
        }

        .dark .ant-upload-text {
          color: white !important;
        }

        .dark .ant-upload-hint {
          color: #9ca3af !important;
        }

        /* Dark mode Select styling */
        .dark .ant-select-dropdown {
          background-color: #1f2937 !important;
          border: 1px solid #4b5563 !important;
        }

        .dark .ant-select-item {
          color: white !important;
        }

        .dark .ant-select-item-option-selected {
          background-color: #374151 !important;
        }

        .dark .ant-select-item:hover {
          background-color: #374151 !important;
        }

        /* Dark mode Select option text styling */
        .dark .ant-select-item .ant-space-item {
          color: white !important;
        }

        .dark .ant-select-item span {
          color: white !important;
        }

        .dark .ant-space {
          color: white !important;
        }

        /* Dark mode DatePicker styling */
        .dark .ant-picker-dropdown {
          background-color: #1f2937 !important;
          border: 1px solid #4b5563 !important;
        }

        .dark .ant-picker-panel {
          background-color: #1f2937 !important;
        }

        .dark .ant-picker-header {
          background-color: #374151 !important;
          border-bottom: 1px solid #4b5563 !important;
        }

        .dark .ant-picker-content th,
        .dark .ant-picker-header-view {
          color: white !important;
        }

        .dark .ant-picker-cell {
          color: white !important;
        }

        .dark .ant-picker-cell:hover:not(.ant-picker-cell-selected) .ant-picker-cell-inner {
          background-color: #374151 !important;
        }

        /* Dark mode Form styling */
        .dark .ant-form-item-label > label {
          color: white !important;
        }

        .dark .ant-input-show-count-suffix {
          color: #9ca3af !important;
        }

        /* Dark mode Drawer styling */
        .dark .ant-drawer-content {
          background-color: #1f2937 !important;
        }

        .dark .ant-drawer-header {
          background-color: #374151 !important;
          border-bottom: 1px solid #4b5563 !important;
        }

        .dark .ant-drawer-title {
          color: white !important;
        }

        .dark .ant-drawer-close {
          color: white !important;
        }

        .dark .ant-drawer-body {
          background-color: #1f2937 !important;
        }
      `}</style>
    </div>
  );
} 