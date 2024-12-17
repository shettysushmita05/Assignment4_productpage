const PostDelete =async(id,setCheckUpdate)=>{

    try{
        console.log('ID inside PostDelete:', id);

        const response= await fetch(`https://api.escuelajs.co/api/v1/products/${id}`,{
            method:'DELETE'
        })
        console.log(response)
        setCheckUpdate((prev)=>prev+1)
    }
    catch(error){
        console.log('there is a error',error)

    }

}

const callDelete=(id,setCheckUpdate)=>{
    console.log('ID passed to callDelete:', id);
    PostDelete(id,setCheckUpdate)

}

export default callDelete