import { useEffect, useState } from "react";
import PostCard from "./PostCard";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../utils/constant";

const Post = () => {
  const [post, setPost] = useState(null);
  const [commentPosts, setCommentPosts] = useState([]);
  const [loadingPost, setLoadingPost] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);
  const [commentText, setCommentText] = useState("");

  const { postId } = useParams();

  // 🔹 Fetch Post
  const fetchPost = async () => {
    try {
      setLoadingPost(true);
      const res = await axios.get(BASE_URL + "/post/" + postId, {
        withCredentials: true,
      });
      setPost(res?.data?.post);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingPost(false);
    }
  };

  // 🔹 Fetch Comments
  const fetchCommentPost = async () => {
    try {
      setLoadingComments(true);
      const res = await axios.get(BASE_URL + "/comment/" + postId, {
        withCredentials: true,
      });
      setCommentPosts(res?.data?.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingComments(false);
    }
  };

  const handleAddComment = async () => {
    if (!commentText.trim()) return;

    try {
      const res = await axios.post(
        BASE_URL + "/comment/create/" + postId,
        { text: commentText },
        { withCredentials: true },
      );

      // 🔥 Optimistic UI update
      setCommentPosts((prev) => [res.data.data, ...prev]);
      setCommentText("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPost();
    fetchCommentPost();
  }, [postId]);

  return (
    <div className="max-w-xl mx-auto p-4">
      {/* 🔹 POST */}
      {loadingPost ? (
        <div className="text-center py-4">Loading post...</div>
      ) : post ? (
        <PostCard post={post} />
      ) : (
        <div className="text-center py-4 text-gray-500">Post not found</div>
      )}

      {/* 🔹 COMMENT INPUT (X style) */}
      <div className="flex items-center gap-2 mt-4 border-b pb-3">
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Post your reply..."
          className="flex-1 p-2 outline-none bg-transparent"
        />
        <button
          onClick={handleAddComment}
          className="bg-blue-500 text-white px-4 py-1 rounded-full disabled:opacity-50"
          disabled={!commentText.trim()}
        >
          Reply
        </button>
      </div>

      {/* 🔹 COMMENTS */}
      <div className="mt-4 space-y-4">
        {loadingComments ? (
          <div className="text-center py-4">Loading comments...</div>
        ) : commentPosts.length === 0 ? (
          <div className="text-center text-gray-500">No comments yet</div>
        ) : (
          commentPosts.map((post) => <PostCard key={post._id} post={post} />)
        )}
      </div>
    </div>
  );
};

export default Post;
