import { Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { auth } from './Firebase/config';
import './Post.css';
const Post = ({data}) => {

    return ( 
        <>
            <div className="post">
                          <div className="post__header">
                                <Avatar
                                    className="post__headerAvatar"
                                    src={data.userPicture}
                                   
                                />
                                <h3>{data.username}</h3>
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