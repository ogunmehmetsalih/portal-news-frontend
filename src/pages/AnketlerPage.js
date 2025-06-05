import React, { useState } from 'react';
import { 
  Card, Typography, Button, List, Tag, Progress, Radio, Space, 
  Divider, Badge, Tooltip, Row, Col, Drawer, Form, Input, 
  DatePicker, Select, message, Modal
} from 'antd';
import { 
  PlusOutlined, CheckCircleOutlined, ClockCircleOutlined, 
  BarChartOutlined, UserOutlined, CalendarOutlined, TeamOutlined,
  DeleteOutlined, FormOutlined, EyeOutlined, EditOutlined
} from '@ant-design/icons';
import HeaderComponent from '../components/HeaderComponent';
import dayjs from 'dayjs';
import 'dayjs/locale/tr';
import { getStatusColor } from '../utils/colorPalette';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;
const { Option } = Select;

export default function AnketlerPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [form] = Form.useForm();
  const [questions, setQuestions] = useState([
    { id: 1, question: '', options: ['', ''] }
  ]);

  const [surveys] = useState([
    {
      id: 1,
      title: 'Ofis İçi İletişim Değerlendirmesi',
      description: 'Şirket içi iletişim kanallarının etkinliğini değerlendirme anketi',
      status: 'active',
      dueDate: '2024-03-25',
      participation: 75,
      totalVotes: 45,
      creator: 'Ayşe Yılmaz',
      department: 'İnsan Kaynakları',
      questions: [
        {
          question: 'Hangi iletişim kanalını daha etkili buluyorsunuz?',
          options: ['E-posta', 'Slack', 'Teams', 'Yüz yüze toplantılar'],
          votes: [15, 12, 10, 8]
        }
      ]
    },
    {
      id: 2,
      title: 'Uzaktan Çalışma Memnuniyeti',
      description: 'Uzaktan çalışma sürecindeki deneyiminizi değerlendirme anketi',
      status: 'completed',
      dueDate: '2024-03-10',
      participation: 100,
      totalVotes: 50,
      creator: 'Mehmet Demir',
      department: 'Operasyon',
      questions: [
        {
          question: 'Uzaktan çalışma verimliliğinizi nasıl etkiliyor?',
          options: ['Çok olumlu', 'Olumlu', 'Nötr', 'Olumsuz'],
          votes: [20, 15, 10, 5]
        }
      ]
    },
    {
      id: 3,
      title: 'Yeni Ofis Lokasyonu',
      description: 'Yeni ofis lokasyonu tercihleri hakkında görüş anketi',
      status: 'upcoming',
      dueDate: '2024-04-01',
      participation: 0,
      totalVotes: 0,
      creator: 'Ali Kaya',
      department: 'Yönetim',
      questions: [
        {
          question: 'Tercih ettiğiniz ofis lokasyonu hangisi?',
          options: ['Merkezi lokasyon', 'Teknoloji bölgesi', 'Şehir dışı kampüs'],
          votes: [0, 0, 0]
        }
      ]
    }
  ]);

  const getStatusTag = (status) => {
    switch (status) {
      case 'active':
        return <Tag color={getStatusColor('Devam Ediyor')} icon={<ClockCircleOutlined />} style={{ color: 'black', fontWeight: '500' }}>Devam Ediyor</Tag>;
      case 'completed':
        return <Tag color={getStatusColor('Tamamlandı')} icon={<CheckCircleOutlined />} style={{ color: 'black', fontWeight: '500' }}>Tamamlandı</Tag>;
      case 'upcoming':
        return <Tag color={getStatusColor('Yakında')} icon={<ClockCircleOutlined />} style={{ color: 'black', fontWeight: '500' }}>Yakında</Tag>;
      default:
        return null;
    }
  };

  const getStatusColorFromStatus = (status) => {
    switch (status) {
      case 'active':
        return getStatusColor('Devam Ediyor');
      case 'completed':
        return getStatusColor('Tamamlandı');
      case 'upcoming':
        return getStatusColor('Yakında');
      default:
        return '#d9d9d9';
    }
  };

  const renderSurveyCard = (survey) => {
    const totalVotesForQuestion = survey.questions[0].votes.reduce((a, b) => a + b, 0);
    const borderColor = getStatusColorFromStatus(survey.status);
    
    return (
      <Card
        key={survey.id}
        className="mb-6 survey-card border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
        style={{
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          transition: 'all 0.3s ease'
        }}
        headStyle={{
          padding: '24px',
          borderBottom: '1px solid #f0f0f0',
          background: 'white'
        }}
        bodyStyle={{
          padding: '24px'
        }}
        title={
          <div>
            <Row gutter={[16, 16]} align="middle" style={{ marginBottom: '20px' }}>
              <Col xs={24} md={12}>
                <Title level={4} className="text-gray-900 dark:text-white" style={{ margin: 0 }}>
                  {survey.title}
                </Title>
              </Col>
              <Col xs={24} md={12}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'flex-end', 
                  alignItems: 'center',
                  gap: '12px',
                  flexWrap: 'wrap'
                }}>
                  {getStatusTag(survey.status)}
                  <Tooltip title="Katılım Oranı">
                    <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700" style={{ 
                      borderRadius: '6px',
                      padding: '6px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <BarChartOutlined style={{ fontSize: '16px', color: survey.status === 'completed' ? '#52c41a' : '#1890ff' }} />
                      <Text className="text-blue-600 dark:text-blue-300" style={{ 
                        fontSize: '14px',
                        margin: 0,
                        fontWeight: '500'
                      }}>
                        {survey.participation}% Katılım
                      </Text>
                    </div>
                  </Tooltip>
                </div>
              </Col>
            </Row>

            <Row gutter={[24, 8]} align="middle">
              <Col xs={24} sm={8}>
                <Space size="small" align="center">
                  <CalendarOutlined style={{ color: '#8c8c8c', fontSize: '14px' }} />
                  <Text type="secondary" className="text-gray-500 dark:text-gray-400" style={{ fontSize: '14px' }}>
                    Son Katılım: {survey.dueDate}
                  </Text>
                </Space>
              </Col>
              <Col xs={24} sm={8}>
                <Space size="small" align="center">
                  <UserOutlined style={{ color: '#8c8c8c', fontSize: '14px' }} />
                  <Text type="secondary" className="text-gray-500 dark:text-gray-400" style={{ fontSize: '14px' }}>
                    {survey.creator}
                  </Text>
                </Space>
              </Col>
              <Col xs={24} sm={8}>
                <Space size="small" align="center">
                  <TeamOutlined style={{ color: '#8c8c8c', fontSize: '14px' }} />
                  <Text type="secondary" className="text-gray-500 dark:text-gray-400" style={{ fontSize: '14px' }}>
                    {survey.department}
                  </Text>
                </Space>
              </Col>
            </Row>
          </div>
        }
      >
        <Paragraph className="text-gray-600 dark:text-gray-300" style={{ fontSize: '15px', marginBottom: '20px' }}>{survey.description}</Paragraph>
        
        <div className="survey-content bg-gray-50 dark:bg-gray-700" style={{ padding: '20px', borderRadius: '8px' }}>
          <Title level={5} className="text-gray-900 dark:text-white" style={{ marginBottom: '16px' }}>{survey.questions[0].question}</Title>
          <Radio.Group style={{ width: '100%' }}>
            <Space direction="vertical" style={{ width: '100%' }} size="large">
              {survey.questions[0].options.map((option, index) => (
                <div key={index} className="bg-white dark:bg-gray-600 border border-gray-200 dark:border-gray-500" style={{ width: '100%', padding: '12px', borderRadius: '6px' }}>
                  <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                    <Radio value={index} disabled={survey.status !== 'active'}>
                      <Text strong className="text-gray-900 dark:text-white">{option}</Text>
                    </Radio>
                    <div style={{ minWidth: '200px' }}>
                      <Progress
                        percent={totalVotesForQuestion ? Math.round((survey.questions[0].votes[index] / totalVotesForQuestion) * 100) : 0}
                        size="small"
                        strokeColor={borderColor}
                        format={(percent) => `${survey.questions[0].votes[index]} oy (${percent}%)`}
                      />
                    </div>
                  </Space>
                </div>
              ))}
            </Space>
          </Radio.Group>
        </div>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginTop: '20px'
        }}>
          <Text type="secondary" className="text-gray-500 dark:text-gray-400" style={{ fontSize: '14px' }}>
            <TeamOutlined style={{ marginRight: '8px' }} />
            Toplam {survey.totalVotes} katılımcı
          </Text>
          {survey.status === 'active' && (
            <Button type="primary" size="large" style={{ borderRadius: '6px' }}>
              Ankete Katıl
            </Button>
          )}
        </div>
      </Card>
    );
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { id: questions.length + 1, question: '', options: ['', ''] }
    ]);
  };

  const handleAddOption = (questionId) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId) {
        return { ...q, options: [...q.options, ''] };
      }
      return q;
    }));
  };

  const handleRemoveOption = (questionId, optionIndex) => {
    setQuestions(questions.map(q => {
      if (q.id === questionId && q.options.length > 2) {
        const newOptions = [...q.options];
        newOptions.splice(optionIndex, 1);
        return { ...q, options: newOptions };
      }
      return q;
    }));
  };

  const handleRemoveQuestion = (questionId) => {
    if (questions.length > 1) {
      setQuestions(questions.filter(q => q.id !== questionId));
    } else {
      message.warning('En az bir soru olmalıdır.');
    }
  };

  const handleSubmit = (values) => {
    console.log('Form değerleri:', { ...values, questions });
    message.success('Anket başarıyla oluşturuldu!');
    setIsDrawerOpen(false);
    form.resetFields();
    setQuestions([{ id: 1, question: '', options: ['', ''] }]);
  };

  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <HeaderComponent
        title={
        <div className="flex items-center gap-2">
            <FormOutlined style={{ fontSize: '24px' }} />
            <span>Anketler</span>
        </div>
        }
        description="Kurum içi anketler ve değerlendirmeler"
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
            Yeni Anket
          </button>
        }
      />

      <Row gutter={[0, 24]}>
        <Col span={24}>
          <List
            dataSource={surveys}
            renderItem={renderSurveyCard}
            pagination={false}
          />
        </Col>
      </Row>

      <Drawer
        title="Yeni Anket Oluştur"
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
          initialValues={{
            status: 'active'
          }}
        >
          <Form.Item
            name="title"
            label="Anket Başlığı"
            rules={[{ required: true, message: 'Lütfen anket başlığını girin' }]}
          >
            <Input 
              placeholder="Anket başlığını girin"
              className="bg-white dark:bg-gray-600 border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white"
            />
          </Form.Item>

          <Form.Item
            name="description"
            label="Açıklama"
            rules={[{ required: true, message: 'Lütfen anket açıklamasını girin' }]}
          >
            <TextArea 
              rows={4} 
              placeholder="Anket açıklamasını girin"
              className="bg-white dark:bg-gray-600 border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white"
            />
          </Form.Item>

          <Form.Item
            name="dueDate"
            label="Son Katılım Tarihi"
            rules={[{ required: true, message: 'Lütfen son katılım tarihini seçin' }]}
          >
            <DatePicker 
              style={{ width: '100%' }} 
              placeholder="Tarih seçin"
              className="bg-white dark:bg-gray-600 border-gray-300 dark:border-gray-500"
            />
          </Form.Item>

          <Form.Item
            name="department"
            label="Departman"
            rules={[{ required: true, message: 'Lütfen departman seçin' }]}
          >
            <Select 
              placeholder="Departman seçin"
              className="dark:bg-gray-600"
            >
              <Option value="İnsan Kaynakları">İnsan Kaynakları</Option>
              <Option value="Yazılım Geliştirme">Yazılım Geliştirme</Option>
              <Option value="Operasyon">Operasyon</Option>
              <Option value="Yönetim">Yönetim</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="status"
            label="Durum"
            rules={[{ required: true, message: 'Lütfen durum seçin' }]}
          >
            <Select 
              placeholder="Durum seçin"
              className="dark:bg-gray-600"
            >
              <Option value="active">Aktif</Option>
              <Option value="upcoming">Yakında</Option>
            </Select>
          </Form.Item>

          <Divider>Sorular</Divider>

          {questions.map((question, questionIndex) => (
            <div key={question.id} className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600" style={{ marginBottom: '24px', padding: '20px', borderRadius: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                <Title level={5} className="text-gray-900 dark:text-white" style={{ margin: 0 }}>Soru {questionIndex + 1}</Title>
                <Button 
                  type="text"
                  danger 
                  icon={<DeleteOutlined />}
                  onClick={() => handleRemoveQuestion(question.id)}
                />
              </div>

              <Form.Item
                label={<span className="text-gray-700 dark:text-gray-300">Soru</span>}
                required
                style={{ marginBottom: '16px' }}
              >
                <Input 
                  placeholder="Soruyu girin"
                  value={question.question}
                  className="bg-white dark:bg-gray-600 border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white"
                  onChange={(e) => {
                    const newQuestions = [...questions];
                    newQuestions[questionIndex].question = e.target.value;
                    setQuestions(newQuestions);
                  }}
                />
              </Form.Item>

              {question.options.map((option, optionIndex) => (
                <div key={optionIndex} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <Input
                    placeholder={`Seçenek ${optionIndex + 1}`}
                    value={option}
                    className="bg-white dark:bg-gray-600 border-gray-300 dark:border-gray-500 text-gray-900 dark:text-white"
                    onChange={(e) => {
                      const newQuestions = [...questions];
                      newQuestions[questionIndex].options[optionIndex] = e.target.value;
                      setQuestions(newQuestions);
                    }}
                  />
                  {question.options.length > 2 && (
                    <Button 
                      type="text"
                      danger 
                      icon={<DeleteOutlined />}
                      onClick={() => handleRemoveOption(question.id, optionIndex)}
                    />
                  )}
                </div>
              ))}

              <Button 
                type="dashed" 
                onClick={() => handleAddOption(question.id)}
                block
                className="border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300"
                style={{ marginTop: '8px' }}
              >
                + Seçenek Ekle
              </Button>
            </div>
          ))}

          <Button 
            type="dashed" 
            onClick={handleAddQuestion} 
            block 
            className="border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300"
            style={{ marginBottom: '24px' }}
          >
            + Yeni Soru Ekle
          </Button>
        </Form>
      </Drawer>

      <style jsx global>{`
        .survey-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(0,0,0,0.1);
        }

        /* Dark mode Radio styling */
        .dark .ant-radio-wrapper {
          color: white !important;
        }

        .dark .ant-radio-inner {
          background-color: #374151 !important;
          border-color: #6b7280 !important;
        }

        .dark .ant-radio-checked .ant-radio-inner {
          background-color: #1890ff !important;
          border-color: #1890ff !important;
        }

        .dark .ant-radio-checked .ant-radio-inner::after {
          background-color: white !important;
        }

        .dark .ant-radio:hover .ant-radio-inner {
          border-color: #1890ff !important;
        }

        .dark .ant-radio-disabled .ant-radio-inner {
          background-color: #374151 !important;
          border-color: #4b5563 !important;
        }

        .dark .ant-radio-wrapper-disabled {
          color: #6b7280 !important;
        }

        /* Dark mode Progress styling */
        .dark .ant-progress-text {
          color: white !important;
        }

        .dark .ant-progress-bg {
          background-color: #374151 !important;
        }

        /* Dark mode Divider styling */
        .dark .ant-divider-vertical {
          border-left-color: #4b5563 !important;
        }

        /* Dark mode Card styling */
        .dark .ant-card-head {
          background-color: #374151 !important;
          border-bottom-color: #4b5563 !important;
        }

        .dark .ant-card-head-title {
          color: white !important;
        }

        /* Dark mode Tooltip styling */
        .dark .ant-tooltip-inner {
          background-color: #1f2937 !important;
          color: white !important;
        }

        .dark .ant-tooltip-arrow::before {
          background-color: #1f2937 !important;
        }
      `}</style>
    </div>
  );
} 