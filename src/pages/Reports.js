import React, { useState, useEffect } from 'react';
import {
  Card,
  Typography,
  Row,
  Col,
  Statistic,
  Select,
  DatePicker,
  Button,
  Space,
  Table,
  Progress,
  Tag
} from 'antd';
import {
  BarChartOutlined,
  UserOutlined,
  DollarOutlined,
  CalendarOutlined,
  RiseOutlined,
  DownloadOutlined,
  FilterOutlined
} from '@ant-design/icons';
import moment from 'moment';

const { Title, Text } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedDateRange, setSelectedDateRange] = useState([moment().startOf('month'), moment().endOf('month')]);


  useEffect(() => {
    fetchReportData();
  }, [selectedPeriod, selectedDateRange]);

  const fetchReportData = async () => {
    // Mock data - replace with actual API call
    // TODO: Implement actual API call
  };

  // Mock data for reports
  const membershipData = [
    { month: 'Jan', basic: 45, premium: 32, student: 18 },
    { month: 'Feb', basic: 52, premium: 38, student: 22 },
    { month: 'Mar', basic: 48, premium: 35, student: 20 },
    { month: 'Apr', basic: 55, premium: 42, student: 25 },
    { month: 'May', basic: 58, premium: 45, student: 28 },
    { month: 'Jun', basic: 62, premium: 48, student: 30 }
  ];

  const revenueData = [
    { month: 'Jan', revenue: 12500, expenses: 8200, profit: 4300 },
    { month: 'Feb', revenue: 13800, expenses: 8500, profit: 5300 },
    { month: 'Mar', revenue: 14200, expenses: 8800, profit: 5400 },
    { month: 'Apr', revenue: 15600, expenses: 9200, profit: 6400 },
    { month: 'May', revenue: 16200, expenses: 9500, profit: 6700 },
    { month: 'Jun', revenue: 17500, expenses: 9800, profit: 7700 }
  ];

  const attendanceData = [
    { day: 'Monday', attendance: 89, capacity: 120, percentage: 74 },
    { day: 'Tuesday', attendance: 92, capacity: 120, percentage: 77 },
    { day: 'Wednesday', attendance: 78, capacity: 120, percentage: 65 },
    { day: 'Thursday', attendance: 95, capacity: 120, percentage: 79 },
    { day: 'Friday', attendance: 88, capacity: 120, percentage: 73 },
    { day: 'Saturday', attendance: 76, capacity: 100, percentage: 76 },
    { day: 'Sunday', attendance: 45, capacity: 80, percentage: 56 }
  ];

  const topClasses = [
    { name: 'Morning Yoga', participants: 45, revenue: 675, rating: 4.8 },
    { name: 'HIIT Training', participants: 38, revenue: 760, rating: 4.7 },
    { name: 'Strength Training', participants: 32, revenue: 576, rating: 4.6 },
    { name: 'Pilates', participants: 28, revenue: 448, rating: 4.9 },
    { name: 'Zumba', participants: 42, revenue: 504, rating: 4.5 }
  ];

  const topMembers = [
    { name: 'John Doe', visits: 45, membership: 'Premium', spend: 450 },
    { name: 'Jane Smith', visits: 38, membership: 'Basic', spend: 320 },
    { name: 'Mike Johnson', visits: 42, membership: 'Premium', spend: 480 },
    { name: 'Sarah Wilson', visits: 35, membership: 'Basic', spend: 280 },
    { name: 'Alex Brown', visits: 48, membership: 'Premium', spend: 520 }
  ];

  const columns = [
    {
      title: 'Class Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: 'Participants',
      dataIndex: 'participants',
      key: 'participants',
      sorter: (a, b) => a.participants - b.participants,
    },
    {
      title: 'Revenue',
      dataIndex: 'revenue',
      key: 'revenue',
      render: (revenue) => `$${revenue}`,
      sorter: (a, b) => a.revenue - b.revenue,
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating) => (
        <Tag color={rating >= 4.5 ? 'green' : rating >= 4.0 ? 'blue' : 'orange'}>
          {rating} ⭐
        </Tag>
      ),
      sorter: (a, b) => a.rating - b.rating,
    },
  ];

  const memberColumns = [
    {
      title: 'Member Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: 'Visits',
      dataIndex: 'visits',
      key: 'visits',
      sorter: (a, b) => a.visits - b.visits,
    },
    {
      title: 'Membership',
      dataIndex: 'membership',
      key: 'membership',
      render: (membership) => (
        <Tag color={membership === 'Premium' ? 'gold' : 'blue'}>
          {membership}
        </Tag>
      ),
    },
    {
      title: 'Total Spend',
      dataIndex: 'spend',
      key: 'spend',
      render: (spend) => `$${spend}`,
      sorter: (a, b) => a.spend - b.spend,
    },
  ];

  const attendanceColumns = [
    {
      title: 'Day',
      dataIndex: 'day',
      key: 'day',
    },
    {
      title: 'Attendance',
      key: 'attendance',
      render: (_, record) => (
        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          <Text>{record.attendance}/{record.capacity}</Text>
          <Progress
            percent={record.percentage}
            size="small"
            showInfo={false}
            strokeColor={record.percentage >= 80 ? '#52c41a' : record.percentage >= 60 ? '#faad14' : '#ff4d4f'}
          />
        </Space>
      ),
    },
    {
      title: 'Percentage',
      dataIndex: 'percentage',
      key: 'percentage',
      render: (percentage) => `${percentage}%`,
      sorter: (a, b) => a.percentage - b.percentage,
    },
  ];

  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);
  const totalExpenses = revenueData.reduce((sum, item) => sum + item.expenses, 0);
  const totalProfit = totalRevenue - totalExpenses;
  const avgAttendance = Math.round(attendanceData.reduce((sum, item) => sum + item.attendance, 0) / attendanceData.length);

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Title level={2}>Reports & Analytics</Title>
        <Text type="secondary">Comprehensive insights into gym performance and business metrics</Text>
      </div>

      {/* Filters */}
      <Card style={{ marginBottom: 24 }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} md={6}>
            <Text strong>Period: </Text>
            <Select
              value={selectedPeriod}
              onChange={setSelectedPeriod}
              style={{ marginLeft: 8, width: 120 }}
            >
              <Option value="week">This Week</Option>
              <Option value="month">This Month</Option>
              <Option value="quarter">This Quarter</Option>
              <Option value="year">This Year</Option>
              <Option value="custom">Custom</Option>
            </Select>
          </Col>
          <Col xs={24} md={8}>
            <Text strong>Date Range: </Text>
            <RangePicker
              value={selectedDateRange}
              onChange={setSelectedDateRange}
              style={{ marginLeft: 8 }}
            />
          </Col>
          <Col xs={24} md={10} style={{ textAlign: 'right' }}>
            <Space>
              <Button icon={<FilterOutlined />}>
                Apply Filters
              </Button>
              <Button icon={<DownloadOutlined />}>
                Export Report
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      {/* Key Metrics */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Revenue"
              value={totalRevenue}
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#52c41a' }}
              suffix="$"
              precision={0}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Expenses"
              value={totalExpenses}
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#ff4d4f' }}
              suffix="$"
              precision={0}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Net Profit"
              value={totalProfit}
              prefix={<RiseOutlined />}
              valueStyle={{ color: '#1890ff' }}
              suffix="$"
              precision={0}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Avg Daily Attendance"
              value={avgAttendance}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Charts and Tables */}
      <Row gutter={[16, 16]}>
        {/* Top Performing Classes */}
        <Col xs={24} lg={12}>
          <Card
            title="Top Performing Classes"
            extra={
              <Button type="link" icon={<BarChartOutlined />}>
                View All
              </Button>
            }
          >
            <Table
              columns={columns}
              dataSource={topClasses}
              pagination={false}
              size="small"
              rowKey="name"
            />
          </Card>
        </Col>

        {/* Top Members */}
        <Col xs={24} lg={12}>
          <Card
            title="Top Members by Visits"
            extra={
              <Button type="link" icon={<UserOutlined />}>
                View All
              </Button>
            }
          >
            <Table
              columns={memberColumns}
              dataSource={topMembers}
              pagination={false}
              size="small"
              rowKey="name"
            />
          </Card>
        </Col>
      </Row>

      {/* Weekly Attendance */}
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col span={24}>
          <Card
            title="Weekly Attendance Overview"
            extra={
              <Button type="link" icon={<CalendarOutlined />}>
                View Details
              </Button>
            }
          >
            <Table
              columns={attendanceColumns}
              dataSource={attendanceData}
              pagination={false}
              size="small"
              rowKey="day"
            />
          </Card>
        </Col>
      </Row>

      {/* Revenue Trend */}
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col span={24}>
          <Card title="Revenue Trend (Last 6 Months)">
            <Row gutter={[16, 16]}>
              {revenueData.map((item, index) => (
                <Col xs={24} sm={12} md={8} lg={4} key={index}>
                  <Card size="small">
                    <Statistic
                      title={item.month}
                      value={item.revenue}
                      prefix={<DollarOutlined />}
                      valueStyle={{ color: '#52c41a', fontSize: '16px' }}
                      suffix="$"
                      precision={0}
                    />
                    <div style={{ marginTop: 8 }}>
                      <Text type="secondary" style={{ fontSize: '12px' }}>
                        Profit: ${item.profit}
                      </Text>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>
      </Row>

      {/* Membership Distribution */}
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col span={24}>
          <Card title="Membership Distribution (Last 6 Months)">
            <Row gutter={[16, 16]}>
              {membershipData.map((item, index) => (
                <Col xs={24} sm={12} md={8} lg={4} key={index}>
                  <Card size="small">
                    <Statistic
                      title={item.month}
                      value={item.basic + item.premium + item.student}
                      prefix={<UserOutlined />}
                      valueStyle={{ color: '#1890ff', fontSize: '16px' }}
                    />
                    <div style={{ marginTop: 8 }}>
                      <Space direction="vertical" size="small" style={{ width: '100%' }}>
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                          Basic: {item.basic}
                        </Text>
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                          Premium: {item.premium}
                        </Text>
                        <Text type="secondary" style={{ fontSize: '12px' }}>
                          Student: {item.student}
                        </Text>
                      </Space>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Reports;
