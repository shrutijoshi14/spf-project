// 
import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { 
  FaTachometerAlt, 
  FaMoneyCheckAlt, 
  FaChartBar, 
  FaHistory, 
  FaCog, 
  FaSignOutAlt 
} from "react-icons/fa";

const Sidebar = () => {
  return (
    <StyledWrapper>
      <div className="input">

        <NavLink to="/maindashboard" className="value">
          <FaTachometerAlt />
          Dashboard
        </NavLink>

        <NavLink to="/loans" className="value">
          <FaMoneyCheckAlt />
          Loans
        </NavLink>

        <NavLink to="/reports" className="value">
          <FaChartBar />
          Reports
        </NavLink>

        <NavLink to="/payment-history" className="value">
          <FaHistory />
          Payment History
        </NavLink>

        <NavLink to="/settings" className="value">
          <FaCog />
          Settings
        </NavLink>

        <NavLink to="/logout" className="value">
          <FaSignOutAlt />
          Logout
        </NavLink>

      </div>
    </StyledWrapper>
  );
};

export default Sidebar;


const StyledWrapper = styled.div`
  .input {
    position: fixed;
    top: 80px;
    left: 0;
    height: calc(100vh - 80px);
    width: 170px;
    background-color: #222;
    display: flex;
    flex-direction: column;
    padding-top: 20px;
  }

  .value {
    text-decoration: none;
    background: transparent;
    padding: 12px;
    margin: 6px 10px;
    color: #dcdcdc;
    display: flex;
    gap: 10px;
    align-items: center;
    border-radius: 6px;
    font-size: 15px;
    transition: 0.3s;
  }

  .value:hover {
    background-color: #444;
    color: white;
  }

  /* 🔥 Highlight Active Menu */
  .value.active {
    background-color: white;
    color: black;
    font-weight: 600;
    box-shadow: 0px 3px 6px rgba(255, 255, 255, 0.2);
    position: relative;
  }

  /* Blue left bar */
  .value.active::before {
    content: "";
    position: absolute;
    left: -8px;
    top: 6px;
    width: 5px;
    height: 80%;
    background-color: #2f81f7;
    border-radius: 5px;
  }
`;
