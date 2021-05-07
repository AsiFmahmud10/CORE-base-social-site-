import { Avatar, Button } from '@material-ui/core';
import { ShoppingCartOutlined } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { auth, db } from './Firebase/config';
import PostComment from './PostComment';
import './PostDetails.css'

const PostDetails = () => {
     const {PostId} = useParams()
     const [data,setData] = useState(null)
     const [commentInput,setComment] = useState('')
     const [comments,setComments] = useState(null)

     
useEffect(()=>{
        console.log('first useEffect')

        const unsub = db.collection('Post').doc(PostId).collection('Comments').onSnapshot((snap)=>{
                console.log("snap subscribe")
                    let results=[]
                    snap.docs.map((doc)=>{
                        results.push({id:doc.id,...doc.data()})
                    })
                    setComments(results)
                })
                    return ()=>{unsub()}

},[])

     useEffect(()=>{
        console.log('Second useEffect')
                        db.collection('Post').doc(PostId).get()
                        .then((snap)=>{
                               // console.log(data)
                                setData({id:snap.id,...snap.data()})
                        })

                     
     },[])

     const handleSubmit =(e)=>{
                e.preventDefault();
                db.collection('Post').doc(PostId).collection('Comments').add({
                        user : auth.currentUser.uid,
                        userName : auth.currentUser.displayName,
                        userPicture :auth.currentUser.photoURL,
                        comments : commentInput
                })
                setComment('')
                setPost(false)
     }
const [post,setPost] = useState(true)



    return ( 
        <>
             
             {data&& (
             
             <div className="post__details">
                            <div className="post__detailsHeader">
                                <Avatar
                                 src={auth.currentUser && auth.currentUser.photoURL}
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
                                                                        alert('signin plz')
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

                </div>
)}
                
        </>
     );
}
 
export default PostDetails;