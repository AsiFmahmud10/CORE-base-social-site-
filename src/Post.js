import { Avatar } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useGetUserPhoto from './composable/useGetUserImage';
import { auth, db } from './Firebase/config';
import {motion} from 'framer-motion'
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
          
            <motion.div 
                initial={{opacity:0}}
                animate={{opacity:1}}
                transition={{delay:.1,duration:.3}}
            className="post">
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
                                        <Link to={`postDetails/${data.id}`}>
                                            <motion.div
                                                whileHover={{scale:1.04}}
                                            >
                                                Read more
                                            </motion.div>
                                            
                                            </Link>
                                       
                                </h3>   
                              
                                
                                
                    </div>
                           


            </motion.div>

        </>
     );
}
 
export default Post;