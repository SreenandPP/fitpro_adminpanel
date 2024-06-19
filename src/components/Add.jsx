import React,{useState,useEffect, useContext} from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Row,Col } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { addWorkout } from '../services/allApis';
import { addWorkoutResponseContext } from '../Context Api/Contextapi';

function Add() {


    const {addWorkoutResponse,setAddWorkoutResponse}=useContext(addWorkoutResponseContext)

    const [show, setShow] = useState(false);

    const [preview,setPreview]=useState("")
    const [workoutData,setWorkoutData] =useState({
        title:"",category:"",description:"",workoutImage:""     
    })

    const [imageStatus,setImageStatus]=useState(false)


    useEffect(()=>{
        console.log(workoutData);
        if(workoutData.workoutImage.type=="image/jpg" ||workoutData.workoutImage.type== "image/jpeg" || workoutData.workoutImage.type== "image/png" ||  workoutData.workoutImage.type== "image/gif" ){

            setImageStatus(false)
            setPreview(URL.createObjectURL(workoutData.workoutImage))
          
           

        }
        else{
            console.log("Invalid file fromat!! Image should be jpg,jpeg or png!!");
            setImageStatus(true)
            setPreview("")
          
        }
    },[workoutData.workoutImage])

    console.log(workoutData);

    const handleAddWorkout=async()=>{
        const {title,category,description,workoutImage}=workoutData

        if(!title || !category || !description || !workoutImage){
           toast.warning("Invalid Inputs!!Enter Valid Input in Every Field")
        }
        else{
          const formData=new FormData()
          formData.append("title",title)
          formData.append("category",category)
          formData.append("description",description)
          formData.append("image",workoutImage)

          const token=sessionStorage.getItem("token")
          const reqHeader={
            "Content-Type":"multipart/form-data",
            "Authorization":`Bearer ${token}`
          }
          const result=await addWorkout(formData,reqHeader)
          if(result.status==200){
            toast.success("Project Added Successfully!!")
            setWorkoutData({
                title:"",category:"",description:"",workoutImage:""
            })
            handleClose()
            setAddWorkoutResponse(result)
          }
          else{
            toast.error(result.response.data)
          }
        }
    }

   
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <>

            <div className='mt-5 ms-5'>
                <button onClick={handleShow} className='btn text-white ' style={{ backgroundColor: '#ff2332' }}>Add Workout <i className="fa-solid fa-plus ms-1 mt-1 fa-lg"></i></button>
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}

               
            >
                <Modal.Header className='text-white '  closeButton style={{backgroundColor:'#ff2332'}}>
                    <Modal.Title >Add Workout</Modal.Title>
                </Modal.Header>
                <Modal.Body  >
                    <div>
                        <Row>
                            <Col>
                               <label >
                                <input  type="file" name="in" id="" style={{display:'none'}} onChange={(e)=>{setWorkoutData({...workoutData,workoutImage:e.target.files[0]})}} />
                               <img className='img-fluid' src={preview?preview:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1200px-Picture_icon_BLACK.svg.png"} alt="in" />
                               </label>
                          {

                            imageStatus &&

                            <p className='text-danger'>Invalid file fromat!! Image should be jpg,jpeg or png!!</p>
                          }
                                
            
                               
                            </Col>
                            <Col className='mb-2'>
                                <div >
                                    <FloatingLabel className='mb-3' controlId="titleinpinp" label="Title" >
                                        <Form.Control  type="text" placeholder="project title" onChange={e=>setWorkoutData({...workoutData,title:e.target.value})} />
                                    </FloatingLabel>
                                    <FloatingLabel className='mb-3' controlId="categoryinp" label="Category">
                                        <Form.Control  type="text" placeholder="Category" onChange={e=>setWorkoutData({...workoutData,category:e.target.value})} />
                                    </FloatingLabel>
                                    <FloatingLabel className='mb-3' controlId="descriptioninpo" label="Description">
                                        <Form.Control style={{width:'100%',height:'200px'}}  type="text" placeholder="Description" onChange={e=>setWorkoutData({...workoutData,description:e.target.value})} />
                                    </FloatingLabel>
                                   
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose} >
                        Close
                    </Button>
                    <Button variant="primary" className='bg-dark ' onClick={handleAddWorkout} >Save</Button>
                </Modal.Footer>

            </Modal>
        </>
    )
}

export default Add