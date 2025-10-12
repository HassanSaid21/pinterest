import { Link } from "react-router";
import "./galleryItem.css";
import ImageKit from "../../../components/imageKit/ImageKit";
const GalleryItem = ({ item }) => {
  //const optimizedHeight = 250*item.height  /  item.width
  return (
    <div className="galleryItem">
      <ImageKit src={item.media} alt="painterest image" width={200} />
      <Link to={`/pin/${item._id}`} className="overlay" />

      <button className="save">save</button>

      <div className="actions">
        <button>
          {" "}
          <ImageKit src="/general/share.svg" alt="" />
        </button>
        <button>
          {" "}
          <ImageKit src="/general/more.svg" alt="" />
        </button>
      </div>
    </div>
  );
};

export default GalleryItem;
