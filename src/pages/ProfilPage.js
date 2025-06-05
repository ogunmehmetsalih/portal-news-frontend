import React, { useState } from 'react';
import { Card, Avatar, Typography, Button, Descriptions, Space, Tag, Form, Input, Drawer, message } from 'antd';
import { EditOutlined, CameraOutlined, MailOutlined, PhoneOutlined, EnvironmentOutlined, BuildOutlined, CalendarOutlined, CodeOutlined, NodeIndexOutlined, CodeSandboxOutlined, CloudOutlined, ContainerOutlined, DatabaseOutlined, SaveOutlined, KeyOutlined, EyeInvisibleOutlined, EyeTwoTone, ReloadOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { TextArea } = Input;

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

export default function ProfilPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [form] = Form.useForm();
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@intellium.com",
    phone: "+90 555 123 4567",
    location: "İzmir, Türkiye",
    department: "Yazılım Geliştirme",
    joinDate: "Ocak 2023",
    bio: "Senior Full Stack Developer olarak çalışıyorum. React, Node.js ve cloud teknolojileri konusunda deneyimliyim.",
    education: "Bilgisayar Mühendisliği, XYZ Üniversitesi",
    languages: ["Türkçe", "İngilizce", "Almanca"],
    projects: [
      { id: 1, name: "E-ticaret Platformu", role: "Tech Lead" },
      { id: 2, name: "CRM Sistemi", role: "Senior Developer" },
      { id: 3, name: "Mobile App", role: "Backend Developer" }
    ]
  });

  const skills = [
    { name: 'React', icon: <CodeOutlined />, color: '#61DAFB', background: '#E6F7FF', darkBackground: '#0B3B5C' },
    { name: 'Node.js', icon: <NodeIndexOutlined />, color: '#539E43', background: '#F6FFED', darkBackground: '#1F3D20' },
    { name: 'TypeScript', icon: <CodeSandboxOutlined />, color: '#3178C6', background: '#E6F4FF', darkBackground: '#0F2A5C' },
    { name: 'AWS', icon: <CloudOutlined />, color: '#FF9900', background: '#FFF7E6', darkBackground: '#5C3A0B' },
    { name: 'Docker', icon: <ContainerOutlined />, color: '#2496ED', background: '#E6F7FF', darkBackground: '#0B3B5C' },
    { name: 'MongoDB', icon: <DatabaseOutlined />, color: '#47A248', background: '#F6FFED', darkBackground: '#1F3D20' }
  ];

  return (
    <div className="container mx-auto p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="mb-8">
        <Title level={2} className="text-gray-900 dark:text-white">Profil</Title>
        <Text type="secondary" className="text-gray-600 dark:text-gray-400">Kişisel bilgilerinizi görüntüleyin ve düzenleyin</Text>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sol Kolon - Profil Kartı */}
        <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="text-center mb-6">
            <div className="relative inline-block">
              <Avatar
                size={120}
                src="https://ui-avatars.com/api/?name=John+Doe&size=120&background=f0f2f5&color=1890ff"
                style={{ border: '4px solid #f0f0f0' }}
              />
              <Button
                type="primary"
                shape="circle"
                icon={<CameraOutlined />}
                size="small"
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              />
            </div>
            <Title level={3} className="text-gray-900 dark:text-white" style={{ marginTop: '16px', marginBottom: '4px' }}>{user.name}</Title>
            <Text type="secondary" className="text-gray-600 dark:text-gray-400">{user.department}</Text>
          </div>

          <Descriptions column={1} size="small" layout="vertical">
            <Descriptions.Item 
              label={<Space className="text-gray-900 dark:text-gray-100 font-semibold"><MailOutlined /> E-posta</Space>}
              className="pb-4"
            >
              <span className="text-gray-900 dark:text-white">{user.email}</span>
            </Descriptions.Item>
            <Descriptions.Item 
              label={<Space className="text-gray-900 dark:text-gray-100 font-semibold"><PhoneOutlined /> Telefon</Space>}
              className="pb-4"
            >
              <span className="text-gray-900 dark:text-white">{user.phone}</span>
            </Descriptions.Item>
            <Descriptions.Item 
              label={<Space className="text-gray-900 dark:text-gray-100 font-semibold"><EnvironmentOutlined /> Konum</Space>}
              className="pb-4"
            >
              <span className="text-gray-900 dark:text-white">{user.location}</span>
            </Descriptions.Item>
            <Descriptions.Item 
              label={<Space className="text-gray-900 dark:text-gray-100 font-semibold"><BuildOutlined /> Departman</Space>}
              className="pb-4"
            >
              <span className="text-gray-900 dark:text-white">{user.department}</span>
            </Descriptions.Item>
            <Descriptions.Item 
              label={<Space className="text-gray-900 dark:text-gray-100 font-semibold"><CalendarOutlined /> Katılım Tarihi</Space>}
              className="pb-4"
            >
              <span className="text-gray-900 dark:text-white">{user.joinDate}</span>
            </Descriptions.Item>
          </Descriptions>

          <Button
            type="primary"
            icon={<EditOutlined />}
            block
            size="large"
            style={{ marginTop: '24px' }}
            onClick={() => {
              form.setFieldsValue(user);
              setIsDrawerOpen(true);
            }}
          >
            Profili Düzenle
          </Button>
        </Card>

        {/* Profil Düzenleme Drawer */}
        <Drawer
          title="Profili Düzenle"
          placement="right"
          onClose={() => setIsDrawerOpen(false)}
          open={isDrawerOpen}
          width={500}
          extra={
            <Button 
              type="primary" 
              icon={<SaveOutlined />}
              onClick={() => form.submit()}
            >
              Kaydet
            </Button>
          }
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={(values) => {
              setUser({ ...user, ...values });
              message.success('Profil başarıyla güncellendi!');
              setIsDrawerOpen(false);
            }}
            initialValues={user}
          >
            <Form.Item
              name="name"
              label="Ad Soyad"
              rules={[{ required: true, message: 'Lütfen adınızı giriniz' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="email"
              label="E-posta"
              rules={[
                { required: true, message: 'Lütfen e-posta adresinizi giriniz' },
                { type: 'email', message: 'Geçerli bir e-posta adresi giriniz' }
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Telefon"
              rules={[{ required: true, message: 'Lütfen telefon numaranızı giriniz' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="location"
              label="Konum"
              rules={[{ required: true, message: 'Lütfen konumunuzu giriniz' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="department"
              label="Departman"
              rules={[{ required: true, message: 'Lütfen departmanınızı giriniz' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="bio"
              label="Hakkında"
              rules={[{ required: true, message: 'Lütfen kendiniz hakkında bilgi giriniz' }]}
            >
              <TextArea rows={4} />
            </Form.Item>

            <Form.Item
              name="education"
              label="Eğitim"
              rules={[{ required: true, message: 'Lütfen eğitim bilgilerinizi giriniz' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="password"
              label={
                <Space>
                  <KeyOutlined />
                  <span>Şifre</span>
                </Space>
              }
              rules={[
                { required: true, message: 'Lütfen şifre giriniz' },
                { min: 8, message: 'Şifre en az 8 karakter olmalıdır' }
              ]}
              extra="Şifreniz en az 8 karakter uzunluğunda olmalıdır."
            >
              <Input.Password
                placeholder="Şifrenizi girin"
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                addonAfter={
                  <Button
                    type="text"
                    icon={<ReloadOutlined />}
                    onClick={() => {
                      const newPassword = generatePassword();
                      form.setFieldValue('password', newPassword);
                      message.success('Yeni şifre oluşturuldu!');
                    }}
                    style={{ border: 'none', padding: '0 8px' }}
                  />
                }
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Şifre Tekrar"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Lütfen şifrenizi tekrar giriniz' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Girdiğiniz şifreler eşleşmiyor!'));
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="Şifrenizi tekrar girin"
                iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            </Form.Item>
          </Form>
        </Drawer>

        {/* Sağ Kolon - Detaylar */}
        <div className="lg:col-span-2 space-y-6">
          {/* Hakkında */}
          <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
              <Title level={4} className="text-gray-900 dark:text-white font-bold">Hakkında</Title>
            </div>
            <Text className="text-gray-700 dark:text-gray-300">{user.bio}</Text>
          </Card>

          {/* Yetenekler */}
          <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
              <Title level={4} className="text-gray-900 dark:text-white font-bold">Yetenekler</Title>
            </div>
            <div className="flex flex-wrap gap-4">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 hover:scale-105"
                  style={{
                    backgroundColor: skill.background,
                    border: `1px solid ${skill.color}`,
                  }}
                >
                  <span style={{ color: skill.color }}>{skill.icon}</span>
                  <span className="font-medium" style={{ color: skill.color }}>{skill.name}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Eğitim */}
          <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
              <Title level={4} className="text-gray-900 dark:text-white font-bold">Eğitim</Title>
            </div>
            <p className="text-gray-600 dark:text-gray-300">{user.education}</p>
          </Card>

          {/* Diller */}
          <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
              <Title level={4} className="text-gray-900 dark:text-white font-bold">Diller</Title>
            </div>
            <div className="flex flex-wrap gap-4">
              {user.languages.map((language, index) => {
                const colors = [
                  { bg: '#EFF6FF', border: '#3B82F6', text: '#2563EB' },
                  { bg: '#F5F3FF', border: '#8B5CF6', text: '#6D28D9' },
                  { bg: '#ECFDF5', border: '#10B981', text: '#059669' }
                ];
                const colorScheme = colors[index % colors.length];
                
                return (
                  <div
                  key={index}
                    className="flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-200 hover:scale-105"
                  style={{
                      backgroundColor: colorScheme.bg,
                      border: `1px solid ${colorScheme.border}`,
                    }}
                  >
                    <span className="font-medium" style={{ color: colorScheme.text }}>{language}</span>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Projeler */}
          <Card className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
              <Title level={4} className="text-gray-900 dark:text-white font-bold">Projeler</Title>
            </div>
            <div className="space-y-4">
              {user.projects.map(project => (
                <div key={project.id} className="flex justify-between items-center border-b border-gray-200 dark:border-gray-600 pb-4 last:border-0 last:pb-0">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">{project.name}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{project.role}</p>
                  </div>
                  <button className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
                    Detaylar
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
} 