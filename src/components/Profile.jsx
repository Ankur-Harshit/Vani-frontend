import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";
import PostCard from "./PostCard";

import { BASE_URL } from "../utils/constant";

export default function Profile() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState(null);
  const [posts, setPosts] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loadingAction, setLoadingAction] = useState(false);

  // ✅ NEW STATE (for infinite scroll)
  const [loadingPosts, setLoadingPosts] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (profileData?.canViewPosts) {
      fetchPosts(true);
    }
  }, [profileData]);

  // ✅ INFINITE SCROLL EFFECT
  useEffect(() => {
    const handleScroll = () => {
      if (!hasMore || loadingPosts) return;

      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const fullHeight = document.documentElement.scrollHeight;

      if (scrollTop + windowHeight >= fullHeight - 200) {
        fetchPosts();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loadingPosts, cursor]);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/profile/" + userId, {
        withCredentials: true,
      });
      setProfileData(res.data);
      // console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPosts = async (reset = false) => {
    if (!hasMore && !reset) return;
    if (loadingPosts) return; // ✅ prevent multiple calls

    try {
      setLoadingPosts(true);

      const res = await axios.get(
        BASE_URL + `/post/user/${userId}?cursor=${reset ? "" : cursor || ""}`,
        { withCredentials: true },
      );

      setPosts((prev) => (reset ? res.data.data : [...prev, ...res.data.data]));
      setCursor(res.data.nextCursor);
      setHasMore(res.data.hasMore);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingPosts(false);
    }
  };

  // =========================
  // 🔥 FOLLOW ACTION HANDLERS
  // =========================

  const handleFollow = async () => {
    try {
      setLoadingAction(true);
      await axios.post(
        BASE_URL + `/follow/${userId}`,
        {},
        { withCredentials: true },
      );

      setProfileData((prev) => ({
        ...prev,
        followStatus: prev?.profileUser?.isPrivate ? "pending" : "following",
      }));
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAction(false);
    }
  };

  const handleWithdraw = async () => {
    try {
      setLoadingAction(true);
      await axios.post(
        BASE_URL + `/follow/withdraw/${userId}`,
        {},
        { withCredentials: true },
      );

      setProfileData((prev) => ({
        ...prev,
        followStatus: "not_following",
      }));
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAction(false);
    }
  };

  const handleUnfollow = async () => {
    try {
      setLoadingAction(true);
      await axios.post(
        BASE_URL + `/unfollow/${userId}`,
        {},
        { withCredentials: true },
      );

      setProfileData((prev) => ({
        ...prev,
        followStatus: "not_following",
      }));
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAction(false);
    }
  };

  if (!profileData) return <div className="p-4 text-white">Loading...</div>;

  const { profileUser, isOwnProfile, followStatus, canViewPosts } = profileData;

  const renderFollowButton = () => {
    if (isOwnProfile) {
      return (
        <button
          className="border border-white/30 px-4 py-1.5 rounded-full font-semibold hover:bg-white/10"
          onClick={() => navigate("/edit")}
        >
          Set up profile
        </button>
      );
    }

    if (loadingAction) {
      return (
        <button className="bg-gray-500 px-4 py-1.5 rounded-full font-semibold">
          Processing...
        </button>
      );
    }

    switch (followStatus) {
      case "following":
        return (
          <button
            onClick={handleUnfollow}
            className="bg-white text-black px-4 py-1.5 rounded-full font-semibold hover:bg-red-500 hover:text-white"
          >
            Unfollow
          </button>
        );

      case "pending":
        return (
          <button
            onClick={handleWithdraw}
            className="border border-white/30 px-4 py-1.5 rounded-full font-semibold hover:bg-white/10"
          >
            Requested
          </button>
        );

      default:
        return (
          <button
            onClick={handleFollow}
            className="bg-white text-black px-4 py-1.5 rounded-full font-semibold hover:bg-gray-200"
          >
            Follow
          </button>
        );
    }
  };

  return (
    <div className="max-w-2xl mx-auto border-x border-white/10 min-h-screen bg-black text-white">
      {/* TOP BAR */}
      <div className="sticky top-0 z-50 bg-black/80 backdrop-blur border-b border-white/10 px-4 py-3 flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="text-lg hover:bg-white/10 rounded-full px-2 py-1"
        >
          ←
        </button>

        <div>
          <h2 className="font-bold text-lg">
            {profileUser.firstName} {profileUser.lastName}
          </h2>
          <p className="text-xs text-white/50">{profileUser.postsCount} posts</p>
        </div>
      </div>

      {/* PROFILE HEADER */}
      <div className="px-4 pt-6 pb-4 border-b border-white/10">
        <div className="flex justify-between items-start">
          <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-400">
            <img
              src={profileUser.photoUrl}
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>

          <div>{renderFollowButton()}</div>
        </div>

        <div className="mt-4">
          <h2 className="text-xl font-bold">
            {profileUser.firstName} {profileUser.lastName}
          </h2>
          <p className="text-white/50">@{profileUser.username}</p>
        </div>

        {profileUser.about && (
          <p className="mt-3 text-sm">{profileUser.about}</p>
        )}

        <div className="flex gap-6 mt-3 text-sm text-white/70">
          <button onClick={() => navigate("/followings/" + profileUser._id)}>
            <b className="text-white">{profileUser.followingCount || 0}</b>{" "}
            Following
          </button>
          <button onClick={() => navigate("/followers/" + profileUser._id)}>
            <b className="text-white">{profileUser.followersCount || 0}</b>{" "}
            Followers
          </button>
        </div>
      </div>

      {/* POSTS */}
      {!canViewPosts ? (
        <div className="text-center py-16 text-white/60">
          🔒 This account is private <br />
          Follow to see their posts
        </div>
      ) : (
        <>
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}

          {/* Optional loader */}
          {loadingPosts && (
            <div className="text-center py-4 text-white/50">
              Loading more...
            </div>
          )}

          {/* Optional fallback */}
          {hasMore && !loadingPosts && (
            <div
              onClick={() => fetchPosts()}
              className="text-center py-5 cursor-pointer text-blue-400 hover:underline"
            >
              Load more
            </div>
          )}
        </>
      )}
    </div>
  );
}
