import { useState,useRef,useEffect } from "react";
import "./Input.css"
import { MdDelete } from "react-icons/md";
// import Intrval from "./Intrval";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/react-datepicker.css";



const getLocalItems=()=>{
var list = localStorage.getItem('lists')
if(list){
    return  JSON.parse(localStorage.getItem('lists'))
}else{
    return []
}
}
const Input=()=>{
    const [inp , setInp] = useState("");
    const [data,setData] = useState(getLocalItems())
    // const [count, setCount] = useState(0);
   const [show , setShow] = useState(true)
   const [date, setDate] = useState(new Date());
   const [count, setCount] = useState(0);
   const intervalRef = useRef(null); 
   useEffect(() => {
    // Start the interval and store the ID in intervalRef
    intervalRef.current = setInterval(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);  // Increment every second

    // Clean up the interval on component unmount
    return () => clearInterval(intervalRef.current);
  }, []);
  const stopInterval = (e) => {
    clearInterval(intervalRef.current);  // Manually stop the interval
  }; 




//     const handleTime=()=>{
//  const TimeIntervale= setInterval(()=>{
// setCount(previousValue => previousValue+1)
//         },1000)
//           return clearInterval(intervalRef.current);
       
//     }
const handleStart=()=>{
    
}
    const handleInp=(e)=>{
        setInp(e.target.value)
    }

    const handleBtn=(e)=>{
        e.preventDefault()
        const store = [...data , inp]
        setData(store)
        setInp("")
        // localStorage.setItem("ar" [1,2])
    }
    const handleDate=(date)=>{
        setDate(date)
        window.location.reload()

    }
    const handleStopCount=()=>{
        clearInterval(intervalRef.current);
    }
    // add data in local storage
    useEffect(()=>{
localStorage.setItem("list" , JSON.stringify(data))
    },[data,date])

//     const handleDelete=(index)=>{
// // console.log(index)
// const filterData = data.filter((item2 , index2)=>{
//     return index2 != index;
// })
// setData(filterData)
//     }

    return(
        <>
         <div style={{textAlign:"center"}}>
  <DatePicker  selected={date} onChange={handleDate} />
    </div>
        <div className="input-1">
            <input onChange={handleInp}  value={inp} type="text" placeholder="Enter"></input>
            <button onClick={handleBtn}>Submit</button>
            <>
            <div className="inp-4">
                {
                    data.map((item,index)=>{
                        return <div className="inp-5"> <h4>{item}</h4>
                        <h3> 
                           {
                            show ? <button id={item.id} onClick={(e)=>{setShow(false)}}>Start</button>
                             : 
                             <div className="stopTimer"><h4>{count}</h4><button id={item.id} onClick={()=>{
                                stopInterval();
                              handleStart();
                             }}>Stop Counter</button></div>
                          }  
                             </h3>
                        </div>
                    })
                }
                </div>

            </>
        </div>
        </>
       
    )
}
export default Input;