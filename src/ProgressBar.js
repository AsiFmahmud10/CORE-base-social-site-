import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useGetCollection } from "./composable/useGetCollection";
import { useStorage } from "./composable/useStorage";
import { auth, timeStamp } from "./Firebase/config";

const ProgressBar = ({file,data}) => {
    
    const {storageError,ImageDownloadUrl,progress} = useStorage(auth.currentUser.uid,file)
    const {addDoc} =useGetCollection()    
    const history = useHistory()
    useEffect(()=>{
        if(ImageDownloadUrl){
            addDoc("Post",
            {...data,
                ImageDownloadUrl: ImageDownloadUrl,
                username : auth.currentUser.displayName,
                userId : auth.currentUser.uid,
                userPicture : auth.currentUser.photoURL,
                createdAt: timeStamp()
            })  
            history.push('./')
        }
        
    },[ImageDownloadUrl])
    //useStorageData(auth.currentUser.uid,file)
    
    
    return ( 
        <>
               <div className="error" >PLZ WAIT . . .</div>
           
        </>
     );
}
 
export default ProgressBar;