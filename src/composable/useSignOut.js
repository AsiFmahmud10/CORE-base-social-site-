import { useState } from 'react';
import { auth } from '../Firebase/config';

export const useSignout =()=>{
     const sign_out=()=>{
        auth.signOut().
        then(console.log("sign-out successfull") )
        .catch((err)=>{
         alert(err.message)
        })
     }
    return {sign_out}

}

