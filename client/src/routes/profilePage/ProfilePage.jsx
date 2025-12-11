import { useState } from "react";
import ImageKit from "../../components/imageKit/ImageKit";
import "./profilePage.css";

import Gallery from "../../components/gallery/Gallery";
import { useQuery } from "@tanstack/react-query";

import { useParams } from "react-router";
import Boards from "../../components/boards/Boards";
import { apiRequest } from "../../utils/fetch";
import useAuthStore from "../../utils/authStore";
import Following from "./following";

const fetchUser = async (username) => {
  const res = await apiRequest.get(`/users/${username}`);
  return res.data;
};


const ProfilePage = () => {
  const { username } = useParams();
  const [active, setActive] = useState(1);
  
  const { error, data, isPending } = useQuery({
    queryKey: ["profile" , username],
    queryFn: () => fetchUser(username),
  });

  if (isPending) return <p>Loading ...</p>;
  if (error) return <p>error occurred:{error.data.message}</p>;

  console.log(data);
  const { user , followerCount , followingCount , showButtons , isFollowing} = data;
  return (
    <div className="profilePage">
      <ImageKit
        src={user.img || "general/noAvatar.png"}
        alt={user.displayName}
        className="avatar"
      />
      <h1 className="profileName">{user.displayName}</h1>
      <span className="profileUsername">{user.username}</span>
      <div className="profileCounts">{followerCount} followers . {followingCount} followings</div>

    {showButtons&& <div className="profileInterations">
      <ImageKit src="general/share.svg" alt="share icon" />
      <div className="profileButtons">
        <button>Message</button>
        <Following username={user.username}  isFollowing={isFollowing}/>
      </div>
      <ImageKit src="general/more.svg" alt="more icon" />
    </div>
}
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
        {active === 1 ? <Gallery userId={user._id} /> : <Boards userId={user._id} />}
      </div>
    </div>
  );
};

export default ProfilePage;
