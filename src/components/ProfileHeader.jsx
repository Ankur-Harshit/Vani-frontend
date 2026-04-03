import { useNavigate } from "react-router-dom";

export default function ProfileHeader({ user, time }) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-3">
        <img
          src={user?.photoUrl}
          alt=""
          className="h-10 w-10 rounded-full object-cover"
        />

        <div>
          <p className="text-sm font-semibold text-white">{user?.name}</p>
          <p className="text-m font-semibold text-white">
            {user?.firstName + " " + user?.lastName}
          </p>
          <p className="text-xs text-zinc-400">
            @{user?.username} - {time}
          </p>
        </div>
      </div>

      <button
        className="text-xs text-sky-400 hover:underline"
        onClick={() => navigate("/profile/" + user._id)}
      >
        View profile
      </button>
    </div>
  );
}
