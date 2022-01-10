import React from "react";
import axios from "axios";
import * as yup from "yup";
import { Formik } from "formik";
import { useWeb3React } from "@web3-react/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import { AUTH_URI } from "../constants";
import { useUser } from "../stores/useUser";
import { useDialog } from "../stores/useDialog";

interface Props {
  message: string;
  signature: string;
}

const SignUpModal = ({ message, signature }: Props) => {
  const { account } = useWeb3React();
  const [, setCookie] = useCookies();
  const fetchUser = useUser((s) => s.fetchUser);
  const updateToken = useUser((s) => s.updateToken);

  const setDialog = useDialog((s) => s.setDialog);

  return (
    <Formik
      initialValues={{
        username: "",
        email: null,
        allow_emails: false,
        acceptTOS: false,
      }}
      validationSchema={yup.object({
        username: yup.string().required("Username is required"),
        allow_emails: yup.boolean().default(false),
        email: yup.string().optional().nullable(),
        acceptTOS: yup
          .boolean()
          .isTrue("You should accept TOS and Privacy Policy before signing up")
          .required(),
      })}
      onSubmit={({ username, email, allow_emails }) => {
        toast.promise(
          axios
            .post<{ token: string }>(AUTH_URI + "/v1/connect", {
              email,
              username,
              signature,
              allow_emails,
              msg: message,
              address: account,
            })
            .then((res) => {
              setCookie("token", res.data.token, {
                path: "/",
                sameSite: "lax",
              });
              updateToken(res.data.token);
              fetchUser();
              setDialog(null);
            }),
          {
            loading: "Registering account",
            success: "Registration succeeded",
            error: (e) => {
              if (e.response?.status == 409) {
                return "A user with that username or email already exists";
              }
              return "Something unexpected happened";
            },
          }
        );
      }}
    >
      {({ handleChange, handleSubmit, errors }) => (
        <div id="connect" className="modal-window">
          <div>
            <button
              title="Close"
              className="modal-close"
              onClick={() => setDialog(null)}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <h1 className="modal-title">
              Just one more step to get you started!
            </h1>
            <form onSubmit={handleSubmit}>
              <div className="modal-input-box">
                <div
                  className={`modal-username${
                    errors.username ? " ErrorInputActive" : ""
                  }`}
                >
                  <p>Username</p>
                  <input
                    type="text"
                    name="username"
                    className="modal-input"
                    placeholder="(required)"
                    onChange={handleChange}
                  />
                  {errors.username ? (
                    <span className="ErrorInput">{errors.username}</span>
                  ) : null}
                </div>
                <div
                  className={`modal-email${
                    errors.email ? " ErrorInputActive" : ""
                  }`}
                >
                  <p>Email</p>
                  <input
                    type="email"
                    name="email"
                    className="modal-input"
                    placeholder="(optional)"
                    onChange={handleChange}
                  />
                  {errors.email ? (
                    <span className="ErrorInput">{errors.email}</span>
                  ) : null}
                </div>
                <div className="modal-newsletter">
                  <p className="NewsLetterTitle">Receive Newsletter?</p>
                  <label className="label toggle">
                    <input
                      type="checkbox"
                      name="allow_emails"
                      onChange={handleChange}
                      className="toggle_input"
                    />
                    <div className="toggle-control"></div>
                  </label>
                </div>
                <div className="modal-term">
                  <label className="terms-checkbox">
                    <input
                      type="checkbox"
                      name="acceptTOS"
                      onChange={handleChange}
                    />
                    <svg viewBox="0 0 21 18">
                      <symbol
                        id="tick-path"
                        viewBox="0 0 21 18"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M5.22003 7.26C5.72003 7.76 7.57 9.7 8.67 11.45C12.2 6.05 15.65 3.5 19.19 1.69"
                          fill="none"
                          strokeWidth="2.25"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </symbol>
                      <defs>
                        <mask id="tick">
                          <use className="tick mask" href="#tick-path" />
                        </mask>
                      </defs>
                      <use
                        className="tick"
                        href="#tick-path"
                        stroke="currentColor"
                      />
                      <path
                        fill="white"
                        mask="url(#tick)"
                        d="M18 9C18 10.4464 17.9036 11.8929 17.7589 13.1464C17.5179 15.6054 15.6054 17.5179 13.1625 17.7589C11.8929 17.9036 10.4464 18 9 18C7.55357 18 6.10714 17.9036 4.85357 17.7589C2.39464 17.5179 0.498214 15.6054 0.241071 13.1464C0.0964286 11.8929 0 10.4464 0 9C0 7.55357 0.0964286 6.10714 0.241071 4.8375C0.498214 2.39464 2.39464 0.482143 4.85357 0.241071C6.10714 0.0964286 7.55357 0 9 0C10.4464 0 11.8929 0.0964286 13.1625 0.241071C15.6054 0.482143 17.5179 2.39464 17.7589 4.8375C17.9036 6.10714 18 7.55357 18 9Z"
                      />
                    </svg>
                    <svg className="lines" viewBox="0 0 11 11">
                      <path d="M5.88086 5.89441L9.53504 4.26746" />
                      <path d="M5.5274 8.78838L9.45391 9.55161" />
                      <path d="M3.49371 4.22065L5.55387 0.79198" />
                    </svg>
                  </label>
                  <p>
                    I have read and agree with the{" "}
                    <Link href="/terms">terms and conditions</Link> and{" "}
                    <Link href="/privacy">privacy policy.</Link>
                  </p>
                </div>
                <div className="modal-save">
                  <button type="submit">Save</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default SignUpModal;
