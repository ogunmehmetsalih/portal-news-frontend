import React, { useState } from 'react';
import { ClockCircleOutlined, PlusOutlined, CalendarOutlined, TagOutlined, CheckSquareOutlined } from '@ant-design/icons';
import { Card, Button, Input, Table, Tag, Space, Drawer, Form, DatePicker, Select, message } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/tr';
import HeaderComponent from '../components/HeaderComponent';
import { Plus } from 'lucide-react';
import { getStatusColor, getPriorityColor } from '../utils/colorPalette';

dayjs.locale('tr');

const { TextArea } = Input;

export default function GorevlerPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [form] = Form.useForm();
  const [filterStatus, setFilterStatus] = useState('');

  const tasks = [
    {
      key: '1',
      title: 'Yeni Web Sitesi Tasarımı',
      description: 'Kurumsal web sitesinin yeniden tasarlanması',
      dueDate: '2024-04-15',
      status: 'Devam Ediyor',
      priority: 'Yüksek',
      assignees: ['Ahmet Yılmaz', 'Ayşe Demir']
    },
    {
      key: '2',
      title: 'Personel Eğitimi',
      description: 'Yeni yazılım eğitimi düzenlenmesi',
      dueDate: '2024-04-20',
      status: 'Planlandı',
      priority: 'Orta',
      assignees: ['Mehmet Kaya']
    },
    {
      key: '3',
      title: 'Veri Analizi Raporu',
      description: 'Q1 2024 veri analiz raporunun hazırlanması',
      dueDate: '2024-04-10',
      status: 'Tamamlandı',
      priority: 'Yüksek',
      assignees: ['Zeynep Şahin']
    }
  ];

  const columns = [
    {
      title: 'Başlık',
      dataIndex: 'title',
      key: 'title',
      render: (text, record) => (
        <div>
          <div className="font-medium text-base text-gray-900 dark:text-white">{text}</div>
          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{record.description}</div>
        </div>
      ),
    },
    {
      title: 'Durum',
      dataIndex: 'status',
      key: 'status',
      render: (status) => (
        <Tag 
          color={getStatusColor(status)}
          style={{ color: 'black', fontWeight: '500' }}
        >
          {status}
        </Tag>
      ),
    },
    {
      title: 'Öncelik',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority) => (
        <Tag 
          color={getPriorityColor(priority)}
          style={{ color: 'black', fontWeight: '500' }}
        >
          {priority}
        </Tag>
      ),
    },
    {
      title: 'Bitiş Tarihi',
      dataIndex: 'dueDate',
      key: 'dueDate',
      render: (date) => (
        <Space className="text-gray-900 dark:text-white">
          <CalendarOutlined />
          {dayjs(date).format('DD MMMM YYYY')}
        </Space>
      ),
    },
    {
      title: 'Atananlar',
      dataIndex: 'assignees',
      key: 'assignees',
      render: (assignees) => (
        <Space size={[0, 8]} wrap>
          {assignees.map((assignee) => (
            <Tag key={assignee}>{assignee}</Tag>
          ))}
        </Space>
      ),
    }
  ];

  const handleSubmit = async (values) => {
    try {
      // Tarihi string formatına çevirme
      const formattedValues = {
        ...values,
        dueDate: values.dueDate.format('YYYY-MM-DD')
      };
      
      console.log('Yeni görev:', formattedValues);
      message.success('Görev başarıyla eklendi');
      setIsDrawerOpen(false);
      form.resetFields();
    } catch (error) {
      message.error('Görev eklenirken bir hata oluştu');
    }
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <HeaderComponent
        title={
          <div className="flex items-center gap-2">
            <CheckSquareOutlined style={{ fontSize: '24px' }} />
            <span>Görevler</span>
          </div>
        }
        description="Görevlerinizi görüntüleyin ve yönetin"
        buttonText={
          <Space size="middle">
            <Select
              placeholder="Filtrele"
              style={{ width: 120 }}
              value={filterStatus}
              onChange={setFilterStatus}
              className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600"
            >
              <Select.Option value="">Tümü</Select.Option>
              <Select.Option value="Beklemede">Beklemede</Select.Option>
              <Select.Option value="Devam Ediyor">Devam Ediyor</Select.Option>
              <Select.Option value="Tamamlandı">Tamamlandı</Select.Option>
            </Select>
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
              <PlusOutlined style={{ fontSize: '16px' }} />
              Yeni Görev
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
          dataSource={tasks}
          className="dark:bg-gray-800"
          pagination={{ pageSize: 10 }}
          size="middle"
        />
      </Card>

      <Drawer
        title="Yeni Görev Ekle"
        placement="right"
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
        width={400}
        className="dark:bg-gray-800"
        maskStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
        mask={true}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="title"
            label="Başlık"
            rules={[{ required: true, message: 'Lütfen başlık giriniz' }]}
          >
            <Input className="bg-white dark:bg-gray-600 border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Açıklama"
            rules={[{ required: true, message: 'Lütfen açıklama giriniz' }]}
          >
            <TextArea 
              rows={4} 
              className="bg-white dark:bg-gray-600 border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white"
            />
          </Form.Item>

          <Form.Item
            name="dueDate"
            label="Bitiş Tarihi"
            rules={[{ required: true, message: 'Lütfen bitiş tarihi seçiniz' }]}
          >
            <DatePicker
              format="DD.MM.YYYY"
              style={{ width: '100%' }}
              placeholder="Tarih seçin"
              className="bg-white dark:bg-gray-600 border-gray-300 dark:border-gray-500"
            />
          </Form.Item>

          <Form.Item
            name="priority"
            label="Öncelik"
            rules={[{ required: true, message: 'Lütfen öncelik seçiniz' }]}
          >
            <Select className="dark:bg-gray-600">
              <Select.Option value="Düşük">Düşük</Select.Option>
              <Select.Option value="Orta">Orta</Select.Option>
              <Select.Option value="Yüksek">Yüksek</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="assignees"
            label="Atanan Kişiler"
            rules={[{ required: true, message: 'Lütfen en az bir kişi seçiniz' }]}
          >
            <Select
              mode="multiple"
              placeholder="Kişi seçin"
              optionFilterProp="children"
              className="dark:bg-gray-600"
            >
              <Select.Option value="Ahmet Yılmaz">Ahmet Yılmaz</Select.Option>
              <Select.Option value="Ayşe Demir">Ayşe Demir</Select.Option>
              <Select.Option value="Mehmet Kaya">Mehmet Kaya</Select.Option>
              <Select.Option value="Zeynep Şahin">Zeynep Şahin</Select.Option>
              <Select.Option value="Can Öztürk">Can Öztürk</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Görev Ekle
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