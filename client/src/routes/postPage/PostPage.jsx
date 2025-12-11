import { Link, useNavigate, useParams } from "react-router";
import ImageKit from "../../components/imageKit/ImageKit";
import PostInteractions from "../../components/postInteractions/PostInteractions";
import Comments from "../../components/comments/Comments";
import "./postPage.css";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchPin = async (id) => {
  const res = await axios.get(
    `${import.meta.env.VITE_BACKEND_API_ENDPOINT}/pins/${id}`
  );
  return res.data;
};

const PostPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, error, isPending } = useQuery({
    queryKey: ["pin", id],
    queryFn: () => fetchPin(id),
  });

  if (isPending) return <h3>Loading...</h3>;
  if (error) return <h3> {error.message}</h3>;
  if (!data) return <h3>no pin exist</h3>;
  return (
    <div className="postPage">
      <svg
        onClick={() => navigate(-1)}
        height="20"
        viewBox="0 0 24 24"
        width="20"
        style={{ cursor: "pointer" }}
      >
        <path d="M8.41 4.59a2 2 0 1 1 2.83 2.82L8.66 10H21a2 2 0 0 1 0 4H8.66l2.58 2.59a2 2 0 1 1-2.82 2.82L1 12z"></path>
      </svg>
      <div className="postContainer">
        <div className="postImg">
          <ImageKit src={data.media} alt="image" width={736} />
        </div>
        <div className="postDetails">
          <PostInteractions pinId={id} />
          <Link to={`/${data.user.username}`} className="postUser">
            <ImageKit
              src={data.user.img || "general/noAvatar.png"}
              alt="user image"
            />
            <span> {data.user.displayName}</span>
          </Link>
          <Comments  />
        </div>
      </div>
    </div>
  );
}

export default PostPage;
