import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Alert, Button, Col, Form, Row, Tab, Tabs } from "react-bootstrap";

import instance from "../utils/api";
import { URLS } from "../constants";
import { setToken } from "../utils/session";
import { setUser } from "../slices/authSlice";

const Login = () => {
  const [key, setKey] = useState("login");
  return (
    <div className="container w-50">
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3 "
      >
        <Tab eventKey="login" title="Login">
          <LoginForm />
        </Tab>
        <Tab eventKey="signup" title="Sign Up">
          <SignUpForm />
        </Tab>
      </Tabs>
    </div>
  );
};

const SignUpForm = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [payload, setPayload] = useState({ name: "", email: "", password: "" });
  const [validated, setValidated] = useState(false);
  const [isRegistrationSuccessful, setRegistrationSuccess] = useState(false);

  const checkFormValidity = (event) => {
    const form = event.currentTarget;
    const doesPwMatch =
      document.getElementById("cpass").value !==
      document.getElementById("pass").value;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(false);
    } else if (doesPwMatch) {
      setValidated(false);
    } else {
      setValidated(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await instance.post(`${URLS.AUTH}/register`, payload);

      if (data.msg === "success") {
        setMsg("Registration Successfull");
        setRegistrationSuccess(true);
      }
    } catch (e) {
      const errMsg = e?.response ? e.response.data.msg : "Something went wrong";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {isRegistrationSuccessful ? (
        <Verify
          email={payload?.email}
          resetPayload={setPayload}
          toggleRegistration={setRegistrationSuccess}
          resetFormValidation={setValidated}
        />
      ) : (
        <Form
          className="d-grid gap-2"
          noValidate
          validated={validated}
          onSubmit={(e) => handleSubmit(e)}
          onChange={checkFormValidity}
        >
          <Form.Group as={Col} md="12" className="mb-3">
            <Form.Label>Full name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Full name"
              value={payload?.name}
              onChange={(e) => {
                setPayload((prev) => {
                  return { ...prev, name: e.target.value };
                });
              }}
            />
          </Form.Group>
          <Form.Group as={Col} md="12" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Your Valid Email"
              value={payload?.email}
              onChange={(e) => {
                setPayload((prev) => {
                  return { ...prev, email: e.target.value };
                });
              }}
            />
          </Form.Group>
          <Row className="mb-3">
            <Form.Group as={Col} md="6">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                id="pass"
                type="password"
                placeholder="Password"
                value={payload?.password}
                onChange={(e) => {
                  setPayload((prev) => {
                    return { ...prev, password: e.target.value };
                  });
                }}
              />
              <Form.Control.Feedback>Password Match!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                required
                id="cpass"
                type="password"
                placeholder="Confirm Password"
              />
              <Form.Control.Feedback>Password Match!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Button type="submit" size="lg">
            Register
          </Button>
        </Form>
      )}
    </>
  );
};

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [signIn, setSignIn] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      if (!signIn?.email || !signIn?.password) return;
      const { data } = await instance.post(`${URLS.AUTH}/login`, signIn);
      const { user, token } = data.data;
      dispatch(setUser(user));
      setToken(token);
      // set the user state
      navigate("/admin/dashboard");
    } catch (e) {
      console.log(e);
      const errMsg = e?.response ? e.response.data.msg : "Something went wrong";
      setError(errMsg);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setError("");
      }, 3000);
      setSignIn({ email: "", password: "" });
    }
  };

  return (
    <Form
      className="d-grid gap-2"
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={signIn?.email}
          onChange={(e) => {
            setSignIn((prev) => {
              return { ...prev, email: e.target.value };
            });
          }}
        />
        <Form.Text className="text-muted">
          We&apos;ll never share your email with anyone else.
        </Form.Text>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          value={signIn?.password}
          onChange={(e) => {
            setSignIn((prev) => {
              return { ...prev, password: e.target.value };
            });
          }}
        />
      </Form.Group>
      {error ? <Alert variant="danger">{error}</Alert> : null}
      <Button
        variant="primary"
        type="submit"
        size="lg"
        disabled={loading ? true : false}
      >
        Login
      </Button>
    </Form>
  );
};

const Verify = ({
  email,
  toggleRegistration,
  resetPayload,
  resetFormValidation,
}) => {
  const [verify, setVerify] = useState({ email: email, token: "" });
  const handleTokenSubmission = async (e) => {
    e.preventDefault();
    console.log({ verify });
    const { data } = await instance.post(`${URLS.AUTH}/verify`, verify);
    if (data.msg === "success") {
      toggleRegistration(false);
      resetPayload({ name: "", email: "", password: "" });
      resetFormValidation(false);
    }
  };
  const handleResendToken = async (e) => {
    e.preventDefault();
    const { data } = await instance.post(`${URLS.AUTH}/regenerate`, {
      email: verify?.email,
    });
    console.log("ResendToken", data);
  };
  return (
    <>
      <Form className="d-grid gap-2">
        <Form.Text className="text-muted text-center">
          Check your email for Token
        </Form.Text>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            disabled
            value={email}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="text"
            placeholder="Token"
            value={verify?.token}
            onChange={(e) => {
              setVerify((prev) => {
                return { ...prev, token: e.target.value };
              });
            }}
          />
          <div className="flex d-flex justify-content-between">
            <Form.Text className="text-muted">
              <button
                className="btn btn-link text-decoration-none"
                onClick={(e) => {
                  handleResendToken(e);
                }}
              >
                Regenerate Token
              </button>
            </Form.Text>
          </div>
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          size="lg"
          onClick={(e) => {
            handleTokenSubmission(e);
          }}
        >
          Verify Email
        </Button>
      </Form>
    </>
  );
};

export default Login;