import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useFormData } from "../../hooks/formData";
import { getUserStart, loginUserStart } from "../../redux/action/user.action";

function Login() {
  const users = useSelector((state) => state.user.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const [handleChange, formData,  ,  ,  ] =
    useFormData({
      name: "",
      email: "",
      password: "",
    });
  const { email, password } = formData;
  const submit = (event) => {
    event.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then((userCredential) => {
        const currentUser = users.find((user) => {
          return user.uid === userCredential.user.uid;
        });
        if (currentUser) {
          dispatch(loginUserStart(currentUser));
          setTimeout(() => {
            navigate("/admin/dashboard");
          }, 800);
        } else {
          setErr("User not Found");
        }
      })
      .catch((errr) => {
        setErr(errr.message);
      });
  };
  useEffect(() => {
    dispatch(getUserStart());
  }, [users.length]);

  return (
    <>
      <div className="container-fluid page-header py-5">
        <h1 className="text-center text-white display-6">Login Page</h1>
        {/* <ul className="breadcrumb justify-content-center mb-0">
                <li className="breadcrumb-item"><Link to="/login">Login</Link></li>
            </ul> */}
      </div>
      <div className="container-fluid ">
        <div className="row justify-content-center ">
          <div className="col-lg-6 mt-5 ">
            <div className="card text-white bg-primary">
              <h2 className="card-title text-white mt-3" align="center">
                Login
              </h2>
              <p className="card-text" align="center">
                {" "}
                Please Login if you want Access our Webiste
              </p>
              <hr className="border position-relative" />
              <div className="card-body">
                <form
                  onSubmit={submit}
                  className="row g-3 needs-validation"
                  action=""
                  method="post"
                >
                  {err && (
                    <p className="text-center text-danger fw-bold">{err}</p>
                  )}

                  <label htmlFor="enteremail" className="form-label">
                    Email
                  </label>
                  <div className="input-group has-validation ">
                    <input
                      type="email"
                      onChange={handleChange}
                      value={email}
                      className="form-control rounded-pill "
                      name="email"
                      id="enteremail"
                      aria-describedby="inputGroupPrepend"
                      required
                    />
                    <div className="invalid-feedback">
                      Please Enter Valid Email.
                    </div>
                  </div>

                  <label htmlFor="password1" className="form-label">
                    Password
                  </label>
                  <div className="input-group has-validation">
                    <input
                      type="password"
                      value={password}
                      className="form-control col-4 rounded-pill"
                      name="password"
                      onChange={handleChange}
                      id="password1"
                      aria-describedby="inputGroupPrepend"
                      required
                    />
                    <div className="invalid-feedback">Enter Password</div>
                  </div>
                  {/* <div className="col-6">
              <div className="form-check">
                <input className="form-check-input" name="remeberme" type="checkbox" value="" id="invalidCheck"/>
                <label className="form-check-label" htmlFor="invalidCheck">
                  Remember Me
                </label>
                
              </div>
            </div> */}

                  {/* <div className="col-6" align="right">
              <a href="recover_email.php">Forgot Password</a>
            </div> */}

                  <div className="col-md-12 text-center">
                    <button
                      className="btn bg-white text-dark col-6"
                      title="Submit Your Form"
                      aria-label="Left Align"
                      name="log_user"
                      type="submit"
                    >
                      {" "}
                      <span
                        className="fa fa-user mx-2"
                        aria-hidden="true"
                      ></span>
                      Login
                    </button>
                  </div>
                  <span className="extra-line text-center">
                    <span>Don't have an account ?</span>

                    <Link className="mx-2 text-dark" to="/register">
                      Register here
                    </Link>
                  </span>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
