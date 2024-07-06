import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";


export default function EmailVerification() {
  const { id, hash } = useParams();
  const navigate  = useNavigate();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/email/verify/${id}/${hash}`
        );
        setMessage(response.data.message);
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } catch (error) {
        console.error(error);
        setMessage("Có lỗi xảy ra. Vui lòng thử lại.");
      }
    };
    verifyEmail();
  }, [id, hash, navigate ]);
  return (
    <div>
      <p>{message}</p>
    </div>
  );
}
