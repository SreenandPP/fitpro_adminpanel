import React, { useState, useEffect,useContext } from 'react'
import Fithome from '../components/Fithome'
import { Row, Col } from 'react-bootstrap'
import Add from '../components/Add'
import Edit from '../components/Edit'
import { allWorkouts, deleteWorkout } from '../services/allApis'
import { addWorkoutResponseContext,editWorkoutResponseContext } from '../Context Api/Contextapi'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

function Dashboard() {

  const {addWorkoutResponse,setAddWorkoutResponse}=useContext(addWorkoutResponseContext)

  const {editWorkoutResponse,setEditWorkoutResponse}=useContext(editWorkoutResponseContext)
  const [workouts, setWorkouts] = useState("")

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      getData()

    }
    else {
      console.log("Login First");
    }
  }, [addWorkoutResponse,editWorkoutResponse])

  console.log(workouts);


  const getData = async () => {
    const header = { "Authorization": `Bearer ${sessionStorage.getItem('token')}` }
    const result = await allWorkouts(header)
    console.log(result);
    if (result.status == 200) {
      setWorkouts(result.data)
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
    const result=await deleteWorkout(id,header)
    if(result.status==200){
      toast.success("Workout Deleted Successfully!!")
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
          <h3 className='ms-5 mt-4 '>Workouts</h3>
          <Add />

          {
            workouts.length > 0 ?
              workouts.map(item => (
                <div className='border border-3 p-4 mt-4 ms-5'>
                  <div className='d-flex justify-content-between border shadow mb-3 p-3 rounded'>
                    <h4>{item.title}</h4>
                    <div>
                      <Edit workout={item} />
                      <button className='btn me-3' onClick={()=>{handleDelete(item?._id)}}>
                        <i class="fa-solid fa-trash fa-xl " style={{ color: 'red' }}></i>
                      </button>
                    </div>
                  </div>

                </div>

              ))
              :
              <h2>No workouts available</h2>
             }

        </Col>

        <Col className='ms-auto  mt-5' sm={8} md={4}>
          
           <Link to={'/diet'} className='btn me-3 ms-5  text-white mt-5 btn-success' >

            Go To Diet Section
            <i className="fa-solid fa-arrow-right fa-lg text-white ms-2 mt-2"></i>
          </Link>
        
        </Col>

       
      </Row>

    </>
  )
}

export default Dashboard