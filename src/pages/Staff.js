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
  DatePicker,
  Tag,
  Avatar,
  Typography,
  Row,
  Col,
  Statistic,
  Tooltip,
  Popconfirm,
  Switch
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  TeamOutlined,
  UserOutlined,
  FilterOutlined
} from '@ant-design/icons';
import moment from 'moment';

const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;

const Staff = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingStaff, setEditingStaff] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    setLoading(true);
    // Mock data - replace with actual API call
    const mockStaff = [
      {
        id: 1,
        name: 'Sanghdeep Gedam',
        email: 'sarah.johnson@gym.com',
        phone: '+1 (555) 111-2222',
        role: 'trainer',
        department: 'fitness',
        status: 'active',
        hireDate: '2023-06-15',
        salary: 45000,
        avatar: '👩‍💼',
        specializations: ['Yoga', 'Pilates'],
        isActive: true
      },
      {
        id: 2,
        name: 'Mike Wilson',
        email: 'mike.wilson@gym.com',
        phone: '+1 (555) 222-3333',
        role: 'trainer',
        department: 'strength',
        status: 'active',
        hireDate: '2023-08-20',
        salary: 48000,
        avatar: '👨‍💼',
        specializations: ['Weight Training', 'CrossFit'],
        isActive: true
      },
      {
        id: 3,
        name: 'Alex Brown',
        email: 'alex.brown@gym.com',
        phone: '+1 (555) 333-4444',
        role: 'admin',
        department: 'management',
        status: 'active',
        hireDate: '2023-01-10',
        salary: 65000,
        avatar: '👨‍💼',
        specializations: ['Operations', 'Finance'],
        isActive: true
      },
      {
        id: 4,
        name: 'Lisa Davis',
        email: 'lisa.davis@gym.com',
        phone: '+1 (555) 444-5555',
        role: 'receptionist',
        department: 'front_desk',
        status: 'active',
        hireDate: '2023-09-05',
        salary: 35000,
        avatar: '👩‍💼',
        specializations: ['Customer Service'],
        isActive: true
      },
      {
        id: 5,
        name: 'Pratik',
        email: 'pratik@gym.com',
        phone: '+1 (555) 555-6666',
        role: 'maintenance',
        department: 'facilities',
        status: 'inactive',
        hireDate: '2023-03-12',
        salary: 4000,
        avatar: '👨‍💼',
        specializations: ['Equipment Maintenance'],
        isActive: false
      }
    ];
    
    setStaff(mockStaff);
    setLoading(false);
  };

  const handleAddStaff = () => {
    setEditingStaff(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditStaff = (record) => {
    setEditingStaff(record);
    form.setFieldsValue({
      ...record,
      hireDate: moment(record.hireDate)
    });
    setIsModalVisible(true);
  };

  const handleDeleteStaff = (id) => {
    setStaff(staff.filter(s => s.id !== id));
  };

  const handleToggleStatus = (id, isActive) => {
    setStaff(staff.map(s =>
      s.id === id ? { ...s, isActive, status: isActive ? 'active' : 'inactive' } : s
    ));
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      const staffData = {
        ...values,
        hireDate: values.hireDate.format('YYYY-MM-DD')
      };

      if (editingStaff) {
        // Update existing staff
        setStaff(staff.map(s =>
          s.id === editingStaff.id
            ? { ...s, ...staffData }
            : s
        ));
      } else {
        // Add new staff
        const newStaff = {
          ...staffData,
          id: Date.now(),
          avatar: '👤',
          isActive: true,
          status: 'active'
        };
        setStaff([...staff, newStaff]);
      }

      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'red';
      case 'trainer': return 'blue';
      case 'receptionist': return 'green';
      case 'maintenance': return 'orange';
      default: return 'default';
    }
  };

  const getDepartmentColor = (dept) => {
    switch (dept) {
      case 'fitness': return 'purple';
      case 'strength': return 'volcano';
      case 'management': return 'red';
      case 'front_desk': return 'cyan';
      case 'facilities': return 'orange';
      default: return 'default';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'green';
      case 'inactive': return 'red';
      case 'on_leave': return 'orange';
      default: return 'default';
    }
  };

  const columns = [
    {
      title: 'Staff Member',
      key: 'staff',
      render: (_, record) => (
        <Space>
          <Avatar size="small">{record.avatar}</Avatar>
          <div>
            <div style={{ fontWeight: 'bold' }}>{record.name}</div>
            <Text type="secondary">{record.email}</Text>
          </div>
        </Space>
      ),
    },
    {
      title: 'Role',
      key: 'role',
      render: (_, record) => (
        <Tag color={getRoleColor(record.role)}>
          {record.role.charAt(0).toUpperCase() + record.role.slice(1)}
        </Tag>
      ),
    },
    {
      title: 'Department',
      key: 'department',
      render: (_, record) => (
        <Tag color={getDepartmentColor(record.department)}>
          {record.department.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </Tag>
      ),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Hire Date',
      dataIndex: 'hireDate',
      key: 'hireDate',
      render: (date) => moment(date).format('MMM DD, YYYY'),
    },
    {
      title: 'Salary',
      dataIndex: 'salary',
      key: 'salary',
      render: (salary) => `$${salary.toLocaleString()}`,
      sorter: (a, b) => a.salary - b.salary,
    },
    {
      title: 'Status',
      key: 'status',
      render: (_, record) => (
        <Space>
          <Tag color={getStatusColor(record.status)}>
            {record.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
          </Tag>
          <Switch
            checked={record.isActive}
            onChange={(checked) => handleToggleStatus(record.id, checked)}
            size="small"
          />
        </Space>
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
          <Tooltip title="Edit Staff">
            <Button
              type="text"
              icon={<EditOutlined />}
              size="small"
              onClick={() => handleEditStaff(record)}
            />
          </Tooltip>
          <Tooltip title="Delete Staff">
            <Popconfirm
              title="Are you sure you want to delete this staff member?"
              onConfirm={() => handleDeleteStaff(record.id)}
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

  const filteredStaff = staff.filter(s =>
    s.name.toLowerCase().includes(searchText.toLowerCase()) ||
    s.email.toLowerCase().includes(searchText.toLowerCase()) ||
    s.role.toLowerCase().includes(searchText.toLowerCase())
  );

  const stats = {
    total: staff.length,
    active: staff.filter(s => s.status === 'active').length,
    trainers: staff.filter(s => s.role === 'trainer').length,
    admin: staff.filter(s => s.role === 'admin').length
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Title level={2}>Staff Management</Title>
        <Text type="secondary">Manage gym staff, roles, and permissions</Text>
      </div>

      {/* Stats Row */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Staff"
              value={stats.total}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Active Staff"
              value={stats.active}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Trainers"
              value={stats.trainers}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Admin Staff"
              value={stats.admin}
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
              placeholder="Search staff by name, email, or role"
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
              <Button type="primary" icon={<PlusOutlined />} onClick={handleAddStaff}>
                Add Staff
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Staff Table */}
      <Card>
        <Table
          columns={columns}
          dataSource={filteredStaff}
          loading={loading}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} staff members`,
          }}
        />
      </Card>

      {/* Add/Edit Staff Modal */}
      <Modal
        title={editingStaff ? 'Edit Staff Member' : 'Add New Staff Member'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        width={700}
        okText={editingStaff ? 'Update' : 'Add'}
        cancelText="Cancel"
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            status: 'active',
            role: 'trainer',
            department: 'fitness'
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Full Name"
                rules={[{ required: true, message: 'Please enter full name' }]}
              >
                <Input placeholder="Enter full name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: 'Please enter email' },
                  { type: 'email', message: 'Please enter valid email' }
                ]}
              >
                <Input placeholder="Enter email" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="phone"
                label="Phone"
                rules={[{ required: true, message: 'Please enter phone number' }]}
              >
                <Input placeholder="Enter phone number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="role"
                label="Role"
                rules={[{ required: true, message: 'Please select role' }]}
              >
                <Select placeholder="Select role">
                  <Option value="admin">Admin</Option>
                  <Option value="trainer">Trainer</Option>
                  <Option value="receptionist">Receptionist</Option>
                  <Option value="maintenance">Maintenance</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="department"
                label="Department"
                rules={[{ required: true, message: 'Please select department' }]}
              >
                <Select placeholder="Select department">
                  <Option value="fitness">Fitness</Option>
                  <Option value="strength">Strength Training</Option>
                  <Option value="management">Management</Option>
                  <Option value="front_desk">Front Desk</Option>
                  <Option value="facilities">Facilities</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="salary"
                label="Salary"
                rules={[{ required: true, message: 'Please enter salary' }]}
              >
                <Input placeholder="Enter salary" type="number" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="hireDate"
            label="Hire Date"
            rules={[{ required: true, message: 'Please select hire date' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item
            name="specializations"
            label="Specializations"
          >
            <Select
              mode="tags"
              placeholder="Enter specializations"
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Staff;
