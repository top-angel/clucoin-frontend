import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { AUTH_URI } from "../constants";
import { useUser } from "../stores/useUser";
import Button from "./Button";

const VerifyEmail = () => {
  const token = useUser((s) => s.token);
  const [loading, setLoading] = useState(false);

  return (
    <div className="verify">
      <div>
        <p>Email not verified</p>
        <Button
          loading={loading}
          onClick={() => {
            setLoading(true);
            toast
              .promise(
                axios.get(AUTH_URI + "/v1/users/@me/email/code", {
                  headers: { Authorization: token },
                }),
                {
                  loading: "Resending email",
                  success: "New Email Sent",
                  error: "Couldn't Resend email",
                }
              )
              .catch()
              .then(() => setLoading(false));
          }}
        >
          Resend Email
        </Button>
      </div>
    </div>
  );
};

export default VerifyEmail;
