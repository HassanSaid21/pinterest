import ImageKit from "../imageKit/ImageKit";
import UserButton from "../uerButton/UserButton";
import "./topBar.css";
const TopBar = () => {
  return (
    <div className="topBar">
      {/* SESRCH */}
      <div className="search">
        <ImageKit
          src="/general/search.svg"
          className="searchIcon"
          alt="search icon"
        />
        <input type="text" placeholder="Search..." />
      </div>
      {/* USER */}
      <UserButton />
    </div>
  );
};

export default TopBar;
