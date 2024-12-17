// import AdminProduct from "../AdminProduct";

const EditPortal=async(portaldata,id,setCheckUpdate)=>{
    try{
        console.log('edit request',portaldata.images);
        const API= await fetch(`https://api.escuelajs.co/api/v1/products/${id}`,{
            method:'PUT',
            headers:{
                'content-type': 'application/json',
            },
            body:JSON.stringify({
                title:portaldata.title,
                price:portaldata.price,
                description:portaldata.description,
                categoryId:id,
                images: [portaldata.images]
            })
        })

        const data=await API.json()
        console.log(data)
        setCheckUpdate((prev)=>prev+1)

    }catch(error){}
}
export default EditPortal