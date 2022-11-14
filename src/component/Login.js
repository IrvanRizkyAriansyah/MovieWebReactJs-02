import React, { useState, useEffect } from 'react'
import ButtonBorder from './ButtonBorder'
import { Form, Input, Modal } from 'antd';
import ButtonPrimary from './ButtonPrimary';
import '../App';
import { MailOutlined } from '@ant-design/icons';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch } from 'react-redux';
import { LoginGoogle, LoginEmail } from '../features/movies/authSlice';
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from 'react-router-dom';
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleOutlined } from '@ant-design/icons';
import userIcon from '../assets/userIcon.png'
import Register from './Register'
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Login() {
	const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate()
  const [user, loading, error] = useAuthState(auth);

  const showModal = () => {
    setIsModalOpen(true);
  };
  
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const signInWithGoogle = () => {
    setIsModalOpen(false);
    dispatch(LoginGoogle());
  }

  const dispatch = useDispatch()

  const onFinish = async (values) => {
    	// dispatch(getLogin(values))
      setIsModalOpen(false);
      dispatch(LoginEmail(values));
      // logInWithEmailAndPassword(values.email, values.password)
  };

	return (
		<div>
      {/* <ButtonBorder title="Login" click={showModal} /> */}
      <img
        className="h-8 w-8 rounded-full bg-gray-400 cursor-pointer hover:bg-white"
        src={userIcon}
        alt="user"
        onClick={showModal}
        />
      <Modal title="Login In to Your Account" open={isModalOpen} onCancel={handleCancel} footer={null} >
        <Form
          name="normal_login"
          className="login-form"
          onFinish={onFinish}
        >
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
            <Input suffix={<MailOutlined />} className="round-input" placeholder="Email Address"/>
        </Form.Item>
        
        <Form.Item
          name="password"
          rules={[
              {
                required: true,
                message: 'Please input your Password!',
              },
            ]}
          >
            <Input.Password
              className="round-input"
              type="password"
              placeholder="Password"
            />
          </Form.Item>
    
          <div style={{width: '62%', display: 'flex', alignItems: 'center'}}>
          <div style={{marginRight: '1rem'}}>
          <ButtonPrimary type="submit" title="Login" />
          </div>
          <ButtonBorder title="Login With Google" click={signInWithGoogle} icon={<GoogleOutlined />}/>
          {/* <GoogleLogin
              shape={'pill'}
              onSuccess={credentialResponse => {
              console.log(credentialResponse);
              const token = credentialResponse.credential;
              const decoded = jwt_decode(token);
              localStorage.setItem("token", JSON.stringify(credentialResponse.credential));
              localStorage.setItem("user", JSON.stringify({first_name: decoded.given_name, image: decoded.picture}));
              setIsModalOpen(false);
              navigate('/');
              window.location.reload(1);
            }}
            onError={() => {
              console.log('Login Failed');
            }}
          /> */}
          </div>
          <div className='flex mt-4 -mb-4'>
          <p className='mr-2'>Don't have an accout?</p>
          <Register />
          </div>
        </Form>
	    </Modal>
		</div>
	)
}
