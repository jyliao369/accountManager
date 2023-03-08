import React from "react";
import { useState, useEffect } from "react";
import $ from "jquery";
import Axios from "axios";

import { months } from "../data";

const Settings = ({
  setCurrentUser,
  currentUser,
  setUpdateUser,
  updateUser,
  setIsLoggedIn,
  isLoggedIn,
  setCurrentPage,
  currentPage,
}) => {
  const [newPassword, setNewPassword] = useState("");
  const [rePassword, setRePassword] = useState("");

  const updateUserInfo = () => {
    $("#updateAccButton").children().fadeOut();
    $("#updateAccButton").animate(
      {
        width: "2.35em",
      },
      function () {
        $("#updateAccButton").prop("disabled", true);
        $("#updateAccButton").css({
          borderColor: "rgb(52, 152, 219) lightgray lightgray",
          animation: "spin .4s linear infinite",
        });
      }
    );

    setTimeout(() => {
      $("#updateAccButton").css({
        animation: "",
        borderColor: "",
      });
      $("#updateAccButton").animate(
        {
          width: "60%",
        },
        500,
        function () {
          $("#updateAccButton").prop("disabled", false);
          $("#updateAccButton").children().fadeIn();
        }
      );
      // $("#updateAccButton").animate(
      //   {
      //     width: "60%",
      //   },
      //   function () {}
      // );
      // $("#updateAccButton").children().fadeIn();
    }, 1000);

    // if (newPassword === rePassword) {
    //   // console.log("password match");
    //   setUpdateUser({ ...updateUser, password: newPassword });
    //   Axios.put(`http://localhost:3001/updateUser`, {
    //     updateUser: updateUser,
    //   }).then((response) => {
    //     console.log(response.data[0]);

    //     setCurrentUser(response.data[0]);
    //     setNewPassword("");
    //     setRePassword("");

    //     // $("#settingsPage").css("display", "none");
    //     // $("#profilePage").css("display", "flex");
    //     // setUpdateUser({});
    //   });
    // } else {
    //   console.log("Passwords do not Match");
    // }
  };

  const closingAccounts = (userID) => {
    console.log("closing account and deleting everything");
    console.log(userID);
    Axios.delete(`http://localhost:3001/deleteUser/${userID}`, {}).then(
      (response) => {
        console.log(response.data.isLoggedIn);
        setIsLoggedIn(response.data.isLoggedIn);
        setCurrentPage("#logform");

        $("#settingsPage").animate({ opacity: "0" }, function () {
          $("#settingsPage").css({ display: "none", opacity: 1 });

          setTimeout(() => {
            $("#logForm").css({ display: "flex", left: "-100%" });
            $("#logForm").animate(
              {
                left: "18px",
              },
              500
            );
          }, 500);
        });
        $("#navigation").animate(
          {
            bottom: "-55px",
          },
          function () {
            $("#navigation").css({
              display: "none",
            });
          }
        );
      }
    );
  };

  return (
    <div className="settingsPage" id="settingsPage">
      <div className="settingCont">
        <div className="settingPartCont">
          <div className="settingsName">
            <h2>Edit Profile</h2>
          </div>
          <div className="settingsMainPart">
            <div className="settingImage"></div>

            <div className="settingInfo">
              <label>Name:</label>
              <div className="nameUpdate">
                <input
                  onChange={(e) =>
                    setUpdateUser({ ...updateUser, firstName: e.target.value })
                  }
                  value={updateUser.firstName}
                  id="accSettingInputMain"
                ></input>
                <input
                  onChange={(e) =>
                    setUpdateUser({ ...updateUser, lastName: e.target.value })
                  }
                  value={updateUser.lastName}
                  id="accSettingInputMain"
                ></input>
              </div>
            </div>
          </div>
        </div>

        <div className="settingPartCont">
          <div className="settingsName">
            <h3>Update Account Info</h3>
          </div>
          <div className="settingsMainPart">
            <div className="settingInfo">
              <label>Username:</label>
              <input
                onChange={(e) =>
                  setUpdateUser({ ...updateUser, username: e.target.value })
                }
                value={updateUser.username}
                id="accSettingInputMain"
              />
            </div>
            <div className="settingInfo">
              <label>New Password:</label>
              <input
                type={"password"}
                onChange={(e) => setNewPassword(e.target.value)}
                // value={updateUser.password}
                id="accSettingInputMain"
                placeholder="**********"
              />
            </div>
            <div className="settingInfo">
              <label>Re-type New Password:</label>
              <input
                type={"password"}
                onChange={(e) => setRePassword(e.target.value)}
                // value={updateUser.password}
                id="accSettingInputMain"
                placeholder="**********"
              />
            </div>
          </div>
        </div>

        <div className="settingPartCont">
          <div className="settingsName">
            <h3>Update Contact Info</h3>
          </div>
          <div className="settingsMainPart">
            <div className="settingInfo">
              <label>Email:</label>
              <input
                onChange={(e) =>
                  setUpdateUser({ ...updateUser, email: e.target.value })
                }
                value={updateUser.email}
                id="accSettingInputMain"
              />
            </div>
            <div className="settingInfo">
              <label>Phone #:</label>
              <input
                onChange={(e) =>
                  setUpdateUser({ ...updateUser, phoneNum: e.target.value })
                }
                value={updateUser.phoneNum}
                id="accSettingInputMain"
              />
            </div>
            <div className="settingInfo">
              <label>Date of Birth:</label>
              <div className="dobSetting">
                <select
                  onChange={(e) =>
                    setUpdateUser({ ...updateUser, dobMonth: e.target.value })
                  }
                  value={updateUser.dobMonth}
                >
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
                <input
                  onChange={(e) =>
                    setUpdateUser({ ...updateUser, dobDay: e.target.value })
                  }
                  value={updateUser.dobDay}
                  id="accSettingInputMain"
                />
                <input
                  onChange={(e) =>
                    setUpdateUser({ ...updateUser, dobYear: e.target.value })
                  }
                  value={updateUser.dobYear}
                  id="accSettingInputMain"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="settingPartCont">
          <div className="settingsName">
            <h3>Update Security Question</h3>
          </div>
          <div className="settingsMainPart">
            <div className="settingInfo">
              <label>Security Question 1:</label>
              <input
                onChange={(e) =>
                  setUpdateUser({ ...updateUser, secQuesOne: e.target.value })
                }
                value={updateUser.secQuesOne}
                id="accSettingInputMain"
              />
            </div>
            <div className="settingInfo">
              <label>Answer:</label>
              <input
                onChange={(e) =>
                  setUpdateUser({ ...updateUser, secAnsOne: e.target.value })
                }
                value={updateUser.secAnsOne}
                id="accSettingInputMain"
              />
            </div>
            <div className="settingInfo">
              <label>Security Question 2:</label>
              <input
                onChange={(e) =>
                  setUpdateUser({ ...updateUser, secQuesTwo: e.target.value })
                }
                value={updateUser.secQuesTwo}
                id="accSettingInputMain"
              />
            </div>
            <div className="settingInfo">
              <label>Answer:</label>
              <input
                onChange={(e) =>
                  setUpdateUser({ ...updateUser, secAnsTwo: e.target.value })
                }
                value={updateUser.secAnsTwo}
                id="accSettingInputMain"
              />
            </div>
            <div className="settingInfo">
              <label>Security Question 3:</label>
              <input
                onChange={(e) =>
                  setUpdateUser({ ...updateUser, secQuesThree: e.target.value })
                }
                value={updateUser.secQuesThree}
                id="accSettingInputMain"
              />
            </div>
            <div className="settingInfo">
              <label>Answer:</label>
              <input
                onChange={(e) =>
                  setUpdateUser({ ...updateUser, secAnsThree: e.target.value })
                }
                value={updateUser.secAnsThree}
                id="accSettingInputMain"
              />
            </div>
            <div className="updateAccBtn">
              <button id="updateAccButton" onClick={() => updateUserInfo()}>
                <p>Update</p>
              </button>
            </div>
            <div className="deleteAccBtn">
              <button
                id="deleteAccButton"
                onClick={() => closingAccounts(updateUser.userID)}
              >
                Close Account
              </button>
            </div>
          </div>
        </div>

        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default Settings;
