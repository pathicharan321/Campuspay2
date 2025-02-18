import React, { useState } from "react";
import axios from "axios";
import config from "../config";

export const Addmoney = ({ userId }) => {
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);

    const handlePayment = async () => {
        setLoading(true);
        try {
            const { data } = await axios.post(`${config.API_URL}/user/create-razorpay-order`, {
                amount,
                userId
            },{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            const options = {
                key: process.env.REACT_APP_RAZORPAY_KEY_ID, 
                amount: data.amount * 100,
                currency: "INR",
                name: "Campus Pay",
                description: "Add Money to Wallet",
                order_id: data.orderId,
                handler: async function (response) {
                    try {
                        const verifyResponse = await axios.post("http://localhost:4000/user/verify-payment", {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            userId,
                            amount
                        });
                        
                        if (verifyResponse.data.success) {
                            alert("Payment successful! Your balance has been updated.");
                        }
                    } catch (error) {
                        alert("Payment verification failed");
                        console.error(error);
                    }
                },
                prefill: {
                    name: "User's Name",
                    email: "user@example.com",
                    contact: "9999999999"
                },
                theme: {
                    color: "#3399cc"
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error("Payment failed:", error);
            alert("Payment failed to initialize");
        } finally {
            setLoading(false);
        }
    };   

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
                <div className="text-center mb-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">
                        Add Money
                    </h2>
                    <p className="text-gray-500 text-sm">
                        Secure payments
                    </p>
                </div>

                <div className="relative mb-4">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                        ₹
                    </span>
                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Amount"
                        className="w-full px-4 py-2 rounded border border-gray-300 focus:ring focus:ring-blue-500"
                    />
                </div>

                <button
                    onClick={handlePayment}
                    disabled={loading || !amount}
                    className={`w-full py-2 rounded text-white 
                        ${loading || !amount 
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-blue-500 hover:bg-blue-600'
                        }`}
                >
                    {loading ? 'Processing...' : `Add Money (₹${amount})`}
                </button>

                <div className="mt-6 flex items-center justify-center text-gray-600 text-sm">
                    100% secure payments
                </div>
            </div>
        </div>
    )
};

