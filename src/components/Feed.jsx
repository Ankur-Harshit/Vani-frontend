import { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constant";
import { ImageIcon, LocationIcon, SmileIcon } from "./icons";
import PostCard from "./PostCard";
import axios from "axios";
import Logo1 from "../assets/Logo1.png";

const stories = [
  { id: 1, name: "Ankur", ring: "from-sky-400 to-cyan-300" },
  { id: 2, name: "Naina", ring: "from-orange-400 to-pink-500" },
  { id: 3, name: "Kabir", ring: "from-lime-400 to-emerald-500" },
  { id: 4, name: "Riya", ring: "from-fuchsia-500 to-rose-500" },
  { id: 5, name: "Aarav", ring: "from-violet-400 to-sky-500" },
];

const composerActions = [
  { id: "image", icon: ImageIcon, label: "Add image" },
  { id: "mood", icon: SmileIcon, label: "Add feeling" },
  { id: "location", icon: LocationIcon, label: "Add location" },
];

export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [endMessage, setEndMessage] = useState(false);

  // 🚀 Fetch Feed
  const fetchFeed = async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);

      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });

      const newPosts = res?.data?.data || [];

      // ❌ No more data
      if (newPosts.length === 0) {
        setHasMore(false);
        setEndMessage(true);
        return;
      }
      setPosts((prev) => {
        return [...prev, ...newPosts];
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 🏁 Initial load
  useEffect(() => {
    fetchFeed();
  }, []);

  // 🔥 Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;

      if (bottom) {
        fetchFeed();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  return (
    <section className="min-h-screen border-x border-white/10 bg-black/40 pb-24 md:pb-10">
      {/* HEADER */}
      <header className="sticky top-0 z-20 border-b border-white/10 bg-black/80 backdrop-blur-xl">
        {/* 🔥 LOGO SECTION */}
        <div className="flex items-center justify-center py-1">
          <img src={Logo1} alt="Logo" className="h-10 object-contain" />
        </div>

        {/* 🔥 TABS */}
        <div className="grid grid-cols-2 text-sm">
          {/* ACTIVE TAB */}
          <button className="flex flex-col items-center justify-center gap-2 py-1 font-semibold text-white relative">
            <span>For you</span>
            <span className="absolute bottom-0 h-[3px] w-12 rounded-full bg-sky-400" />
          </button>

          {/* INACTIVE TAB */}
          <button className="flex flex-col items-center justify-center gap-2 py-3 font-medium text-zinc-500 transition hover:bg-white/[0.04] hover:text-zinc-300">
            <span>Following</span>
          </button>
        </div>
      </header>

      <StoriesRow />
      <Composer />

      {/* POSTS */}
      <div>
        {posts.map((post) => (
          <PostCard key={post._id} post={post} />
        ))}
      </div>

      {/* LOADING */}
      {loading && <p className="text-center py-4 text-zinc-400">Loading...</p>}

      {/* END MESSAGE */}
      {endMessage && (
        <p className="text-center py-4 text-zinc-500">
          You’ve seen all your feed 🎉
        </p>
      )}
    </section>
  );
}


function StoriesRow() {
  return (
    <section className="border-b border-white/10 px-4 py-4">
      <div className="no-scrollbar flex gap-4 overflow-x-auto pb-1">
        {stories.map((story) => (
          <div key={story.id} className="min-w-[72px] text-center">
            <div
              className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br p-[2px] ${story.ring}`}
            >
              <div className="flex h-full w-full items-center justify-center rounded-full bg-zinc-950 text-sm font-semibold text-white">
                {story.name.slice(0, 2).toUpperCase()}
              </div>
            </div>
            <p className="mt-2 truncate text-xs text-zinc-400">{story.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Composer() {
  const [text, setText] = useState("");
  const [files, setFiles] = useState([]);
  const [isStory, setIsStory] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selected]);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!text.trim() && files.length === 0) return;

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("text", text);
      formData.append("type", isStory ? "STORY" : "POST");
      formData.append("visibility", "PUBLIC");

      files.forEach((file) => {
        formData.append("mediaUrls", file); // ✅ matches backend
      });

      await axios.post(BASE_URL + "/post/create", formData, {
        withCredentials: true,
      });

      // reset
      setText("");
      setFiles([]);
      setIsStory(false);

      // ⚠️ DO NOT reload (keeps scroll working)
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="border-b border-white/10 px-4 py-5">
      <div className="flex gap-3">
        {/* AVATAR */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-sky-400 to-cyan-300 font-semibold text-black">
          YU
        </div>

        <div className="flex-1">
          {/* TEXT */}
          <textarea
            rows={3}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What do you want to share today?"
            className="w-full resize-none bg-transparent text-lg text-white outline-none placeholder:text-zinc-500"
          />

          {/* PREVIEW */}
          {files.length > 0 && (
            <div className="mt-3 flex gap-2 overflow-x-auto">
              {files.map((file, index) => {
                const isVideo = file.type.startsWith("video");

                return (
                  <div key={index} className="relative">
                    {isVideo ? (
                      <video
                        src={URL.createObjectURL(file)}
                        className="h-20 w-20 rounded-lg object-cover"
                      />
                    ) : (
                      <img
                        src={URL.createObjectURL(file)}
                        className="h-20 w-20 rounded-lg object-cover"
                      />
                    )}

                    <button
                      onClick={() => removeFile(index)}
                      className="absolute top-1 right-1 bg-black/70 text-white text-xs px-1 rounded"
                    >
                      ✕
                    </button>
                  </div>
                );
              })}
            </div>
          )}

          {/* ACTIONS (KEEP YOUR STYLE) */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sky-400">
              {/* IMAGE BUTTON → FILE INPUT */}
              <label className="rounded-full border border-sky-400/20 bg-sky-400/10 p-2 cursor-pointer hover:bg-sky-400/20">
                <ImageIcon className="h-5 w-5" />
                <input
                  type="file"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>

              {/* KEEP OTHER ICONS SAME */}
              {composerActions.slice(1).map((action) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.id}
                    className="rounded-full border border-sky-400/20 bg-sky-400/10 p-2 transition hover:bg-sky-400/20"
                  >
                    <Icon className="h-5 w-5" />
                  </button>
                );
              })}

              {/* STORY TOGGLE */}
              <button
                onClick={() => setIsStory((prev) => !prev)}
                className={`ml-2 text-xs px-3 py-1 rounded-full ${
                  isStory
                    ? "bg-pink-500 text-white"
                    : "bg-zinc-800 text-zinc-400"
                }`}
              >
                {isStory ? "Story" : "Post"}
              </button>
            </div>

            {/* POST BUTTON */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-zinc-200 disabled:opacity-50"
            >
              {loading ? "Posting..." : "Post"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}