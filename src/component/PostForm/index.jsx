// path: redux-exemple/src/component/DragonForm/index.jsx
// import "./style.scss";
import {useSelector, useDispatch} from "react-redux"
import {selectPost, selectPosts} from "../../store/selector/post-selector.js";//TODO
import {addDragonAction, sortDragonAction} from "../../store/action/dragon-action.js";
import {useState} from "react";
import {addLogAction} from "../../store/action/log-action.js";
import {addPost, reversePost, setPost} from "../../store/slice/postSlice.js";//TODO

const PostForm = () => {
 
 const post = useSelector(selectPost)
 const posts = useSelector(selectPosts)
 const dispatch = useDispatch()
 const [error, setError] = useState("")
 
 const handleChange = (e) => {
  const {value} = e.target
  dispatch(selectPost(value))
 }
 
 const handleSubmit = (e) => {
  e.preventDefault()
  if (post.trim() === "") {
   setError("Merci de bien remplir le champs avant la soumission.")
   return
  }
  const exist = posts.find((newPost => newPost.name.toLowerCase() === post.toLowerCase()))
  if (exist !== undefined) {
   setError("Ce post existe déjà.")
   return
  }
  setError("")
  dispatch(addPost(post))
 }
 
 const onReverse = () => {
  dispatch(reversePost())
 }
 
 return (
  <div className="PostForm">
   <h2>Ajouter un post</h2>
   {
    error !== "" && <p style={{color: "red"}}>{error}</p>
   }
   <form onSubmit={handleSubmit}>
    <input type={"text"} value={post} onChange={handleChange} />
    <input type={"submit"} value={"Ajouter"} />
   </form>
   <button onClick={onReverse}>Inverser la liste</button>
  </div>
 )
}

export default PostForm