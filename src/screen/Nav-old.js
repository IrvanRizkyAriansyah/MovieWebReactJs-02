import '../App';
import React from 'react';
import { Input } from 'antd';
import Logo from '../assets/logo.svg';
import {useNavigate} from 'react-router-dom';
import Login from '../component/Login';
import Register from '../component/Register';
import ButtonPrimary from '../component/ButtonPrimary';
// import { useDispatch, useSelector } from 'react-redux';
// import { getLogin } from '../features/movies/authSlice'
// import { auth, db, logout } from "../firebase";
// import { query, collection, getDocs, where } from "firebase/firestore";
// import { useAuthState } from "react-firebase-hooks/auth";
import userIcon from "../assets/user.svg"

export default function Nav() {
  // const [user, setUser] = useState([])
  // const [user, setUser] = useState([])
  const navigate = useNavigate()
  const { Search } = Input;
  const onSearch = (query) => navigate(`/search/${query}`);
  const token =  JSON.parse(localStorage.getItem('token'));
  const profile = JSON.parse(localStorage.getItem('user'));

  // const loadUser = () => {
  //   try {
  //     setUser(profile)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  // useEffect(() => {
  //   loadUser()
  // }, [user])

  // const [user, loading ] = useAuthState(auth);
  // const [name, setName] = useState("");
  // const fetchUserName = async () => {
  //   try {
  //     const q = query(collection(db, "users"), where("uid", "==", user?.uid));
  //     const doc = await getDocs(q);
  //     const data = doc.docs[0].data();
  //     setName(data.name);
  //   } catch (err) {
  //     console.error(err);
  //     alert("An error occured while fetching user data");
  //   }
  // };
  // useEffect(() => {
  //   if (loading) return;
  //   if (!user) return navigate("/");
  //   fetchUserName();
  // }, [user, loading]);
  // const dispatch = useDispatch()
  // const {login} = useSelector((state) => state.auth)

  // useEffect(() => {
  //   dispatch(getLogin())
  // }, [dispatch, login])
console.log("profile",profile)
  return (
    <div className="nav" style={{width:'100%', position: 'absolute', zIndex: 3, alignItems: 'center'}}>
    <div style={{width: '25%'}}>
    <img src={Logo} alt="logo" onClick={() => navigate(`/`)} style={{cursor: "pointer"}}/>
    </div>
    <div className="search" style={{width: '50%'}}>
    <Search
      placeholder="What do you want to watch?"
      onSearch={onSearch}
      style={{
        justifyContent: 'center'
      }}
    />
    </div>
    
    <div style={{width: '25%'}}>
    {
      token !== null && profile !== null? 
      <div style={{display: 'flex', justifyContent:'flex-end', alignItems: 'center'}}>
      <h4 style={{color: 'white', fontWeight: 'bold', marginBottom: 0, marginRight: '1rem', display: 'flex', alignItems: 'center'}}>{profile.displayName}</h4> 
      <img src={profile.photoURL || userIcon} alt="" style={{borderRadius: '50%',height: '2.5rem', marginRight: '1rem'}} /> 
      <ButtonPrimary title="Logout" click={()=>window.location.reload(localStorage.clear()).then(navigate('/'))} /> 
      </div>
      : 
      <div style={{display: 'flex', justifyContent:'flex-end'}}>
      <div style={{marginRight: '1rem'}}>
      <Login />
      </div>
      <Register />
      </div>
    }
    </div>
    </div>
  );
}
