import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import RightPanel from "./RightPanel";
import Sidebar from "./Sidebar";

export default function MainPage() {
  return (
    <div className="min-h-[100dvh] bg-[#050507] text-white">
      <div className="mx-auto flex min-h-[100dvh] w-full max-w-[1380px] gap-0">
        <div className="hidden md:block md:w-[280px]">
          <Sidebar />
        </div>

        <main className="min-w-0 flex-1">
          <Outlet />
        </main>

        <div className="hidden lg:block lg:w-[340px]">
          <RightPanel />
        </div>
      </div>

      <div className="md:hidden">
        <Nav isMobile />
      </div>
    </div>
  );
}
