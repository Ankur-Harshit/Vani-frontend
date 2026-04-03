import { useEffect, useState } from "react";
import axios from "axios";
import ProfileHeader from "./ProfileHeader";
import { BASE_URL } from "../utils/constant";
import { useNavigate } from "react-router-dom";

const Explore = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
    const [text, setText] = useState("");
    const navigate = useNavigate();

  const fetchProfiles = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/feed/profiles`, {
        withCredentials: true,
      });

      setProfiles(res?.data?.data || []);
    } catch (err) {
      console.error("Error fetching recommended profiles", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto border-x border-gray-800 min-h-screen bg-black">
      {/* 🔍 Search Bar */}
      <div className="sticky top-0 bg-black z-10 px-3 py-3 border-b border-gray-800 flex gap-2">
        <input
          type="text"
          placeholder="Search"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 bg-gray-900 text-white px-4 py-2.5 rounded-full outline-none text-sm"
        />

        <button
          onClick={()=>navigate("/explore/profiles/"+text)}
          className="px-4 py-2.5 bg-sky-500 text-white text-sm rounded-full hover:bg-sky-600 transition"
        >
          Search
        </button>
      </div>

      {/* 👇 Recommended Users */}
      <div className="px-3 py-4">
        <h2 className="text-lg font-semibold text-white mb-3">
          Recommended for you
        </h2>

        {loading ? (
          <p className="text-gray-400 text-sm">Loading...</p>
        ) : profiles.length === 0 ? (
          <p className="text-gray-400 text-sm">No recommendations found</p>
        ) : (
          <div className="divide-y divide-gray-800">
            {profiles.map((user) => (
              <div
                key={user._id}
                className="py-3 hover:bg-gray-900 px-2 rounded-lg transition"
              >
                <ProfileHeader user={user} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Explore;
