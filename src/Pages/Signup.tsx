import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import { ChangeHandlerType, SignupFormType } from "../types/types";
import { toast } from "react-toastify";

function Signup() {
  const navigate = useNavigate();

  const [signupData, setSignupData] = useState<SignupFormType>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const onChangeHandler: ChangeHandlerType<SignupFormType> = (e, setState) =>
    setState({
      ...signupData,
      [e.target.name]: e.target.value,
    });

  async function formSubmitHandler(e: FormEvent, data: SignupFormType) {
    e.preventDefault();
    try {
      if (
        signupData.email.length >= 1 &&
        signupData.password.length >= 1 &&
        signupData.firstName.length >= 1 &&
        signupData.lastName.length >= 1
      ) {
        const response = await axios.post(
          "https://secrets-a-todo-app.vercel.app/api/user/signup",
          data
        );
        localStorage.setItem("token", response.data.token);
        setSignupData({
          email: "",
          password: "",
          firstName: "",
          lastName: "",
        });
        if (response.data.success === "new user created") {
          navigate("/login");
          toast.success("signup successFull");
        }else{
          toast.info("user already exists")
        }
      } else {
        toast.info("please fill all the credentials");
      }
    } catch (error) {
      console.log(error);
      toast.error("user-id already exists");
    }
  }

  return (
    <div className="mt-5  ">
      <h1 className="text-primary">Sign-up</h1>

      <div className="w-50   m-auto border  border-1  fs-5 border-primary p-4 rounded-5  text-start">
        <form
          className="m-auto"
          onSubmit={(e) => formSubmitHandler(e, signupData)}
        >
          <div className="mb-2">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label fw-normal"
            >
              FirstName
            </label>
            <input
              value={signupData.firstName}
              onChange={(e) => onChangeHandler(e, setSignupData)}
              name="firstName"
              placeholder="Enter your firstname here "
              type="text"
              className="form-control"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label fw-normal"
            >
              LastName
            </label>
            <input
              value={signupData.lastName}
              onChange={(e) => onChangeHandler(e, setSignupData)}
              name="lastName"
              placeholder="Enter your lastname here "
              type="text"
              className="form-control"
            />
          </div>
          <div className="mb-2">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label fw-normal"
            >
              Email address
            </label>
            <input
              value={signupData.email}
              onChange={(e) => onChangeHandler(e, setSignupData)}
              name="email"
              placeholder="Enter your email-id here "
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text fw-light">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-2">
            <label
              htmlFor="exampleInputPassword1"
              className="form-label fw-normal"
            >
              Password
            </label>
            <input
              value={signupData.password}
              onChange={(e) => onChangeHandler(e, setSignupData)}
              name="password"
              placeholder="Enter your password here "
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>

          <button type="submit" className="btn btn-primary my-2">
            Submit
          </button>
        </form>
        <div>
          <small className="fw-light">
            Alreay a member? <Link to="/login">Sign in</Link>{" "}
          </small>
        </div>
      </div>
    </div>
  );
}
export { Signup };
