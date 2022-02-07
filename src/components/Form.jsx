import { useEffect, useState } from "react"

 export const Form = ()=>{
const [formData,setFormData] = useState({
    gamename :"",
    gameauthor:"",
    gameprice:"",
    gametags:[],
    forkids:"",
    gamedesc:"",
    gamerating:""
}) 

const [totaldata,setTotal] =useState([])

useEffect(()=>{
    getdata()
},[])

 const getdata=()=>{
    fetch("https://fake-server-pavan.herokuapp.com/games").then((d)=>d.json()).then((res)=>{setTotal(res)})
}

  const handlechange =(e)=>{
    var {name} = e.target

    setFormData({
        ...formData,
        [name]:e.target.value
    })
  }

    return (

        <div>
        <form id="addgame"  onSubmit={
            (e)=>{
            // e.preventDefault();
            console.log(formData)

            fetch("https://fake-server-pavan.herokuapp.com/games",{
                method:"POST",
                body:JSON.stringify(formData),
                headers:{
                    "content-type":"application/json"
                }

            })
        
            }

        }>
         <input name="gamename" onChange={handlechange} type="text" placeholder="gamename"/>
         <input name="gameauthor" onChange={handlechange} type="text" placeholder="gameauthor "/>
         <input name="gameprice" onChange={handlechange} type="number" placeholder="gameprice"/>
         <input name="gametags" onChange={handlechange} type="text" placeholder="gametags"/>
         <input  name="forkids" onChange={handlechange} type="checkbox" placeholder="forkids"
            />
           <textarea  name="gamedesc" onChange={handlechange} placeholder="gamedesc"></textarea> 
         <select name="gamerating" id="">
             <option value="1">1</option>
             <option value="2">2</option>
             <option value="3">3</option>
             <option value="4">4</option>
             <option value="5">5</option>
         </select>
         
         <input type="submit" onChange={handlechange} name="" id="" placeholder="submit" />

        
        
     
        </form>
            
        <table id="table"  
     >
      
         <thead  id="tr">
             <tr>
               <th>gamename </th>
               <th>gameauthor</th>
               <th>gameprice</th>
               <th>gametags</th>
               <th>forkids</th>
               <th>gamedesc</th>
               <th>gamerating</th>
             
             </tr>
            
         </thead>
         <tbody  >
         
         
         
         {totaldata.map((e)=>(
            <tr className={"gamerow"}>
              {Object.keys(e).map((key)=>{if(key == "gameprice"){
                return <td className={"gameprice"}>{e[key]}</td>
              }else if(key === "gamerating"){
                return <td className={"gamerating"}>{e[key]}</td>
              }else{return<td>{e[key]}</td>}})}
            </tr>
         ))}

</tbody>
        </table>
        </div>
    )
}