import React, { useState } from 'react';
import { UserOutlined, SearchOutlined, MoreOutlined, UserAddOutlined, MailOutlined, PhoneOutlined, EyeInvisibleOutlined, EyeTwoTone, ReloadOutlined } from '@ant-design/icons';
import { Table, Input, Button, Drawer, Form, Select, Avatar, Tag, Space, message, Card, Tooltip } from 'antd';
import HeaderComponent from '../components/HeaderComponent';
import { getStatusColor, getRoleColor } from '../utils/colorPalette';

// Rastgele şifre oluşturma fonksiyonu
const generatePassword = () => {
  const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';
  let newPassword = '';
  for (let i = 0; i < 12; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    newPassword += charset[randomIndex];
  }
  return newPassword;
};

function KullanicilarPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [form] = Form.useForm();

  const users = [
    {
      key: '1',
      name: 'Ahmet Yılmaz',
      email: 'ahmet.yilmaz@intellium.com',
      role: 'Yönetici',
      status: 'Aktif',
      avatar: 'https://ui-avatars.com/api/?name=Ahmet+Yilmaz',
      phone: '+90 (532) 555 0001',
      department: 'Yönetim'
    },
    {
      key: '2',
      name: 'Ayşe Demir',
      email: 'ayse.demir@intellium.com',
      role: 'Geliştirici',
      status: 'Aktif',
      avatar: 'https://ui-avatars.com/api/?name=Ayse+Demir',
      phone: '+90 (533) 555 0002',
      department: 'Yazılım'
    },
    {
      key: '3',
      name: 'Mehmet Kaya',
      email: 'mehmet.kaya@intellium.com',
      role: 'Tasarımcı',
      status: 'Meşgul',
      avatar: 'https://ui-avatars.com/api/?name=Mehmet+Kaya',
      phone: '+90 (534) 555 0003',
      department: 'Tasarım'
    },
    {
      key: '4',
      name: 'Zeynep Şahin',
      email: 'zeynep.sahin@intellium.com',
      role: 'Pazarlama',
      status: 'Aktif',
      avatar: 'https://ui-avatars.com/api/?name=Zeynep+Sahin',
      phone: '+90 (535) 555 0004',
      department: 'Pazarlama'
    },
    {
      key: '5',
      name: 'Can Öztürk',
      email: 'can.ozturk@intellium.com',
      role: 'Geliştirici',
      status: 'İzinde',
      avatar: 'https://ui-avatars.com/api/?name=Can+Ozturk',
      phone: '+90 (536) 555 0005',
      department: 'Yazılım'
    }
  ];

  const columns = [
    {
      title: 'Kullanıcı',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <Space size="middle">
          <Avatar src={record.avatar} size={48} />
          <div>
            <div className="font-medium text-base text-gray-900 dark:text-white">{text}</div>
            <div className="text-gray-500 dark:text-gray-400 text-sm">{record.department}</div>
          </div>
        </Space>
      ),
    },
    {
      title: 'İletişim',
      key: 'contact',
      render: (_, record) => (
        <Space direction="vertical" size={1}>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <MailOutlined /> {record.email}
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
            <PhoneOutlined /> {record.phone}
          </div>
        </Space>
      ),
    },
    {
      title: 'Rol',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <Tag 
          color={getRoleColor(role)} 
          style={{ 
            padding: '4px 12px', 
            borderRadius: '12px',
            color: 'black',
            fontWeight: '500' 
          }}
        >
          {role}
        </Tag>
      ),
    },
    {
      title: 'Durum',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = getStatusColor(status);
        return (
          <Tag 
            color={getStatusColor(status)} 
            style={{ 
              padding: '4px 12px', 
              borderRadius: '12px',
              color: 'black',
              fontWeight: '500'
            }}
          >
            {status}
          </Tag>
        );
      },
    },
    {
      title: 'İşlemler',
      key: 'actions',
      render: () => (
        <Space>
          <Tooltip title="Düzenle">
            <Button type="text" icon={<MoreOutlined />} />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const filteredUsers = users.filter(user => {
    const searchLower = searchQuery.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchLower) ||
      user.email.toLowerCase().includes(searchLower) ||
      user.role.toLowerCase().includes(searchLower)
    );
  });

  const handleSubmit = async (values) => {
    try {
      // Burada API çağrısı yapılacak
      console.log('Yeni kullanıcı:', values);
      message.success('Kullanıcı başarıyla eklendi');
      setIsDrawerOpen(false);
      form.resetFields();
    } catch (error) {
      message.error('Kullanıcı eklenirken bir hata oluştu');
    }
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <HeaderComponent
        title={
          <div className="flex items-center gap-2">
            <UserOutlined style={{ fontSize: '24px' }} />
            <span>Kullanıcılar</span>
          </div>
        }
        description="Kullanıcıları görüntüleyin ve yönetin"
        buttonText={
          <Space size="middle">
            <Input
              placeholder="Kullanıcı ara..."
              prefix={<SearchOutlined />}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: 250 }}
              className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
            />
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
              <UserAddOutlined style={{ fontSize: '16px' }} />
              Yeni Kullanıcı
            </button>
          </Space>
        }
      />

      <Card 
        className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
        style={{ 
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
        }}
      >
        <Table
          columns={columns}
          dataSource={filteredUsers}
          className="dark:bg-gray-800"
          pagination={{ 
            pageSize: 10,
            style: { marginTop: '24px' }
          }}
        />
      </Card>

      <Drawer
        title="Yeni Kullanıcı Ekle"
        placement="right"
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
        width={500}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="name"
            label={<div className="flex items-center gap-1">Ad Soyad <span className="text-red-500">*</span></div>}
            rules={[{ required: true, message: 'Lütfen ad soyad giriniz' }]}
          >
            <Input placeholder="Ad Soyad giriniz" />
          </Form.Item>

          <Form.Item
            name="email"
            label={<div className="flex items-center gap-1">E-posta <span className="text-red-500">*</span></div>}
            rules={[
              { required: true, message: 'Lütfen e-posta giriniz' },
              { type: 'email', message: 'Geçerli bir e-posta adresi giriniz' }
            ]}
          >
            <Input placeholder="E-posta giriniz" />
          </Form.Item>

          <Form.Item
            name="phone"
            label={<div className="flex items-center gap-1">Telefon <span className="text-red-500">*</span></div>}
            rules={[{ required: true, message: 'Lütfen telefon numarası giriniz' }]}
          >
            <Input placeholder="Telefon numarası giriniz" />
          </Form.Item>

          <Form.Item
            name="department"
            label={<div className="flex items-center gap-1">Departman <span className="text-red-500">*</span></div>}
            rules={[{ required: true, message: 'Lütfen departman seçiniz' }]}
          >
            <Select placeholder="Departman seçiniz">
              <Select.Option value="Yönetim">Yönetim</Select.Option>
              <Select.Option value="Yazılım">Yazılım</Select.Option>
              <Select.Option value="Tasarım">Tasarım</Select.Option>
              <Select.Option value="Pazarlama">Pazarlama</Select.Option>
              <Select.Option value="İnsan Kaynakları">İnsan Kaynakları</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="role"
            label={<div className="flex items-center gap-1">Rol <span className="text-red-500">*</span></div>}
            rules={[{ required: true, message: 'Lütfen rol seçiniz' }]}
          >
            <Select placeholder="Rol seçiniz">
              <Select.Option value="Yönetici">Yönetici</Select.Option>
              <Select.Option value="Geliştirici">Geliştirici</Select.Option>
              <Select.Option value="Tasarımcı">Tasarımcı</Select.Option>
              <Select.Option value="Pazarlama">Pazarlama</Select.Option>
              <Select.Option value="İK Uzmanı">İK Uzmanı</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="password"
            label={<div className="flex items-center gap-1">Şifre <span className="text-red-500">*</span></div>}
            rules={[
              { required: true, message: 'Lütfen şifre giriniz' },
              { min: 8, message: 'Şifre en az 8 karakter olmalıdır' }
            ]}
          >
            <Input.Password
              placeholder="Şifre giriniz"
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              addonAfter={
                <Button
                  type="text"
                  icon={<ReloadOutlined />}
                  onClick={() => {
                    const newPassword = generatePassword();
                    form.setFieldValue('password', newPassword);
                    form.setFieldValue('confirmPassword', newPassword);
                    message.success('Yeni şifre oluşturuldu!');
                  }}
                  style={{ border: 'none', padding: '0 8px' }}
                />
              }
            />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label={<div className="flex items-center gap-1">Şifre Tekrar <span className="text-red-500">*</span></div>}
            dependencies={['password']}
            rules={[
              { required: true, message: 'Lütfen şifreyi tekrar giriniz' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Şifreler eşleşmiyor!'));
                },
              }),
            ]}
          >
            <Input.Password
              placeholder="Şifreyi tekrar giriniz"
              iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>

          <Form.Item className="mb-0">
            <Button type="primary" htmlType="submit" block size="large">
              Kullanıcı Ekle
            </Button>
          </Form.Item>
        </Form>
      </Drawer>

      <style jsx global>{`
        .dark .ant-table-thead > tr > th {
          background-color: #374151 !important;
          color: white !important;
          border-bottom: 1px solid #4b5563 !important;
        }
        .dark .ant-table-tbody > tr > td {
          background-color: #1f2937 !important;
          color: white !important;
          border-bottom: 1px solid #374151 !important;
        }
        .dark .ant-table-tbody > tr:hover > td {
          background-color: #374151 !important;
        }
        .dark .ant-pagination-item {
          background-color: #374151 !important;
          border-color: #4b5563 !important;
        }
        .dark .ant-pagination-item a {
          color: white !important;
        }
        .dark .ant-pagination-item-active {
          background-color: #1890ff !important;
          border-color: #1890ff !important;
        }
        .dark .ant-pagination-prev, .dark .ant-pagination-next {
          color: white !important;
        }
        .dark .ant-pagination-prev:hover, .dark .ant-pagination-next:hover {
          color: #1890ff !important;
        }
      `}</style>
    </div>
  );
}

export default KullanicilarPage; 