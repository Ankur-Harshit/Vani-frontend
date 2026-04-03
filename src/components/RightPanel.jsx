import { SearchIcon } from "./icons";

const trendingTopics = [
  {
    id: 1,
    title: "AI creators are shifting from polished edits to more raw daily posts",
    meta: "Technology - 18.4K posts",
  },
  {
    id: 2,
    title: "Short-form social apps are blending stories, tweets, and community feeds",
    meta: "Product Design - 8,921 posts",
  },
  {
    id: 3,
    title: "Founders are using audience-first launches before shipping full products",
    meta: "Startups - 5,306 posts",
  },
];

const quickNews = [
  {
    id: 1,
    category: "Product",
    headline: "Design a feed shell now, connect APIs later with reusable components.",
  },
  {
    id: 2,
    category: "Frontend",
    headline: "Responsive sidebars and mobile bottom navigation remain the main UX pattern.",
  },
  {
    id: 3,
    category: "Builder",
    headline: "Placeholder stories and posts help teams integrate live APIs without redoing layout work.",
  },
];

export default function RightPanel() {
  return (
    <aside className="sticky top-0 hidden h-screen w-full max-w-[340px] overflow-y-auto px-4 py-6 lg:block">
      <div className="space-y-5">
        <label className="flex items-center gap-3 rounded-full border border-white/10 bg-[#0b0b0e] px-4 py-3 text-zinc-500 focus-within:border-sky-500/60 focus-within:text-sky-300">
          <SearchIcon className="h-5 w-5" />
          <input
            type="text"
            placeholder="Search"
            className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
          />
        </label>

        <section className="rounded-[28px] border border-white/10 bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.12),_transparent_40%),linear-gradient(180deg,_rgba(255,255,255,0.04),_rgba(255,255,255,0.02))] p-6">
          <div className="inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
            Premium space
          </div>
          <h2 className="mt-4 text-2xl font-semibold text-white">
            Keep this panel for news, trends, or suggested people.
          </h2>
          <p className="mt-3 text-sm leading-6 text-zinc-400">
            It is already separated from the feed, so we can later plug in a
            news API or recommendations API without touching the main layout.
          </p>
          <button className="mt-5 rounded-full bg-sky-500 px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-sky-400">
            Explore more
          </button>
        </section>

        <section className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
          <h3 className="text-2xl font-semibold text-white">Today&apos;s News</h3>
          <div className="mt-5 space-y-4">
            {quickNews.map((item) => (
              <article
                key={item.id}
                className="rounded-2xl border border-transparent p-3 transition hover:border-white/10 hover:bg-white/[0.03]"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
                  {item.category}
                </p>
                <p className="mt-2 text-sm font-medium leading-6 text-zinc-200">
                  {item.headline}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-[28px] border border-white/10 bg-white/[0.03] p-6">
          <h3 className="text-2xl font-semibold text-white">What&apos;s happening</h3>
          <div className="mt-5 space-y-4">
            {trendingTopics.map((item) => (
              <article
                key={item.id}
                className="rounded-2xl border border-transparent p-3 transition hover:border-white/10 hover:bg-white/[0.03]"
              >
                <p className="text-sm font-medium leading-6 text-zinc-200">
                  {item.title}
                </p>
                <p className="mt-1 text-xs text-zinc-500">{item.meta}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </aside>
  );
}
