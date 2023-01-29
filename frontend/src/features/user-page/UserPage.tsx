import BlogList from "../../features/blog-list/BlogList.component";
import { User } from "../../app/types";
import Avatar from "../shared/Avatar.component";
import { useNavigate } from "react-router-dom";

const UserPage = ({ user }: { user: Omit<User, "password" | "auth"> }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center gap-3 mt-6">
      <div className="text-4xl font-bold mb-2 text-zinc-3">User page</div>
      <div className="flex flex-col items-center">
        <Avatar avatarUrl={user.avatarUrl} />
        <div
          onClick={() => navigate(`/user/${user._id}`)}
          className="text-xl font-bold text-red-5 cursor-pointer transition-all hover:(text-red-3)"
        >
          {user.username}
        </div>
      </div>
      <div className="text-3xl font-bold text-zinc-3">Blogs: </div>
      <div className="">
        <BlogList mode="list" blogs={user.blogs} />
      </div>
    </div>
  );
};

export default UserPage;
