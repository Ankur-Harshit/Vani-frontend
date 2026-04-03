import { useEffect, useState } from "react";
import axios from "axios";
import ProfileHeader from "./ProfileHeader";
import { BASE_URL } from "../utils/constant";
import { useNavigate, useParams } from "react-router-dom";

const ExploreProfile = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
    const { text } = useParams(); // use Params returns object;

  const fetchProfiles = async () => {
    try {
      const res = await axios.get(BASE_URL+"/user/explore/profiles/"+text, {
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

      {/* 👇 Recommended Users */}
      <div className="px-3 py-4">
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

export default ExploreProfile;
