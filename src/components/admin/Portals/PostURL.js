const PostURL =async(file,getdataURLPortal)=>{
    const formData=new FormData();
    formData.append('file',file);
    
    const response=await fetch('https://api.escuelajs.co/api/v1/files/upload',{
        method:'POST',
        body:formData
    });
    if(!response.ok){ 
        throw new Error('Failed to upload file');
    }
    const data=await response.json();
    console.log(data.location,"file upload response");
    getdataURLPortal(data.location);
};

export default PostURL;