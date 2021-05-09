import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Button, TextField } from '@material-ui/core';
import { useSignin } from '../composable/useSignin';
import { useSignUp } from '../composable/useSingup';
import { useSignout } from '../composable/useSignOut';
import './Modal.css'
import { auth } from '../Firebase/config';
import {motion} from 'framer-motion'
const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    maxWidth: '700px',
    height: '394px',
    backgroundColor: "#ffffff",
    border: '1px solid lightgray',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    
  },
}));

export default function TransitionsModal() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
 const [name,setName] = useState('')
 const [isSignUp, setIsSignUp]  = useState(true)
 const {sign_in,signinError} =  useSignin()
 const {sign_Up,signUpError,addUserInformation, addUserInformationError } = useSignUp()

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [email,setEmail ]= useState('')
  const [password,setPassword ]= useState('')

  useEffect(()=>{
    let unsub = auth.onAuthStateChanged((user)=>{
          console.log("auth listener subscribe")
            if(user && !user.displayName ){
                 
                 console.log("user registered", user)
            }else{
                console.log("no user")
            }
        } )
        
       return ()=> {unsub() }

},[])

const handleSignInSubmit=(e)=>{
     e.preventDefault();
      sign_in(email,password)
     setEmail('')
     setPassword('')
     handleClose()
}
  return (
    <div style={{display: 'inline'}}>

                                                                 {/**  sign in or sign Up */}
  
          <Button type="button" onClick={handleOpen}>
                        <motion.div 
                        initial={{opacity:'0px',color:'black'}}
                        animate={{ opacity:'1px',color:'red'}}
                        transition={{delay:1.5,duration:3}}
                        >
                          Sign in
                          </motion.div> 
                  </Button>
    
            
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          
          <div className={`${classes.paper} text`} style=
          {{
            borderRadius: '13px',
            padding: '60px',
            
            
            }}>

          {isSignUp === true ?  (
 <form className="sign__in"
            onSubmit={handleSignInSubmit}
 >
            
 <TextField   
     variant = 'standard'
     label = 'Email'
     required
     type='email'
     value={email}
     onChange={(e)=>{setEmail(e.target.value)}}
 />
 <TextField   
     required
     variant = 'standard'
     label = 'Password'
     type='password'
     value={password}
     onChange={(e)=>{setPassword(e.target.value)}}
 />
 <Button type='submit' >Sign in</Button>
 
<Button variant='text' onClick={()=>{setIsSignUp(false);setEmail('');setPassword('')}}>Not Sign up yet !! click to sign up</Button>

</form>
             
            ) : (
              <form className="sign__in"
                  onSubmit={(e)=>{
                      e.preventDefault()
                     sign_Up(email,password,name)
                      
                  }}
              >
                 <TextField   
                             variant = 'standard'
                             label = 'Full name'
                             required
                             value={name}
                             onChange={(e)=>{
                                setName(e.target.value)
                             }}
                         />
                         <TextField   
                             variant = 'standard'
                             label = 'Email'
                             required
                             value={email}
                             onChange={(e)=>{setEmail(e.target.value)}}
                         />
                                <TextField   
                                      required
                                      variant = 'standard'
                                      label = 'Password'
                                      type='password'
                                      value={password}
                                      onChange={(e)=>{setPassword(e.target.value)}}
                                />
                        
                         <Button type='submit'>Register</Button>
                         <Button onClick={()=>{setIsSignUp(true)}}>Already a member !! click to sign in</Button>
         </form>

            )}


      
                   
                    
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
