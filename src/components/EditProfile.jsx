import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";
import { BASE_URL } from "../utils/constant";

export default function EditProfile() {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [username, setUsername] = useState(user?.username || "");
  const [about, setAbout] = useState(user?.about || "");
  const [photoPreview, setPhotoPreview] = useState(user?.photoUrl || "");
  const [isPrivate, setIsPrivate] = useState(user?.isPrivate);
  const [notificationsOn, setNotificationsOn] = useState(
    user?.settings?.notifications,
  );
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogOut = async () => {
    try {
      setLoading(true);
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/home");
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  /* ==============================
     🖼️ IMAGE UPLOAD
  ============================== */
  const handleImageChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setPhotoPreview(URL.createObjectURL(selectedFile));
    setFile(selectedFile);

    await uploadProfilePhoto(selectedFile);
  };

  const uploadProfilePhoto = async (file) => {
    try {
      const formData = new FormData();
      formData.append("profilePic", file);

      const res = await axios.post(BASE_URL + "/profile/edit/photo", formData, {
        withCredentials: true,
      });

      dispatch({
        type: "user/update",
        payload: { photoUrl: res.data.imageUrl },
      });
    } catch (err) {
      console.error(err);
    }
  };

  /* ==============================
     ✏️ EDIT PROFILE
  ============================== */
  const handleSave = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          username,
          about,
        },
        { withCredentials: true },
      );

      dispatch({
        type: "user/update",
        payload: res.data.data,
      });

      alert("Profile updated!");
    } catch (err) {
      console.error(err);
    }
  };

  /* ==============================
     🔒 TOGGLE PRIVACY
  ============================== */
  const togglePrivacy = async () => {
    try {
      await axios.post(
        BASE_URL + "/profile/settings/privacy",
        {},
        { withCredentials: true },
      );
      setIsPrivate((prev) => !prev);
    } catch (err) {
      console.error(err);
    }
  };

  /* ==============================
     🔔 TOGGLE NOTIFICATIONS
  ============================== */
  const toggleNotifications = async () => {
    try {
      await axios.post(
        BASE_URL + "/profile/settings/notifications",
        {},
        { withCredentials: true },
      );
      setNotificationsOn((prev) => !prev);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto min-h-screen bg-black text-white px-4 py-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Edit Profile</h2>

        <div className="flex items-center gap-3">
          {/* 🔴 LOGOUT BUTTON */}
          <button
            onClick={handleLogOut}
            className="text-red-500 font-semibold hover:text-red-400"
          >
            {loading ? "Logging out..." : "Logout"}
          </button>

          {/* 💾 SAVE BUTTON */}
          <button
            onClick={handleSave}
            className="bg-white text-black px-4 py-1.5 rounded-full font-semibold"
          >
            Save
          </button>
        </div>
      </div>

      {/* PROFILE PHOTO */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-28 h-28 rounded-full overflow-hidden bg-gray-400">
          {photoPreview ? (
            <img src={photoPreview} className="w-full h-full object-cover" />
          ) : (
            <div className="flex items-center justify-center h-full text-3xl">
              👤
            </div>
          )}
        </div>

        <label className="mt-3 text-blue-400 cursor-pointer text-sm">
          Change profile photo
          <input type="file" onChange={handleImageChange} className="hidden" />
        </label>
      </div>

      {/* INPUTS */}
      <div className="space-y-4">
        <Input label="First Name" value={firstName} onChange={setFirstName} />
        <Input label="Last Name" value={lastName} onChange={setLastName} />
        <Input label="Username" value={username} onChange={setUsername} />

        <div>
          <label className="text-sm text-white/60">Bio</label>
          <textarea
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            rows={3}
            className="w-full mt-1 bg-transparent border border-white/20 rounded-lg px-3 py-2 outline-none focus:border-white"
          />
        </div>
      </div>

      {/* SETTINGS */}
      <div className="mt-8 space-y-6">
        {/* 🔒 PRIVATE ACCOUNT */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold">Private Account</p>
            <p className="text-sm text-white/50">
              Only followers can see your posts
            </p>
          </div>

          <button
            onClick={togglePrivacy}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
              isPrivate ? "bg-blue-500" : "bg-gray-500"
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full shadow-md transform transition ${
                isPrivate ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </div>

        {/* 🔔 NOTIFICATIONS */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold">Notifications</p>
            <p className="text-sm text-white/50">Turn on/off notifications</p>
          </div>

          <button
            onClick={toggleNotifications}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
              notificationsOn ? "bg-blue-500" : "bg-gray-500"
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full shadow-md transform transition ${
                notificationsOn ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}

/* INPUT */
function Input({ label, value, onChange }) {
  return (
    <div>
      <label className="text-sm text-white/60">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full mt-1 bg-transparent border border-white/20 rounded-lg px-3 py-2 outline-none focus:border-white"
      />
    </div>
  );
}
