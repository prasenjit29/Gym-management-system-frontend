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
  Typography,
  Row,
  Col,
  Statistic,
  Tooltip,
  Popconfirm,
  InputNumber,
  Progress
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  ToolOutlined,
  FilterOutlined,
  SettingOutlined
} from '@ant-design/icons';
import moment from 'moment';

const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;

const Equipment = () => {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchEquipment();
  }, []);

  const fetchEquipment = async () => {
    setLoading(true);
    // Mock data - replace with actual API call
    const mockEquipment = [
      {
        id: 1,
        name: 'Treadmill Pro X1',
        category: 'cardio',
        brand: 'FitnessTech',
        model: 'TX-1000',
        serialNumber: 'TX1000-001',
        purchaseDate: '2023-01-15',
        warrantyExpiry: '2026-01-15',
        status: 'operational',
        condition: 95,
        location: 'Cardio Zone A',
        lastMaintenance: '2024-02-15',
        nextMaintenance: '2024-05-15',
        cost: 2500.00,
        notes: 'Excellent condition, regular maintenance performed'
      },
      {
        id: 2,
        name: 'Weight Bench Deluxe',
        category: 'strength',
        brand: 'PowerLift',
        model: 'WB-200',
        serialNumber: 'WB200-045',
        purchaseDate: '2022-08-20',
        warrantyExpiry: '2025-08-20',
        status: 'operational',
        condition: 88,
        location: 'Strength Zone B',
        lastMaintenance: '2024-01-20',
        nextMaintenance: '2024-04-20',
        cost: 800.00,
        notes: 'Minor wear on padding, still functional'
      },
      {
        id: 3,
        name: 'Elliptical Trainer Elite',
        category: 'cardio',
        brand: 'CardioMax',
        model: 'ET-500',
        serialNumber: 'ET500-023',
        purchaseDate: '2023-03-10',
        warrantyExpiry: '2026-03-10',
        status: 'maintenance',
        condition: 72,
        location: 'Cardio Zone B',
        lastMaintenance: '2024-02-01',
        nextMaintenance: '2024-03-01',
        cost: 1800.00,
        notes: 'Belt needs replacement, scheduled for repair'
      },
      {
        id: 4,
        name: 'Dumbbell Set (5-50 lbs)',
        category: 'strength',
        brand: 'IronCore',
        model: 'DB-SET-01',
        serialNumber: 'DBSET01-001',
        purchaseDate: '2022-12-05',
        warrantyExpiry: '2025-12-05',
        status: 'operational',
        condition: 92,
        location: 'Strength Zone A',
        lastMaintenance: '2024-02-10',
        nextMaintenance: '2024-05-10',
        cost: 1200.00,
        notes: 'All weights in good condition'
      },
      {
        id: 5,
        name: 'Yoga Mat Set',
        category: 'accessories',
        brand: 'FlexiMat',
        model: 'YM-100',
        serialNumber: 'YM100-156',
        purchaseDate: '2023-06-15',
        warrantyExpiry: '2026-06-15',
        status: 'operational',
        condition: 85,
        location: 'Studio A',
        lastMaintenance: '2024-01-15',
        nextMaintenance: '2024-04-15',
        cost: 300.00,
        notes: 'Some mats showing wear, consider replacement soon'
      }
    ];
    
    setEquipment(mockEquipment);
    setLoading(false);
  };

  const handleAddEquipment = () => {
    setEditingEquipment(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEditEquipment = (record) => {
    setEditingEquipment(record);
    form.setFieldsValue({
      ...record,
      purchaseDate: moment(record.purchaseDate),
      warrantyExpiry: moment(record.warrantyExpiry),
      lastMaintenance: moment(record.lastMaintenance),
      nextMaintenance: moment(record.nextMaintenance)
    });
    setIsModalVisible(true);
  };

  const handleDeleteEquipment = (id) => {
    setEquipment(equipment.filter(e => e.id !== id));
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      const equipmentData = {
        ...values,
        purchaseDate: values.purchaseDate.format('YYYY-MM-DD'),
        warrantyExpiry: values.warrantyExpiry.format('YYYY-MM-DD'),
        lastMaintenance: values.lastMaintenance.format('YYYY-MM-DD'),
        nextMaintenance: values.nextMaintenance.format('YYYY-MM-DD')
      };

      if (editingEquipment) {
        // Update existing equipment
        setEquipment(equipment.map(e =>
          e.id === editingEquipment.id
            ? { ...e, ...equipmentData }
            : e
        ));
      } else {
        // Add new equipment
        const newEquipment = {
          ...equipmentData,
          id: Date.now(),
          serialNumber: `SN-${String(Date.now()).slice(-6)}`,
          status: 'operational',
          condition: 100
        };
        setEquipment([...equipment, newEquipment]);
      }

      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('Validation failed:', error);
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'cardio': return 'red';
      case 'strength': return 'blue';
      case 'accessories': return 'green';
      case 'machines': return 'purple';
      default: return 'default';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational': return 'green';
      case 'maintenance': return 'orange';
      case 'out_of_order': return 'red';
      case 'retired': return 'default';
      default: return 'default';
    }
  };

  const getConditionColor = (condition) => {
    if (condition >= 80) return 'green';
    if (condition >= 60) return 'orange';
    return 'red';
  };

  const columns = [
    {
      title: 'Equipment',
      key: 'equipment',
      render: (_, record) => (
        <div>
          <div style={{ fontWeight: 'bold' }}>{record.name}</div>
          <Text type="secondary">{record.brand} - {record.model}</Text>
        </div>
      ),
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
      title: 'Serial Number',
      dataIndex: 'serialNumber',
      key: 'serialNumber',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Status',
      key: 'status',
      render: (_, record) => (
        <Tag color={getStatusColor(record.status)}>
          {record.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
        </Tag>
      ),
    },
    {
      title: 'Condition',
      key: 'condition',
      render: (_, record) => (
        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          <Text>{record.condition}%</Text>
          <Progress
            percent={record.condition}
            size="small"
            showInfo={false}
            strokeColor={getConditionColor(record.condition)}
          />
        </Space>
      ),
    },
    {
      title: 'Cost',
      dataIndex: 'cost',
      key: 'cost',
      render: (cost) => `$${cost.toLocaleString()}`,
      sorter: (a, b) => a.cost - b.cost,
    },
    {
      title: 'Next Maintenance',
      dataIndex: 'nextMaintenance',
      key: 'nextMaintenance',
      render: (date) => moment(date).format('MMM DD, YYYY'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Tooltip title="View Details">
            <Button type="text" icon={<EyeOutlined />} size="small" />
          </Tooltip>
          <Tooltip title="Schedule Maintenance">
            <Button type="text" icon={<SettingOutlined />} size="small" />
          </Tooltip>
          <Tooltip title="Edit Equipment">
            <Button
              type="text"
              icon={<EditOutlined />}
              size="small"
              onClick={() => handleEditEquipment(record)}
            />
          </Tooltip>
          <Tooltip title="Delete Equipment">
            <Popconfirm
              title="Are you sure you want to delete this equipment?"
              onConfirm={() => handleDeleteEquipment(record.id)}
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

  const filteredEquipment = equipment.filter(e =>
    e.name.toLowerCase().includes(searchText.toLowerCase()) ||
    e.brand.toLowerCase().includes(searchText.toLowerCase()) ||
    e.model.toLowerCase().includes(searchText.toLowerCase()) ||
    e.serialNumber.toLowerCase().includes(searchText.toLowerCase())
  );

  const stats = {
    total: equipment.length,
    operational: equipment.filter(e => e.status === 'operational').length,
    maintenance: equipment.filter(e => e.status === 'maintenance').length,
    totalValue: equipment.reduce((sum, e) => sum + e.cost, 0),
    avgCondition: Math.round(equipment.reduce((sum, e) => sum + e.condition, 0) / equipment.length)
  };

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Title level={2}>Equipment Management</Title>
        <Text type="secondary">Manage gym equipment, track maintenance, and monitor condition</Text>
      </div>

      {/* Stats Row */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Equipment"
              value={stats.total}
              prefix={<ToolOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Operational"
              value={stats.operational}
              prefix={<ToolOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Needs Maintenance"
              value={stats.maintenance}
              prefix={<SettingOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Value"
              value={stats.totalValue}
              prefix={<ToolOutlined />}
              valueStyle={{ color: '#722ed1' }}
              suffix="$"
              precision={0}
            />
          </Card>
        </Col>
      </Row>

      {/* Search and Actions */}
      <Card style={{ marginBottom: 16 }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} md={12}>
            <Search
              placeholder="Search equipment by name, brand, model, or serial number"
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
              <Button type="primary" icon={<PlusOutlined />} onClick={handleAddEquipment}>
                Add Equipment
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Equipment Table */}
      <Card>
        <Table
          columns={columns}
          dataSource={filteredEquipment}
          loading={loading}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} equipment items`,
          }}
        />
      </Card>

      {/* Add/Edit Equipment Modal */}
      <Modal
        title={editingEquipment ? 'Edit Equipment' : 'Add New Equipment'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        width={800}
        okText={editingEquipment ? 'Update' : 'Add'}
        cancelText="Cancel"
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            status: 'operational',
            category: 'cardio'
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Equipment Name"
                rules={[{ required: true, message: 'Please enter equipment name' }]}
              >
                <Input placeholder="Enter equipment name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="brand"
                label="Brand"
                rules={[{ required: true, message: 'Please enter brand' }]}
              >
                <Input placeholder="Enter brand" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="model"
                label="Model"
                rules={[{ required: true, message: 'Please enter model' }]}
              >
                <Input placeholder="Enter model" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="category"
                label="Category"
                rules={[{ required: true, message: 'Please select category' }]}
              >
                <Select placeholder="Select category">
                  <Option value="cardio">Cardio</Option>
                  <Option value="strength">Strength</Option>
                  <Option value="accessories">Accessories</Option>
                  <Option value="machines">Machines</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="location"
                label="Location"
                rules={[{ required: true, message: 'Please enter location' }]}
              >
                <Input placeholder="Enter location" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="cost"
                label="Cost"
                rules={[{ required: true, message: 'Please enter cost' }]}
              >
                <InputNumber
                  placeholder="Enter cost"
                  prefix="$"
                  style={{ width: '100%' }}
                  min={0}
                  precision={2}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="purchaseDate"
                label="Purchase Date"
                rules={[{ required: true, message: 'Please select purchase date' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="warrantyExpiry"
                label="Warranty Expiry"
                rules={[{ required: true, message: 'Please select warranty expiry' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="lastMaintenance"
                label="Last Maintenance"
                rules={[{ required: true, message: 'Please select last maintenance date' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="nextMaintenance"
                label="Next Maintenance"
                rules={[{ required: true, message: 'Please select next maintenance date' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="notes"
            label="Notes"
          >
            <Input.TextArea placeholder="Enter any additional notes" rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Equipment;
