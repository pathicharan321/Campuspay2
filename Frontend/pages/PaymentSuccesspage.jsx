import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentSuccessPage = () => {
    const location = useLocation();
    const {receiver, amount } = location.state || {};
    const sender = localStorage.getItem("name");
    const navigate = useNavigate();
    const handleGoToDashboard = () => {
        navigate('/dashboard');
    };
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
                <h1 className="text-2xl font-bold text-center text-green-600 mb-4">Payment Successful</h1>
                <p className="text-lg font-semibold">Sender:</p>
                <p className="text-gray-700 mb-4">{sender}</p>
                <p className="text-lg font-semibold">Receiver:</p>
                <p className="text-gray-700 mb-4">{receiver}</p>
                <p className="text-lg font-semibold">Amount:</p>
                <p className="text-gray-700 mb-4">₹{amount}</p>
                <div className="text-center mt-6">
                    <button 
                        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                        onClick={handleGoToDashboard}
                    >
                        Go to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PaymentSuccessPage;
