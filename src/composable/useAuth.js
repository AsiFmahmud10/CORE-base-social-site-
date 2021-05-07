import { useEffect, useState } from 'react';
import { auth, db } from '../Firebase/config';

export const useAuth =()=>{

    const [user,setUser] = useState(auth.currentUser)

    useEffect(()=>{
        let unsub = auth.onAuthStateChanged((user)=>{
              console.log("auth listener subscribe")
                if(user){
                    setUser(user)
                    console.log("user state changed", user)
                }else{
                    console.log("no user")
                }
            } )
            
           return ()=> {unsub() }

  },[])

   return {user,setUser}
}