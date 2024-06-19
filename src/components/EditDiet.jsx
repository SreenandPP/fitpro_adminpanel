import React, { useState, useEffect,useContext } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Row, Col } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import base_url from '../services/server_url';
import { editDiet } from '../services/allApis';
import { toast } from 'react-toastify';
// import { editWorkoutResponseContext } from '../Context Api/Contextapi';


function EditDiet({ diet }) {

    // const {editWorkoutResponse,setEditWorkoutResponse}=useContext(editWorkoutResponseContext)

    console.log(diet, " from edit");
    const [dietData, setDietData] = useState({
        id: diet._id, title: diet.title, category: diet.category, description: diet.description, image:""
    })

    const [imgStatus, setImgStatus] = useState(false)
    const [preview, setPreview] = useState("")

    useEffect(() => {
        if (dietData.image.type == "image/jpg" || dietData.image.type == "image/jpeg" || dietData.image.type == "image/png" || dietData.image.type == "image/gif") {
            setImgStatus(false)
            setPreview(URL.createObjectURL(dietData.image))
        }
        else {
            setImgStatus(true)
            setPreview("")
        }
    })

    const handleUpdate = async () => {
        console.log(dietData);
        const { title, category, description } = dietData
        if (!title || !category || !description) {
            toast.warning("Invalid Inputs!!Enter Valid Input in Every Field")
        }
        else {
            const formData = new FormData()
            formData.append("title", title)
            formData.append("category", category)
            formData.append("description", description)
            preview ? formData.append("image",dietData.image) : formData.append("image", diet.image)

            const token = sessionStorage.getItem("token")
            if (preview) {
                const reqHeader = {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
                const result=await editDiet(dietData.id,formData,reqHeader)
                if(result.status==200){
                    toast.success(`Diet ${dietData.title} Updated Successfully!!`)
                    handleClose()
                    // setEditWorkoutResponse(result)
                }
                else{
                    toast.warning(result.response.data)
                }
            }
            else{
                const reqHeader = {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }

                const result=await editDiet(dietData.id,formData,reqHeader)
                if(result.status==200){
                    toast.success(`Diet ${dietData.title} Updated Successfully!!`)
                    handleClose()
                    // setEditWorkoutResponse(result)
                }
                else{
                    toast.warning(result.response.data)
                }
            }


        }
    }

    const [show, setShow] = useState(false);


    const handleClose = () => {
        setShow(false);
        setPreview("")
        setDietData({ id: diet._id, title: diet.title, category: diet.category, description: diet.description, image: "" })

    }
    const handleShow = () => setShow(true);

    return (
        <>
            <button className='btn ' onClick={handleShow} >
                <i class="fa-solid fa-pen-to-square fa-xl " style={{color:'#198754'}}></i>
            </button>


            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}


            >
                <Modal.Header className='text-white bg-success ' closeButton >
                    <Modal.Title >Edit Workout</Modal.Title>
                </Modal.Header>
                <Modal.Body  >
                    <div>
                        <Row>
                            <Col>
                                <label >
                                    <input type="file" name="in" id="" style={{ display: 'none' }} onChange={(e) => { setDietData({ ...dietData, image: e.target.files[0] }) }} />
                                    <img className='img-fluid' src={preview ? preview : `${base_url}/uploads/${diet.image}`} alt="in" />
                                </label>

                                {
                                    imgStatus &&

                                    <p className='text-danger'>Invalid file fromat!! Image should be jpg,jpeg,png or gif!!</p>
                                }


                            </Col>
                            <Col className='mb-2'>
                                <div >
                                    <FloatingLabel className='mb-3' controlId="titleinpinp" label="Title" >
                                        <Form.Control type="text" placeholder="project title" value={dietData.title} onChange={(e) => { setDietData({ ...dietData, title: e.target.value }) }} />
                                    </FloatingLabel>
                                    <FloatingLabel className='mb-3' controlId="categoryinp" label="Category">
                                        <Form.Control type="text" placeholder="Category" value={dietData.category} onChange={(e) => { setDietData({ ...dietData, category: e.target.value }) }} />
                                    </FloatingLabel>
                                    <FloatingLabel className='mb-3' controlId="descriptioninpo" label="Description">
                                        <Form.Control style={{ width: '100%', height: '200px' }} type="text" placeholder="Description" value={dietData.description} onChange={(e) => { setDietData({ ...dietData, description: e.target.value }) }} />
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
                    <Button variant="primary" className='bg-dark ' onClick={handleUpdate}  >Update</Button>
                </Modal.Footer>

            </Modal>
        </>
    )
}

export default EditDiet