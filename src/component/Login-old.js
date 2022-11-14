import React, { useState, useEffect } from 'react'
import ButtonBorder from './ButtonBorder'
import { Form, Input, Modal } from 'antd';
import axios from 'axios';
import ButtonPrimary from './ButtonPrimary';
import '../App';
import { MailOutlined } from '@ant-design/icons';
import { GoogleLogin } from 'react-google-login';
import { gapi } from 'gapi-script';

export default function Login() {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const clientId = "709708727147-mqp4g2eh3p1odu1g4r9pou9j21ppjr6q.apps.googleusercontent.com"
	
	useEffect(() => {
   const initClient = () => {
         gapi.client.init({
         clientId: clientId,
         scope: ''
       });
    };
    gapi.load('client:auth2', initClient);
  });
	
	const responseGoogle = (response) => {
    console.log(response);
    localStorage.setItem("token",JSON.stringify(response.accessToken))
    localStorage.setItem("user",JSON.stringify(response.profileObj))
    setIsModalOpen(false);
    window.location.reload(1);
  }
  
  const showModal = () => {
    setIsModalOpen(true);
  };
  
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish = async (values) => {
  	try {
        const res = await axios.post("https://notflixtv.herokuapp.com/api/v1/users/login",values)
        localStorage.setItem("token",JSON.stringify(res.data.data.token))
        localStorage.setItem("user",JSON.stringify(res.data.data))
        setIsModalOpen(false);
        window.location.reload(1);
    } catch (error) {
        console.error(error)
    }
  };

	return (
		<div>
      <ButtonBorder title="Login" click={showModal} />
	    <Modal title="Login In to Your Account" open={isModalOpen} onCancel={handleCancel} footer={null}>
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
    
          <div style={{width: '40%', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <ButtonPrimary type="submit" title="Login"/>
          <GoogleLogin
            clientId={clientId}
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
            className="ButtonLoginGoogle"
          />
          </div>
        </Form>
	    </Modal>
		</div>
	)
}
