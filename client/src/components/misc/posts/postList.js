import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { getPosts, getTimelinePost } from "../../../redux/actions/post"
import Post from "./eachPost"

const PostList = ({userId, postType}) =>{
    const dispatch = useDispatch()
    const posts = useSelector(state=> state.post.posts)

    useEffect(()=>{
        if(userId){
            if(postType === 'own')
                dispatch(getPosts(userId))
            else
                dispatch(getTimelinePost())
        }
    },[userId])
    return (
        <>
            {posts.map(post=>
                <Post post={post}/> 
                )}
        </>
    )
}

export default PostList