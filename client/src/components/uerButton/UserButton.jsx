import { useState } from "react";
import "./userButton.css";
import ImageKit from "../imageKit/ImageKit";

const UserButton = () => {
  const [open, setOpen] = useState(false);
  const currentUser = true;
  return currentUser ? (
    <div className="userButton">
      <ImageKit
        src="/general/noAvatar.png"
        className="avatar"
        alt="user image"
        
      />
    
      <ImageKit
            onClick={() => setOpen((val) => !val)}  
        src="/general/arrow.svg"
        alt="drop down "
        className="arrow"
      />
        
      {open && (
        <div className="userOptionsMenu">
          <div className="userOption ">Profile</div>
          <div className="userOption">Settings</div>
          <div className="userOption">Logout</div>
        </div>
      )}
    </div>
  ) : (
    <a href="/signin" className="signIn">
      Sign In
    </a>
  );
};

export default UserButton;
