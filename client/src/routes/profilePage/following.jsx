import {  useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-toastify"
import { apiRequest } from "../../utils/fetch"

async function followUser(username){
  const res  = await apiRequest.post(`/users/follow/${username}`, {})
  return res.data
}
export default function Following({username , isFollowing}) {
 const queryClient = useQueryClient()

  const {mutate , isPending} = useMutation({
    mutationFn:followUser,
    onSuccess :(data)=>{
      queryClient.invalidateQueries({queryKey:['profile' , username]})
      toast.success(data.message)
    }
  })
  return (
    <button onClick={()=>{mutate(username)}}  style={isPending?{opacity:0.5 , cursor:'not-allowed'
    }:{}}>{isPending
    ? "wait"
    : isFollowing
    ? "Unfollow"
    : "Follow"}</button>
  )
}
