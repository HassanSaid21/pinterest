import { Link, useNavigate } from 'react-router';
import ImageKit from '../../components/imageKit/ImageKit'
import PostInteractions from '../../components/postInteractions/PostInteractions';
import Comments from '../../components/comments/Comments';
import './postPage.css'

const PostPage = () => {
  const navigate  =useNavigate()
  return (
      <div className="postPage"  >
      <svg
      onClick={()=>navigate(-1)}
        height="20"
        viewBox="0 0 24 24"
        width="20"
        style={{ cursor: "pointer" }}
      >
        <path d="M8.41 4.59a2 2 0 1 1 2.83 2.82L8.66 10H21a2 2 0 0 1 0 4H8.66l2.58 2.59a2 2 0 1 1-2.82 2.82L1 12z"></path>
      </svg>
      <div className="postContainer">
        <div className="postImg">
          <ImageKit  src='pins/pin1.jpeg'  alt='image' width={736} />
        </div>
        <div className="postDetails" >
          <PostInteractions />
          <Link to = '/profile'  className='postUser'> 
          <ImageKit  src='general/noAvatar.png' alt='user image'  />
          <span> John doe</span>
          </Link>
          <Comments  />
        </div>
      </div> 
    </div>
  );
}

export default PostPage;
