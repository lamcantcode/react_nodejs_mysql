import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Post = () => {
	let { id } = useParams();

	const [postObject, setPostObject] = useState({});
	const [comments, setComments] = useState([]);
	const [newComment, setNewComment] = useState("");

	useEffect(() => {
		axios.get(`http://localhost:3001/posts/byId/${id}}`).then((respon) => {
			setPostObject(respon.data);
		});

		axios.get(`http://localhost:3001/comments/${id}}`).then((respon) => {
			setComments(respon.data);
		});
	}, []);

	const addComment = () => {
		axios
			.post("http://localhost:3001/comments", {
				commentBody: newComment,
				PostId: id,
			})
			.then((respon) => {
				const commentToAdd = { commentBody: newComment };
				setComments([...comments, commentToAdd]);
				setNewComment("");
			});
	};

	return (
		<div className="postPage">
			<div className="leftSide">
				<div className="post" id="individual">
					<div className="title">{postObject.title}</div>
					<div className="body">{postObject.postText}</div>
					<div className="footer">{postObject.username}</div>
				</div>
			</div>
			<div className="rightSide">
				<div className="addCommentContainer">
					<input
						type="text"
						placeholder="Comments..."
						value={newComment}
						onChange={(event) => setNewComment(event.target.value)}
					/>
					<button onClick={addComment}>Add Comment </button>
				</div>
				<div className="listOfComments">
					{comments.map((comments, key) => {
						return <div className="comment">{comments.commentBody}</div>;
					})}
				</div>
			</div>
		</div>
	);
};

export default Post;
