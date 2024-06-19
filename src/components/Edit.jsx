import React, { useState, useEffect,useContext } from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { Row, Col } from 'react-bootstrap';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import base_url from '../services/server_url';
import { editWorkout } from '../services/allApis';
import { toast } from 'react-toastify';
import { editWorkoutResponseContext } from '../Context Api/Contextapi';


function Edit({ workout }) {

    const {editWorkoutResponse,setEditWorkoutResponse}=useContext(editWorkoutResponseContext)

    console.log(workout, " from edit");
    const [workoutData, setWorkoutData] = useState({
        id: workout._id, title: workout.title, category: workout.category, description: workout.description, image: ""
    })

    const [imgStatus, setImgStatus] = useState(false)
    const [preview, setPreview] = useState("")

    useEffect(() => {
        if (workoutData.image.type == "image/jpg" || workoutData.image.type == "image/jpeg" || workoutData.image.type == "image/png" || workoutData.image.type == "image/gif") {
            setImgStatus(false)
            setPreview(URL.createObjectURL(workoutData.image))
        }
        else {
            setImgStatus(true)
            setPreview("")
        }
    })

    const handleUpdate = async () => {
        console.log(workoutData);
        const { title, category, description } = workoutData
        if (!title || !category || !description) {
            toast.warning("Invalid Inputs!!Enter Valid Input in Every Field")
        }
        else {
            const formData = new FormData()
            formData.append("title", title)
            formData.append("category", category)
            formData.append("description", description)
            preview ? formData.append("image",workoutData.image) : formData.append("image", workout.image)

            const token = sessionStorage.getItem("token")
            if (preview) {
                const reqHeader = {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`
                }
                const result=await editWorkout(workoutData.id,formData,reqHeader)
                if(result.status==200){
                    toast.success(`Workout ${workoutData.title} Updated Successfully!!`)
                    handleClose()
                    setEditWorkoutResponse(result)
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

                const result=await editWorkout(workoutData.id,formData,reqHeader)
                if(result.status==200){
                    toast.success(`Workout ${workoutData.title} Updated Successfully!!`)
                    handleClose()
                    setEditWorkoutResponse(result)
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
        setWorkoutData({ id: workout._id, title: workout.title, category: workout.category, description: workout.description, image: "" })

    }
    const handleShow = () => setShow(true);

    return (
        <>
            <button className='btn ' onClick={handleShow} >
                <i class="fa-solid fa-pen-to-square fa-xl" style={{ color: '#ff2332' }}></i>
            </button>


            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}


            >
                <Modal.Header className='text-white ' closeButton style={{ backgroundColor: '#ff2332' }}>
                    <Modal.Title >Edit Workout</Modal.Title>
                </Modal.Header>
                <Modal.Body  >
                    <div>
                        <Row>
                            <Col>
                                <label >
                                    <input type="file" name="in" id="" style={{ display: 'none' }} onChange={(e) => { setWorkoutData({ ...workoutData, image: e.target.files[0] }) }} />
                                    <img className='img-fluid' src={preview ? preview : `${base_url}/uploads/${workout.image}`} alt="in" />
                                </label>

                                {
                                    imgStatus &&

                                    <p className='text-danger'>Invalid file fromat!! Image should be jpg,jpeg,png or gif!!</p>
                                }


                            </Col>
                            <Col className='mb-2'>
                                <div >
                                    <FloatingLabel className='mb-3' controlId="titleinpinp" label="Title" >
                                        <Form.Control type="text" placeholder="project title" value={workoutData.title} onChange={(e) => { setWorkoutData({ ...workoutData, title: e.target.value }) }} />
                                    </FloatingLabel>
                                    <FloatingLabel className='mb-3' controlId="categoryinp" label="Category">
                                        <Form.Control type="text" placeholder="Category" value={workoutData.category} onChange={(e) => { setWorkoutData({ ...workoutData, category: e.target.value }) }} />
                                    </FloatingLabel>
                                    <FloatingLabel className='mb-3' controlId="descriptioninpo" label="Description">
                                        <Form.Control style={{ width: '100%', height: '200px' }} type="text" placeholder="Description" value={workoutData.description} onChange={(e) => { setWorkoutData({ ...workoutData, description: e.target.value }) }} />
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

export default Edit