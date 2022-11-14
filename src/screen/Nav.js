import '../App';
import React, {useState} from 'react';
import { Input, Modal } from 'antd';
import Logo from '../assets/logo.svg';
import {useNavigate} from 'react-router-dom';
import Login from '../component/Login';
import Register from '../component/Register';
import ButtonPrimary from '../component/ButtonPrimary';
import userIcon from "../assets/userIcon.png";
import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { BorderOutlined } from '@ant-design/icons';
import Profile from '../component/Profile';

const navigation = [
  { name: 'Movies', href: '#', current: false },
  { name: 'TV Show', href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Nav() {
  const navigate = useNavigate()
  const { Search } = Input;
  const onSearch = (query) => navigate(`/search/${query}`);
  const token =  JSON.parse(localStorage.getItem('token'));
  const profile = JSON.parse(localStorage.getItem('user'));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    // <div className="nav" style={{width:'100%', position: 'absolute', zIndex: 3, alignItems: 'center'}}>
    // <div style={{width: '25%'}}>
    // <img src={Logo} alt="logo" onClick={() => navigate(`/`)} style={{cursor: "pointer"}}/>
    // </div>
    // <div className="search" style={{width: '50%'}}>
    // <Search
    //   placeholder="What do you want to watch?"
    //   onSearch={onSearch}
    //   style={{
    //     justifyContent: 'center'
    //   }}
    // />
    // </div>
    
    // <div style={{width: '25%'}}>
    // {
    //   token !== null && profile !== null? 
    //   <div style={{display: 'flex', justifyContent:'flex-end', alignItems: 'center'}}>
    //   <h4 style={{color: 'white', fontWeight: 'bold', marginBottom: 0, marginRight: '1rem', display: 'flex', alignItems: 'center'}}>{profile.displayName}</h4> 
    //   <img src={profile.photoURL || userIcon} alt="" style={{borderRadius: '50%',height: '2.5rem', marginRight: '1rem'}} /> 
    //   <ButtonPrimary title="Logout" click={()=>window.location.reload(localStorage.clear()).then(navigate('/'))} /> 
    //   </div>
    //   : 
    //   <div style={{display: 'flex', justifyContent:'flex-end'}}>
    //   <div style={{marginRight: '1rem'}}>
    //   <Login />
    //   </div>
    //   <Register />
    //   </div>
    // }
    // </div>
    // </div>
    <div className='fixed top-0 left-0 right-0 z-20'>
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="block h-6 w-auto lg:hidden"
                    src={Logo}
                    alt="Your Company"
                    onClick={() => navigate(`/`)}
                  />
                  <img
                    className="hidden h-6 w-auto lg:block cursor-pointer"
                    src={Logo}
                    alt="Your Company"
                    onClick={() => navigate(`/`)}
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block cursor-pointer">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white hover:text-red-500' : 'text-gray-300 hover:bg-gray-700 hover:text-red-500',
                          'px-3 py-2 rounded-md text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="rounded-full text-gray-400 hover:text-white "
                  onClick={showModal}
                >
                  <span className="sr-only">View notifications</span>
                  <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                <Modal 
                  footer={null} 
                  title={null} 
                  closable={false}
                  bodyStyle={{padding: 0, marginTop: 0, borderRadius: '1rem'}}
                  open={isModalOpen} 
                  onCancel={handleCancel}>
                  <Search
                    placeholder="What do you want to watch?"
                    onSearch={onSearch}
                    size={'large'}
                  />
                </Modal>

                {/* Profile dropdown */}
                {
                  token !== null && profile !== null ?
                  <div className='ml-3'>
                  <Profile />
                  </div>
                     :
                  <div className='ml-3'>
                  <Login />
                  </div>
                }
                {/* <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full bg-gray-400"
                        src={userIcon}
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
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 hover:text-red-500')}
                          >
                            Your Profile
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 hover:text-red-500')}
                          >
                            Settings
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="#"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 hover:text-red-500')}
                          >
                            Sign out
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu> */}
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white hover:text-red-500' : 'text-gray-300 hover:bg-gray-700 hover:text-red-500',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
    </div>
  );
}
