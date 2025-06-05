// ForgetPassword.jsx
import React, { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { requestPasswordReset } from '../Api/service';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if(!email){
      toast.warning("Cannot login! Please provide essential details.");
      setLoading(false);
             return;
   }if (!emailRegex.test(email)) {
           toast.error("Please enter a valid email address.");
           setLoading(false);
           return;
         }
    try {
      const response = await requestPasswordReset({ email });
      toast.success(response.data.message || "Password reset instructions sent to your email!");
      // setEmail('');
      navigate('/resetpassword', { state: { email: email } }); 
    } catch (error) {
      console.error("Forgot password request failed:", error);
      toast.error(error.response?.data?.message || "Failed to send reset email. Please try again.");
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <>

      <div
        className=" d-flex flex-row justify-content-center align-items-center  "
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
            onSubmit={handleSubmit}
          >
            <h3 className="fw-bold text-dark mb-4">
              Forget Password
            </h3>

            <div className="mb-3 px-3">
              <input
                type="text"
                className="form-control  border-success"
                placeholder="Enter Your Email ID"

                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3 text-end  px-3">
              <button
                type="submit"
                className="btn btn-success px-3 fw-bold"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Send Mail'}
              </button>
            </div>

            <div className="mb-3 text-secondary text-decoration-none px-3">
              <Link to={"/"}
                className="mb-3 text-success text-decoration-none px-3"
              >
                go back to login
              </Link>
            </div>
          </form>
        </div>
      </div>

    </>
  );
}

export default ForgetPassword;