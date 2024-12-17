import React from "react";
import Portal from "./Portals/Portal.js";
import AdminProduct from "./AdminProduct.js";
// import Filter from "./Portals/Filter.js";
import { useState } from "react";
 const Admin=()=>{
    const [portal,setportal]=useState(false)
    const [checkupdate,setCheckUpdate]=useState(0)
    const isPortal=true

    function onclose(){
        
        setportal(false)
    }
    return (
        <>
       
       {portal&&<Portal portal={portal} onclose={onclose} isPortal={isPortal} id={0} setCheckUpdate={setCheckUpdate}/>}
   { <><div className="flex justify-between p-4 font-bold ">
            <h1 className="text-4xl">List Of Products</h1>
            <button className="bg-blue-700 rounded-lg p-2 text-white"  onClick={()=>setportal(true)}>+ Add product</button>
        </div>
          <AdminProduct setCheckUpdate={setCheckUpdate} checkupdate={checkupdate}/>
          </>
   }
          




 
       
        </>
    )
}
export default Admin