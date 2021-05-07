import { useEffect, useState } from 'react';
import { auth, db } from '../Firebase/config';

export const useSignin =()=>{

    const [signinError,setSigningError] = useState(null)
        const sign_in = async(email,password)=>{
                        try{
                            const res = await auth.signInWithEmailAndPassword(email, password)
                            console.log("sign__in")
                            setSigningError(null)
                        }
                    catch(err){
                        alert(err.message)
                        setSigningError(err.message)
        }
        }
        
       return {sign_in,signinError}
}


 