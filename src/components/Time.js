const Time = ({timeStamp}) => {
       let time 
        if(timeStamp){
                time = new Date(timeStamp.toDate()).toLocaleString().split(',')
                console.log(time)
        }
    return ( 
        <div>   
            asdasd
                                  { timeStamp && (<div className='time'>
                                                   <div>{time[0]}</div>
                                                   <div>{time[1]}</div>
                                                    </div>)}
        </div>
     );
}
 
export default Time;