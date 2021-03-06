import { Avatar } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useGetUserPhoto from './composable/useGetUserImage';
import { auth, db } from './Firebase/config';
import './Post.css';
const Post = ({data}) => {


    let time 
    if(data.createdAt){
            time = new Date(data.createdAt.toDate()).toLocaleString().split(',')
    }

    const [userImage,setUserImage] = useState(null)
    useGetUserPhoto(setUserImage,data.userId)
 

    return ( 
        <>
            <div className="post">
                          <div className="post__header">
                              <Avatar
                                    className="post__headerAvatar"
                                    src={userImage}
                                />
                              
                                <h3>{data.username}</h3>
                                { data.createdAt && (<div className='time'>
                                               <div>{time[1]}</div>
                                                  {time[0]}
                                                   
                                                    </div>)}
                          </div>
                    <div className="post__body">
                                <div className="post__img">
                                        <img  src={data.ImageDownloadUrl} alt=""/>
                                </div>
                                <h3 className="post__summary"> 
                                        <span>{data.caption}</span>
                                        <Link to={`postDetails/${data.id}`}>Read more</Link>
                                       
                                </h3>   
                              
                                
                                
                    </div>
                           


            </div>

        </>
     );
}
 
export default Post;