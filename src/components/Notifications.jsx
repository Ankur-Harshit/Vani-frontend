import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constant";
import { useNavigate } from "react-router-dom";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // 🔥 FETCH FUNCTION
  const fetchNotifications = async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);

      const res = await axios.get(BASE_URL + "/user/notifications", {
        params: { cursor: nextCursor },
        withCredentials: true,
      });
        // console.log(res);

      const newData = res.data.data;

      setNotifications((prev) =>
        nextCursor ? [...prev, ...newData] : newData,
      );

      setNextCursor(res.data.nextCursor);
      setHasMore(res.data.hasMore);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 INITIAL LOAD
  useEffect(() => {
    fetchNotifications();
  }, []);

  // 🔥 SIMPLE INFINITE SCROLL
  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;

      if (bottom) {
        fetchNotifications();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore, nextCursor]);

  // 🔥 MESSAGE FORMATTER
  const getMessage = (n) => {
    const name = `${n.actorId?.firstName || ""} ${n.actorId?.lastName || ""}`;

    switch (n.type) {
      case "LIKE":
        return `${name} liked your post`;

      case "COMMENT":
        return `${name} commented on your post`;

      case "FOLLOW_SENT":
        return `${name} sent you a follow request`;

      case "FOLLOW_ACCEPT":
        return `${name} accepted your follow request`;

      case "FOLLOWING":
        return `${name} started following you`;

      default:
        return n.text || "New notification";
    }
  };

  return (
    <div className="max-w-xl mx-auto text-white border-x border-gray-800 min-h-screen">
      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
        <h1 className="text-xl font-bold">Notifications</h1>
        <button className="text-gray-400">⚙️</button>
      </div>

      {/* FOLLOW REQUESTS */}
      <div
        onClick={() => navigate("/requests")}
        className="px-4 py-3 border-b border-gray-800 cursor-pointer hover:bg-gray-900"
      >
        <p className="font-semibold">Follow Requests</p>
        <p className="text-sm text-gray-400">Approve or ignore requests</p>
      </div>

      {/* LIST */}
      <div>
        {notifications.map((n) => (
          <div
            key={n._id}
            className="flex gap-3 px-4 py-3 border-b border-gray-800 hover:bg-gray-900 transition"
          >
            {/* AVATAR */}
            <img
              src={n.actorId?.photoUrl}
              alt=""
              className="w-10 h-10 rounded-full object-cover"
            />

            {/* CONTENT */}
            <div className="flex-1">
              <p className="text-sm text-gray-300">{getMessage(n)}</p>

              {/* POST PREVIEW */}
              {n.postId?.mediaUrls?.[0] && (
                <img
                  src={n.postId.mediaUrls[0]}
                  alt=""
                  className="w-16 h-16 mt-2 rounded-md object-cover"
                />
              )}
            </div>
          </div>
        ))}

        {/* LOADING / END */}
        {loading && (
          <div className="p-4 text-center text-gray-500">Loading...</div>
        )}

        {!hasMore && (
          <div className="p-4 text-center text-gray-500">
            You're all caught up 🎉
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
