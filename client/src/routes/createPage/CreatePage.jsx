import "./createPage.css";
import ImageKit from "../../components/imageKit/ImageKit";
import { useNavigate } from "react-router";
import useAuthStore from "../../utils/authStore";
import { useEffect, useRef, useState } from "react";
import Editor from "../../components/editor/Editor";
import useEditorStore from "../../utils/editorStore";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "../../utils/fetch";

const addPost = async (post) => {
  const res = await apiRequest.post("/pins", post);
  return res.data;
};

const CreatePage = () => {
  const formRef = useRef();
  const navigate = useNavigate();
  const { currentUser } = useAuthStore();
  const { canvasOptions, textOptions, resetStore } = useEditorStore();
  const [file, setFile] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [previewImg, setPreviewImg] = useState({
    url: "",
    height: 0,
    width: 0,
  });

  useEffect(() => {
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    const img = new Image();

    img.src = objectUrl;

    img.onload = () => {
      setPreviewImg({
        url: objectUrl,
        height: img.height,
        width: img.width,
      });
    };

    // Cleanup
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  useEffect(() => {
    if (!currentUser) {
      navigate("/auth", { replace: true });
    }
  }, [currentUser, navigate]);

  // FIXED: CHANGE DIRECT REQUEST TO MUTATION
  const mutation = useMutation({
    mutationFn: addPost,
    onSuccess: (data) => {
      resetStore();
      navigate(`/pins/${data._id}`);
    },
  });

  const handleSubmit = () => {
    if (isEditing) {
      setIsEditing(false);
    } else {
      const formData = new FormData(formRef.current);
      formData.append("media", file);
      formData.append("textOptions", JSON.stringify(textOptions));
      formData.append("canvasOptions", JSON.stringify(canvasOptions));

      mutation.mutate(formData);
    }
  };
  return (
    <div className="createPage">
      <div className="createTop">
        <h1> {isEditing ? "Design Your pin" : "Create Pin"}</h1>
        <button onClick={handleSubmit}>{isEditing ? "Done" : "Publish"}</button>
      </div>

      {isEditing ? (
        <Editor previewImg={previewImg} />
      ) : (
        <div className="createBottom">
          {previewImg.url ? (
            <div className="preview">
              <img src={previewImg.url} alt="preview image" />
              <div className="edit-icon" onClick={() => setIsEditing(true)}>
                <ImageKit src="/general/edit.svg" alt="edit icon" />
              </div>
            </div>
          ) : (
            <>
              <label htmlFor="file" className="upload">
                <div className="uploadTitle">
                  <ImageKit
                    width={25}
                    height={25}
                    src="/general/upload.svg"
                    alt="upload icon"
                  />
                  <span>Choose a file</span>
                </div>

                <div className="uploadInfo">
                  we recommend using high quality .jpeg files less than 20 files
                  , less than 200MB
                </div>
              </label>
              <input
                type="file"
                hidden
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </>
          )}
          <form action="" className="createForm" ref={formRef}>
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
              <input
                type="text"
                id="link"
                name="link"
                placeholder="Add a link"
              />
            </div>
            <div className="createFormItem">
              <label htmlFor="board">Board</label>
              <select id="board" name="Board">
                <option value="">Choose a board</option>
                <option value="1">Board 1</option>
                <option value="2">Board 2</option>
                <option value="3">Board 3</option>
              </select>
            </div>
            <div className="createFormItem">
              <label htmlFor="tag">Tagged topics</label>
              <input type="text" id="tag" name="tag" placeholder="Add a tag" />
              <small>Don&apos;t worry we won&apos;t see your tags </small>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreatePage;
