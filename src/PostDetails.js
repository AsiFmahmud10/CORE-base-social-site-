import { Avatar, Button } from '@material-ui/core';
import { ShoppingCartOutlined } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useGetUserPhoto from './composable/useGetUserImage';
import { auth, db, timeStamp } from './Firebase/config';
import PostComment from './PostComment';
import {motion} from 'framer-motion'
import './PostDetails.css'
import Log from './components/Log';

const PostDetails = () => {
     const {PostId} = useParams()
     const [mount,setMount] = useState(false)

     const [data,setData] = useState(null)
     const [commentInput,setComment] = useState('')
     const [comments,setComments] = useState(null)

    
     const [userId,setUserId] = useState(null)
     
     const [userImage,setUserImage] = useState(null)
        useGetUserPhoto(setUserImage,userId)


useEffect(()=>{
        
        const unsub = db.collection('Post').doc(PostId).collection('Comments') .orderBy('createdAt').onSnapshot((snap)=>{
                console.log("snap subscribe")
                    let results=[]
                    snap.docs.map((doc)=>{
                        results.push({id:doc.id,...doc.data()})
                    })
                    setComments(results)
                })

                db.collection('Post').doc(PostId).get()
                .then((snap)=>{
                    
                       let {userId} = snap.data()
                       console.log(userId,"snap")
                       setUserId( userId)
                        setData({id:snap.id,...snap.data()})
                })

                    return ()=>{unsub()}

},[])

     const handleSubmit =(e)=>{
                e.preventDefault();
                db.collection('Post').doc(PostId).collection('Comments').add({
                        user : auth.currentUser.uid,
                        userName : auth.currentUser.displayName,
                        userPicture :auth.currentUser.photoURL,
                        comments : commentInput,
                        createdAt: timeStamp()
                })
                setComment('')
                setPost(false)
     }
const [post,setPost] = useState(true)

    return ( 
        <>
            
                  <Log  notification={"Log in plz"} mount ={mount} setMount={setMount}/>
              
             {data&& (
             
             <motion.div
                    initial={{opacity:0}}
                    animate={{opacity:1}}
                    transition={{duration:.4}}
             
             className="post__details">
                            <div className="post__detailsHeader">
                                <Avatar
                                 src={userImage}
                                    alt={data.username}
                                />
                                    <h3>{data.username}</h3>
                                    
                            </div>
                            <div className="post_detailsBody">
                                    <div className="post__detailsImage">
                                                <img src={data.ImageDownloadUrl} alt=""/>
                                    </div>
                                    <div className="post__detailsCaption">
                                                 <h3>{data.caption}</h3>
                                    </div>
                            </div>
                           
                            <div className="post__detailsComment">
                                        <div className="tile">
                                        {post === true ?( <Button onClick={()=>{setPost(false)}}>Comments</Button>) : (<Button onClick={()=>{setPost(true)}}>Post</Button>)}
                                                
                                        </div>
                                        <div className="comment__wrapper">
                                                    <div className="comments">
                                                        <Avatar
                                                        src={auth.currentUser && auth.currentUser.photoURL}
                                                        />
                                                        <form className="comments_input"
                                                                 onSubmit={handleSubmit}
                                                        >
                                                                <input type="text" 
                                                                onClick={(e)=>{
                                                                    if(!auth.currentUser){
                                                                        setMount(true)
                                                                        setComment('')
                                                                      }
                                                                }}
                                                                placeholder='comment' value={commentInput} onChange={(e)=>
                                                                    {
                                                                             setComment(e.target.value)
                                                                        }} /> 
                                                        </form>
                                                    </div>
                                                {post===true ? (<div className='post_detailsDataPost'>
                                                    { data.post}
                                                </div>):
                                                (<div>
                                                                {   comments && comments.map((data)=>(
                                                                       <PostComment data={data} key={data.id}/>
                                                                ))
                                                                }
                                                </div>) }
                                        </div>
                            </div>
                </motion.div>
)}
        </>
     );
}
 
export default PostDetails;