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
  InputNumber
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  CreditCardOutlined,
  DollarOutlined,
  FilterOutlined,
  DownloadOutlined
} from '@ant-design/icons';
import moment from 'moment';

const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingPayment, setEditingPayment] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    setLoading(true);
    // Mock data - replace with actual API call
    const mockPayments = [
      {
        id: 1,
        memberId: 1,
        memberName: 'John Doe',
        memberEmail: 'john.doe@email.com',
        memberAvatar: '👨‍💼',
        amount: 150.00,
        paymentMethod: 'credit_card',
        status: 'completed',
        paymentDate: '2024-03-20',
        dueDate: '2024-03-15',
        description: 'Premium Membership - March 2024',
        invoiceNumber: 'INV-001',
        category: 'membership'
      },
      {
        id: 2,
        memberId: 2,
        memberName: 'Jane Smith',
        memberEmail: 'jane.smith@email.com',
        memberAvatar: '👩‍💼',
        amount: 89.99,
        paymentMethod: 'bank_transfer',
        status: 'pending',
        paymentDate: null,
        dueDate: '2024-03-25',
        description: 'Basic Membership - March 2024',
        invoiceNumber: 'INV-002',
        category: 'membership'
      },
      {
        id: 3,
        memberId: 3,
        memberName: 'Mike Johnson',
        memberEmail: 'mike.johnson@email.com',
        memberAvatar: '👨‍💼',
        amount: 25.00,
        paymentMethod: 'cash',
        status: 'completed',
        paymentDate: '2024-03-19',
        dueDate: '2024-03-19',
        description: 'Drop-in Class Fee',
        invoiceNumber: 'INV-003',
        category: 'class_fee'
      },
      {
        id: 4,
        memberId: 4,
        memberName: 'Sarah Wilson',
        memberEmail: 'sarah.wilson@email.com',
        memberAvatar: '👩‍💼',
        amount: 200.00,
        paymentMethod: 'credit_card',
        status: 'completed',
        paymentDate: '2024-03-18',
        dueDate: '2024-03-10',
        description: 'Premium Membership - March 2024',
        invoiceNumber: 'INV-004',
        category: 'membership'
      },
      {
        id: 5,
        memberId: 5,
        memberName: 'Alex Brown',
        memberEmail: 'alex.brown@email.com',
        memberAvatar: '👨‍💼',
        amount: 75.00,
        paymentMethod: 'paypal',
        status: 'failed',
        paymentDate: null,
        dueDate: '2024-03-20',
        description: 'Personal Training Session',
        invoiceNumber: 'INV-005',
        category: 'personal_training'
      }
    ];
    
    setPayments(mockPayments);
    setLoading(false);
  };

  const handleAddPayment = () => {
    setEditingPayment(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditPayment = (record) => {
    setEditingPayment(record);
    form.setFieldsValue({
      ...record,
      paymentDate: record.paymentDate ? moment(record.paymentDate) : null,
      dueDate: moment(record.dueDate)
    });
    setIsModalVisible(true);
  };

  const handleDeletePayment = (id) => {
    setPayments(payments.filter(p => p.id !== id));
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      const paymentData = {
        ...values,
        paymentDate: values.paymentDate ? values.paymentDate.format('YYYY-MM-DD') : null,
        dueDate: values.dueDate.format('YYYY-MM-DD')
      };

      if (editingPayment) {
        // Update existing payment
        setPayments(payments.map(p =>
          p.id === editingPayment.id
            ? { ...p, ...paymentData }
            : p
        ));
      } else {
        // Add new payment
        const newPayment = {
          ...paymentData,
          id: Date.now(),
          invoiceNumber: `INV-${String(Date.now()).slice(-6)}`,
          status: 'pending'
        };
        setPayments([...payments, newPayment]);
      }

      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const getPaymentMethodColor = (method) => {
    switch (method) {
      case 'credit_card': return 'blue';
      case 'bank_transfer': return 'green';
      case 'cash': return 'orange';
      case 'paypal': return 'cyan';
      default: return 'default';
    }
  };

  const getPaymentMethodText = (method) => {
    switch (method) {
      case 'credit_card': return 'Credit Card';
      case 'bank_transfer': return 'Bank Transfer';
      case 'cash': return 'Cash';
      case 'paypal': return 'PayPal';
      default: return 'Unknown';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'green';
      case 'pending': return 'orange';
      case 'failed': return 'red';
      case 'cancelled': return 'default';
      default: return 'default';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'membership': return 'blue';
      case 'class_fee': return 'green';
      case 'personal_training': return 'purple';
      case 'equipment': return 'orange';
      default: return 'default';
    }
  };

  const columns = [
    {
      title: 'Member',
      key: 'member',
      render: (_, record) => (
        <Space>
          <Avatar size="small">{record.memberAvatar}</Avatar>
          <div>
            <div style={{ fontWeight: 'bold' }}>{record.memberName}</div>
            <Text type="secondary">{record.memberEmail}</Text>
          </div>
        </Space>
      ),
    },
    {
      title: 'Invoice',
      key: 'invoice',
      render: (_, record) => (
        <div>
          <div style={{ fontWeight: 'bold' }}>{record.invoiceNumber}</div>
          <Text type="secondary">{record.description}</Text>
        </div>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `$${amount.toFixed(2)}`,
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: 'Category',
      key: 'category',
      render: (_, record) => (
        <Tag color={getCategoryColor(record.category)}>
          {record.category.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </Tag>
      ),
    },
    {
      title: 'Payment Method',
      key: 'paymentMethod',
      render: (_, record) => (
        <Tag color={getPaymentMethodColor(record.paymentMethod)}>
          {getPaymentMethodText(record.paymentMethod)}
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
      title: 'Due Date',
      dataIndex: 'dueDate',
      key: 'dueDate',
      render: (date) => moment(date).format('MMM DD, YYYY'),
    },
    {
      title: 'Payment Date',
      dataIndex: 'paymentDate',
      key: 'paymentDate',
      render: (date) => date ? moment(date).format('MMM DD, YYYY') : '-',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Tooltip title="View Invoice">
            <Button type="text" icon={<EyeOutlined />} size="small" />
          </Tooltip>
          <Tooltip title="Download Invoice">
            <Button type="text" icon={<DownloadOutlined />} size="small" />
          </Tooltip>
          <Tooltip title="Edit Payment">
            <Button
              type="text"
              icon={<EditOutlined />}
              size="small"
              onClick={() => handleEditPayment(record)}
            />
          </Tooltip>
          <Tooltip title="Delete Payment">
            <Popconfirm
              title="Are you sure you want to delete this payment?"
              onConfirm={() => handleDeletePayment(record.id)}
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

  const filteredPayments = payments.filter(p =>
    p.memberName.toLowerCase().includes(searchText.toLowerCase()) ||
    p.memberEmail.toLowerCase().includes(searchText.toLowerCase()) ||
    p.invoiceNumber.toLowerCase().includes(searchText.toLowerCase())
  );

  const stats = {
    total: payments.length,
    completed: payments.filter(p => p.status === 'completed').length,
    pending: payments.filter(p => p.status === 'pending').length,
    totalAmount: payments.reduce((sum, p) => sum + p.amount, 0),
    collectedAmount: payments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.amount, 0)
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Title level={2}>Payments Management</Title>
        <Text type="secondary">Manage gym payments, invoices, and financial transactions</Text>
      </div>

      {/* Stats Row */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Payments"
              value={stats.total}
              prefix={<CreditCardOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Completed"
              value={stats.completed}
              prefix={<CreditCardOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Pending"
              value={stats.pending}
              prefix={<CreditCardOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Collected"
              value={stats.collectedAmount}
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#52c41a' }}
              suffix="$"
              precision={2}
            />
          </Card>
        </Col>
      </Row>

      {/* Search and Actions */}
      <Card style={{ marginBottom: 16 }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} md={12}>
            <Search
              placeholder="Search payments by member, invoice, or description"
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
              <Button type="primary" icon={<PlusOutlined />} onClick={handleAddPayment}>
                Add Payment
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Payments Table */}
      <Card>
        <Table
          columns={columns}
          dataSource={filteredPayments}
          loading={loading}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} payments`,
          }}
        />
      </Card>

      {/* Add/Edit Payment Modal */}
      <Modal
        title={editingPayment ? 'Edit Payment' : 'Add New Payment'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        width={700}
        okText={editingPayment ? 'Update' : 'Add'}
        cancelText="Cancel"
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            status: 'pending',
            paymentMethod: 'credit_card',
            category: 'membership'
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="memberName"
                label="Member Name"
                rules={[{ required: true, message: 'Please enter member name' }]}
              >
                <Input placeholder="Enter member name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="memberEmail"
                label="Member Email"
                rules={[
                  { required: true, message: 'Please enter member email' },
                  { type: 'email', message: 'Please enter valid email' }
                ]}
              >
                <Input placeholder="Enter member email" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter description' }]}
          >
            <Input.TextArea placeholder="Enter payment description" rows={3} />
          </Form.Item>
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                name="amount"
                label="Amount"
                rules={[{ required: true, message: 'Please enter amount' }]}
              >
                <InputNumber
                  placeholder="Enter amount"
                  prefix="$"
                  style={{ width: '100%' }}
                  min={0}
                  precision={2}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="category"
                label="Category"
                rules={[{ required: true, message: 'Please select category' }]}
              >
                <Select placeholder="Select category">
                  <Option value="membership">Membership</Option>
                  <Option value="class_fee">Class Fee</Option>
                  <Option value="personal_training">Personal Training</Option>
                  <Option value="equipment">Equipment</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                name="paymentMethod"
                label="Payment Method"
                rules={[{ required: true, message: 'Please select payment method' }]}
              >
                <Select placeholder="Select payment method">
                  <Option value="credit_card">Credit Card</Option>
                  <Option value="bank_transfer">Bank Transfer</Option>
                  <Option value="cash">Cash</Option>
                  <Option value="paypal">PayPal</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="dueDate"
                label="Due Date"
                rules={[{ required: true, message: 'Please select due date' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="paymentDate"
                label="Payment Date"
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default Payments;
