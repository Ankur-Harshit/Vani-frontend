import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constant";

const Requests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔥 FETCH REQUESTS
  const fetchRequests = async () => {
    try {
      setLoading(true);

      const res = await axios.get(BASE_URL + "/user/requests/recieved", {
        withCredentials: true,
      });

      setRequests(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // 🔥 HANDLE ACTIONS (UI + OPTIMISTIC UPDATE)
  const handleAction = async (requestId, action) => {
    try {
        const res = await axios.post(BASE_URL + "/follow/review/" + action + "/" + requestId, {},{withCredentials:true,})

      // Optimistic UI update
      setRequests((prev) => prev.filter((r) => r._id !== requestId));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-xl mx-auto text-white border-x border-gray-800 min-h-screen">
      {/* HEADER */}
      <div className="px-4 py-3 border-b border-gray-800">
        <h1 className="text-xl font-bold">Follow Requests</h1>
      </div>

      {/* LIST */}
      <div>
        {loading && (
          <div className="p-4 text-center text-gray-500">Loading...</div>
        )}

        {!loading && requests.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            No pending requests
          </div>
        )}

        {requests.map((req) => {
          const user = req.fromUserId;

          return (
            <div
              key={req._id}
              className="flex items-center gap-3 px-4 py-3 border-b border-gray-800 hover:bg-gray-900 transition"
            >
              {/* AVATAR */}
              <img
                src={user.photoUrl}
                alt=""
                className="w-12 h-12 rounded-full object-cover"
              />

              {/* USER INFO */}
              <div className="flex-1">
                <p className="font-semibold">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-sm text-gray-400">
                  {user.about || "No bio available"}
                </p>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleAction(req._id, "accepted")}
                  className="px-3 py-1 text-sm bg-blue-500 rounded-full hover:bg-blue-600"
                >
                  Accept
                </button>

                <button
                  onClick={() => handleAction(req._id, "rejected")}
                  className="px-3 py-1 text-sm bg-gray-700 rounded-full hover:bg-gray-600"
                >
                  Reject
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
