import ProfileHeader from "./ProfileHeader";
import PostBody from "./PostBody";

export default function PostCard({ post }) {
  return (
    <article className="border-b border-white/10 px-4 py-5 hover:bg-white/[0.02] transition">
      <ProfileHeader user={post?.authorId} time={post?.time} />

      <PostBody post={post} user={post?.authorId} />
    </article>
  );
}
