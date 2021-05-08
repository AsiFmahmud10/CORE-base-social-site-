import { useEffect, useState } from "react";
import { auth, storage } from "../Firebase/config";

const InputFile = ({data}) => {
    const [file,setFile] = useState(null)
    const {user,setDownloadUrl} = data

     const [uploadStatus,setUploadStatus] = useState('')
    console.log(data)
   
    
    const handleUpload=(e)=>{
         let file = e.target.files[0]
        if(!file){
            return
        }
            var uploadTask =storage.ref(`${user.uid}/profilePicture/userImage`).put(file)
                       
uploadTask.on('state_changed', 
  (snapshot) => {
    let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    setUploadStatus(progress)
  }, 
  (error) => {
      alert('Upload different File / network Problem')
  }, 
  () => {
    uploadTask.snapshot.ref.getDownloadURL()
    .then((downloadURL) => {
        setDownloadUrl(downloadURL)
        setUploadStatus('')
      
    });
  }
);
    }
    return ( 
        
        <form>
                <input type='file' onChange={handleUpload} />  <span >{ uploadStatus}</span>
        </form>
     );
}
 
export default InputFile;