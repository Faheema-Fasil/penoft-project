import React, { useState } from 'react';
import { FaCaretDown } from "react-icons/fa";
import { MDBCheckbox } from 'mdb-react-ui-kit';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../reactContext/AuthContext';
function LoginForm() {
  const [checked, setChecked] = useState(false);
  const[email,setEmail]=useState("")
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleLogin=(e)=>{
    e.preventDefault();
    if (!email||!password) {
      alert("cannot login! please provide essential details")
      
    }else{

      login(email,password);
      navigate('/myprofile')
    }
  }
   return (
    <div>
      <div className='mx-5'>
        <div className=' custom-border bg-primary-subtle justify-content-center p-4  mx-5 my-3'>

          <div className='p-4 mx-5 d-flex justify-content-center'>
            <div  className='  custom-border bg-light p-3   mx-5 '>
              <h4 className='mb-4 fw-bold text-dark'>Admin Login</h4>
              <div class="form-floating  mb-3">
                <input type="email" className="border-success form-control" id="floatingInput" placeholder="" onChange={(e)=>setEmail(e.target.value)} required />
                <label for="floatingInput" className='text-dark'>Enter Email ID/username</label>
              </div>
              <div class="form-floating mb-3">
                <input type="password" className="border-success form-control" id="floatingInput1" placeholder="" onChange={(e)=>setPassword(e.target.value)} required />
                <label for="floatingInput1" className='text-dark'>Enter Password</label>
              </div>

              <div className="dropdown">
                <button
                  className="btn border-success form-control "
                  type="button"
                  id="dropdownMenuButton"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <div className='d-flex align-items-center justify-content-between p-2'>

                    <label for="dropdownMenuButton" className='text-dark'> Choose Category (Admin, Super Admin, etc)</label>
                    <FaCaretDown className='text-success' />
                  </div>
                </button>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                  <a className="dropdown-item" href="#">Admin</a>
                  <a className="dropdown-item" href="#">Super Admin</a>
                  <a className="dropdown-item" href="#">Something else </a>
                </div>
              </div>

              <div className='d-flex align-items-center justify-content-between mt-3'>
                <div className=''>
                  <MDBCheckbox
                    id='controlledCheckbox'
                    label='Remember Me'
                    checked={checked}
                    onChange={() => setChecked(!checked)}
                  />
                </div>
                <div>
                  <p style={{color:"red"}}>
                  Forgot Password?
                  </p>
                </div>
              </div>
              <button onClick={handleLogin} type="button" style={{backgroundColor:"green"}} class="btn w-100 mt-4 border border-1 border-dark">
                 <Link to="/" className='text-light text-decoration-none fs-5 '>Login</Link> </button>



            </div>
          </div>





        </div>
      </div>
    </div>
  )
}

export default LoginForm
