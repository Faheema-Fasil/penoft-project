import React from 'react'

function ForgetPassword() {
  return (
    <>
       <div
            className="d-flex flex-row justify-content-center align-items-center mt-5 pt-5 " 
            
          >
            <div
              className="w-100 p-4 " 
              style={{
                maxWidth: "500px", 
                border: "1.5px solid #a3e6cb", 
                borderRadius: "12px", 
                background: "#ffffff", 
                boxShadow: "0 8px 16px rgba(0,0,0,0.1)" 
              }}
            >
              <form
                className="w-100 p-3" 
                style={{ background: "transparent", border: "none", padding: 0 }} 
               
              >
                <h3 className="fw-bold text-dark mb-4">
                 Forget Password
                </h3>
                
                 
                <div className="mb-3 px-3">
                  <input
                    type="email" 
                    className="form-control  border-success"
                    placeholder="Enter Your Email ID"
                    required
                  />
                </div>
                <div className="mb-3 px-3">
                  <input
                    type="password"
                    className="form-control  border-success"
                    placeholder="Enter Password"
                 
                    required
                  />
                </div>

                
                
                  <button type="submit" className="btn btn-success  px-3  fw-bold "> 

                  </button>
                
              </form>
            </div>
          </div>
    </>
  )
}

export default ForgetPassword
