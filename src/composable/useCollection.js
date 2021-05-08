import { useEffect, useState } from 'react';
import { auth, db } from '../Firebase/config';

export const useCollection=()=>{

    const [post, setPost] = useState(null)
            
    useEffect(()=>{
                    let unsub =  db.collection('Post').orderBy('createdAt',"desc")
                    .onSnapshot((snap)=>{
                        console.log("snap subscribe")
                            let results=[]
                            snap.docs.map((doc)=>{
                                results.push({id:doc.id , ...doc.data()})
                            })
                            setPost(results)
                        })
                            return ()=>{unsub()}
                },[ ])
    


    return {post,setPost}

}