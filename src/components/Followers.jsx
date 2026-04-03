import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constant";
import { useParams } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";

const Followers = () => {
  const { userId } = useParams();

  const [followers, setFollowers] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [loading, setLoading] = useState(false);

  // 🔥 FETCH FOLLOWERS
  const fetchFollowers = async () => {
    if (loading) return;

    try {
      setLoading(true);

      const res = await axios.get(`${BASE_URL}/user/${userId}/followers`, {
        params: { cursor: nextCursor },
        withCredentials: true,
      });

        const newData = res?.data?.data;
        console.log(res);

      setFollowers((prev) => (nextCursor ? [...prev, ...newData] : newData));

      setNextCursor(res.data.nextCursor);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFollowers();
  }, []);

  // 🔥 INFINITE SCROLL
  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;

      if (bottom && nextCursor) {
        fetchFollowers();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, nextCursor]);

  return (
    <div className="max-w-xl mx-auto text-white border-x border-gray-800 min-h-screen">
      {/* HEADER */}
      <div className="px-4 py-3 border-b border-gray-800">
        <h1 className="text-xl font-bold">Followers</h1>
      </div>

      {/* LIST */}
      {followers.map((f) => {
        const user = f.followerId;

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

export default Followers;
