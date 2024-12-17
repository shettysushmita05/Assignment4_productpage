import * as React from 'react';
import Box from '@mui/material/Box';
import  Typography  from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEffect,useState } from 'react';
import category from './Category';
import FilterImage from './FilterImage.png';
// import Button from '@mui/material/Button';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const Filter=({handleFilter})=>{
    const [catData, SetCatData] = useState([]);
    const [Category,setCategory]=useState('')
    const [slider,setSlider]=useState(1)
    const [removeFilter,setRemoveFilter] = useState(false)

    useEffect(() => {
        const fetch = async () => {
            const data = await category()
            SetCatData(data)
        }
        fetch()
    },[])

    const[open,setOpen]=React.useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSave=(value) => {
        setOpen(false)
        const data=[Category,slider]
        handleFilter(data,removeFilter)
        if(value) {
            setRemoveFilter(false)
        }
        else{
            setRemoveFilter(true)
        }
}
const onChangeCat=(event) => {
    setCategory(event.target.value)
}

const handleSlider=(event) => {
    setSlider(event.target.value)
}

return (
    <>
    <div>
  <button onClick={handleOpen}  className="bg-blue-700 rounded-lg p-2 text-white font-bold m-2 w-full flex gap-2 items-center" >
<img src={FilterImage} alt="" className='w-1/5 h-1/5'/>
    Filter
    </button>
  <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
   
  >
    <Box sx={style} className='rounded-lg'>
      <Typography id="modal-modal-title" variant="h6" component="h2">
       Filter
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        <div>
            <div className='text-lg font-bold'>
       Category
       </div>
        
        <select onChange={onChangeCat} className="p-2 font-medium" value={Category}>
            <option disabled>
            {'choose from here'}
            </option>
            {catData.map((item) => (
         <option key={item.id} value={item.name} disabled={Category===item.name}> {item.name}</option>
            ))}
          </select>
          <p>{Category}</p>
          </div>

          <div>
            <div className='text-lg font-bold'>
            Price Range
            </div>
            <input type='range' max={1000} min={1} step={5} value={slider}  onChange={handleSlider} />
            <p>price:{slider}</p>
          </div >
          <div className='flex justify-between mt-2'>
        {removeFilter&&<button onClick={()=>handleSave(true)} className="bg-blue-700 rounded-lg p-2 text-white" >Remove</button>}
<button onClick={()=>handleSave(false)} className="bg-blue-700 rounded-lg p-2 text-white" >Save</button>
</div>
      </Typography>
    </Box>
  </Modal>
</div>

    </>
)
}

export default Filter