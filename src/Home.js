import './Home.css'
import Post from './Post'
import { useCollection } from './composable/useCollection';
import Navbar from './components/Navbar';
import TransitionsModal from './components/Modal';
import { auth } from './Firebase/config';
import ErrorPopup from './ErrorPopup';
import { useState } from 'react';
import Log from './components/Log';


const Home = () => {
    const {post,setPost} = useCollection()
    
    return ( 
        
                <div className="home">
                   
                            <div className="home__post">
                                                {post && post.map((data)=>(
                                                        <Post  key={data.id}
                                                         data ={data}
                                                        />
                                                ))}
                                </div>   
                                
                </div>
      
     );
}
 
export default Home;