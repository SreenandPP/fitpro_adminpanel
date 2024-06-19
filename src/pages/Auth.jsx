import React, { useState ,useContext} from 'react'
import { Row, Col } from 'react-bootstrap'
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { adminRegister } from '../services/allApis';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../services/allApis';
import { TokenAuthContext } from '../Context Api/AuthContext';



function Auth() {

    const {authStatus,setAuthStatus}=useContext(TokenAuthContext)
    const [status, setStatus] = useState(true)
    const changeStatus = () => {
        setStatus(!status)
    }

    const [data, setData] = useState({
        username: "", email: "", password: ""
    })
    const navigate=useNavigate()


    const handleRegitser =async () => {
        const { username, email, password } = data
        if (!username || !email || !password) {
            toast.warning("Invalid Details!!...Enter Form Details Properly");
        }
        else{
            const result=await adminRegister(data)

            if(result.status==201){
                setStatus(true)
                toast.success("Registration Successfully Completed")
            }
            else{
                toast.error(result.response.data)
            }
        }
    }


    const handleLogin=async()=>{
        const {email,password}=data

        if(!email || !password){
            toast.warning("Invalid Details!!...Enter Form Details Properly");
        }
        else{
            const result=await adminLogin({email,password})
            console.log(result);
            sessionStorage.setItem('token',result.data.token)
            sessionStorage.setItem('username',result.data.user)

            toast.success("Login SuccessFull")
            navigate('/dash')
            setAuthStatus(true)
        }
    }

    return (
        <>
            <div className='d-flex justify-content-center align-items-center w-100' style={{ height: '100vh' }}>
                <div className='shadow  w-50 p-4' style={{ borderRadius: '10px' }}>
                    <Row>
                        <Col sm={12} md={6}>

                            <img className='img-fluid mt-5 ms-5' src="https://pngimg.com/uploads/fitness/small/fitness_PNG192.png" alt="" />
                        </Col>
                        <Col sm={12} md={6}>
                            {status ?
                                <h3 style={{ color: 'var(--dark-red' }} >Login</h3>
                                :
                                <h3 style={{ color: 'var(--dark-red' }} >Register</h3>

                            }





                            <div className='mt-4'>

                                {!status &&
                                    <FloatingLabel className='mb-3' controlId="user" label="Username">
                                        <Form.Control type="text" placeholder="username"  onChange={(e)=>{setData({...data,username:e.target.value})}} />
                                    </FloatingLabel>

                                }



                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Email address"
                                    className="mb-3"
                                >
                                    <Form.Control type="email" placeholder="name@example.com" onChange={(e)=>{setData({...data,email:e.target.value})}}/>
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingPassword" label="Password">
                                    <Form.Control type="password" placeholder="Password" onChange={(e)=>{setData({...data,password:e.target.value})}} />
                                </FloatingLabel>
                            </div>
                            <div className='mt-3 d-flex justify-content-between'>

                                {status ?
                                    <button onClick={handleLogin}  className='btn rounded' style={{ backgroundColor: 'var(--dark-red)', color: 'white', textDecoration: 'none', fontWeight: '200' }} >

                                        <span >Login</span>

                                    </button>

                                    :

                                    <button onClick={handleRegitser} className='btn rounded' style={{ backgroundColor: 'var(--dark-red)', color: 'white', textDecoration: 'none', fontWeight: '200' }}  >

                                        <span >Register</span>

                                    </button>

                                }





                                <button className='btn btn-link' style={{ color: 'white', textDecoration: 'none', fontWeight: '200' }} onClick={changeStatus}  >
                                    {status ?
                                        <span><b>Are You New?</b></span>

                                        :

                                        <span><b>Already A User?</b></span>

                                    }





                                </button>
                            </div>
                        </Col>
                    </Row>
                </div>

            </div>

        </>
    )
}

export default Auth