import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Statistic, Table, Button, Space, Typography, Progress, List, Avatar, Tag } from 'antd';
import {
  UserOutlined,
  TeamOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
  DollarOutlined,
  RiseOutlined,
  PlusOutlined,
  EyeOutlined
} from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';

const { Title, Text } = Typography;

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalMembers: 0,
    activeMembers: 0,
    totalClasses: 0,
    todayAttendance: 0,
    monthlyRevenue: 0,
    equipmentCount: 0
  });

  const [recentActivities, setRecentActivities] = useState([]);
  const [upcomingClasses, setUpcomingClasses] = useState([]);

  useEffect(() => {
    // Mock data - replace with actual API calls
    setStats({
      totalMembers: 156,
      activeMembers: 142,
      totalClasses: 24,
      todayAttendance: 89,
      monthlyRevenue: 15420,
      equipmentCount: 45
    });

    setRecentActivities([
      {
        id: 1,
        type: 'member_registration',
        message: 'New member John Doe registered',
        time: '2 hours ago',
        avatar: '👤'
      },
      {
        id: 2,
        type: 'payment_received',
        message: 'Payment received from Jane Smith',
        time: '4 hours ago',
        avatar: '💰'
      },
      {
        id: 3,
        type: 'class_booking',
        message: 'Yoga class fully booked for tomorrow',
        time: '6 hours ago',
        avatar: '🧘‍♀️'
      },
      {
        id: 4,
        type: 'equipment_maintenance',
        message: 'Treadmill #3 scheduled for maintenance',
        time: '1 day ago',
        avatar: '🔧'
      }
    ]);

    setUpcomingClasses([
      {
        id: 1,
        name: 'Morning Yoga',
        trainer: 'Sarah Johnson',
        time: '07:00 AM',
        participants: 12,
        maxParticipants: 15,
        status: 'available'
      },
      {
        id: 2,
        name: 'HIIT Training',
        trainer: 'Mike Wilson',
        time: '09:00 AM',
        participants: 18,
        maxParticipants: 20,
        status: 'almost_full'
      },
      {
        id: 3,
        name: 'Strength Training',
        trainer: 'Alex Brown',
        time: '05:00 PM',
        participants: 8,
        maxParticipants: 12,
        status: 'available'
      }
    ]);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'green';
      case 'almost_full': return 'orange';
      case 'full': return 'red';
      default: return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'available': return 'Available';
      case 'almost_full': return 'Almost Full';
      case 'full': return 'Full';
      default: return 'Unknown';
    }
  };



  const classColumns = [
    {
      title: 'Class Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: 'Trainer',
      dataIndex: 'trainer',
      key: 'trainer',
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'Participants',
      key: 'participants',
      render: (_, record) => (
        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          <Text>{record.participants}/{record.maxParticipants}</Text>
          <Progress
            percent={Math.round((record.participants / record.maxParticipants) * 100)}
            size="small"
            showInfo={false}
          />
        </Space>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      render: (_, record) => (
        <Tag color={getStatusColor(record.status)}>
          {getStatusText(record.status)}
        </Tag>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Button type="link" icon={<EyeOutlined />} size="small">
          View
        </Button>
      ),
    },
  ];

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Title level={2}>Welcome back, {user?.name}! 👋</Title>
        <Text type="secondary">Here's what's happening at your gym today</Text>
      </div>

      {/* Stats Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
        <Col xs={24} sm={12} lg={8} xl={4}>
          <Card>
            <Statistic
              title="Total Members"
              value={stats.totalMembers}
              prefix={<UserOutlined />}
              valueStyle={{ color: '#1890ff' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8} xl={4}>
          <Card>
            <Statistic
              title="Active Members"
              value={stats.activeMembers}
              prefix={<TeamOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8} xl={4}>
          <Card>
            <Statistic
              title="Total Classes"
              value={stats.totalClasses}
              prefix={<CalendarOutlined />}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8} xl={4}>
          <Card>
            <Statistic
              title="Today's Attendance"
              value={stats.todayAttendance}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#fa8c16' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8} xl={4}>
          <Card>
            <Statistic
              title="Monthly Revenue"
              value={stats.monthlyRevenue}
              prefix={<DollarOutlined />}
              valueStyle={{ color: '#52c41a' }}
              suffix="$"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={8} xl={4}>
          <Card>
            <Statistic
              title="Equipment"
              value={stats.equipmentCount}
              prefix={<RiseOutlined />}
              valueStyle={{ color: '#eb2f96' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Main Content */}
      <Row gutter={[16, 16]}>
        {/* Recent Activities */}
        <Col xs={24} lg={12}>
          <Card
            title="Recent Activities"
            extra={
              <Button type="link" icon={<PlusOutlined />}>
                View All
              </Button>
            }
          >
            <List
              dataSource={recentActivities}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar>{item.avatar}</Avatar>}
                    title={item.message}
                    description={item.time}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>

        {/* Upcoming Classes */}
        <Col xs={24} lg={12}>
          <Card
            title="Upcoming Classes"
            extra={
              <Button type="link" icon={<PlusOutlined />}>
                View All
              </Button>
            }
          >
            <Table
              dataSource={upcomingClasses}
              columns={classColumns}
              pagination={false}
              size="small"
              rowKey="id"
            />
          </Card>
        </Col>
      </Row>

      {/* Quick Actions */}
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col span={24}>
          <Card title="Quick Actions">
            <Space wrap>
              <Button type="primary" icon={<UserOutlined />}>
                Add New Member
              </Button>
              <Button icon={<CalendarOutlined />}>
                Schedule Class
              </Button>
              <Button icon={<CheckCircleOutlined />}>
                Mark Attendance
              </Button>
              <Button icon={<DollarOutlined />}>
                Process Payment
              </Button>
              {user?.role === 'admin' && (
                <>
                  <Button icon={<TeamOutlined />}>
                    Manage Staff
                  </Button>
                  <Button icon={<RiseOutlined />}>
                    View Reports
                  </Button>
                </>
              )}
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
