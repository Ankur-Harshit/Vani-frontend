import { useEffect, useState } from "react";
import { BellIcon, HomeIcon, MailIcon, SearchIcon, SparkleIcon, UserIcon } from "./icons";

import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constant";

export default function Nav({ isMobile = false }) {
  const userData = useSelector((store) => store.user);
  const location = useLocation();
  const [notiCnt, setNotiCnt] = useState(0);
  const getNotiCnt = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/notifications/count", {
        withCredentials: true,
      });
      console.log(res);
      setNotiCnt(res?.data?.count);
    }
    catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getNotiCnt();
  }, []);

  const navItems = [
    { label: "Home", icon: HomeIcon, path: "/", mobile: true },
    { label: "Explore", icon: SearchIcon, path: "/explore", mobile: true },
    {
      label: "Notifications",
      icon: BellIcon,
      path: "/notifications",
      mobile: true,
      badge: notiCnt,
    },
    { label: "Messages", icon: MailIcon, path: "/messages", mobile: true },
    { label: "AI Studio", icon: SparkleIcon, path: "/hinge", mobile: true },
    {
      label: "Profile",
      icon: UserIcon,
      mobile: true,
      path: userData?._id ? `/profile/${userData._id}` : null,
    },
  ];

  const items = isMobile ? navItems.filter((item) => item.mobile) : navItems;

  if (isMobile) {
    return (
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-black/95 px-2 pt-1 pb-[env(safe-area-inset-bottom)] backdrop-blur">
        <div className="mx-auto flex h-14 max-w-md items-center justify-between">
          {items.map((item) => (
            <NavItem
              key={item.label}
              item={item}
              isMobile
              currentPath={location.pathname}
            />
          ))}
        </div>
      </nav>
    );
  }

  return (
    <nav className="space-y-2">
      {items.map((item) => (
        <NavItem key={item.label} item={item} currentPath={location.pathname} />
      ))}
    </nav>
  );
}

function NavItem({ item, isMobile = false, currentPath }) {
  const Icon = item.icon;
  const navigate = useNavigate();

  const isActive = item.path && currentPath === item.path;

  const handleClick = () => {
    if (!item.path) return;
    navigate(item.path);
  };

  if (isMobile) {
    return (
      <button
        onClick={handleClick}
        className={`relative flex min-w-[52px] flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 transition ${
          isActive
            ? "text-white"
            : "text-zinc-500 hover:bg-white/[0.05] hover:text-white"
        }`}
      >
        <span className="relative">
          <Icon className="h-6 w-6" />
          {item.badge > 0 && (
            <span className="absolute -right-2 -top-2 rounded-full bg-sky-500 px-1.5 text-[10px] font-semibold text-black">
              {item.badge}
            </span>
          )}
        </span>
        <span className="text-[11px] font-medium"></span>
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className={`flex w-full items-center gap-3 rounded-full px-4 py-3 text-left transition ${
        isActive
          ? "bg-white/[0.06] font-semibold text-white"
          : "text-zinc-300 hover:bg-white/[0.05] hover:text-white"
      }`}
    >
      <span className="relative">
        <Icon className="h-7 w-7" />
        {item.badge > 0 && (
          <span className="absolute -right-2 -top-1 rounded-full bg-sky-500 px-1.5 text-[10px] font-semibold text-black">
            {item.badge}
          </span>
        )}
      </span>
      <span>{item.label}</span>
    </button>
  );
}
