import { useEffect, useState } from 'react';
import { auth, db } from '../Firebase/config';

export const  useGetCollection =( )=>{
   
    const addDoc = (collection, doc)=>{
        
        
           db.collection(collection).add(doc)
           .catch((err)=>{
            alert("store data Error")

           })
        
    }
  return {addDoc}
   
}