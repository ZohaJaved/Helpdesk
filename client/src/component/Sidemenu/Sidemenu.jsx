import React,{useContext,useState} from 'react';
import { Link,useLocation } from 'react-router-dom';

import Context from "../../context/roleContext.js";
import { CustomerElemets,AdminElements, ClientElements } from './navElementsList.js';
import "./Sidemenu.css"


function SideMenu() {
  const [activeItem, setActiveItem] = useState("")
  let navElements = undefined;
  const location = useLocation();

  const { userType } = useContext(Context);
  if (userType === "Customer") {
    navElements = CustomerElemets;
  }
  if (userType === "Admin") {
    navElements = AdminElements;
  }
  if (userType === "Agent") {
    navElements = ClientElements;
  }

  const handleItemClick = (path) => { setActiveItem(path); };


  console.log("navElements", navElements);
  return (
    <div className="side-menu">
      {" "}
      <h2 style={{color:'black'}}>Menu</h2>{" "}
      <ul>
        {" "}
        {navElements &&
          navElements.map((element) => (
            <li
              key={element.path}
              className={location.pathname === element.path ? "active" : ""}
              onClick={() => handleItemClick(element.path)}
            >
              {" "}
              <Link to={element.path}>{element.elementName}</Link>{" "}
            </li>
          ))}{" "}
      </ul>{" "}
    </div>
  );
}

export default SideMenu;