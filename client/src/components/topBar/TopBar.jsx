import ImageKit from "../imageKit/ImageKit";
import UserButton from "../uerButton/UserButton";
import "./topBar.css";
import { useNavigate } from "react-router";
const TopBar = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.search.value)
    navigate(`/search?search=${e.target.search.value}`);
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
          <input name="search" type="text" placeholder="Search..." />
        </form>
    
      {/* USER */}
      <UserButton />
    </div>
  );
};

export default TopBar;
