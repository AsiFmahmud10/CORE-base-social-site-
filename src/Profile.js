import { Button } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import InputFile from './components/InputFile';
import { auth, db } from './Firebase/config';
import PostStrip from './PostStrip';
import {motion} from 'framer-motion'
import './profile.css'

const Profile = () => {
    const user = auth.currentUser
    const types=["image/jpeg"]
    const [posts,SetPosts] = useState(null)
    const [downloadUrl,setDownloadUrl] = useState(auth.currentUser.photoURL)
    const [userImage,setUserImage] = useState()
   
    const history = useHistory()
    const [changeImage,setChangeImage] =useState(false)
    useEffect(()=>{

            if(downloadUrl != null){
                user.updateProfile({photoURL:downloadUrl}).
                then(()=>{
                        db.collection('UserInformation').doc(user.uid)
                        .set({
                            photoURL:downloadUrl
                        }).catch((err)=>{
                            console.log(err.message)
                        })
                        
                }).then(()=>{
                    setChangeImage(false)
                }).
                catch((err)=>{
                    console.log(err.message)
                    }  ) 
                    
            }
    },[downloadUrl])
   

useEffect(()=>{
    db.collection("Post").where("userId", "==", user.uid)
    .get()
    .then((querySnapshot) => {
         let results=[]
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            results.push({id:doc.id,...doc.data()})
        });
        console.log(results)
        SetPosts(results)
    })
    .catch((error) => {
      alert("Error getting documents: ", error)
    });
},[])

    const handleUpload =(e)=>{
            let target = e.target.files[0]
            if(user && types.includes(target.type) ){
                user.updateProfile({photoURL:target}).
                catch((err)=>{
                    console.log(err.message)
                      }  )  
            }else{
            alert("Upload in Correct format")
        }
    }
    return ( 
        <>
                <div className="profile__container ">
                    <div className="profile">
                                
                                        <div className="profile__image"><img src={downloadUrl} alt=""/></div>
                {/** change profile */}                  
                  


                                <div className="profile__info">
                                     <div>Name : {user.displayName}</div>
                                     <div>Email : {user.email}</div>
                                      {/* <input type="file" onChange={handleUpload}/>*/}
                                </div>
                                
        
                          <Button variant="contained" color="primary" component="span" onClick={()=>{setChangeImage(true)}}>Change profile picture</Button>
                                {changeImage && (
                                    <InputFile data={{user :auth.currentUser,setDownloadUrl:setDownloadUrl}}/>
                                )}
                                

                    </div>
                    
                      {/* PostStrip */}
                    <div 
                      
                    
                    className="profile__post">
                        
                            {posts &&  posts.map((post)=>(
                               <PostStrip   key={post.id} post = {post}/>
                            )

                            )}
                            {
                               posts && posts.length === 0 && (<div style={{textAlign:'center',width: '100%'}} >
                                <h1 style={{fontFamily:'cursive',fontWeight:'lighter'}}>You dont have any post yet </h1>
                           </div>)
                            }
                                
                            
                    </div>
                </div>
        </>
     );
}
 
export default Profile;