import { Link } from "react-router";
import ImageKit from "../imageKit/ImageKit";
import "./leftBar.css";
const LeftBar = () => {
  return (
    <div className="leftBar">
      <div className="menuIcons">
        <Link to="/" title="home" className="menuIcon">
          <ImageKit src="/general/logo.png" className="logo" alt="logo" />{" "}
        </Link>{" "}
        <Link to="/" title="home" className="menuIcon">
          <ImageKit src="/general/home.svg" alt="home" />{" "}
        </Link>{" "}
        <Link to="/create" title="create" className="menuIcon">
          <ImageKit src="/general/create.svg" alt="create" />{" "}
        </Link>{" "}
        <Link to="/" title="updates" className="menuIcon">
          <ImageKit src="/general/updates.svg" alt="updates" />{" "}
        </Link>{" "}
        <Link to="/" title="messages" className="menuIcon">
          <ImageKit src="/general/messages.svg" alt="messages" />{" "}
        </Link>
      </div>

      <Link to="/" title="messages" className="menuIcon">
        <ImageKit src="/general/settings.svg" alt="messages" />{" "}
      </Link>
    </div>
  );
};

export default LeftBar;
