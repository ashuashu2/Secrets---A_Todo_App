import React from "react";
import { Link } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";

function NavBar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg mx-3 fs-5  ">
        <div className="container-fluid">
          <h1  className="navbar-brand mb-2 text-primary fs-1 fw-bold ">
            Secrets
          </h1>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse mt-"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item ms-3">
                <Link
                  to="/"
                  className="nav-link active fs-5"
                  aria-current="page"
                >
                  <small className="me-1 fs-5 ">
                    <FaHome />
                  </small>
                  Home
                </Link>
              </li>
              <li className="nav-item ms-3">
                <Link
                  to="/s"
                  className="nav-link active fs-5"
                  aria-current="page"
                >
                  <small className="me-1 fs-5 ">
                    <MdDelete />
                  </small>
                  Trash
                </Link>
              </li>
              <li className="nav-item ms-3">
                <Link
                  to="/s"
                  className="nav-link active fs-5"
                  aria-current="page"
                >
                  <small className="me-1 fs-5 ">
                    <RiGitRepositoryPrivateFill />
                  </small>
                  Archived
                </Link>
              </li>
            </ul>

            <Link to="/signup" className="nav-link active fs-5" aria-current="page">
              <button type="button" className="btn btn-primary">
                Signup
              </button>
            </Link>
          </div>
        </div>
      </nav>
      <hr className="border border-primary m-0" />
    </div>
  );
}

export { NavBar };
