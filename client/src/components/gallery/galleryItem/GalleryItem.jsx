import { Link } from "react-router";
import "./galleryItem.css";
import ImageKit from "../../../components/imageKit/ImageKit";
const GalleryItem = ({ item }) => {
  const optimizedHeight = (372 * item.height) / item.width;
  return (
    <div
      className="galleryItem"
      style={{ gridRowEnd: `span ${Math.ceil(item.height / 100)}` }}
    >
      <ImageKit src={item.media} alt="painterest image" width={372}  h={optimizedHeight} />
      <Link to={`/pins/${item._id}`} className="overlay" />

      <button className="save">save</button>
      <div className="actions">
        <button>
          {" "}
          <ImageKit src="/general/share.svg" alt="share" />
        </button>
        <button>
          {" "}
          <ImageKit src="/general/more.svg" alt="more options" />
        </button>
      </div>
    </div>
  );
};

export default GalleryItem;
