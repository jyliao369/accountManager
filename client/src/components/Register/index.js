import React from "react";
import $ from "jquery";
import { useState } from "react";
import Axios from "axios";

import { securityQuestion, months } from "../data";

const Register = ({
  setCurrentUser,
  currentUser,
  setIsLoggedIn,
  isLoggedIn,
  logToReg,
  setCurrentPage,
  currentPage,
}) => {
  const [newUser, setNewUser] = useState({});
  const [registerConfirm, setRegisterConfirm] = useState(true);
  let securityQuestions = securityQuestion;

  const register = (event) => {
    $("#regBtn").children().fadeOut();
    $("#regBtn").animate(
      {
        width: "3em",
      },
      500,
      function () {
        $("#regBtn").prop("disabled", true);
        $("#regBtn").css({
          borderColor: "rgb(52, 152, 219) lightgray lightgray",
          animation: "spin .4s linear infinite",
        });
      }
    );

    Axios.post(`http://localhost:3001/register`, {
      newUser: newUser,
    }).then((response) => {
      setIsLoggedIn("true");
      setCurrentPage("#profilePage");
      setCurrentUser(response.data[0]);

      setTimeout(() => {
        $("#regForm").animate(
          {
            left: "-100%",
          },
          500,
          function () {
            $("#regBtn").css({
              animation: "",
              borderColor: "",
            });
            $("#regBtn").animate({
              width: "50%",
            });
            $("#regForm").css("display", "none");
            $("#regBtn").children().fadeIn();
            $("#profilePage")
              .css({ display: "flex", left: "18px" })
              .hide()
              .fadeIn(750);
            $("#navigation").css({
              bottom: "-45px",
              display: "flex",
            });
            setRegisterConfirm(true);
            setTimeout(() => {
              $("#navigation").animate({
                bottom: "-1",
              });
            });

            setNewUser({
              dobDay: "",
              dobMonth: "",
              dobYear: "",
              email: "",
              firstName: "",
              lastName: "",
              password: "",
              phoneNum: "",
              rePassword: "",
              secAnsOne: "",
              secAnsThree: "",
              secAnsTwo: "",
              secQuesOne: "",
              secQuesThree: "",
              secQuesTwo: "",
              username: "",
            });

            $("#regConfirm").prop("checked", false);
          }
        );
      }, 2500);
    });
  };

  const confirmReg = () => {
    if (document.getElementById("regConfirm").checked) {
      setRegisterConfirm(false);
    } else {
      setRegisterConfirm(true);
    }
  };

  return (
    <>
      <div className="regForm" id="regForm">
        <div className="regFormMain" id="regFormMain">
          <div className="regFormPart">
            <div className="regFormPartName">
              <h2>Sign Up: Name</h2>
            </div>
            <div className="regFormMainCont">
              <div className="regFormInput">
                <label>First Name</label>
                <input
                  value={newUser.firstName}
                  onChange={(e) =>
                    setNewUser({ ...newUser, firstName: e.target.value })
                  }
                  placeholder="First Name"
                  id="regFormInputMain"
                />
              </div>
              <div className="regFormInput">
                <label>Last Name</label>
                <input
                  value={newUser.lastName}
                  onChange={(e) =>
                    setNewUser({ ...newUser, lastName: e.target.value })
                  }
                  placeholder="Last Name"
                  id="regFormInputMain"
                />
              </div>
            </div>
          </div>

          <div className="regFormPart">
            <div className="regFormPartName">
              <h3>Sign Up: Contact Info</h3>
            </div>
            <div className="regFormMainCont">
              <div className="dateSection" id="dateSection">
                <div>
                  <label>Month</label>
                  <select
                    value={newUser.dobMonth}
                    onChange={(e) =>
                      setNewUser({ ...newUser, dobMonth: e.target.value })
                    }
                    id="regFormInputMain"
                  >
                    <option>Month</option>
                    {months.map((month) => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label>Day</label>
                  <input
                    value={newUser.dobDay}
                    onChange={(e) =>
                      setNewUser({ ...newUser, dobDay: e.target.value })
                    }
                    placeholder="00"
                    id="regFormInputMain"
                  />
                </div>
                <div>
                  <label>Year</label>
                  <input
                    value={newUser.dobYear}
                    onChange={(e) =>
                      setNewUser({ ...newUser, dobYear: e.target.value })
                    }
                    placeholder="2023"
                    id="regFormInputMain"
                  />
                </div>
              </div>
              <div className="regFormInput">
                <label>Phone Number</label>
                <input
                  value={newUser.phoneNum}
                  onChange={(e) =>
                    setNewUser({ ...newUser, phoneNum: e.target.value })
                  }
                  placeholder="111-222-3333"
                  id="regFormInputMain"
                />
              </div>
              <div className="regFormInput">
                <label>Email</label>
                <input
                  value={newUser.email}
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                  placeholder="E-mail"
                  id="regFormInputMain"
                />
              </div>
            </div>
          </div>

          <div className="regFormPart">
            <div className="regFormPartName">
              <h3>Sign Up: Account Info</h3>
            </div>
            <div className="regFormMainCont">
              <div className="regFormInput">
                <label>Username</label>
                <input
                  value={newUser.username}
                  onChange={(e) =>
                    setNewUser({ ...newUser, username: e.target.value })
                  }
                  placeholder="Username"
                  id="regFormInputMain"
                />
              </div>
              <div className="regFormInput">
                <label>Password</label>
                <input
                  value={newUser.password}
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                  placeholder="Password"
                  id="regFormInputMain"
                  type="password"
                />
              </div>
              <div className="regFormInput">
                <label>Re-Type Password</label>
                <input
                  value={newUser.rePassword}
                  onChange={(e) =>
                    setNewUser({ ...newUser, rePassword: e.target.value })
                  }
                  placeholder="Re-Type Password"
                  id="regFormInputMain"
                  type="password"
                />
              </div>
            </div>
          </div>

          <div className="regFormPart">
            <div className="regFormPartName">
              <h3>Sign Up: Security</h3>
            </div>
            <div className="regFormMainCont">
              <div className="regFormInput">
                <label>Security Question 1:</label>
                <select
                  value={newUser.secQuesOne}
                  onChange={(e) =>
                    setNewUser({ ...newUser, secQuesOne: e.target.value })
                  }
                  id="regFormInputMain"
                >
                  <option>Security Question 1</option>
                  {securityQuestions.map((question) => (
                    <option key={question} value={question}>
                      {question}
                    </option>
                  ))}
                </select>
              </div>
              <div className="regFormInput">
                <label>Answer 1:</label>
                <input
                  value={newUser.secAnsOne}
                  onChange={(e) =>
                    setNewUser({ ...newUser, secAnsOne: e.target.value })
                  }
                  placeholder="Answer"
                  id="regFormInputMain"
                />
              </div>
              <div className="regFormInput">
                <label>Security Question 2:</label>
                <select
                  value={newUser.secQuesTwo}
                  onChange={(e) =>
                    setNewUser({ ...newUser, secQuesTwo: e.target.value })
                  }
                  id="regFormInputMain"
                >
                  <option>Security Question 2</option>
                  {securityQuestions.map((question) => (
                    <option key={question} value={question}>
                      {question}
                    </option>
                  ))}
                </select>
              </div>
              <div className="regFormInput">
                <label>Answer 2:</label>
                <input
                  value={newUser.secAnsTwo}
                  onChange={(e) =>
                    setNewUser({ ...newUser, secAnsTwo: e.target.value })
                  }
                  placeholder="Answer"
                  id="regFormInputMain"
                />
              </div>
              <div className="regFormInput">
                <label>Security Question 3:</label>
                <select
                  value={newUser.secQuesThree}
                  onChange={(e) =>
                    setNewUser({ ...newUser, secQuesThree: e.target.value })
                  }
                  id="regFormInputMain"
                >
                  <option>Security Question 3</option>
                  {securityQuestions.map((question) => (
                    <option key={question} value={question}>
                      {question}
                    </option>
                  ))}
                </select>
              </div>
              <div className="regFormInput">
                <label>Answer 3:</label>
                <input
                  value={newUser.secAnsThree}
                  onChange={(e) =>
                    setNewUser({ ...newUser, secAnsThree: e.target.value })
                  }
                  placeholder="Answer"
                  id="regFormInputMain"
                />
              </div>

              <div className="regConfirmCont">
                <label>Confirm</label>
                <input
                  type="checkbox"
                  id="regConfirm"
                  onClick={() => confirmReg()}
                />
              </div>

              <div className="regButtonCont">
                <button
                  disabled={registerConfirm}
                  id="regBtn"
                  onClick={(event) => register(event)}
                >
                  <p>Register</p>
                </button>
              </div>

              <div className="logToReg">
                <p>Already have an account?</p>
                <h4 onClick={() => logToReg("log")}>Login</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
