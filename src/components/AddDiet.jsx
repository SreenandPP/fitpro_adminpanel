import React,{useState,useEffect,useContext} from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Row,Col } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { addDiet } from '../services/allApis';
import { addDietResponseContext } from '../Context Api/Contextapi';


function AddDiet() {


    const {addDietResponse,setAddDietResponse}=useContext(addDietResponseContext)
    
    const [show, setShow] = useState(false);

    const [preview,setPreview]=useState("")
    const [dietData,setDietData] =useState({
        title:"",category:"",description:"",dietImage:""     
    })

    const [imageStatus,setImageStatus]=useState(false)


    useEffect(()=>{
        console.log(dietData);
        if(dietData.dietImage.type=="image/jpg" ||dietData.dietImage.type== "image/jpeg" || dietData.dietImage.type== "image/png" ||  dietData.dietImage.type== "image/gif" ){

            setImageStatus(false)
            setPreview(URL.createObjectURL(dietData.dietImage))
          
           

        }
        else{
            console.log("Invalid file fromat!! Image should be jpg,jpeg,png or gif!!");
            setImageStatus(true)
            setPreview("")
          
        }
    },[dietData.dietImage])

    console.log(dietData);

    const handleDiet=async()=>{
        const {title,category,description,dietImage}=dietData

        if(!title || !category || !description || !dietImage){
           toast.warning("Invalid Inputs!!Enter Valid Input in Every Field")
        }
        else{
          const formData=new FormData()
          formData.append("title",title)
          formData.append("category",category)
          formData.append("description",description)
          formData.append("image",dietImage)

          const token=sessionStorage.getItem("token")
          const reqHeader={
            "Content-Type":"multipart/form-data",
            "Authorization":`Bearer ${token}`
          }
          const result=await addDiet(formData,reqHeader)
          if(result.status==200){
            toast.success("Diet Added Successfully!!")
            setDietData({
                title:"",category:"",description:"",dietImage:""
            })
            handleClose()
            setAddDietResponse(result)
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
                <button onClick={handleShow} className='btn text-white bg-success ' >Add Diet <i className="fa-solid fa-plus ms-1 mt-1 fa-lg"></i></button>
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}

               
            >
                <Modal.Header className='text-white bg-success '  closeButton >
                    <Modal.Title >Add Diet</Modal.Title>
                </Modal.Header>
                <Modal.Body  >
                    <div>
                        <Row>
                            <Col>
                               <label >
                                <input  type="file" name="in" id="" style={{display:'none'}} onChange={(e)=>{setDietData({...dietData,dietImage:e.target.files[0]})}} />
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
                                        <Form.Control  type="text" placeholder="project title" onChange={e=>setDietData({...dietData,title:e.target.value})} />
                                    </FloatingLabel>
                                    <FloatingLabel className='mb-3' controlId="categoryinp" label="Category">
                                        <Form.Control  type="text" placeholder="Category" onChange={e=>setDietData({...dietData,category:e.target.value})} />
                                    </FloatingLabel>
                                    <FloatingLabel className='mb-3' controlId="descriptioninpo" label="Description">
                                        <Form.Control style={{width:'100%',height:'200px'}}  type="text" placeholder="Description" onChange={e=>setDietData({...dietData,description:e.target.value})} />
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
                    <Button variant="primary" className='bg-dark ' onClick={handleDiet} >Save</Button>
                </Modal.Footer>

            </Modal>
    </>
  )
}

export default AddDiet