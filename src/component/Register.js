import React, { useState } from 'react'
import { Modal, 
  Form,
  Input,
  } from 'antd';
import ButtonPrimary from './ButtonPrimary';
import { MailOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { Register } from '../features/movies/authSlice';
import {
  auth,
  registerWithEmailAndPassword,
} from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from 'react-router-dom';

export default function Login() {
	const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const [user, loading, error] = useAuthState(auth);
  const dispatch = useDispatch()

  const onFinish = async (values) => {
  	dispatch(Register(values))
    setOpen(false)
  };

  	const showModal = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setOpen(false);
  };

	return (
		<div>
	      {/* <ButtonPrimary title="Register" click={showModal} /> */}
	      <a className='text-red-400 hover:font-bold hover:text-red-400' onClick={showModal}> Register </a>
        <Modal
	        title="Create Account"
	        open={open}
	        onCancel={handleCancel}
	        footer={null}
	      >
	    	<Form
      form={form}
      name="register"
      onFinish={onFinish}
      scrollToFirstError
      >
    	<Form.Item
        name="name"
        rules={[
          {
            required: true,
            message: 'Please input your first name!',
            whitespace: true,
          },
        ]}
      >
      <Input className="round-input" suffix={<UserOutlined />} placeholder="Name"/>
      </Form.Item>

      {/* <Form.Item
        name="last_name"
        rules={[
          {
            required: true,
            message: 'Please input your last name!',
            whitespace: true,
          },
        ]}
      >
      <Input className="round-input" suffix={<UserOutlined />} placeholder="Last Name"/>
      </Form.Item> */}

      <Form.Item
        name="email"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input className="round-input" suffix={<MailOutlined />} placeholder="Email Address"/>
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password className="round-input" placeholder="Password"/>
      </Form.Item>

      {/* <Form.Item
        name="password_confirmation"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password className="round-input" placeholder="Password Confirmation"/>
      </Form.Item> */}

      <ButtonPrimary type="submit" title="Register Now" />
      </Form>
	      </Modal>
		</div>
	)
}
