import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useState } from "react";
import { ChangeHandlerType, LoginFormType } from "../types/types";
import { useAuth } from "../context/authContext";
import { toast } from "react-toastify";

function Login() {
  const { setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [loginData, setLoginData] = useState<LoginFormType>({
    email: "",
    password: "",
  });

  const onChangeHandler: ChangeHandlerType<LoginFormType> = (e, setState) =>
    setState({
      ...loginData,
      [e.target.name]: e.target.value,
    });

  async function loginHandler(e: FormEvent, data: LoginFormType) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (token !== "undefined") {
      try {
        if (loginData.email.length >= 1 && loginData.password.length >= 1) {
          const response = await axios.post(
            "https://secrets-a-todo-app.vercel.app/api/user/login",
            data,
            {
              headers: {
                authorization: token,
              },
            }
          );
          if (response.data.success === true) {
            setIsLoggedIn(true);
            navigate("/");
            toast.success("login successFull");
          } else {
            toast.info("User is not registered");
          }
        } else {
          toast.info("please fill all the credentials");
        }
      } catch (error) {
        console.log(error);
        toast.info("User is not registered");
      }
    } else {
      toast.error("please singup first with another email ");
    }
  }

  return (
    <div className="mt-5  ">
      <h1 className="text-primary">Log-in</h1>
      <div className="w-50   m-auto border  border-1  fs-5 border-primary p-4 rounded-5  text-start">
        <form className="m-auto" onSubmit={(e) => loginHandler(e, loginData)}>
          <div className="mb-2">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label fw-normal"
            >
              Email address
            </label>
            <input
              onChange={(e) => onChangeHandler(e, setLoginData)}
              name="email"
              placeholder="Enter your email-id here"
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
              onChange={(e) => onChangeHandler(e, setLoginData)}
              name="password"
              placeholder="Enter your password here"
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>

          <button type="submit" className="btn btn-primary  my-2">
            Submit
          </button>
        </form>
        <div>
          <small className="fw-light">
            Not a member? <Link to="/signup">Sign up</Link>{" "}
          </small>
        </div>
      </div>
    </div>
  );
}
export { Login };
