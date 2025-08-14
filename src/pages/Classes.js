import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Space,
  Input,
  Card,
  Modal,
  Form,
  Select,
  TimePicker,
  Tag,
  Avatar,
  Typography,
  Row,
  Col,
  Statistic,
  Tooltip,
  Popconfirm,
  Progress
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  CalendarOutlined,
  UserOutlined,
  FilterOutlined,
  ClockCircleOutlined
} from '@ant-design/icons';
import moment from 'moment';

const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingClass, setEditingClass] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    setLoading(true);
    // Mock data - replace with actual API call
    const mockClasses = [
      {
        id: 1,
        name: 'Morning Yoga',
        description: 'Gentle yoga session to start your day',
        trainer: 'Sarah Johnson',
        trainerAvatar: '👩‍💼',
        category: 'yoga',
        dayOfWeek: 'monday',
        startTime: '07:00',
        endTime: '08:00',
        maxParticipants: 15,
        currentParticipants: 12,
        status: 'active',
        room: 'Studio A',
        price: 15
      },
      {
        id: 2,
        name: 'HIIT Training',
        description: 'High-intensity interval training for maximum results',
        trainer: 'Mike Wilson',
        trainerAvatar: '👨‍💼',
        category: 'cardio',
        dayOfWeek: 'monday',
        startTime: '09:00',
        endTime: '10:00',
        maxParticipants: 20,
        currentParticipants: 18,
        status: 'active',
        room: 'Main Gym',
        price: 20
      },
      {
        id: 3,
        name: 'Strength Training',
        description: 'Build muscle and increase strength',
        trainer: 'Alex Brown',
        trainerAvatar: '👨‍💼',
        category: 'strength',
        dayOfWeek: 'wednesday',
        startTime: '17:00',
        endTime: '18:00',
        maxParticipants: 12,
        currentParticipants: 8,
        status: 'active',
        room: 'Weight Room',
        price: 18
      },
      {
        id: 4,
        name: 'Pilates',
        description: 'Core strengthening and flexibility',
        trainer: 'Lisa Davis',
        trainerAvatar: '👩‍💼',
        category: 'pilates',
        dayOfWeek: 'friday',
        startTime: '16:00',
        endTime: '17:00',
        maxParticipants: 10,
        currentParticipants: 6,
        status: 'active',
        room: 'Studio B',
        price: 16
      },
      {
        id: 5,
        name: 'Zumba',
        description: 'Dance fitness with Latin rhythms',
        trainer: 'Maria Garcia',
        trainerAvatar: '👩‍💼',
        category: 'dance',
        dayOfWeek: 'saturday',
        startTime: '10:00',
        endTime: '11:00',
        maxParticipants: 25,
        currentParticipants: 22,
        status: 'active',
        room: 'Main Gym',
        price: 12
      }
    ];
    
    setClasses(mockClasses);
    setLoading(false);
  };

  const handleAddClass = () => {
    setEditingClass(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditClass = (record) => {
    setEditingClass(record);
    form.setFieldsValue({
      ...record,
      startTime: moment(record.startTime, 'HH:mm'),
      endTime: moment(record.endTime, 'HH:mm')
    });
    setIsModalVisible(true);
  };

  const handleDeleteClass = (id) => {
    setClasses(classes.filter(c => c.id !== id));
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      const classData = {
        ...values,
        startTime: values.startTime.format('HH:mm'),
        endTime: values.endTime.format('HH:mm')
      };

      if (editingClass) {
        // Update existing class
        setClasses(classes.map(c =>
          c.id === editingClass.id
            ? { ...c, ...classData }
            : c
        ));
      } else {
        // Add new class
        const newClass = {
          ...classData,
          id: Date.now(),
          currentParticipants: 0,
          status: 'active'
        };
        setClasses([...classes, newClass]);
      }

      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'yoga': return 'green';
      case 'cardio': return 'red';
      case 'strength': return 'blue';
      case 'pilates': return 'purple';
      case 'dance': return 'pink';
      default: return 'default';
    }
  };

  const getDayColor = (day) => {
    switch (day) {
      case 'monday': return 'blue';
      case 'tuesday': return 'green';
      case 'wednesday': return 'orange';
      case 'thursday': return 'purple';
      case 'friday': return 'red';
      case 'saturday': return 'cyan';
      case 'sunday': return 'magenta';
      default: return 'default';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'green';
      case 'inactive': return 'red';
      case 'cancelled': return 'orange';
      default: return 'default';
    }
  };

  const columns = [
    {
      title: 'Class',
      key: 'class',
      render: (_, record) => (
        <Space>
          <Avatar size="small">{record.trainerAvatar}</Avatar>
          <div>
            <div style={{ fontWeight: 'bold' }}>{record.name}</div>
            <Text type="secondary">{record.description}</Text>
          </div>
        </Space>
      ),
    },
    {
      title: 'Trainer',
      dataIndex: 'trainer',
      key: 'trainer',
    },
    {
      title: 'Category',
      key: 'category',
      render: (_, record) => (
        <Tag color={getCategoryColor(record.category)}>
          {record.category.charAt(0).toUpperCase() + record.category.slice(1)}
        </Tag>
      ),
    },
    {
      title: 'Schedule',
      key: 'schedule',
      render: (_, record) => (
        <Space direction="vertical" size="small">
          <Tag color={getDayColor(record.dayOfWeek)}>
            {record.dayOfWeek.charAt(0).toUpperCase() + record.dayOfWeek.slice(1)}
          </Tag>
          <div>
            <ClockCircleOutlined /> {record.startTime} - {record.endTime}
          </div>
        </Space>
      ),
    },
    {
      title: 'Room',
      dataIndex: 'room',
      key: 'room',
    },
    {
      title: 'Participants',
      key: 'participants',
      render: (_, record) => (
        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          <Text>{record.currentParticipants}/{record.maxParticipants}</Text>
          <Progress
            percent={Math.round((record.currentParticipants / record.maxParticipants) * 100)}
            size="small"
            showInfo={false}
            status={record.currentParticipants >= record.maxParticipants ? 'exception' : 'normal'}
          />
        </Space>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (price) => `$${price}`,
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Status',
      key: 'status',
      render: (_, record) => (
        <Tag color={getStatusColor(record.status)}>
          {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
        </Tag>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Tooltip title="View Details">
            <Button type="text" icon={<EyeOutlined />} size="small" />
          </Tooltip>
          <Tooltip title="Edit Class">
            <Button
              type="text"
              icon={<EditOutlined />}
              size="small"
              onClick={() => handleEditClass(record)}
            />
          </Tooltip>
          <Tooltip title="Delete Class">
            <Popconfirm
              title="Are you sure you want to delete this class?"
              onConfirm={() => handleDeleteClass(record.id)}
              okText="Yes"
              cancelText="No"
            >
              <Button type="text" icon={<DeleteOutlined />} size="small" danger />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const filteredClasses = classes.filter(c =>
    c.name.toLowerCase().includes(searchText.toLowerCase()) ||
    c.trainer.toLowerCase().includes(searchText.toLowerCase()) ||
    c.category.toLowerCase().includes(searchText.toLowerCase())
  );

  const stats = {
    total: classes.length,
    active: classes.filter(c => c.status === 'active').length,
    totalParticipants: classes.reduce((sum, c) => sum + c.currentParticipants, 0),
    totalCapacity: classes.reduce((sum, c) => sum + c.maxParticipants, 0)
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Title level={2}>Classes Management</Title>
        <Text type="secondary">Manage gym classes, schedules, and bookings</Text>
      </div>

      {/* Stats Row */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Classes"
              value={stats.total}
              prefix={<CalendarOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Active Classes"
              value={stats.active}
              prefix={<CalendarOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Participants"
              value={stats.totalParticipants}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Capacity"
              value={stats.totalCapacity}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Search and Actions */}
      <Card style={{ marginBottom: 16 }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} md={12}>
            <Search
              placeholder="Search classes by name, trainer, or category"
              allowClear
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              style={{ width: '100%' }}
            />
          </Col>
          <Col xs={24} md={12} style={{ textAlign: 'right' }}>
            <Space>
              <Button icon={<FilterOutlined />}>
                Filters
              </Button>
              <Button type="primary" icon={<PlusOutlined />} onClick={handleAddClass}>
                Add Class
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Classes Table */}
      <Card>
        <Table
          columns={columns}
          dataSource={filteredClasses}
          loading={loading}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} classes`,
          }}
        />
      </Card>

      {/* Add/Edit Class Modal */}
      <Modal
        title={editingClass ? 'Edit Class' : 'Add New Class'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        width={700}
        okText={editingClass ? 'Update' : 'Add'}
        cancelText="Cancel"
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            status: 'active',
            category: 'yoga',
            dayOfWeek: 'monday'
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Class Name"
                rules={[{ required: true, message: 'Please enter class name' }]}
              >
                <Input placeholder="Enter class name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="trainer"
                label="Trainer"
                rules={[{ required: true, message: 'Please enter trainer name' }]}
              >
                <Input placeholder="Enter trainer name" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter description' }]}
          >
            <Input.TextArea placeholder="Enter class description" rows={3} />
          </Form.Item>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="category"
                label="Category"
                rules={[{ required: true, message: 'Please select category' }]}
              >
                <Select placeholder="Select category">
                  <Option value="yoga">Yoga</Option>
                  <Option value="cardio">Cardio</Option>
                  <Option value="strength">Strength</Option>
                  <Option value="pilates">Pilates</Option>
                  <Option value="dance">Dance</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="dayOfWeek"
                label="Day of Week"
                rules={[{ required: true, message: 'Please select day' }]}
              >
                <Select placeholder="Select day">
                  <Option value="monday">Monday</Option>
                  <Option value="tuesday">Tuesday</Option>
                  <Option value="wednesday">Wednesday</Option>
                  <Option value="thursday">Thursday</Option>
                  <Option value="friday">Friday</Option>
                  <Option value="saturday">Saturday</Option>
                  <Option value="sunday">Sunday</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="room"
                label="Room"
                rules={[{ required: true, message: 'Please enter room' }]}
              >
                <Input placeholder="Enter room" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="startTime"
                label="Start Time"
                rules={[{ required: true, message: 'Please select start time' }]}
              >
                <TimePicker format="HH:mm" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="endTime"
                label="End Time"
                rules={[{ required: true, message: 'Please select end time' }]}
              >
                <TimePicker format="HH:mm" style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="maxParticipants"
                label="Max Participants"
                rules={[{ required: true, message: 'Please enter max participants' }]}
              >
                <Input placeholder="Enter max participants" type="number" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: 'Please enter price' }]}
          >
            <Input placeholder="Enter price" type="number" prefix="$" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Classes;
