import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constant";
import { addUser } from "../utils/userSlice";
import LOGO1 from "../assets/Logo1.png";

export default function Home() {
  const [isLogin, setIsLogin] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  if (user) {
    navigate("/");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    try {
      setLoading(true);
      setError("");

      if (isLogin) {
        const res = await axios.post(
          BASE_URL + "/login",
          { emailId, password },
          { withCredentials: true },
        );

        dispatch(addUser(res.data));
        navigate("/");
      } else {
        await axios.post(
          BASE_URL + "/signup",
          { firstName, lastName, emailId, password },
          { withCredentials: true },
        );
        setIsLogin(true);
      }
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* 🔥 TOP REBRANDING BANNER */}
      <div className="w-full text-center py-2 text-xs sm:text-sm bg-white/5 border-b border-white/10 backdrop-blur">
        <span className="text-gray-400">Pull Request is now </span>
        <span className="font-semibold text-white">Vani </span>
      </div>

      {/* MAIN */}
      <div className="flex flex-1">
        {/* LEFT */}
        <div className="hidden lg:flex w-1/2 items-center justify-center border-r border-gray-800">
          <div className="text-center">
            <img src={LOGO1} alt="logo" className="w-40 h-40 mx-auto" />
            <h1 className="text-3xl font-semibold mt-5">Happening Now</h1>
            <p className="text-gray-400 mt-2">Join the conversation.</p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6">
          {/* MOBILE LOGO */}
          <img src={LOGO1} alt="logo" className="w-20 h-20 mb-4" />

          <div className="w-full max-w-md">
            <h1 className="text-3xl font-semibold mb-6">
              {isLogin ? "Sign in" : "Join today"}
            </h1>

            {/* GOOGLE BUTTON */}
            <button
              type="button"
              disabled={loading}
              className={`w-full flex items-center justify-center gap-3 border border-gray-700 py-2.5 rounded-full transition
                ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-900"}
              `}
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="google"
                className="w-5 h-5"
              />
              <span className="text-sm">
                {isLogin ? "Sign in with Google" : "Sign up with Google"}
              </span>
            </button>

            {/* DIVIDER */}
            <div className="flex items-center my-5">
              <div className="flex-1 h-[1px] bg-gray-700"></div>
              <span className="px-3 text-gray-400 text-xs">OR</span>
              <div className="flex-1 h-[1px] bg-gray-700"></div>
            </div>

            {/* FORM */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              {!isLogin && (
                <>
                  <input
                    type="text"
                    placeholder="First Name"
                    disabled={loading}
                    className="bg-black border border-gray-700 px-4 py-2.5 rounded-md text-sm focus:outline-none focus:border-white focus:ring-1 focus:ring-white/30"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    disabled={loading}
                    className="bg-black border border-gray-700 px-4 py-2.5 rounded-md text-sm focus:outline-none focus:border-white focus:ring-1 focus:ring-white/30"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </>
              )}

              <input
                type="email"
                placeholder="Email"
                disabled={loading}
                className="bg-black border border-gray-700 px-4 py-2.5 rounded-md text-sm focus:outline-none focus:border-white focus:ring-1 focus:ring-white/30"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
              />

              <input
                type="password"
                placeholder="Password"
                disabled={loading}
                className="bg-black border border-gray-700 px-4 py-2.5 rounded-md text-sm focus:outline-none focus:border-white focus:ring-1 focus:ring-white/30"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {/* ERROR */}
              {error && (
                <div className="bg-red-500/10 border border-red-500 text-red-400 text-xs px-3 py-2 rounded-md">
                  {error}
                </div>
              )}

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className={`bg-white text-black py-2.5 rounded-full text-sm font-semibold flex justify-center items-center gap-2 transition-all duration-200
                  ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-gray-200"}
                `}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                    {isLogin ? "Logging in..." : "Creating..."}
                  </>
                ) : isLogin ? (
                  "Login"
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            {/* TOGGLE */}
            <p className="text-gray-400 text-xs mt-5 mb-2">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
            </p>

            <button
              onClick={() => setIsLogin(!isLogin)}
              disabled={loading}
              className="w-full border border-gray-600 py-2.5 rounded-full text-sm hover:bg-gray-900 transition"
            >
              {isLogin ? "Create Account" : "Sign In"}
            </button>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="border-t border-gray-800 py-3 px-6 text-center text-gray-500 text-xs flex flex-wrap justify-center gap-3">
        <span>About</span>
        <span>Help Center</span>
        <span>Privacy Policy</span>
        <span>Terms</span>
        <span>Contact</span>
        <span>© 2026 PR</span>
      </div>
    </div>
  );
}
