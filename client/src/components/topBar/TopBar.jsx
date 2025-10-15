import ImageKit from "../imageKit/ImageKit";
import UserButton from "../uerButton/UserButton";
import "./topBar.css";
import { useNavigate } from "react-router";
const TopBar = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?search=${e.target[0].value}`);
  };
  return (
    <div className="topBar">
      {/* SESRCH */}
  
        <form className="search"  onSubmit={handleSubmit}>
          <ImageKit
            src="/general/search.svg"
            className="searchIcon"
            alt="search icon"
          />
          <input type="text" placeholder="Search..." />
        </form>
    
      {/* USER */}
      <UserButton />
    </div>
  );
};

export default TopBar;
