import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "../../utils/fetch";
import ImageKit from "../imageKit/ImageKit";
import "./boards.css";
import { format } from "timeago.js";
import { Link } from "react-router";
const Boards = ({userId}) => {

  const { error, data, isPending } = useQuery({
    queryKey: ["boards" , userId],
  queryFn: () => apiRequest.get(`/boards/${userId}`).then((res)=>res.data),
  });

  console.log(error)
  if (isPending) return <p>Loading ...</p>;
  if (error) return <h3 style={{ textAlign: "center" }}>{error.response.data.message}</h3>;
  console.log(data)
if(data.boards.length==0)
  return <h3 style={{ textAlign: "center" }}>no boards yet</h3>  

  return (
    <div className="boards">
      {data.boards.map((board) => (
        <Link
          href={`/search?boardId=${board._id}`}
          className="board"
          key={board._id}
        >
          <ImageKit
            src={board?.pin?.media || "/placeholder.jpg"}
            alt="board of images"
          />
  
          <div className="BoardInfo">
            <h2>{board.title}</h2>
            <span>
              {board.pinsNumber} Pins • {format(board.createdAt)}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
  
}

export default Boards;
