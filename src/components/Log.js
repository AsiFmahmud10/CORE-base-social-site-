import {motion} from 'framer-motion'
import './Log.css'
/** 
 * notification,mount,setMount
 */
const Log = ( {notification,mount,setMount}  ) => {
  const toogle ={
      hidden:{
              
      },
        visible:{
               x:[-100,620,590,630,595,620,600,-100]
        }
  }
  let clear
   if(mount === true){
         if(clear){
             clearTimeout(clear)
         }
       clear = setTimeout(()=>{
            setMount(false)
       },2000)
   }
 

    return ( 
    <>
         {mount && (

                        <motion.div
                                    variants={toogle}
                                    
                                        animate='visible'
                                        transition={{duration:2, type: "spring",stiffness:100}}
                                        className="Log"
                                    >
                                    {notification}

                        </motion.div>
         )}
           
    </>
       
     );
}
 
export default Log;