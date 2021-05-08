import { useState } from "react";
import ProgressBar from './ProgressBar';
import './Postinput.css'
import { Button } from "@material-ui/core";


const PostInput = () => {
    const [file,setFile] = useState(null)
    const [conferm, setConferm] = useState(false)
    const [post,setpost] = useState(null)
    const [caption,setCaption] = useState(null)
   

    const usehandle= (e)=>{
             let targetFile = e.target.files[0]
            console.log(targetFile)              //
            if( targetFile){
                setFile(e.target.files[0])
            }
    }
    const handleSubmit=()=>{
        setConferm(true) 
    }
    
    return ( 
            <div className="post__wrapper">
                   <div className='form__container'>
                        <form  className="post__form">
                                <input placeholder = "Caption"  onChange={(e)=>{setCaption(e.target.value)}}  required />
                                <textarea name="" id=""  required cols="35" rows="2" required
                                  placeholder='. . .Details ... '
                                   onChange={(e)=>{setpost(e.target.value)}}
                                ></textarea>
                                <input className="file" type="file" onChange={usehandle} />
                                <Button onClick={handleSubmit}>Submit</Button>
                        </form>
                        { conferm && file &&  <ProgressBar file={file} data ={{post:post,caption : caption}}/> }
        </div>
            </div>
    
               
      
     );
}
 
export default PostInput;