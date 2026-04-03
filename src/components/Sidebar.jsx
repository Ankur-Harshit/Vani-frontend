import { useSelector } from "react-redux";
import Nav from "./Nav";
import { BrandMark, DotsIcon } from "./icons";
import { useLocation } from "react-router-dom";
import Logo1 from "../assets/Logo1.png";

function getInitials(user) {
  const fallback = "PR";
  if (!user) return fallback;

  const initials = [user.firstName, user.lastName]
    .filter(Boolean)
    .map((value) => value[0]?.toUpperCase())
    .join("");

  return initials || fallback;
}

export default function Sidebar() {
  const user = useSelector((store) => store.user);
  const location = useLocation();

  const fullName =
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    "Your profile";

  const handle = user?.emailId
    ? `@${user.emailId.split("@")[0]}`
    : "@your_handle";

  return (
    <aside className="sticky top-0 flex h-screen w-full max-w-[280px] flex-col justify-between px-3 py-5">
      {/* TOP SECTION */}
      <div className="space-y-6">
        {/* LOGO */}
        <div className="flex h-12 w-12 items-center justify-center rounded-full transition hover:bg-white/10 cursor-pointer">
          <img src={Logo1}></img>
        </div>

        {/* NAV */}
        <Nav currentPath={location.pathname} />

        {/* POST BUTTON */}
        <button
          className="w-full rounded-full bg-white px-5 py-3 text-base font-semibold text-black transition 
          hover:bg-zinc-200 active:scale-95"
        >
          Post
        </button>
      </div>

      {/* PROFILE */}
      <div
        className="group flex cursor-pointer items-center gap-3 rounded-3xl px-3 py-3 transition 
        hover:bg-white/[0.08]"
      >
        {/* AVATAR */}
        <div
          className="flex h-11 w-11 items-center justify-center rounded-full 
          bg-gradient-to-br from-sky-500 via-cyan-400 to-emerald-400 font-semibold text-black"
        >
          {getInitials(user)}
        </div>

        {/* USER INFO */}
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-white">
            {fullName}
          </p>
          <p className="truncate text-sm text-zinc-400">{handle}</p>
        </div>

        {/* MENU */}
        <DotsIcon className="h-5 w-5 text-zinc-400 opacity-0 transition group-hover:opacity-100" />
      </div>
    </aside>
  );
}
