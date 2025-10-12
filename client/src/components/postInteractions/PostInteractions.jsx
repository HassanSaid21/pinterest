import ImageKit from "../imageKit/ImageKit";
import './postInteractions.css'

const PostInteractions = () => {
  return (
    <div className="postInteractions">
      <div className="interactionIcons">
        {" "}
        <ImageKit src="/general/react.svg" alt="" /> 273
        <ImageKit src="/general/share.svg" alt="" />{" "}
        <ImageKit src="/general/more.svg" alt="" />
      </div>
      <button>save</button>
    </div>
  );
};

export default PostInteractions;
