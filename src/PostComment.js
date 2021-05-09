import './PostComment.css'
import { Avatar, Button } from '@material-ui/core';
import { auth } from './Firebase/config';
import { useHistory } from 'react-router';
import useGetUserPhoto from './composable/useGetUserImage';
import { useState } from 'react';
const PostComment = ({data}) => {

        const {user} = data
        const [userImage,setUserImage] = useState(null)
        useGetUserPhoto(setUserImage,user)
        
        let time 
        if(data.createdAt){
                time = new Date(data.createdAt.toDate()).toLocaleString().split(',')
        }

    const history = useHistory()
    return ( 
        <>
                <div className="PostComment">
                        <div className="post__commentHeader">
                                    <Avatar
                                        src={userImage}
                                    />
                                    <div className="postComment__body">
                                            <h3 >{data.userName} </h3>  {/*onClick={()=>{history.push(`/profile/${data.user}`)}}*/}
                                            {data.comments}
                                            { data.createdAt && (<div className='time'>
                                                   <div>{time[0]}</div>
                                                   <div>{time[1]}</div>
                                                    </div>)}
                                              
                                    </div>
                                   
                        </div>
                 
                  
                   
                </div>
        </>
     );
}
 
export default PostComment;