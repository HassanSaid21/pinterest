import { useState } from "react";
import "./userButton.css";
import ImageKit from "../imageKit/ImageKit";
import { apiRequest } from "../../utils/fetch";
import { toast } from "react-toastify";
import { Link,  useNavigate } from "react-router";
import useAuthStore from "../../utils/authStore";

const UserButton = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate()
   const {removeCurrentUser  , currentUser}  = useAuthStore() 
   console.log(currentUser)
   async function handleLogout(){
   try{
    const res  = await apiRequest.post('/users/logout' ,{})
    toast.success(res.data.message)
    navigate('/auth')
     removeCurrentUser()
   }
   catch(err){
    toast.error(err.response.data.message)
    
   }
  }
  

  return currentUser ? (
    <div className="userButton"  onClick={() => setOpen((val) =>!val)}  >
      <ImageKit
        src={currentUser.img||'/general/noAvatar.png'}
        className="avatar"
        alt="user image"
        
      />
    
      <ImageKit
           
        src="/general/arrow.svg"
        alt="drop down "
        className="arrow"
      />
        
      {open && (
        <div className="userOptionsMenu">
          <Link to={`/${currentUser.username}`} className="userOption "> Profile  </Link>
          <div className="userOption">Settings</div>
          <div className="userOption" onClick={handleLogout}>Logout</div>
        </div>
      )}
    </div>
  ) : (
    <Link to="/auth" className="signIn">
      Sign In
    </Link>
  );
};

export default UserButton;
