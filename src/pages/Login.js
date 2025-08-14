import React, { useState } from 'react';
import { Form, Input, Button, Card, Typography, Space, Alert, Divider } from 'antd';
import { UserOutlined, LockOutlined, LoginOutlined } from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    setError('');
    
    try {
      await login(values);
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const demoAccounts = [
    { username: 'admin', password: 'password', role: 'Admin' },
    { username: 'staff', password: 'password', role: 'Staff' },
    { username: 'member', password: 'password', role: 'Member' },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <Card
        style={{
          width: 400,
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          borderRadius: 16,
        }}
        bodyStyle={{ padding: '40px' }}
      >
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🏋️</div>
          <Title level={2} style={{ margin: 0, color: '#1890ff' }}>
            GymPro
          </Title>
          <Text type="secondary">Management System</Text>
        </div>

        <Form
          name="login"
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input
              prefix={<UserOutlined />}
              placeholder="Username"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
            />
          </Form.Item>

          {error && (
            <Alert
              message={error}
              type="error"
              showIcon
              style={{ marginBottom: 16 }}
            />
          )}

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              icon={<LoginOutlined />}
              style={{ width: '100%', height: 48, fontSize: 16 }}
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>

        <Divider>Demo Accounts</Divider>
        
        <Space direction="vertical" style={{ width: '100%' }}>
          {demoAccounts.map((account, index) => (
            <Card
              key={index}
              size="small"
              style={{ 
                background: '#f5f5f5',
                cursor: 'pointer',
                border: '1px solid #d9d9d9'
              }}
              onClick={() => {
                document.querySelector('input[name="username"]').value = account.username;
                document.querySelector('input[name="password"]').value = account.password;
              }}
            >
              <Space>
                <Text strong>{account.role}:</Text>
                <Text code>{account.username}</Text>
                <Text type="secondary">/ {account.password}</Text>
              </Space>
            </Card>
          ))}
        </Space>

        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <Text type="secondary">
            Click on any demo account to auto-fill the form
          </Text>
        </div>
      </Card>
    </div>
  );
};

export default Login;
