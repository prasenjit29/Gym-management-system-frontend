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
  Popconfirm
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  UserOutlined,
  FilterOutlined
} from '@ant-design/icons';
import moment from 'moment';

const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;

const Members = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    setLoading(true);
    // Mock data - replace with actual API call
    const mockMembers = [
      {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@email.com',
        phone: '+1 (555) 123-4567',
        membershipType: 'premium',
        status: 'active',
        joinDate: '2024-01-15',
        lastVisit: '2024-03-20',
        totalVisits: 45,
        avatar: '👨‍💼'
      },
      {
        id: 2,
        name: 'Jane Smith',
        email: 'jane.smith@email.com',
        phone: '+1 (555) 234-5678',
        membershipType: 'basic',
        status: 'active',
        joinDate: '2024-02-01',
        lastVisit: '2024-03-19',
        totalVisits: 32,
        avatar: '👩‍💼'
      },
      {
        id: 3,
        name: 'Mike Johnson',
        email: 'mike.johnson@email.com',
        phone: '+1 (555) 345-6789',
        membershipType: 'premium',
        status: 'inactive',
        joinDate: '2023-11-20',
        lastVisit: '2024-02-15',
        totalVisits: 28,
        avatar: '👨‍💼'
      },
      {
        id: 4,
        name: 'Sarah Wilson',
        email: 'sarah.wilson@email.com',
        phone: '+1 (555) 456-7890',
        membershipType: 'basic',
        status: 'active',
        joinDate: '2024-01-10',
        lastVisit: '2024-03-21',
        totalVisits: 38,
        avatar: '👩‍💼'
      },
      {
        id: 5,
        name: 'Alex Brown',
        email: 'alex.brown@email.com',
        phone: '+1 (555) 567-8901',
        membershipType: 'premium',
        status: 'active',
        joinDate: '2023-12-05',
        lastVisit: '2024-03-18',
        totalVisits: 52,
        avatar: '👨‍💼'
      }
    ];
    
    setMembers(mockMembers);
    setLoading(false);
  };

  const handleAddMember = () => {
    setEditingMember(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditMember = (record) => {
    setEditingMember(record);
    form.setFieldsValue({
      ...record,
      joinDate: moment(record.joinDate),
      lastVisit: moment(record.lastVisit)
    });
    setIsModalVisible(true);
  };

  const handleDeleteMember = (id) => {
    setMembers(members.filter(member => member.id !== id));
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      const memberData = {
        ...values,
        joinDate: values.joinDate.format('YYYY-MM-DD'),
        lastVisit: values.lastVisit.format('YYYY-MM-DD')
      };

      if (editingMember) {
        // Update existing member
        setMembers(members.map(member =>
          member.id === editingMember.id
            ? { ...member, ...memberData }
            : member
        ));
      } else {
        // Add new member
        const newMember = {
          ...memberData,
          id: Date.now(),
          totalVisits: 0,
          avatar: '👤'
        };
        setMembers([...members, newMember]);
      }

      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'green';
      case 'inactive': return 'red';
      case 'pending': return 'orange';
      default: return 'default';
    }
  };

  const getMembershipTypeColor = (type) => {
    switch (type) {
      case 'premium': return 'gold';
      case 'basic': return 'blue';
      case 'student': return 'green';
      default: return 'default';
    }
  };

  const columns = [
    {
      title: 'Member',
      key: 'member',
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
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Membership',
      key: 'membership',
      render: (_, record) => (
        <Tag color={getMembershipTypeColor(record.membershipType)}>
          {record.membershipType.charAt(0).toUpperCase() + record.membershipType.slice(1)}
        </Tag>
      ),
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
      title: 'Join Date',
      dataIndex: 'joinDate',
      key: 'joinDate',
      render: (date) => moment(date).format('MMM DD, YYYY'),
    },
    {
      title: 'Last Visit',
      dataIndex: 'lastVisit',
      key: 'lastVisit',
      render: (date) => moment(date).format('MMM DD, YYYY'),
    },
    {
      title: 'Total Visits',
      dataIndex: 'totalVisits',
      key: 'totalVisits',
      sorter: (a, b) => a.totalVisits - b.totalVisits,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Tooltip title="View Details">
            <Button type="text" icon={<EyeOutlined />} size="small" />
          </Tooltip>
          <Tooltip title="Edit Member">
            <Button
              type="text"
              icon={<EditOutlined />}
              size="small"
              onClick={() => handleEditMember(record)}
            />
          </Tooltip>
          <Tooltip title="Delete Member">
            <Popconfirm
              title="Are you sure you want to delete this member?"
              onConfirm={() => handleDeleteMember(record.id)}
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

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchText.toLowerCase()) ||
    member.email.toLowerCase().includes(searchText.toLowerCase()) ||
    member.phone.includes(searchText)
  );

  const stats = {
    total: members.length,
    active: members.filter(m => m.status === 'active').length,
    premium: members.filter(m => m.membershipType === 'premium').length,
    newThisMonth: members.filter(m => 
      moment(m.joinDate).isAfter(moment().startOf('month'))
    ).length
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Title level={2}>Members Management</Title>
        <Text type="secondary">Manage gym members, view profiles, and track memberships</Text>
      </div>

      {/* Stats Row */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Members"
              value={stats.total}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Active Members"
              value={stats.active}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Premium Members"
              value={stats.premium}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="New This Month"
              value={stats.newThisMonth}
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
              placeholder="Search members by name, email, or phone"
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
              <Button type="primary" icon={<PlusOutlined />} onClick={handleAddMember}>
                Add Member
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Members Table */}
      <Card>
        <Table
          columns={columns}
          dataSource={filteredMembers}
          loading={loading}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} members`,
          }}
        />
      </Card>

      {/* Add/Edit Member Modal */}
      <Modal
        title={editingMember ? 'Edit Member' : 'Add New Member'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        width={600}
        okText={editingMember ? 'Update' : 'Add'}
        cancelText="Cancel"
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            status: 'active',
            membershipType: 'basic'
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
                name="membershipType"
                label="Membership Type"
                rules={[{ required: true, message: 'Please select membership type' }]}
              >
                <Select placeholder="Select membership type">
                  <Option value="basic">Basic</Option>
                  <Option value="premium">Premium</Option>
                  <Option value="student">Student</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="joinDate"
                label="Join Date"
                rules={[{ required: true, message: 'Please select join date' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="lastVisit"
                label="Last Visit"
                rules={[{ required: true, message: 'Please select last visit date' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="status"
            label="Status"
            rules={[{ required: true, message: 'Please select status' }]}
          >
            <Select placeholder="Select status">
              <Option value="active">Active</Option>
              <Option value="inactive">Inactive</Option>
              <Option value="pending">Pending</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Members;
