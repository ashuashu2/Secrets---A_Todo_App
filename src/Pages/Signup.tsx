import { Link } from "react-router-dom";

function Signup() {
  return (
    <div className="mt-5  ">
            <h1 className="text-primary">Sign-up</h1>

      <div className="w-50   m-auto border  border-1  fs-5 border-primary p-4 rounded-5  text-start">
        <form className="m-auto">
          <div className="mb-2">
            <label
              htmlFor="exampleInputEmail1"
              className="form-label fw-normal"
            >
              FirstName
            </label>
            <input
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
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-2 form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Check me out
            </label>
          </div>
          <button type="submit" className="btn btn-primary my-2">
            Submit
          </button>
        </form>
        <div>
          <small className="fw-light">Alreay a member? <Link to="/login">Sign in</Link>  </small>
        </div>
      </div>
    </div>
  );
}
export { Signup };
