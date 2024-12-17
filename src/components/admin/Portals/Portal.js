import ReactDOM from "react-dom";
// import { useEffect } from "react";
import  Box from "@mui/material/Box";
import * as React from "react";
import Typography from '@mui/material/Typography';
import {useEffect ,useState} from "react";
import MyDropzone from "../MyDropZone";
import Button from '@mui/material/Button';
import PostData from "./PostData";
import EditPortal from "./EditPortal";
import category from './Category';
import Modal from '@mui/material/Modal';

const style={
    position : "absolute",
    top:"50%",
    left:"50%",
    transform:"translate(-50%,-50%)",
    width:"auto",
    bgcolor:"background.paper",
    boxShadow:24,
    p:4,
};

const APICall=async(id)=>{
    try {
        const api = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`);
        const data = await api.json();


        if (!api.ok){
            
            throw new Error("Failed to fetch data");
        }
        const stringdata=data.images[0]
        console.log(data,"my data")
            return data
        // let data=await api.json();
        // return data;
    }catch(error){
        console.log("Bad API",error);
        
    }
}


const Portal=({Portal,onclose,isPortal,id,setCheckUpdate})=>{
    const [open,setOpen] = React.useState(false);
    const [editData,seteditData]=useState(null);
    const [getcat,setcat]=useState([]);

    const [portaldata,setportaldata]=useState({
        title:'',
        category:'',
        price:0,
        description:'',
        images:null,
        id:0
    })

    useEffect(()=>{

        const fetch=async()=>{
            try{
                const data123=await category()
                setcat(data123)
            }
            catch(error){
                console.log(error,"all the error")
           }
        }
        fetch()
        if(!isPortal){
            const fetchdata=async()=>{
                const data=await APICall(id)
                console.log("hello",data.images[0])
                
                if(data){
                    seteditData(data);
                    setportaldata({
                        title:data.title || '',
                        category:data.category.name || '',
                        price:data.price || 0,
                        description:data.description || '',
                        images:data.images[0] || null,
                        id:0
                    })
                }
            }
            fetchdata();
        }
    },[id, isPortal])

    const onchangeTitle=(event) => {
        console.log("title ",event.target.value)
        setportaldata((prev) => ({
            ...prev,
            title: event.target.value
        }));
    };

    const onchangeCatagary=(event) => {
        const [name,id] = event.target.value.split(',');
        const ID=parseInt(id,10)
        console.log("see the category ",ID)
        setportaldata((prev) => ({
            ...prev,
            category: name,
            id:ID
        }));
    };

    const onchangePrice=(event) => {
        
        console.log("price ",event.target.value)
        setportaldata((prev) => ({
            ...prev,
            price:event.target.value
        }))
    }

    const onchangeDescription=(event) => {
        console.log("description ",event.target.value)
        setportaldata((prev) => ({
            ...prev,
            description:event.target.value
        }));
    }
    const getdataURLPortal=(dataURL)=>{
        console.log("portal",dataURL)
        setportaldata((prev) => ({
            ...prev,
            images: dataURL
        }));
    }

    const handleOpen =()=>setOpen(true);

    const handleClose =(event)=>{
        const savebutton = document.getElementById("Save");
        setOpen(false);
        onclose();
        if(event.target===savebutton) {

            console.log("its post request")
            if(isPortal){
                console.log(portaldata.images,"just to check the url")
                PostData(portaldata,setCheckUpdate)
        }
        else{
            EditPortal(portaldata,id,setCheckUpdate)
    }
    }
    };
    useEffect(()=>{
        handleOpen()
},[Portal])

console.log(getcat,"category")

return ReactDOM.createPortal(
    <>
        <div>

        <Modal
        keepMounted
        open={open}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
       
      >
        <Box sx={style}  className='rounded-md p-4' >
            <div className='items-end flex justify-end ' onClick={handleClose}>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 cursor-pointer text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
        </div>
          <Typography id="keep-mounted-modal-title" variant="h6" component="h2">
           
          </Typography>
          <Typography id="keep-mounted-modal-description" sx={{ mt: 2 }}>
            
<div className='flex justify-between'>
    <div>
    <p class="mb-2 text-md font-bold" >Title</p>
    <input class="focus-within:border-blue-300 mb-2 h-12 rounded-md border-2 px-2 py-1 outline-none w-full" type="text"  onChange={onchangeTitle} value={portaldata.title} />
    </div>

<div>

<p class="mb-2 text-md font-bold">Price</p>
        <input class="focus-within:border-blue-300 mb-2 h-12 rounded-md border-2 px-2 py-1 outline-none  w-full" type="text" onChange={onchangePrice} value={portaldata.price}/>
</div>
</div>

<div>
    <p class="mb-2 text-md font-bold">Category</p>
    
    {/* <p>{portaldata.category}</p> */}
    <select value={portaldata.category} onChange={onchangeCatagary} className='p-2 font-medium w-full'>
        <option disabled>{portaldata.category||'choose from here'}</option>
            
            {
                getcat.map(item => (
                    portaldata.category!==item.name&&<option key={item.id} value={`${item.name},${item.id}`} className='hover:bg-blue-400'>{item.name}</option>
                ))
            }
        </select>
       
    </div>

    <div>
    <p class="mb-2 text-md font-bold" >Description</p>
    <textarea
        class="focus-within:border-blue-300 mb-2 h-24 rounded-md border-2 px-2 py-1 outline-none w-full"
        placeholder="Type your description here..."
        rows="4"  
        onChange={onchangeDescription}
        value={portaldata.description}
    >

    </textarea>
    </div>


    <div class="flex flex-col items-center justify-center rounded-lg border-4 border-dashed px-4 py-10">
     

      <p class="mt-4 text-center text-xl font-medium text-gray-800">

        <MyDropzone getdataURL={portaldata.images} getdataURLPortal={getdataURLPortal} isPortal={isPortal}/>
        
      </p>
     
    </div>

    <div className='flex justify-end items-center'>
    <button id='Save' className="rounded-lg pr-2 pl-2 bg-blue-300 text-white mt-2" onClick={handleClose}>save</button>
    </div>
        
          </Typography>
        </Box>
      </Modal>
    </div>
        </>,
        document.body
    )
}

export default Portal