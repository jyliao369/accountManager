import React from "react";
import Axios from "axios";
import $ from "jquery";

const UpdateAcc = ({
  setCurrentUser,
  currentUser,
  setUpdateAccount,
  updateAccount,
}) => {
  const updatingAccount = () => {
    Axios.put(`http://localhost:3001/updateAccount`, {
      updateAccount: updateAccount,
    }).then((response) => {
      console.log(response.data[0]);
      setUpdateAccount({});
      $("#accUpdatePage").css("display", "none");
      $("#profilePage").css("display", "flex");
    });
  };

  const updateTwoSec = (secure) => {
    console.log(secure);

    if (secure === "twoStepCheckUpdate") {
      if (document.getElementById(secure).checked === true) {
        setUpdateAccount({ ...updateAccount, twoStepCheck: "1" });
      } else {
        setUpdateAccount({ ...updateAccount, twoStepCheck: "0" });
      }
    } else if (secure === "secQuesCheckUpdate") {
      if (document.getElementById(secure).checked === true) {
        setUpdateAccount({
          ...updateAccount,
          secQuesCheck: "1",
          accQuesOne: "",
          accAnsOne: "",
          accQuesTwo: "",
          accAnsTwo: "",
          accQuesThree: "",
          accAnsThree: "",
        });
      } else {
        setUpdateAccount({
          ...updateAccount,
          secQuesCheck: "0",
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

  const cancelUpdating = () => {
    setUpdateAccount({});
    document.getElementById("mainCont").scrollIntoView({ behavior: "smooth" });

    $("#accUpdatePage").animate(
      {
        left: "100%",
      },
      500,
      function () {
        $("#accUpdatePage").css("display", "none");
      }
    );
    $("#profilePage").css({ left: "-100%", display: "flex" });
    $("#profilePage").animate(
      {
        left: "18px",
      },
      500
    );
  };

  return (
    <div className="accUpdatePage" id="accUpdatePage">
      <div className="accUpdateCont">
        <div className="accUpdateContMain">
          <div className="accUpdateInputName">
            <h2>Update Account Info</h2>
          </div>
          <div className="accUpdateInputMain">
            <div className="accUpdateInfo">
              <label>Account Name:</label>
              <input
                value={updateAccount.accName}
                onChange={(e) =>
                  setUpdateAccount({
                    ...updateAccount,
                    accName: e.target.value,
                  })
                }
              />
            </div>
            <div className="accUpdateInfo">
              <label>Account Email: </label>
              <input
                value={updateAccount.accEmail}
                onChange={(e) =>
                  setUpdateAccount({
                    ...updateAccount,
                    accEmail: e.target.value,
                  })
                }
              />
            </div>
            <div className="accUpdateInfo">
              <label>Account Phone Number: </label>
              <input
                value={updateAccount.accPhoneNum}
                onChange={(e) =>
                  setUpdateAccount({
                    ...updateAccount,
                    accPhoneNum: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>

        <div className="accUpdateContMain">
          <div className="accUpdateInputName">
            <h2>Update: Account Info</h2>
          </div>
          <div className="accUpdateInputMain">
            <div className="accUpdateInfo">
              <label>Account Username: </label>
              <input
                value={updateAccount.accUsername}
                onChange={(e) =>
                  setUpdateAccount({
                    ...updateAccount,
                    accUsername: e.target.value,
                  })
                }
              />
            </div>
            <div className="accUpdateInfo">
              <label>Account Password: </label>
              <input
                value={updateAccount.accPassword}
                onChange={(e) =>
                  setUpdateAccount({
                    ...updateAccount,
                    accPassword: e.target.value,
                  })
                }
              />
            </div>
            <div className="accUpdateInfo">
              <label>Account Password: </label>
              <input
                value={updateAccount.accPassword}
                onChange={(e) =>
                  setUpdateAccount({
                    ...updateAccount,
                    accPassword: e.target.value,
                  })
                }
              />
            </div>
            <div className="accUpdateSecInfo">
              <label>Two-Step Verification: </label>
              <input
                type="checkbox"
                id={"twoStepCheckUpdate"}
                checked={Boolean(parseInt(updateAccount.twoStepCheck))}
                onClick={() => updateTwoSec("twoStepCheckUpdate")}
              />
            </div>
            <div className="accUpdateSecInfo">
              <label>Security Question: </label>
              <input
                type="checkbox"
                id={"secQuesCheckUpdate"}
                checked={Boolean(parseInt(updateAccount.secQuesCheck))}
                onClick={() => updateTwoSec("secQuesCheckUpdate")}
              />
            </div>
          </div>
        </div>

        <div className="accUpdateContMain">
          <div className="accUpdateInputName">
            <h2>Update: Account Info</h2>
          </div>
          <div className="accUpdateInputMain">
            <div className="accUpdateInfo">
              <label>Security Question 1: </label>
              <input
                disabled={!Boolean(parseInt(updateAccount.secQuesCheck))}
                value={updateAccount.secQuesOne}
                onChange={(e) =>
                  setUpdateAccount({
                    ...updateAccount,
                    secQuesOne: e.target.value,
                  })
                }
              />
            </div>
            <div className="accUpdateInfo">
              <label>Answer:</label>
              <input
                disabled={!Boolean(parseInt(updateAccount.secQuesCheck))}
                value={updateAccount.secAnsOne}
                onChange={(e) =>
                  setUpdateAccount({
                    ...updateAccount,
                    secAnsOne: e.target.value,
                  })
                }
              />
            </div>
            <div className="accUpdateInfo">
              <label>Security Question 2:</label>
              <input
                disabled={!Boolean(parseInt(updateAccount.secQuesCheck))}
                value={updateAccount.secQuesTwo}
                onChange={(e) =>
                  setUpdateAccount({
                    ...updateAccount,
                    secQuesTwo: e.target.value,
                  })
                }
              />
            </div>
            <div className="accUpdateInfo">
              <label>Answer:</label>
              <input
                disabled={!Boolean(parseInt(updateAccount.secQuesCheck))}
                value={updateAccount.secAnsTwo}
                onChange={(e) =>
                  setUpdateAccount({
                    ...updateAccount,
                    secAnsTwo: e.target.value,
                  })
                }
              />
            </div>
            <div className="accUpdateInfo">
              <label>Security Question 3</label>
              <input
                disabled={!Boolean(parseInt(updateAccount.secQuesCheck))}
                value={updateAccount.secQuesThree}
                onChange={(e) =>
                  setUpdateAccount({
                    ...updateAccount,
                    secQuesThree: e.target.value,
                  })
                }
              />
            </div>
            <div className="accUpdateInfo">
              <label>Answer:</label>
              <input
                disabled={!Boolean(parseInt(updateAccount.secQuesCheck))}
                value={updateAccount.secAnsThree}
                onChange={(e) =>
                  setUpdateAccount({
                    ...updateAccount,
                    secAnsThree: e.target.value,
                  })
                }
              />
            </div>
            <div className="updateAccCont">
              <button onClick={() => updatingAccount()}>Update</button>
            </div>
            <div className="cancelAccUpCont">
              <button onClick={() => cancelUpdating()}>Cancel</button>
            </div>
          </div>
          {/* <div>
            <button onClick={() => test()}>test</button>
          </div> */}
        </div>

        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default UpdateAcc;
