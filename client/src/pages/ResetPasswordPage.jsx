// src/pages/ResetPasswordPage.jsx
import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { confirmPasswordReset } from '../Api/service';
import Header from '../components/Header';

function ResetPasswordPage() {
    const navigate = useNavigate();
    const location = useLocation(); // To potentially get email from query params or state
    const [email, setEmail] = useState(location.state?.email || ''); // Pre-fill if email was passed from previous page
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (newPassword !== confirmPassword) {
            toast.error("New password and confirm password do not match.");
            setLoading(false);
            return;
        }

        try {

            const response = await confirmPasswordReset({ email, otp, newPassword });
            toast.success(response.data.message || "Password has been reset successfully!");
            navigate('/'); // Redirect to login page after successful reset
        } catch (error) {
            console.error("Password reset failed:", error);
            toast.error(error.response?.data?.message || "Failed to reset password. Please check your OTP and try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>

        <div className="d-flex flex-row justify-content-center align-items-center  pt-5">
            <div
                className="w-100 p-4"
                style={{
                    maxWidth: "500px",
                    border: "1.5px solid #a3e6cb",
                    borderRadius: "12px",
                    background: "#ffffff",
                    boxShadow: "0 8px 16px rgba(0,0,0,0.1)"
                }}
            >
                <form onSubmit={handleSubmit} className="w-100 p-3" style={{ background: "transparent", border: "none", padding: 0 }}>
                    <h3 className="fw-bold text-dark mb-4">Reset Password</h3>

                    <div className="mb-3 px-3">
                        <input
                            type="email"
                            className="form-control border-success"
                            placeholder="Enter Your Email ID"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={location.state?.email} // Disable if email was pre-filled
                        />
                    </div>

                    <div className="mb-3 px-3">
                        <input
                            type="text"
                            className="form-control border-success"
                            placeholder="Enter OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                    </div>

                    <div className="mb-3 px-3">
                        <input
                            type="password"
                            className="form-control border-success"
                            placeholder="Enter New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>

                    <div className="mb-3 px-3">
                        <input
                            type="password"
                            className="form-control border-success"
                            placeholder="Confirm New Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>

                    <div className="mb-3 text-end px-3">
                        <button
                            type="submit"
                            className="btn btn-success px-3 fw-bold"
                            disabled={loading}
                        >
                            {loading ? 'Resetting...' : 'Reset Password'}
                        </button>
                    </div>

                    <div className="mb-3 text-secondary text-decoration-none px-3">
                        <Link to={"/"} className="mb-3 text-success text-decoration-none px-3">
                            Go back to login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
        </>
    );
}

export default ResetPasswordPage;