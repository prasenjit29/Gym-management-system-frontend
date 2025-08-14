import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Space,
  Input,
  Card,
  DatePicker,
  Tag,
  Avatar,
  Typography,
  Row,
  Col,
  Statistic,
  Tooltip,
  Select,
  message
} from 'antd';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  UserOutlined,
  FilterOutlined,
  ExportOutlined
} from '@ant-design/icons';
import moment from 'moment';

const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedDate, setSelectedDate] = useState(moment());
  const [selectedClass, setSelectedClass] = useState('all');

  useEffect(() => {
    fetchAttendance();
  }, [selectedDate, selectedClass]);

  const fetchAttendance = async () => {
    setLoading(true);
    // Mock data - replace with actual API call
    const mockAttendance = [
      {
        id: 1,
        memberId: 1,
        memberName: 'John Doe',
        memberEmail: 'john.doe@email.com',
        memberAvatar: '👨‍💼',
        className: 'Morning Yoga',
        classTime: '07:00 AM',
        status: 'present',
        checkInTime: '06:55 AM',
        checkOutTime: '08:05 AM',
        duration: '1h 10m'
      },
      {
        id: 2,
        memberId: 2,
        memberName: 'Jane Smith',
        memberEmail: 'jane.smith@email.com',
        memberAvatar: '👩‍💼',
        className: 'HIIT Training',
        classTime: '09:00 AM',
        status: 'present',
        checkInTime: '08:58 AM',
        checkOutTime: '10:02 AM',
        duration: '1h 4m'
      },
      {
        id: 3,
        memberId: 3,
        memberName: 'Mike Johnson',
        memberEmail: 'mike.johnson@email.com',
        memberAvatar: '👨‍💼',
        className: 'Morning Yoga',
        classTime: '07:00 AM',
        status: 'absent',
        checkInTime: null,
        checkOutTime: null,
        duration: null
      },
      {
        id: 4,
        memberId: 4,
        memberName: 'Sarah Wilson',
        memberEmail: 'sarah.wilson@email.com',
        memberAvatar: '👩‍💼',
        className: 'HIIT Training',
        classTime: '09:00 AM',
        status: 'late',
        checkInTime: '09:15 AM',
        checkOutTime: '10:00 AM',
        duration: '45m'
      },
      {
        id: 5,
        memberId: 5,
        memberName: 'Alex Brown',
        memberEmail: 'alex.brown@email.com',
        memberAvatar: '👨‍💼',
        className: 'Strength Training',
        classTime: '05:00 PM',
        status: 'present',
        checkInTime: '04:58 PM',
        checkOutTime: '06:02 PM',
        duration: '1h 4m'
      }
    ];
    
    setAttendance(mockAttendance);
    setLoading(false);
  };

  const handleAttendanceToggle = (id, status) => {
    setAttendance(attendance.map(a =>
      a.id === id ? { ...a, status } : a
    ));
    message.success(`Attendance marked as ${status}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'present': return 'green';
      case 'absent': return 'red';
      case 'late': return 'orange';
      case 'excused': return 'blue';
      default: return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'present': return 'Present';
      case 'absent': return 'Absent';
      case 'late': return 'Late';
      case 'excused': return 'Excused';
      default: return 'Unknown';
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
      title: 'Class',
      key: 'class',
      render: (_, record) => (
        <div>
          <div style={{ fontWeight: 'bold' }}>{record.className}</div>
          <Text type="secondary">{record.classTime}</Text>
        </div>
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
      title: 'Check In',
      dataIndex: 'checkInTime',
      key: 'checkInTime',
      render: (time) => time || '-',
    },
    {
      title: 'Check Out',
      dataIndex: 'checkOutTime',
      key: 'checkOutTime',
      render: (time) => time || '-',
    },
    {
      title: 'Duration',
      dataIndex: 'duration',
      key: 'duration',
      render: (duration) => duration || '-',
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Tooltip title="Mark Present">
            <Button
              type="text"
              icon={<CheckCircleOutlined />}
              size="small"
              style={{ color: record.status === 'present' ? '#52c41a' : undefined }}
              onClick={() => handleAttendanceToggle(record.id, 'present')}
            />
          </Tooltip>
          <Tooltip title="Mark Absent">
            <Button
              type="text"
              icon={<CloseCircleOutlined />}
              size="small"
              style={{ color: record.status === 'absent' ? '#ff4d4f' : undefined }}
              onClick={() => handleAttendanceToggle(record.id, 'absent')}
            />
          </Tooltip>
          <Tooltip title="Mark Late">
            <Button
              type="text"
              size="small"
              style={{ color: record.status === 'late' ? '#faad14' : undefined }}
              onClick={() => handleAttendanceToggle(record.id, 'late')}
            >
              Late
            </Button>
          </Tooltip>
        </Space>
      ),
    },
  ];

  const filteredAttendance = attendance.filter(a =>
    a.memberName.toLowerCase().includes(searchText.toLowerCase()) ||
    a.memberEmail.toLowerCase().includes(searchText.toLowerCase()) ||
    a.className.toLowerCase().includes(searchText.toLowerCase())
  );

  const stats = {
    total: attendance.length,
    present: attendance.filter(a => a.status === 'present').length,
    absent: attendance.filter(a => a.status === 'absent').length,
    late: attendance.filter(a => a.status === 'late').length
  };

  const attendanceRate = attendance.length > 0 ? Math.round((stats.present / attendance.length) * 100) : 0;

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <Title level={2}>Attendance Management</Title>
        <Text type="secondary">Track member attendance and manage check-ins</Text>
      </div>

      {/* Date and Class Selection */}
      <Card style={{ marginBottom: 16 }}>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} md={8}>
            <Text strong>Date: </Text>
            <DatePicker
              value={selectedDate}
              onChange={setSelectedDate}
              format="MMMM DD, YYYY"
              style={{ marginLeft: 8 }}
            />
          </Col>
          <Col xs={24} md={8}>
            <Text strong>Class: </Text>
            <Select
              value={selectedClass}
              onChange={setSelectedClass}
              style={{ marginLeft: 8, width: 200 }}
            >
              <Option value="all">All Classes</Option>
              <Option value="yoga">Yoga</Option>
              <Option value="hiit">HIIT Training</Option>
              <Option value="strength">Strength Training</Option>
              <Option value="pilates">Pilates</Option>
            </Select>
          </Col>
          <Col xs={24} md={8} style={{ textAlign: 'right' }}>
            <Space>
              <Button icon={<FilterOutlined />}>
                Filters
              </Button>
              <Button icon={<ExportOutlined />}>
                Export
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

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
              title="Present"
              value={stats.present}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Absent"
              value={stats.absent}
              prefix={<CloseCircleOutlined />}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Attendance Rate"
              value={attendanceRate}
              prefix={<CheckCircleOutlined />}
              valueStyle={{ color: '#52c41a' }}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>

      {/* Search */}
      <Card style={{ marginBottom: 16 }}>
        <Search
          placeholder="Search members by name, email, or class"
          allowClear
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: '100%' }}
        />
      </Card>

      {/* Attendance Table */}
      <Card>
        <Table
          columns={columns}
          dataSource={filteredAttendance}
          loading={loading}
          rowKey="id"
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} of ${total} attendance records`,
          }}
        />
      </Card>
    </div>
  );
};

export default Attendance;
