import "./createPage.css";
import ImageKit from "../../components/imageKit/ImageKit";
const CreatePage = () => {
  return (
    <div className="createPage">
      <div className="createTop">
        <h1>Create Pin</h1>
        <button>Publish</button>
      </div>
      <div className="createBottom">
        <div className="upload">
          <div className="uploadTitle">
            <ImageKit width={25} height={25} src="/general/upload.svg" alt="upload icon" />
            <span>Choose a file</span>
          </div> 
        
          <div className="uploadInfo">
            {" "}
            we recommend using high quality .jpeg files less than 20 files less
            than 200MB
          </div>
        </div>
        <form action="" className="createForm">
          <div className="createFormItem">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Add a title"
            />
          </div>
          <div className="createFormItem">
            <label htmlFor="description">Description</label>
            <textarea
              rows={6}
              id="description"
              name="description"
              placeholder="Add a detailed description"
            />
          </div>
          <div className="createFormItem">
            <label htmlFor="link">Link</label>
            <input type="text" id="link" name="link" placeholder="Add a link" />
          </div>
          <div className="createFormItem">
            <label htmlFor="board">Board</label>
            <select id="Board" name="Board">
              <option>Choose a board</option>
              <option value="1">Board 1</option>
              <option value="2">Board 2</option>
              <option value="3">Board 3</option>
            </select>
          </div>
          <div className="createFormItem">
            <label htmlFor="tag">Tagged topics</label>
            <input
              type="text"
              id="tag"
              name="tag"
              placeholder="Add a tag"
            />
            <small>Don&apos;t worry we won&apos;t see your tags </small>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePage;
