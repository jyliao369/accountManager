import React, { createElement } from "react";
import Axios from "axios";
import $ from "jquery";
import { useState, useEffect } from "react";

import HomeIcon from "@mui/icons-material/Home";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SettingsSuggestIcon from "@mui/icons-material/SettingsSuggest";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";

const Navigation = ({
  setCurrentUser,
  currentUser,
  setUserAccounts,
  userAccounts,
  setUpdateUser,
  updateUser,
  setIsLoggedIn,
  isLoggedIn,
  edit,
  setEdit,
  currentPage,
  setCurrentPage,
}) => {
  const logout = () => {
    $(currentPage).animate(
      {
        opacity: "0",
      },
      500,
      function () {
        $(currentPage).css({ display: "none", opacity: "100%" });
        Axios.get(`http://localhost:3001/logout`, {}).then((response) => {
          setIsLoggedIn(response.data.isLoggedIn);
          setCurrentUser([]);
          setUserAccounts([]);
          setCurrentPage("");

          $("#grabAccountBtn").css({ display: "flex" });

          $("#logForm").css({ display: "flex", left: "-100%" });
          $("#logForm").animate(
            {
              left: "18px",
            },
            500,
            function () {
              $("#grabAccountBtn").css({
                display: "flex",
              });
            }
          );
        });
      }
    );

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
  };

  const switchPage = (page, info) => {
    if (info === "edit") {
      if (edit === true) {
        setEdit(false);
      } else {
        setEdit(true);
      }
    }

    if (page === "#settingsPage") {
      Axios.post(`http://localhost:3001/getUser`, {
        acctUserID: info,
      }).then((response) => {
        setUpdateUser(response.data[0]);
      });
    } else {
      setUpdateUser([]);
    }
  };

  const pageTransition = (nextPage) => {
    document.getElementById("mainCont").scrollIntoView({ behavior: "smooth" });

    if (nextPage === currentPage) {
    } else {
      if (nextPage === "#profilePage") {
        $(nextPage).css("display", "flex").animate(
          {
            left: "18px",
          },
          500
        );
        $(currentPage).animate(
          {
            left: "110%",
          },
          500,
          function () {
            $(currentPage).css("display", "none");
            setCurrentPage(nextPage);
          }
        );
      } else {
        $(currentPage).animate(
          {
            left: "-110%",
          },
          500,
          function () {
            $(currentPage).css("display", "none");
            setCurrentPage(nextPage);
          }
        );
        $(nextPage).css({ left: "110%", display: "flex" }).animate(
          {
            left: "18px",
          },
          500
        );
      }
    }
  };

  return (
    <div className="navigation" id="navigation">
      <div
        onClick={() =>
          `${switchPage("#profilePage")}; ${pageTransition("#profilePage")}`
        }
      >
        <HomeIcon />
      </div>
      {userAccounts.length <= 0 ? (
        <>
          <div>
            <EditIcon />
          </div>
        </>
      ) : (
        <>
          <div onClick={() => switchPage("#profilePage", "edit")}>
            <EditIcon />
          </div>
        </>
      )}

      <div
        onClick={() =>
          `${switchPage("#addAccountPage")}; ${pageTransition(
            "#addAccountPage"
          )}`
        }
      >
        <AddCircleOutlineIcon />
      </div>
      <div
        onClick={() =>
          `${switchPage("#settingsPage", currentUser.userID)}; ${pageTransition(
            "#settingsPage"
          )}`
        }
      >
        <SettingsSuggestIcon />
      </div>
      <div onClick={() => logout()}>
        <MeetingRoomIcon />
      </div>
    </div>
  );
};

export default Navigation;
