// VerifyEmail.js

import React, { useEffect, useState } from "react";
import { useParams, useHistory, useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyEmail = () => {
  const { email } = useParams();
  const [redirect, setRedirect] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  console.log(email)
  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/email/verify/${email}`
        );
        const data = await response.json();
        if (data.status) {
          navigate("/login");
          setMessage(data.message);
          setRedirect(true);
        } else {
          setError(data.message);
        }
      } catch (error) {
        setError("Đã xảy ra lỗi khi xác thực email.");
      }
    };

    verifyEmail();
  }, [email]);

  return (
    <div>
      <h1>Xác thực Email...</h1>
      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
      {/* Có thể hiển thị một spinner hoặc thông báo xác thực */}
    </div>
  );
};

export default VerifyEmail;
