import './PostComment.css'
import { Avatar, Button } from '@material-ui/core';
import { auth } from './Firebase/config';
import { useHistory } from 'react-router';
const PostComment = ({data}) => {
    const history = useHistory()
    return ( 
        <>
                <div className="PostComment">
                        <div className="post__commentHeader">
                                    <Avatar
                                        src={data.userPicture}
                                    />
                                    <div className="postComment__body">
                                            <h3 >{data.userName} </h3>  {/*onClick={()=>{history.push(`/profile/${data.user}`)}}*/}
                                            {data.comments}
                                    </div>
                                   
                        </div>
                 
                  
                   
                </div>
        </>
     );
}
 
export default PostComment;