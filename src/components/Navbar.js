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

const Navbar = () => {
    const {sign_Up,signUpError,addUserInformation, addUserInformationError } = useSignUp()
    const {sign_out} = useSignout()
    const {user,setUser} =  useAuth()

    const history = useHistory()
    
    const logocss = {
        height:' 36px',
        objectFit: 'contain'
    }
    return ( 
        <div className="home__header">
            <div className='navbarLogo'><img src={logo} style={logocss}/> 
            <h2>Core</h2>
            </div>
        
           <div className="home__log">
               <Button onClick={()=>{ history.push('/addPost') }}>Add Post</Button>
               <Button onClick={()=>{ history.push('/Profile') }}>Profile</Button>
                 
                   { auth.currentUser ? (
                       <Button  onClick={()=>{ sign_out() ; history.push('/')} }>Sign out</Button>
                   ):( <TransitionsModal />)}
                   
            </div>   
       </div>
     );
}
 
export default Navbar;