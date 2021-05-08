import { useEffect, useState } from "react"
import { storage } from "../Firebase/config"

export const useStorage=(userId,file )=>{

     const [storageError,setStorageError] = useState(null)
     const [ImageDownloadUrl,setImageDownloadUrl] = useState(null)
     const [progress,setProgress] = useState(null)
            
        useEffect(()=>{
                
                        const storageRef  = storage.ref()
                        const ref = storageRef.child(`images/${userId}/${file.name + new Date().toString()}`)
                         ref.put(file).on(   "state_change", (snapshot)=> {
                                let percent = snapshot.bytesTransferred / snapshot.totalBytes * 100;
                                        setProgress(percent)
                        },(err)=>{
                                setStorageError(err.message)
                        },async()=>{
                                setImageDownloadUrl( await ref.getDownloadURL())
                        })

        },[file])
        return{storageError,ImageDownloadUrl,progress}
            
     }
   
          
