import React, { useEffect } from "react";
import { useState } from "react";
import Axios from "axios";
import $ from "jquery";

import Login from "./components/Login";
import Register from "./components/Register";
import ProfileCard from "./components/ProfileCard";
import AddAccount from "./components/AddAccount";
import UpdateAcc from "./components/UpdateAcc";
import Settings from "./components/Settings";
import Navigation from "./components/Navigation";

function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [userAccounts, setUserAccounts] = useState([]);
  const [updateUser, setUpdateUser] = useState({});
  const [updateAccount, setUpdateAccount] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState("false");
  const [edit, setEdit] = useState(false);
  const [newAcc, setNewAcc] = useState({});
  const [currentPage, setCurrentPage] = useState("#logForm");

  Axios.defaults.withCredentials = true;

  const logToReg = (logReg) => {
    console.log(logReg === "reg");
    if (logReg === "reg") {
      document
        .getElementById("mainCont")
        .scrollIntoView({ behavior: "smooth" });
      $("#logForm").animate(
        {
          left: "-100%",
        },
        500,
        function () {
          $("#logForm").css("display", "none");
        }
      );
      $("#regForm").css({ display: "flex", left: "100%" });
      $("#regForm").animate(
        {
          left: "18px",
        },
        500
      );
    } else if (logReg === "log") {
      document
        .getElementById("mainCont")
        .scrollIntoView({ behavior: "smooth" });
      $("#regForm").animate(
        {
          left: "100%",
        },
        500,
        function () {
          $("#regForm").css("display", "none");
        }
      );
      $("#logForm").css({ display: "flex", left: "-110%" });
      $("#logForm").animate(
        {
          left: "18px",
        },
        500
      );
    }
  };

  const checkLogin = () => {
    Axios.get(`https://account-manager-database.herokuapp.com/login`, {}).then(
      (response) => {
        console.log(response);
        if (response.data.isLoggedIn === "true") {
          setCurrentUser(response.data.user[0]);
          setIsLoggedIn(response.data.isLoggedIn);
          setCurrentPage("#profilePage");
          $("#profilePage").fadeIn("slow").css("display", "flex");

          $("#navigation").css({
            bottom: "-55px",
            display: "flex",
          });

          setTimeout(() => {
            $("#navigation").animate(
              {
                bottom: "-1",
              },
              "slow"
            );
          });
        } else {
          setCurrentUser([]);
          setIsLoggedIn(response.data.isLoggedIn);
          setCurrentPage("");
          $("#logForm").fadeIn(500);
        }
      }
    );
  };

  // const autoLogOut = () => {
  //   setInterval(() => {
  //     Axios.get(`http://localhost:3001/login`, {}).then((response) => {
  //       console.log(response.data.isLoggedIn);
  //       if (response.data.isLoggedIn === "false") {
  //         $("#profilePage").fadeOut("slow");
  //         $("#navigation").animate(
  //           {
  //             bottom: "-55px",
  //           },
  //           function () {
  //             $("#navigation").css({
  //               display: "none",
  //             });
  //           }
  //         );
  //       }
  //     });
  //   }, 3000);
  // };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <div className="App">
      <div className="appCont" id="appCont">
        <div className="appName" id="appName">
          <h1>Lock and Key</h1>
        </div>

        <div className="mainCont" id="mainCont">
          <Login
            setCurrentUser={setCurrentUser}
            currentUser={currentUser}
            setIsLoggedIn={setIsLoggedIn}
            isLoggedIn={isLoggedIn}
            logToReg={logToReg}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          <Register
            setCurrentUser={setCurrentUser}
            currentUser={currentUser}
            setIsLoggedIn={setIsLoggedIn}
            isLoggedIn={isLoggedIn}
            logToReg={logToReg}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />

          <ProfileCard
            setCurrentUser={setCurrentUser}
            currentUser={currentUser}
            setUserAccounts={setUserAccounts}
            userAccounts={userAccounts}
            setIsLoggedIn={setIsLoggedIn}
            isLoggedIn={isLoggedIn}
            setEdit={setEdit}
            edit={edit}
            setUpdateAccount={setUpdateAccount}
            updateAccount={updateAccount}
            logToReg={logToReg}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          <AddAccount
            setCurrentUser={setCurrentUser}
            currentUser={currentUser}
            setIsLoggedIn={setIsLoggedIn}
            isLoggedIn={isLoggedIn}
          />
          <Settings
            setCurrentUser={setCurrentUser}
            currentUser={currentUser}
            setUpdateUser={setUpdateUser}
            updateUser={updateUser}
            setIsLoggedIn={setIsLoggedIn}
            isLoggedIn={isLoggedIn}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
          <UpdateAcc
            setCurrentUser={setCurrentUser}
            currentUser={currentUser}
            setUpdateAccount={setUpdateAccount}
            updateAccount={updateAccount}
          />
        </div>

        <Navigation
          setCurrentUser={setCurrentUser}
          currentUser={currentUser}
          setUserAccounts={setUserAccounts}
          userAccounts={userAccounts}
          setUpdateUser={setUpdateUser}
          updateUser={updateUser}
          setNewAcc={setNewAcc}
          newAcc={newAcc}
          setIsLoggedIn={setIsLoggedIn}
          isLoggedIn={isLoggedIn}
          edit={edit}
          setEdit={setEdit}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default App;
