import React, { useState } from 'react';
import { 
  Calendar, Badge, Card, Typography, Button, Row, Col, 
  Drawer, Form, Input, DatePicker, TimePicker, Select, 
  Space, Tag, List, Tooltip, Modal, message 
} from 'antd';
import {
  PlusOutlined,
  ClockCircleOutlined,
  TeamOutlined,
  EnvironmentOutlined,
  VideoCameraOutlined,
  DeleteOutlined,
  EditOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  CalendarOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import 'dayjs/locale/tr';
import HeaderComponent from '../components/HeaderComponent';
import { TAG_COLORS } from '../utils/colorPalette';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;
const { confirm } = Modal;

dayjs.locale('tr');

export default function TakvimPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [form] = Form.useForm();

  // Örnek etkinlikler
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Sprint Planlama Toplantısı',
      description: 'Q1 2024 sprint planlama toplantısı',
      date: '2024-03-20',
      time: '10:00',
      duration: '2',
      type: 'meeting',
      location: 'Toplantı Odası 1',
      isOnline: true,
      meetingLink: 'https://meet.google.com/abc',
      attendees: ['Ahmet Yılmaz', 'Mehmet Demir', 'Ayşe Kaya'],
      status: 'upcoming'
    },
    {
      id: 2,
      title: 'Ekip Kahvaltısı',
      description: 'Aylık ekip kahvaltısı',
      date: '2024-03-22',
      time: '09:00',
      duration: '1',
      type: 'social',
      location: 'Kafeterya',
      isOnline: false,
      attendees: ['Tüm Ekip'],
      status: 'upcoming'
    }
  ]);

  const eventTypeConfig = {
    meeting: {
      color: TAG_COLORS.TYPE.MEETING,
      icon: <TeamOutlined />,
      text: 'Toplantı'
    },
    training: {
      color: TAG_COLORS.TYPE.TRAINING,
      icon: <CheckCircleOutlined />,
      text: 'Eğitim'
    },
    deadline: {
      color: TAG_COLORS.TYPE.DEADLINE,
      icon: <ExclamationCircleOutlined />,
      text: 'Son Teslim'
    },
    social: {
      color: TAG_COLORS.TYPE.SOCIAL,
      icon: <TeamOutlined />,
      text: 'Sosyal'
    }
  };

  const handleSubmit = (values) => {
    const newEvent = {
      id: events.length + 1,
      ...values,
      date: values.date.format('YYYY-MM-DD'),
      time: values.time.format('HH:mm'),
      status: 'upcoming'
    };

    setEvents([...events, newEvent]);
    message.success('Etkinlik başarıyla oluşturuldu!');
    setIsDrawerOpen(false);
    form.resetFields();
  };

  const handleDelete = (eventId) => {
    confirm({
      title: 'Bu etkinliği silmek istediğinizden emin misiniz?',
      icon: <ExclamationCircleOutlined />,
      content: 'Bu işlem geri alınamaz.',
      okText: 'Evet',
      okType: 'danger',
      cancelText: 'İptal',
      onOk() {
        setEvents(events.filter(event => event.id !== eventId));
        message.success('Etkinlik silindi');
      }
    });
  };

  const dateCellRender = (value) => {
    const date = value.format('YYYY-MM-DD');
    const dayEvents = events.filter(event => event.date === date);

    return (
      <ul style={{ 
        listStyle: 'none', 
        padding: 0, 
        margin: 0,
        maxHeight: '80px',
        overflow: 'hidden'
      }}>
        {dayEvents.slice(0, 3).map(event => (
          <li key={event.id} style={{ marginBottom: '2px' }}>
            <Tooltip title={
              <div>
                <strong style={{ fontSize: '13px', color: 'white' }}>{event.title}</strong>
                <div style={{ fontSize: '12px', marginTop: '4px', color: '#d1d5db' }}>
                  <ClockCircleOutlined style={{ marginRight: '4px' }} />
                  {event.time}
                </div>
                <div style={{ fontSize: '12px', marginTop: '2px', color: '#d1d5db' }}>
                  <EnvironmentOutlined style={{ marginRight: '4px' }} />
                  {event.location}
                </div>
              </div>
            }>
              <div style={{
                padding: '2px 6px',
                borderRadius: '4px',
                backgroundColor: eventTypeConfig[event.type].color,
                color: 'white',
                fontSize: '11px',
                fontWeight: '500',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                maxWidth: '100%',
                cursor: 'pointer'
              }}>
                {event.title}
              </div>
            </Tooltip>
          </li>
        ))}
        {dayEvents.length > 3 && (
          <li>
            <div style={{
              fontSize: '10px',
              color: '#6b7280',
              textAlign: 'center',
              marginTop: '2px'
            }}>
              +{dayEvents.length - 3} daha...
            </div>
          </li>
        )}
      </ul>
    );
  };

  const renderEventCard = (event) => (
    <Card
      key={event.id}
      size="small"
      className="mb-3 cursor-pointer hover:shadow-md transition-shadow border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700"
      onClick={() => setSelectedEvent(event)}
    >
      <div style={{ padding: '8px 0' }}>
        <h4 className="text-gray-900 dark:text-white" style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '600' }}>
          {event.title}
        </h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <ClockCircleOutlined style={{ fontSize: '12px', color: '#8c8c8c' }} />
          <span className="text-gray-600 dark:text-gray-300" style={{ fontSize: '12px' }}>{event.time}</span>
        </div>
        <Tag 
          color={eventTypeConfig[event.type].color}
          style={{ 
            marginBottom: '8px',
            color: 'black',
            fontWeight: '500'
          }}
        >
          {eventTypeConfig[event.type].text}
        </Tag>
        <p className="text-gray-600 dark:text-gray-300" style={{ margin: 0, fontSize: '12px', lineHeight: '1.4' }}>
          {event.description}
        </p>
      </div>
    </Card>
  );

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <HeaderComponent
        title={
          <div className="flex items-center gap-2">
            <CalendarOutlined style={{ fontSize: '24px' }} />
            <span>Takvim</span>
          </div>
        }
        description="Etkinlik takvimi ve randevu yönetimi"
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
            <PlusOutlined style={{ fontSize: '16px' }} />
            Yeni Etkinlik
          </button>
        }
      />

      <Row gutter={[24, 24]} style={{ marginTop: '24px' }}>
        <Col span={14}>
          <Card 
            className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
            style={{ 
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
            }}
            bodyStyle={{ padding: '16px' }}
          >
            <Calendar
              dateCellRender={dateCellRender}
              onSelect={(date) => setSelectedDate(date.format('YYYY-MM-DD'))}
              className="dark:bg-gray-800 dark:text-white"
              style={{ 
                transform: 'scale(0.85)',
                transformOrigin: 'top left',
                width: '117.6%'
              }}
            />
          </Card>
        </Col>

        <Col span={10}>
          <Card
            title={
              <Space>
                <ClockCircleOutlined style={{ color: '#1890ff' }} />
                <span className="text-gray-900 dark:text-white" style={{ fontSize: '18px', fontWeight: '600' }}>Yaklaşan Etkinlikler</span>
              </Space>
            }
            className="border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
            style={{ 
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
            }}
            headStyle={{
              background: '#fafafa',
              borderBottom: '1px solid #f0f0f0',
              padding: '16px 24px'
            }}
            bodyStyle={{ padding: '16px' }}
          >
            <List
              dataSource={events.filter(event => event.status === 'upcoming')}
              renderItem={renderEventCard}
              locale={{ emptyText: 'Yaklaşan etkinlik bulunmuyor' }}
            />
          </Card>
        </Col>
      </Row>

      <Drawer
        title="Yeni Etkinlik Oluştur"
        width={720}
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        className="dark:bg-gray-800"
        extra={
          <Space>
            <Button onClick={() => setIsDrawerOpen(false)}>İptal</Button>
            <Button type="primary" onClick={() => form.submit()}>
              Oluştur
            </Button>
          </Space>
        }
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
        >
          <Form.Item
            name="title"
            label="Etkinlik Başlığı"
            rules={[{ required: true, message: 'Lütfen etkinlik başlığını girin' }]}
          >
            <Input 
              placeholder="Etkinlik başlığını girin"
              className="bg-white dark:bg-gray-600 border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white"
            />
          </Form.Item>

          <Form.Item
            name="description"
            label="Açıklama"
            rules={[{ required: true, message: 'Lütfen etkinlik açıklamasını girin' }]}
          >
            <TextArea 
              rows={4} 
              placeholder="Etkinlik açıklamasını girin"
              className="bg-white dark:bg-gray-600 border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white"
            />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="date"
                label="Tarih"
                rules={[{ required: true, message: 'Lütfen tarih seçin' }]}
              >
                <DatePicker 
                  style={{ width: '100%' }}
                  className="bg-white dark:bg-gray-600 border-gray-300 dark:border-gray-500"
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="time"
                label="Saat"
                rules={[{ required: true, message: 'Lütfen saat seçin' }]}
              >
                <TimePicker 
                  style={{ width: '100%' }} 
                  format="HH:mm"
                  className="bg-white dark:bg-gray-600 border-gray-300 dark:border-gray-500"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="type"
                label="Etkinlik Tipi"
                rules={[{ required: true, message: 'Lütfen etkinlik tipi seçin' }]}
              >
                <Select 
                  placeholder="Tip seçin"
                  className="dark:bg-gray-600"
                >
                  <Option value="meeting">Toplantı</Option>
                  <Option value="training">Eğitim</Option>
                  <Option value="deadline">Son Teslim</Option>
                  <Option value="social">Sosyal</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="duration"
                label="Süre (Saat)"
                rules={[{ required: true, message: 'Lütfen süre girin' }]}
              >
                <Input 
                  type="number" 
                  min={0.5} 
                  step={0.5}
                  className="bg-white dark:bg-gray-600 border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white"
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="location"
            label="Konum"
            rules={[{ required: true, message: 'Lütfen konum girin' }]}
          >
            <Input 
              placeholder="Etkinlik konumunu girin"
              className="bg-white dark:bg-gray-600 border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white"
            />
          </Form.Item>

          <Form.Item
            name="isOnline"
            valuePropName="checked"
            label="Online Etkinlik"
          >
            <Select 
              placeholder="Online/Yüz yüze seçin"
              className="dark:bg-gray-600"
            >
              <Option value={true}>Online</Option>
              <Option value={false}>Yüz yüze</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="meetingLink"
            label="Toplantı Linki"
            rules={[{ 
              required: form.getFieldValue('isOnline'), 
              message: 'Online etkinlik için link gerekli' 
            }]}
          >
            <Input 
              placeholder="Toplantı linkini girin"
              className="bg-white dark:bg-gray-600 border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white"
            />
          </Form.Item>

          <Form.Item
            name="attendees"
            label="Katılımcılar"
            rules={[{ required: true, message: 'Lütfen katılımcıları girin' }]}
          >
            <Select
              mode="tags"
              style={{ width: '100%' }}
              placeholder="Katılımcıları girin veya seçin"
              className="dark:bg-gray-600"
              options={[
                { value: 'Tüm Ekip', label: 'Tüm Ekip' },
                { value: 'Ahmet Yılmaz', label: 'Ahmet Yılmaz' },
                { value: 'Mehmet Demir', label: 'Mehmet Demir' },
                { value: 'Ayşe Kaya', label: 'Ayşe Kaya' }
              ]}
            />
          </Form.Item>
        </Form>
      </Drawer>

      <style jsx global>{`
        .event-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.12);
        }
        
        .ant-calendar-date {
          min-height: 60px !important;
          padding: 4px !important;
        }
        
        .ant-calendar-cell {
          vertical-align: top !important;
        }
        
        .ant-calendar-month-panel-table,
        .ant-calendar-year-panel-table {
          width: 100% !important;
        }
        
        .ant-calendar-table {
          font-size: 13px !important;
        }
        
        .ant-calendar-today .ant-calendar-date {
          background: #e6f7ff !important;
          border-color: #1890ff !important;
        }

        /* Dark mode Calendar styling */
        .dark .ant-picker-calendar {
          background-color: #1f2937 !important;
          color: white !important;
        }
        
        .dark .ant-picker-calendar-header {
          background-color: #374151 !important;
          border-bottom: 1px solid #4b5563 !important;
        }
        
        .dark .ant-picker-calendar-header .ant-picker-calendar-year-select,
        .dark .ant-picker-calendar-header .ant-picker-calendar-month-select {
          color: white !important;
        }
        
        .dark .ant-picker-cell {
          color: white !important;
        }
        
        .dark .ant-picker-cell:hover:not(.ant-picker-cell-selected):not(.ant-picker-cell-range-start):not(.ant-picker-cell-range-end):not(.ant-picker-cell-range-hover-start):not(.ant-picker-cell-range-hover-end) .ant-picker-cell-inner {
          background-color: #374151 !important;
        }
        
        .dark .ant-picker-cell-today .ant-picker-cell-inner {
          background-color: #1890ff !important;
          color: white !important;
        }
        
        .dark .ant-picker-calendar-date {
          background-color: #1f2937 !important;
          border: 1px solid #374151 !important;
          color: white !important;
        }
        
        .dark .ant-picker-calendar-date-value {
          color: white !important;
        }
        
        .dark .ant-picker-calendar-date-content {
          color: white !important;
        }

        .dark .ant-card-head {
          background-color: #374151 !important;
          border-bottom: 1px solid #4b5563 !important;
        }

        .dark .ant-card-head-title {
          color: white !important;
        }

        /* Picker Panel Dark Mode */
        .dark .ant-picker-panel {
          background-color: #1f2937 !important;
          border: 1px solid #4b5563 !important;
        }

        .dark .ant-picker-content {
          background-color: #1f2937 !important;
        }

        .dark .ant-picker-header {
          background-color: #374151 !important;
          border-bottom: 1px solid #4b5563 !important;
        }

        .dark .ant-picker-header-view {
          color: white !important;
        }

        .dark .ant-picker-body {
          background-color: #1f2937 !important;
        }

        .dark .ant-picker-content th {
          color: #9ca3af !important;
        }

        .dark .ant-picker-dropdown {
          background-color: #1f2937 !important;
          border: 1px solid #4b5563 !important;
        }

        /* List Dark Mode */
        .dark .ant-list {
          background-color: transparent !important;
        }

        .dark .ant-list-item {
          background-color: transparent !important;
          border-bottom: 1px solid #374151 !important;
        }

        .dark .ant-empty-description {
          color: #9ca3af !important;
        }
      `}</style>
    </div>
  );
} 