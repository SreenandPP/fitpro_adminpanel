import React ,{useState,useEffect,useContext}from 'react'
import AddDiet from '../components/AddDiet'
import { Row,Col } from 'react-bootstrap'
import { allDiets, deleteDiet} from '../services/allApis'
import Fithome from '../components/Fithome'
import { addDietResponseContext } from '../Context Api/Contextapi'
import { toast } from 'react-toastify'
import EditDiet from '../components/EditDiet'


function Dietdash() {
const {addDietResponse,setAddDietResponse}=useContext(addDietResponseContext)
    const [diet, setDiet] = useState("")

    useEffect(() => {
      if (sessionStorage.getItem('token')) {
        getData()
  
      }
      else {
        console.log("Login First");
      }
    },[addDietResponse])
  
    console.log(diet);
  
  
    const getData = async () => {
      const header = { "Authorization": `Bearer ${sessionStorage.getItem('token')}` }
      const result = await allDiets(header)
      console.log(result);
      if (result.status == 200) {
        setDiet(result.data)
      }
      else {
        console.log(result.response.data);
      }
    }

    const handleDelete=async(id)=>{
      const token=sessionStorage.getItem('token')
      console.log(id);
      const header={
        "Content-Type":"application/json",
        "Authorization":`Bearer ${token}`
      }
      const result=await deleteDiet(id,header)
      if(result.status==200){
        toast.success("Diet Plan Deleted Successfully!!")
        getData()
      }
      else{
        console.log(result);
        toast.error(result.response.data)
      }
    }
  
  return (
    <>
      <Fithome />


<Row>
  <Col className='text-white' sm={8} md={5} >
    <h3 className='ms-5 mt-4 '>Diet Plan</h3>
    <AddDiet />

    {
      diet.length > 0 ?
        diet.map(item => (
          <div className='border border-3 p-4 mt-4 ms-5'>
            <div className='d-flex justify-content-between border shadow mb-3 p-3 rounded'>
              <h4>{item.title}</h4>
              <div>
                <EditDiet diet={item}/>
                <button className='btn me-3'  onClick={()=>{handleDelete(item?._id)}}>
                  <i class="fa-solid fa-trash fa-xl " style={{ color: 'red' }}></i>
                </button>
              </div>
            </div>

          </div>

        ))
        :
        <h2>No Diet Plan Added</h2>
       }

  </Col>
 
</Row>

    </>
  )
}

export default Dietdash