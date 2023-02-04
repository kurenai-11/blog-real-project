const Avatar = ({ avatarUrl }: { avatarUrl: string }) => {
  return (
    <div className="flex justify-center items-center rounded-full border border-zinc-2 w-28 h-28 bg-zinc-6 mb-2">
      {avatarUrl ? (
        <img
          src={avatarUrl}
          className="w-full h-full rounded-full object-cover"
        />
      ) : (
        <span className="font-bold text-lg cursor-default select-none">
          No avatar
        </span>
      )}
    </div>
  );
};

export default Avatar;
