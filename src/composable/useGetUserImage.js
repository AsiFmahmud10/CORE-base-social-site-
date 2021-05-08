import { useEffect } from "react";
import { db } from "../Firebase/config";

const useGetUserPhoto = (setUserImage,uid) => {
    
   useEffect(()=>{

    if(uid != null) {  
            db.collection('UserInformation').doc(uid).get() 
            .then((doc) => {
                if (doc.exists) {
                   
                     const {photoURL} = doc.data()
                     setUserImage(photoURL)
                } else {
                    
                }
            }).catch((error) => {
                console.log("Error getting document:", error.message);
            });
}

   },[uid])



}
 
export default useGetUserPhoto;