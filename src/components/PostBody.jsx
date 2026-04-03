import { useState } from "react";
import {
  HeartIcon,
  MessageIcon,
  RepeatIcon,
  ChartIcon,
  SparkleIcon, // ✅ added AI icon
} from "./icons";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useNavigate } from "react-router-dom";

export default function PostBody({ post, user }) {
  const [likesCount, setLikesCount] = useState(post?.likesCount || 0);
  const [liked, setLiked] = useState(post?.isLiked || false);
  const [loading, setLoading] = useState(false);
  const [explaination, setExplaination] = useState("");
  const navigate = useNavigate();

  const firstName = user.firstName;
  const lastName = user.lastName;
  const text = post.text;
  const mediaUrl = post.mediaUrls[0] || "";

  const handleExplain = async () => {
    try {
      const res = await axios.post(
        BASE_URL+"/feed/explain/post",
        { firstName, lastName, text, mediaUrl },
        {
          withCredentials: true,
        },
      );
      // console.log(res);
      setExplaination(res?.data?.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLike = async () => {
    if (loading) return;

    setLoading(true);

    // ✅ Optimistic update
    setLiked((prev) => !prev);
    setLikesCount((prev) => (liked ? prev - 1 : prev + 1));

    try {
      await axios.post(
        BASE_URL + "/like/" + post._id,
        {},
        {
          withCredentials: true,
        },
      );
    } catch (err) {
      console.error(err);

      // ❌ rollback
      setLiked((prev) => !prev);
      setLikesCount((prev) => (liked ? prev + 1 : prev - 1));
    } finally {
      setLoading(false);
    }
  };

  const isStory = post.type === "STORY";

  return (
    <div className="mt-3">
      {/* TEXT */}
      {post.text && (
        <p className="text-sm leading-6 text-zinc-200">{post.text}</p>
      )}

      {/* MEDIA */}
      {(post.mediaUrls?.length > 0 || isStory) && (
        <div
          className={`mt-3 overflow-hidden rounded-2xl border 
          ${
            isStory
              ? "p-[2px] bg-gradient-to-tr from-pink-500 via-rose-500 to-orange-400"
              : "border-white/10"
          }`}
        >
          <div
            className={`${isStory ? "bg-black rounded-2xl overflow-hidden" : ""}`}
          >
            {/* STORY LABEL */}
            {isStory && (
              <div className="px-3 py-2 text-xs text-pink-400 font-medium border-b border-white/10">
                ⏳ Stories expire after 24 hrs
              </div>
            )}

            {/* SINGLE IMAGE */}
            {post.mediaUrls.length === 1 && (
              <img
                src={post.mediaUrls[0]}
                alt=""
                className="w-full max-h-[500px] object-cover"
              />
            )}

            {/* TWO IMAGES */}
            {post.mediaUrls.length === 2 && (
              <div className="grid grid-cols-2 gap-[2px]">
                {post.mediaUrls.map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt=""
                    className="w-full h-[300px] object-cover"
                  />
                ))}
              </div>
            )}

            {/* THREE OR MORE */}
            {post.mediaUrls.length >= 3 && (
              <div className="grid grid-cols-2 gap-[2px]">
                {post.mediaUrls.slice(0, 4).map((url, index) => (
                  <div key={index} className="relative">
                    <img
                      src={url}
                      alt=""
                      className="w-full h-[200px] object-cover"
                    />

                    {index === 3 && post.mediaUrls.length > 4 && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center text-white text-xl font-semibold">
                        +{post.mediaUrls.length - 4}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ACTIONS */}
      <div className="mt-4 grid grid-cols-5 items-center text-zinc-500">
        <div className="flex justify-center">
          <Action
            icon={MessageIcon}
            onClick={() => navigate("/post/" + post._id)}
            count={post.commentsCount}
          />
        </div>

        <div className="flex justify-center">
          <Action icon={RepeatIcon} count="200" />
        </div>

        <div className="flex justify-center">
          <Action
            icon={HeartIcon}
            count={likesCount}
            active={liked}
            onClick={handleLike}
          />
        </div>

        <div className="flex justify-center">
          <Action icon={ChartIcon} count="200" />
        </div>

        <div className="flex justify-center">
          {/* AI BUTTON */}
          <button
            onClick={handleExplain}
            className="group flex items-center gap-2 rounded-full px-3 py-2 text-sm transition-all
      text-violet-400 hover:text-white hover:bg-violet-500/20"
          >
            <SparkleIcon className="h-5 w-5 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      </div>

      {/* ✅ AI EXPLAIN MODAL */}
      {explaination && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-zinc-900 w-full max-w-lg mx-4 rounded-2xl p-5 relative border border-white/10">
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setExplaination("")}
              className="absolute top-3 right-3 text-zinc-400 hover:text-white text-lg"
            >
              ✕
            </button>

            {/* TITLE */}
            <h2 className="text-white text-lg font-semibold mb-3">
              AI Explanation
            </h2>

            {/* CONTENT */}
            <p className="text-sm text-zinc-300 leading-6 whitespace-pre-wrap">
              {explaination}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

function Action({ icon: Icon, count, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-full px-3 py-2 text-sm transition
      ${active ? "text-red-500" : "text-zinc-500"}
      hover:bg-white/[0.04] hover:text-white`}
    >
      <Icon className="h-5 w-5" />
      <span>{count}</span>
    </button>
  );
}
