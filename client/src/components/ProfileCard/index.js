import React from "react";
import $ from "jquery";
import Axios from "axios";

import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const ProfileCard = ({
  setCurrentUser,
  currentUser,
  setUserAccounts,
  userAccounts,
  setIsLoggedIn,
  isLoggedIn,
  logToReg,
  edit,
  setEdit,
  updateAccount,
  setUpdateAccount,
  currentPage,
  setCurrentPage,
}) => {
  const grabAccounts = () => {
    setUserAccounts([]);

    $("#grabAccountButton").children().fadeOut(200);
    $("#grabAccountButton").animate(
      {
        width: "2.5em",
      },
      function () {
        setTimeout(() => {
          getAccounts();
        }, 1500);
      }
    );
  };

  const getAccounts = () => {
    Axios.post(`http://localhost:3001/getUserAccounts`, {
      userID: currentUser.userID,
    }).then((response) => {
      console.log(response.data.length);

      if (response.data.length <= 0) {
        $("#grabAccountButton").animate(
          {
            width: "100%",
          },
          500,
          function () {
            $("#grabAccountButton").children().fadeIn(200);
          }
        );
      } else {
        console.log("goodbye");

        setUserAccounts(response.data);
        setTimeout(() => {
          $("#grabAccountButton").animate(
            {
              width: "3.5em",
              height: "3.5em",
            },
            function () {
              $("#grabAccountButton").animate(
                {
                  width: "0em",
                  height: "0em",
                },
                250,
                function () {
                  $("#grabAccountBtn").fadeOut(100);
                  setTimeout(() => {
                    $("#accountsCont").animate(
                      { opacity: 1 },
                      500,
                      function () {
                        rendAcc();
                        $("#grabAccountButton").animate(
                          {
                            width: "100%",
                            height: "2.5em",
                          },
                          function () {
                            $("#grabAccountButton").children().fadeIn(200);
                          }
                        );
                      }
                    );
                  }, 750);
                }
              );
            }
          );
        }, 750);
      }
    });
  };

  const rendAcc = () => {
    for (
      let a = 0;
      a < document.getElementById("accountsCont").children.length;
      a++
    ) {
      $("#accInfo" + a).animate({ height: "2.25em" }, 150, function () {
        $("#accInfo" + a).animate({ width: "95%" }, 250, function () {
          $("#accInfo" + a).css({ height: "100%" });

          $("#accountName" + a)
            .children()
            .animate({
              opacity: 1,
            });
        });
      });
    }
  };

  const showMore = (index, accountID) => {
    if (document.getElementById("accountInfo" + index).children.length <= 0) {
      document.querySelector("#showMoreBtn" + index).style.transform =
        "rotate(180deg)";

      Axios.post(`http://localhost:3001/getAccount`, {
        accountID: accountID,
      }).then((response) => {
        // console.log(response.data[0]);
        let infoRender = renderInfo(index, response.data[0]);
        document.getElementById("accountInfo" + index).innerHTML += infoRender;
        document.getElementById(
          "accDeleteBtn" + index
        ).innerHTML += `<button id=${"deleteBtn" + index}>Delete</button`;

        document
          .getElementById("deleteBtn" + index)
          .addEventListener("click", function () {
            deleteAccount(response.data[0].accountID);
          });
      });

      $("#accountInfoMain" + index).animate(
        {
          height: "26em",
        },
        250,
        function () {
          document
            .getElementById("accInfo" + index)
            .scrollIntoView({ behavior: "smooth" });
        }
      );
    } else {
      $("#accountInfoMain" + index).animate(
        {
          height: "0em",
        },
        function () {
          document.getElementById("accountInfo" + index).children[0].remove();
          document.getElementById("accDeleteBtn" + index).children[0].remove();
          document.querySelector("#showMoreBtn" + index).style.transform =
            "rotate(0deg)";
        }
      );
    }
  };

  const upAccInfo = (accountID) => {
    Axios.post(`http://localhost:3001/getAccount`, {
      accountID: accountID,
    }).then((response) => {
      console.log(response.data[0]);
      setUpdateAccount(response.data[0]);
      setCurrentPage("#accUpdatePage");
    });

    $("#profilePage").animate(
      {
        left: "-100%",
      },
      500,
      function () {
        $("#profilePage").css("display", "none");
      }
    );
    $("#accUpdatePage").css({ left: "100%", display: "flex" });
    $("#accUpdatePage").animate(
      {
        left: "18px",
      },
      500
    );

    setCurrentPage("#accUpdatePage");
  };

  const deleteAccount = (accountID) => {
    console.log(accountID);
    Axios.delete(`http://localhost:3001/deleteAccount/${accountID}`, {}).then(
      (response) => {
        Axios.post(`http://localhost:3001/getUserAccounts`, {
          userID: currentUser.userID,
        }).then((response) => {
          if (response.data.length <= 0) {
            console.log("You have no accounts saved");
            setUserAccounts([]);
          } else {
            setUserAccounts(response.data);
            $("#accountsCont").css("display", "flex");
          }
        });
      }
    );
  };

  // RENDERING
  const renderAcc = (info, index) => {
    return (
      <div className="accountName" id={"accountName" + index}>
        <div className="accountNameCont">
          {edit ? (
            <>
              <button onClick={() => upAccInfo(info.accountID)}>
                <ModeEditIcon />
              </button>
            </>
          ) : (
            <></>
          )}
          <p>{info.accName}</p>
        </div>

        <div className="showMoreBtn">
          <button
            id={"showMoreBtn" + index}
            onClick={() => showMore(index, info.accountID)}
          >
            <ExpandMoreIcon />
          </button>
        </div>
      </div>
    );
  };

  const renderInfo = (index, accountInfo) => {
    return `
            <div class="accInfoMain" id = ${"accInfoMain" + index}>
              <div class = "accInfoA">
                <p>${"Username"}</p>
                <p>${accountInfo.accUsername}</p>
              </div>
              <div class = "accInfoA">
                <p>${"Password"}</p>
                <p>${accountInfo.accPassword}</p>
              </div>
              <div class = "accInfoA">
                <p>${"Email"}</p>
                <p>${accountInfo.accEmail}</p>
              </div>
              <div class = "accInfoA">
                <p>${"Phone #"}</p>
                <p>${accountInfo.accPhoneNum}</p>
              </div>
              <div class = "accInfoA">
                <p>${"Two-Step Check"}</p>
                <p>${Boolean(parseInt(accountInfo.twoStepCheck))}</p>
              </div>
              <div class = "accInfoA">
                <p>${"Security Check"}</p>
                <p>${Boolean(parseInt(accountInfo.secQuesCheck))}</p>
              </div>
              <hr/>
              <div class = "accInfoB">
                <p>${"Security Question 1:"}</p>
                <p>${accountInfo.secQuesOne}</p>
                <p>${accountInfo.secAnsOne}</p>
              </div>
              <div class = "accInfoB">
                <p>${"Security Question 2:"}</p>
                <p>${accountInfo.secQuesTwo}</p>
                <p>${accountInfo.secAnsTwo}</p>
              </div>
              <div class = "accInfoB">
                <p>${"Security Question 3:"}</p>
                <p>${accountInfo.secQuesThree}</p>
                <p>${accountInfo.secAnsThree}</p>
              </div>
            </div>`;
  };

  return (
    <div className="profilePage" id="profilePage">
      <div className="profileCard" id="profileCard">
        <div className="image"></div>
        <p>
          {currentUser.firstName} {currentUser.lastName}
        </p>
        <p>@{currentUser.username}</p>
        <p>{currentUser.email}</p>
      </div>

      <br />

      <div className="grabAccountBtn" id="grabAccountBtn">
        <div id="grabAccountButton" onClick={() => grabAccounts()}>
          <p>Grab Account</p>
        </div>
      </div>

      <br />

      <div className="accountsCont" id={"accountsCont"}>
        {userAccounts.map((account, index) => (
          <div
            key={index}
            className="accInfoMainPart"
            id={"accInfoMainPart" + index}
          >
            <div key={index} className="accInfo" id={"accInfo" + index}>
              {renderAcc(account, index)}
              <div className="accountInfoMain" id={"accountInfoMain" + index}>
                <div className="accountInfo" id={"accountInfo" + index}></div>
                <div class="accDeleteBtn" id={"accDeleteBtn" + index}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <br />
      <br />
      <br />
    </div>
  );
};

export default ProfileCard;
