import React from "react";
import { useState } from "react";
import Axios from "axios";
import $ from "jquery";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyIcon from "@mui/icons-material/Key";

const Login = ({
  setCurrentUser,
  currentUser,
  setIsLoggedIn,
  isLoggedIn,
  logToReg,
  setCurrentPage,
  currentPage,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = (event) => {
    event.preventDefault();

    if (username !== "" && password !== "") {
      $("#loginButton").children().fadeOut();
      $("#loginButton").animate(
        {
          width: "3em",
        },
        500,
        function () {
          $("#loginButton").prop("disabled", true);
          $("#loginButton").css({
            borderColor: "rgb(52, 152, 219) lightgray lightgray",
            animation: "spin .4s linear infinite",
          });
        }
      );

      Axios.post("http://localhost:3001/login", {
        username: username,
        password: password,
      }).then((response) => {
        if (response.data.isLoggedIn === "true") {
          setTimeout(() => {
            $("#logForm").animate(
              {
                left: "-100%",
              },
              500,
              function () {
                $("#loginButton").css({
                  animation: "",
                  borderColor: "",
                });
                $("#loginButton").animate(
                  {
                    width: "50%",
                  },
                  500,
                  function () {
                    $("#loginButton").prop("disabled", false);
                    $("#loginButton").children().fadeIn();
                    $("#logForm").css("display", "none");
                    $("#grabAccountButton").css({
                      display: "flex",
                      width: "100%",
                      height: "2.5em",
                      borderStyle: "solid",
                    });
                    $("#grabAccountButton").children().fadeIn();
                  }
                );
                setCurrentUser(response.data.result[0]);
                setCurrentPage("#profilePage");
                setUsername("");
                setPassword("");
                $("#profilePage")
                  .css({ display: "flex", left: "18px" })
                  .hide()
                  .fadeIn(750);
                $("#navigation").animate({
                  bottom: "-1",
                });
                $("#navigation").css({
                  bottom: "-45px",
                  display: "flex",
                });
              }
            );
          }, 2500);
        } else if (response.data.isLoggedIn === "false") {
          setTimeout(() => {
            $("#loginButton").css({
              animation: "",
              borderColor: "",
            });
            $("#loginButton").animate(
              {
                width: "50%",
              },
              500,
              function () {
                $("#loginButton").prop("disabled", false);
                $("#loginButton").children().fadeIn();
              }
            );
          }, 2500);
        }
      });
    }
  };

  return (
    <div className="logForm" id="logForm">
      <div className="loginName">
        <h1>Welcome</h1>
      </div>

      <div className="logFormMainInput">
        <div className="loginInput">
          <label>Username/Display</label>
          <input
            placeholder="testninja101"
            disabled={false}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="loginFormInputMain"
          />
        </div>
        <div className="loginInput">
          <label>Password</label>
          <input
            type="password"
            placeholder="**********"
            disabled={false}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="loginFormInputMain"
          />
        </div>

        <div className="loginBtnCont">
          <button onClick={(event) => login(event)} id="loginButton">
            <p>Login</p>
          </button>
        </div>

        <div className="logToReg">
          <p>Don't have an account? </p>
          <h4 onClick={() => logToReg("reg")}>Sign Up</h4>
        </div>
      </div>
    </div>
  );
};

export default Login;
