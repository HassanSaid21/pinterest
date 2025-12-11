import ImageKit from "../imageKit/ImageKit";
import "./postInteractions.css";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../../utils/fetch";
import { toast } from "react-toastify";

const PostInteractions = ({ pinId }) => {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["interactions", pinId],
    queryFn: () =>
      apiRequest.get(`/pins/interaction-check/${pinId}`).then((res) => res.data),
  });

  const { isLiked, isSaved, likeCount } = data || {};

  const { mutate: interact } = useMutation({
    mutationFn: (type) =>
      apiRequest.post(`/pins/interact/${pinId}`, { type }).then((res) => res.data),

    // 🔥 Optimistic update
    onMutate: async (type) => {
      await queryClient.cancelQueries(["interactions", pinId]);

      const previousData = queryClient.getQueryData(["interactions", pinId]);
       console.log(previousData)
      queryClient.setQueryData(["interactions", pinId], (old) => {
        if (!old) return old;

        return {
          ...old,
          isLiked: type === "like" ? !old.isLiked : old.isLiked,
          isSaved: type === "save" ? !old.isSaved : old.isSaved,
          likeCount:
            type === "like"
              ? old.isLiked
                ? old.likeCount - 1 // unlike
                : old.likeCount + 1 // like
              : old.likeCount,
        };
      });

      // return context to rollback on error
      return { previousData };
    },

    // 🔥 Rollback if server fails
    onError: (error, variables, context) => {
      queryClient.setQueryData(["interactions", pinId], context.previousData);
      toast.error("Failed. Please try again.");
    },

    // 🔥 Refetch to sync with server
    onSettled: () => {
      queryClient.invalidateQueries(["interactions", pinId]);
    },
  });

  return (
    <div className="postInteractions">
      <div className="interactionIcons">
        <svg
          onClick={() => interact("like")}
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
            stroke={isLiked ? "#e50829" : "#000000"}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill={isLiked ? "#e50829" : "none"}
          />
        </svg>

        {likeCount}

        <ImageKit src="/general/share.svg" alt="" />
        <ImageKit src="/general/more.svg" alt="" />
      </div>

      <button onClick={() => interact("save")}>
        {isSaved ? "Saved" : "Save"}
      </button>
    </div>
  );
};

export default PostInteractions;
