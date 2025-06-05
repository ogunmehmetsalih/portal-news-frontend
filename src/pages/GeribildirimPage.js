import React, { useState } from 'react';
import { Card, Form, Input, Select, Button, List, Avatar, Tag, Typography, Space, Drawer } from 'antd';
import { SendOutlined, MessageOutlined, PlusOutlined, CommentOutlined } from '@ant-design/icons';
import HeaderComponent from '../components/HeaderComponent';
import { Plus } from 'lucide-react';
import { getStatusColor, getTypeColor } from '../utils/colorPalette';

const { TextArea } = Input;
const { Title, Text } = Typography;

export default function GeribildirimPage() {
  const [form] = Form.useForm();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const feedbacks = [
    {
      id: 1,
      user: {
        name: 'Ahmet Yılmaz',
        avatar: 'https://ui-avatars.com/api/?name=Ahmet+Yilmaz'
      },
      type: 'Öneri',
      message: 'Dashboard sayfasına takvim widget\'i eklenebilir.',
      date: '2 saat önce',
      status: 'Beklemede'
    },
    {
      id: 2,
      user: {
        name: 'Ayşe Demir',
        avatar: 'https://ui-avatars.com/api/?name=Ayse+Demir'
      },
      type: 'Hata Bildirimi',
      message: 'Profil sayfasında fotoğraf yükleme çalışmıyor.',
      date: '1 gün önce',
      status: 'İnceleniyor'
    },
    {
      id: 3,
      user: {
        name: 'Mehmet Kaya',
        avatar: 'https://ui-avatars.com/api/?name=Mehmet+Kaya'
      },
      type: 'Geliştirme',
      message: 'Bildirim ayarları daha detaylı olabilir.',
      date: '2 gün önce',
      status: 'Tamamlandı'
    }
  ];

  const handleSubmit = (values) => {
    console.log('Geri bildirim gönderildi:', values);
    form.resetFields();
    setIsDrawerOpen(false);
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <HeaderComponent
        title={
          <div className="flex items-center gap-2">
            <CommentOutlined style={{ fontSize: '24px' }} />
            <span>Geri Bildirim</span>
          </div>
        }
        description="Görüş, öneri ve sorunlarınızı bizimle paylaşın"
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
            Yeni Bildirim
          </button>
        }
      />

      {/* Geri Bildirim Listesi */}
      <Card 
        className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
        title={
          <Space>
            <MessageOutlined className="text-blue-500" style={{ fontSize: '16px' }} />
            <span className="text-gray-900 dark:text-white" style={{ fontSize: '16px', fontWeight: '600' }}>Geri Bildirimler</span>
          </Space>
        }
        style={{ 
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
        }}
        bodyStyle={{ padding: '0 24px' }}
      >
        <List
          itemLayout="horizontal"
          dataSource={feedbacks}
          renderItem={(item) => (
            <List.Item 
              style={{ 
                padding: '24px 0'
              }}
              className="border-b border-gray-200 dark:border-gray-700"
            >
              <div style={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                gap: '20px',
                width: '100%'
              }}>
                <Avatar src={item.user.avatar} size={48} />
                
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'flex-start',
                    marginBottom: '12px',
                    flexWrap: 'wrap',
                    gap: '12px'
                  }}>
                    <div>
                      <Text strong className="text-gray-900 dark:text-white" style={{ fontSize: '16px', display: 'block', marginBottom: '8px' }}>
                        {item.user.name}
                      </Text>
                      <Text className="text-gray-600 dark:text-gray-300" style={{ 
                        fontSize: '14px', 
                        lineHeight: '1.6'
                      }}>
                        {item.message}
                      </Text>
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
                      <Space size="small">
                        <Tag 
                          color={getTypeColor(item.type)}
                          style={{ 
                            color: 'black', 
                            fontWeight: '500',
                            padding: '4px 12px',
                            borderRadius: '12px'
                          }}
                        >
                          {item.type}
                        </Tag>
                        <Tag 
                          color={getStatusColor(item.status)}
                          style={{ 
                            color: 'black', 
                            fontWeight: '500',
                            padding: '4px 12px',
                            borderRadius: '12px'
                          }}
                        >
                          {item.status}
                        </Tag>
                      </Space>
                      <Text type="secondary" className="text-gray-500 dark:text-gray-400" style={{ fontSize: '12px' }}>
                        {item.date}
                      </Text>
                    </div>
                  </div>
                </div>
              </div>
            </List.Item>
          )}
        />
      </Card>

      {/* Geri Bildirim Drawer */}
      <Drawer
        title="Yeni Geri Bildirim"
        placement="right"
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
        width={400}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="type"
            label="Geri Bildirim Türü"
            rules={[{ required: true, message: 'Lütfen bir tür seçin' }]}
          >
            <Select placeholder="Seçiniz">
              <Select.Option value="öneri">Öneri</Select.Option>
              <Select.Option value="hata">Hata Bildirimi</Select.Option>
              <Select.Option value="geliştirme">Geliştirme</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="message"
            label="Mesajınız"
            rules={[{ required: true, message: 'Lütfen mesajınızı yazın' }]}
          >
            <TextArea
              rows={4}
              placeholder="Geri bildiriminizi buraya yazın..."
              maxLength={500}
              showCount
            />
          </Form.Item>

          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              icon={<SendOutlined />}
              block
            >
              Gönder
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </div>
  );
} 