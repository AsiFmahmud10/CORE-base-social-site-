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
                    addUserInformation("","Set_ProfileImage",'https://images.unsplash.com/photo-1616851928715-3173db62a78c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80')
                }catch(err){
                    setSignUpError(err.message)
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


 
