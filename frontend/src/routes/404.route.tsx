import { Link } from "react-router-dom";

const PageNotExist = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center text-zinc-2">
      <div className="text-4xl m-4">Requested page does not exist.</div>
      <Link
        to="/"
        className="text-2xl decoration-none text-zinc-2 animate-pulse bg-emerald-8 py-4 px-10 rounded-xl"
      >
        Go to home
      </Link>
    </div>
  );
};

export default PageNotExist;
