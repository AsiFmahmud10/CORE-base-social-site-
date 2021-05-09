import { useSignin } from '../composable/useSignin';
import { useSignUp } from '../composable/useSingup';
import { useSignout } from '../composable/useSignOut';
import { useStorage } from "../composable/useStorage";
import {useAuth} from '../composable/useAuth'
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router';
import TransitionsModal from './Modal';
import { auth } from '../Firebase/config';
import logo from './logo.PNG'
import './Navbar.css'
import {motion} from 'framer-motion'
import { useState } from 'react';
import Log from './Log';
const Navbar = () => {
    const {sign_Up,signUpError,addUserInformation, addUserInformationError } = useSignUp()
    const {sign_out} = useSignout()
    const {user,setUser} =  useAuth()
    const history = useHistory()

    const [mount,setMount] = useState(false)
    const logocss = {
        height:' 36px',
        objectFit: 'contain'
    }
  
    const handlePush=(route)=>{
        let timeOut 
        clearTimeout(timeOut)

        if(auth.currentUser){
           history.push(route)
        }
        else{
            setMount(true)
           timeOut = setTimeout(()=>{
                setMount(false)
            },2000)
        }
    }
    return ( 
        <div onClick={()=>{history.push('/')}} className="home__header">
            <div className='navbarLogo'><img src={logo} style={logocss}/> 
            <h2>Core</h2>
            </div>
              
             
                  <Log  notification={"Log in plz"} mount = {mount} setMount={setMount} />
              


           <div className="home__log">
               <Button onClick={()=>{history.push('/')}}>Home</Button>
               <Button onClick={()=>{ handlePush('/addPost') }}>Add Post</Button>
               <Button onClick={()=>{ handlePush('/Profile')  }}>Profile</Button>
                 
                   { auth.currentUser ? (
                       <Button  onClick={()=>{ sign_out() ; history.push('/')} }>Sign out</Button>
                   ):( <TransitionsModal />)}
                   
            </div>   
       </div>
     );
}
 
export default Navbar;