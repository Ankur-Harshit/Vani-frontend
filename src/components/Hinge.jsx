import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { SparkleIcon } from "./icons";
import { BASE_URL } from "../utils/constant";

export default function Hinge({ user }) {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  const handleSend = async () => {
    if (!text.trim() || loading) return;

    const userMessage = {
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setText("");
    setLoading(true);

    try {
      const res = await axios.post(
        BASE_URL + "/ask/hinge",
        { text },
        { withCredentials: true },
      );

      const aiMessage = {
        role: "ai",
        content: res?.data?.data || "No response",
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: "Something went wrong. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  return (
    <section className="flex h-[calc(100dvh-var(--mobile-nav-height))] flex-col overflow-hidden bg-black text-white md:min-h-screen md:h-auto">
      <div className="sticky top-0 z-10 border-b border-white/10 bg-black/90 px-4 py-3 font-semibold text-zinc-400 backdrop-blur">
        Hinge
      </div>

      <div
        ref={chatRef}
        className="flex-1 overflow-y-auto px-3 py-4 pb-6"
      >
        <div className="mx-auto w-full max-w-2xl">
          {messages.length === 0 && (
            <div className="flex min-h-[42dvh] flex-col items-center justify-center px-4 text-center md:min-h-[60vh]">
              <div className="mb-2 flex items-center gap-2 text-base text-zinc-300">
                <SparkleIcon className="h-5 w-5 text-violet-400" />
                <span>Hi {user?.firstName || "Ankur"}</span>
              </div>

              <h1 className="text-2xl font-semibold text-zinc-200 md:text-4xl">
                Where should we start?
              </h1>
            </div>
          )}

          <div className="space-y-3">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] break-words rounded-2xl px-4 py-3 text-sm leading-6 ${
                    msg.role === "user"
                      ? "bg-violet-600 text-white"
                      : "border border-white/10 bg-zinc-900 text-zinc-200"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <div className="rounded-2xl border border-white/10 bg-zinc-900 px-4 py-3 text-sm text-zinc-400">
                  <span className="animate-pulse">Hinge is thinking...</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="sticky bottom-1 z-10 border-t border-white/10 bg-black/95 px-3 py-2 backdrop-blur md:pb-3">
        <div className="mx-auto flex max-w-2xl items-center gap-2 rounded-xl border border-white/10 bg-zinc-900 px-3 py-2">
          <input
            type="text"
            placeholder="Ask Hinge"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSend();
            }}
            disabled={loading}
            className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
          />

          <button
            onClick={handleSend}
            disabled={loading}
            className="rounded-full px-3 py-1.5 text-sm font-medium text-violet-400 transition hover:bg-white/[0.05] hover:text-white disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </section>
  );
}
