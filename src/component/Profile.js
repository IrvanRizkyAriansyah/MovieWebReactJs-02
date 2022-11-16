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
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { BorderOutlined } from '@ant-design/icons';
import { Fragment } from 'react'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Profile() {
  const navigate = useNavigate()
  const profile = JSON.parse(localStorage.getItem('user'));
	return (
		// <div>
    //   {/* <ButtonBorder title="Login" click={showModal} /> */}
    //   <img
    //     className="h-8 w-8 rounded-full bg-gray-400 cursor-pointer hover:bg-white"
    //     src={userIcon}
    //     alt="user"
    //     onClick={showModal}
    //     />
    //   <Modal title='Profile' open={isModalOpen} onCancel={handleCancel} footer={null} className='flex' >
    //     <img src={profile.providerData[0].photoURL || userIcon} alt={profile.displayName} className='rounded-full h-32' />
    //     <h1 className='mx-auto'>{profile.displayName}</h1>
	  //   {/* </div> */}
    //   </Modal>
		// </div>
    <Menu as="div" className="relative">
      <div>
        <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="sr-only">Open user menu</span>
          <img
            className="h-8 w-8 rounded-full bg-gray-400"
            src={profile.providerData[0].photoURL || userIcon}
            alt=""
          /> 
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ">
          <Menu.Item>
            {({ active }) => (
              <div>
              <img src={profile.providerData[0].photoURL || userIcon} alt={profile.displayName} className='rounded-full h-28 mx-auto mt-2 bg-gray-400 m-2' />
              <p className='text-center font-bold mt-2'>{profile.displayName}</p>
              <div className='flex justify-center mb-2'>
              <ButtonPrimary title="Logout" click={()=>window.location.reload(localStorage.clear()).then(navigate('/'))}/> 
              </div>
              </div>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu> 
	)
}
