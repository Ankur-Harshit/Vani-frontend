import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constant";
import { useParams } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";

const Followings = () => {
  const { userId } = useParams();

  const [following, setFollowing] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔥 FETCH FOLLOWING
  const fetchFollowing = async () => {
    if (loading) return;

    try {
      setLoading(true);

      const res = await axios.get(`${BASE_URL}/user/${userId}/following`, {
        params: { cursor: nextCursor },
        withCredentials: true,
      });

      const newData = res.data.data;

      setFollowing((prev) => (nextCursor ? [...prev, ...newData] : newData));

      setNextCursor(res.data.nextCursor);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFollowing();
  }, [userId]);

  // 🔥 INFINITE SCROLL
  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;

      if (bottom && nextCursor) {
        fetchFollowing();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, nextCursor]);

  return (
    <div className="max-w-xl mx-auto text-white border-x border-gray-800 min-h-screen">
      {/* HEADER */}
      <div className="px-4 py-3 border-b border-gray-800">
        <h1 className="text-xl font-bold">Following</h1>
      </div>

      {/* LIST */}
      {following.map((f) => {
        const user = f.followingId;

        return (
          <div
            key={f._id}
            className="px-4 py-3 border-b border-gray-800 hover:bg-gray-900"
          >
            <ProfileHeader
              user={user}
              time={""}
            />
          </div>
        );
      })}

      {loading && (
        <div className="p-4 text-center text-gray-500">Loading...</div>
      )}
    </div>
  );
};

export default Followings;
