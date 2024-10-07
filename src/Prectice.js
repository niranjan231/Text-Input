
import { useState, useEffect } from "react";
import axios from "axios"





const Prectice=()=>{
   const [data , setData] = useState([]);
    useEffect(()=>{
axios.get('https://fakestoreapi.com/products')
.then(res=>{
    console.log(res.data)
    setData(res.data)
})
.catch(err=>{
    console.log(err);
})
    },[])







const filterFulldData = ((cat)=>{
    const filterItem = data.filter((item5)=>{
        return item5.category===cat;
    })
})
    return (
        <div>
        {
            <h1></h1>
        }
        </div>
    )
}
export default Prectice;