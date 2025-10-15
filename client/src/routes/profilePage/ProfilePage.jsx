import { useState } from "react";
import ImageKit from "../../components/imageKit/ImageKit";
import "./profilePage.css";
import Collections from "../../components/collections/Collections";
import Gallery from "../../components/gallery/Gallery";
const ProfilePage = () => {
  const [active, setActive] = useState(1);

  return (
    <div className="profilePage">
      <ImageKit
        src="/general/noAvatar.png"
        alt="user image"
        className="avatar"
      />
      <h1 className="profileName">John Doe</h1>
      <span className="profileUsername">@Johndoe</span>
      <div className="profileCounts">10 followers . 20 followings</div>

      <div className="profileInterations">
        <ImageKit src="general/share.svg" alt="share icon" />
        <div className="profileButtons">
          <button>Message</button>
          <button>Follow</button>
        </div>
        <ImageKit src="general/more.svg" alt="more icon" />
      </div>

      <div className="profileOptions">
        <span
          onClick={() => setActive(1)}
          className={active == 1 ? "active" : ""}
        >
          Created
        </span>
        <span
          onClick={() => setActive(2)}
          className={active == 2 ? "active" : ""}
        >
          Saved
        </span>
      </div>
      <div className="images">
        {active === 1 ? <Gallery /> : <Collections />}
      </div>
    </div>
  );
};

export default ProfilePage;
