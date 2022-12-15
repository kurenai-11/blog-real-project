import { useAuthenticated } from "../../../app/hooks";
import { withClasses } from "../../shared/utils";

const Hero = () => {
  const isAuthenticated = useAuthenticated();
  const buttonClasses =
    "border-none bg-emerald-8 rounded-lg px-3 py-1 color-zinc-2 text-lg relative";
  const imgUrl =
    "https://images.unsplash.com/photo-1600952912114-7e2aecc0f64f?ixlib=rb-4.0.3&dl=decry-yae-1B_Ssfyhocg-unsplash.jpg&w=1920&q=80&fm=jpg&crop=entropy&cs=tinysrgb";
  return (
    <div className="flex flex-col bg-gradient-to-br from-red-900 to-emerald-900 relative h-96 items-center justify-center w-full">
      <img
        className="w-full h-full object-cover absolute mix-blend-overlay brightness-80"
        src={imgUrl}
      />
      <div className="py-14 px-4 text-4xl font-bold rounded-md text-zinc-2 relative">
        <span className="text-red-7">XBlog</span> - a tool to rule all blogs.
      </div>
      <div className="flex justify-center items-center px-8 text-center rounded-lg text-slate-3 text-stroke-sm text-stroke-red-500 text-xl relative">
        XBlog is a tool that will let you manage multiple blogs at once. One
        blog for your work, one blog for your hobby... and even one for your dog
        if you so choose!
      </div>
      <div className="mt-4">
        <button className={withClasses(buttonClasses, "mr-2")}>
          See all public blogs
        </button>
        <button
          className={withClasses(
            buttonClasses,
            isAuthenticated ? "bg-blue-8" : "bg-amber-8"
          )}
        >
          {isAuthenticated ? "See your blogs" : "Login"}
        </button>
      </div>
    </div>
  );
};

export default Hero;
