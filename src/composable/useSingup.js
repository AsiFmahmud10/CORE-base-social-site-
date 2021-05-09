import { useState } from 'react';
import { auth } from '../Firebase/config';

export const useSignUp =()=>{

    const [signUpError,setSignUpError] = useState(null)

        const sign_Up = async(email,password,name)=>{
            console.log(email,password)
           
                try{
                    const res = await auth.createUserWithEmailAndPassword(email.trim(),password)
                    setSignUpError(null)
                    addUserInformation(name,"Set_Name")
                    addUserInformation("","Set_ProfileImage",'https://t4.ftcdn.net/jpg/04/10/43/77/360_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg')
                }catch(err){
                    alert('Plz, Try another Email')
                }
            
    }
  const [addUserInformationError , setaddUserInformationError] = useState(null)

      const addUserInformation =(name,action,imageUrl = null)=>{
                
                let user = auth.currentUser

                if( action === "Set_Name")
                        { user.updateProfile({  displayName: name}).
                            catch((err)=>{
                                setaddUserInformationError(err.message)
                                    alert(err.message)
                            })}

                  else if (action === "Set_ProfileImage")  
                         {
                             console.log(imageUrl)
                            user.updateProfile({photoURL:imageUrl}).
                            catch((err)=>{
                                setaddUserInformationError(err.message)
                                    alert(err.message)
                                  }  )  
                                 
      }
    }
    
     
        
       return {sign_Up,signUpError,addUserInformation,addUserInformationError}
}


 
