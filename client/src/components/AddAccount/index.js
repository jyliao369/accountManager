import React from "react";
import { useState } from "react";
import $ from "jquery";
import Axios from "axios";

const AddAccount = ({
  setCurrentUser,
  currentUser,
  setIsLoggedIn,
  isLoggedIn,
}) => {
  const [newAcc, setNewAcc] = useState({
    twoStepCheck: false,
    secQuesCheck: false,
    userID: currentUser.userID,
  });

  const [addAccConfirm, setAddAccConfirm] = useState(true);

  const secVerify = (secure) => {
    if (secure === "twoStepCheckBox") {
      if (document.getElementById(secure).checked === true) {
        setNewAcc({ ...newAcc, twoStepCheck: true });
      } else {
        setNewAcc({ ...newAcc, twoStepCheck: false });
      }
    } else if (secure === "secQuesCheckBox") {
      if (document.getElementById(secure).checked === true) {
        setNewAcc({
          ...newAcc,
          secQuesCheck: true,
          accQuesOne: "",
          accAnsOne: "",
          accQuesTwo: "",
          accAnsTwo: "",
          accQuesThree: "",
          accAnsThree: "",
        });
      } else {
        setNewAcc({
          ...newAcc,
          secQuesCheck: false,
          accQuesOne: "N/A",
          accAnsOne: "N/A",
          accQuesTwo: "N/A",
          accAnsTwo: "N/A",
          accQuesThree: "N/A",
          accAnsThree: "N/A",
        });
      }
    }
  };

  const addAccount = () => {
    Axios.post(`http://localhost:3001/addAccount`, {
      newAcc: newAcc,
    }).then((response) => {
      $("#addAccReview").css("display", "none");
      $("#addAccForm").css("display", "flex");
      $("#addAccountPage").css("display", "none");
      $("#profilePage").css("display", "flex");

      setNewAcc({
        twoStepCheck: false,
        secQuesCheck: false,
        userID: currentUser.userID,
      });
    });
  };

  const confirmAcc = () => {
    if (document.getElementById("confirmBox").checked) {
      setAddAccConfirm(false);
    } else {
      setAddAccConfirm(true);
    }
  };

  return (
    <div className="addAccountPage" id="addAccountPage">
      <div className="addAccForm" id="addAccForm">
        <div className="addAccFormPart">
          <div className="addAccName">
            <h2>New Account: Account Info</h2>
          </div>
          <div className="addAccFormMain">
            <div className="addAccInput">
              <label>Account Name</label>
              <input
                value={newAcc.accountName}
                onChange={(e) =>
                  setNewAcc({ ...newAcc, accountName: e.target.value })
                }
                placeholder="Bob's Hulu, My Netflix, Twitter, etc."
                id="addAccInputMain"
              />
            </div>
            <div className="addAccInput">
              <label>Account Username</label>
              <input
                value={newAcc.accountUsername}
                onChange={(e) =>
                  setNewAcc({ ...newAcc, accountUsername: e.target.value })
                }
                placeholder="Ex. Hulu Account."
                id="addAccInputMain"
              />
            </div>
            <div className="addAccInput">
              <label>Account Password</label>
              <input
                value={newAcc.accountPass}
                onChange={(e) =>
                  setNewAcc({ ...newAcc, accountPass: e.target.value })
                }
                placeholder="*********"
                id="addAccInputMain"
              />
            </div>
          </div>
        </div>

        <div className="addAccFormPart">
          <div className="addAccName">
            <h3>New Account: Contact</h3>
          </div>
          <div className="addAccFormMain">
            <div className="addAccInput">
              <label>Account Email</label>
              <input
                value={newAcc.accountEmail}
                onChange={(e) =>
                  setNewAcc({ ...newAcc, accountEmail: e.target.value })
                }
                placeholder="Ex. example@gmail.com"
                id="addAccInputMain"
              />
            </div>
            <div className="addAccInput">
              <label>Account Phone Number</label>
              <input
                value={newAcc.accountPhone}
                onChange={(e) =>
                  setNewAcc({ ...newAcc, accountPhone: e.target.value })
                }
                placeholder="Ex. 111-222-3333"
                id="addAccInputMain"
              />
            </div>
            <div className="twoStepCheck">
              <p>Two-Step Verification</p>
              <input
                type="checkbox"
                id="twoStepCheckBox"
                checked={newAcc.twoStepCheck}
                onClick={() => secVerify("twoStepCheckBox")}
              />
            </div>
            <div className="secQuesCheck">
              <p>Security Question</p>
              <input
                type="checkbox"
                id="secQuesCheckBox"
                checked={newAcc.secQuesCheck}
                onClick={() => secVerify("secQuesCheckBox")}
              />
            </div>
          </div>
        </div>

        <div className="addAccFormPart">
          <div className="addAccName">
            <h3>New Account: Security Questions</h3>
          </div>
          <div className="addAccFormMain">
            <div className="addAccSecForm">
              <label>Security Question 1:</label>
              <input
                disabled={!newAcc.secQuesCheck}
                value={newAcc.accQuesOne}
                onChange={(e) =>
                  setNewAcc({ ...newAcc, accQuesOne: e.target.value })
                }
                placeholder="Ex. What's your first car?"
                id="addAccInputMain"
              />
            </div>
            <div className="addAccSecForm">
              <label>Answer: </label>
              <input
                disabled={!newAcc.secQuesCheck}
                value={newAcc.accAnsOne}
                onChange={(e) =>
                  setNewAcc({ ...newAcc, accAnsOne: e.target.value })
                }
                placeholder=""
                id="addAccInputMain"
              />
            </div>
            <div className="addAccSecForm">
              <label>Security Question 2: </label>
              <input
                disabled={!newAcc.secQuesCheck}
                value={newAcc.accQuesTwo}
                onChange={(e) =>
                  setNewAcc({ ...newAcc, accQuesTwo: e.target.value })
                }
                placeholder="Ex. What's your facorite toy?"
                id="addAccInputMain"
              />
            </div>
            <div className="addAccSecForm">
              <label>Answer: </label>
              <input
                disabled={!newAcc.secQuesCheck}
                value={newAcc.accAnsTwo}
                onChange={(e) =>
                  setNewAcc({ ...newAcc, accAnsTwo: e.target.value })
                }
                placeholder=""
                id="addAccInputMain"
              />
            </div>
            <div className="addAccSecForm">
              <label>Security Question 3: </label>
              <input
                disabled={!newAcc.secQuesCheck}
                value={newAcc.accQuesThree}
                onChange={(e) =>
                  setNewAcc({ ...newAcc, accQuesThree: e.target.value })
                }
                placeholder="Ex. What's your facorite cuisine?"
                id="addAccInputMain"
              />
            </div>
            <div className="addAccSecForm">
              <label>Answer: </label>
              <input
                disabled={!newAcc.secQuesCheck}
                value={newAcc.accAnsThree}
                onChange={(e) =>
                  setNewAcc({ ...newAcc, accAnsThree: e.target.value })
                }
                placeholder=""
                id="addAccInputMain"
              />
            </div>
            <div className="addAccConfirm">
              <label>Confirm</label>
              <input
                id="confirmBox"
                onClick={() => confirmAcc()}
                type="checkbox"
              />
            </div>
            <div className="addAccBtn">
              <button disabled={addAccConfirm} onClick={() => addAccount()}>
                Add Account
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

export default AddAccount;
