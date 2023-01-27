import { Triangle } from "react-loader-spinner";

const Loading = ({ size = 150 }: { size?: number }) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Triangle height={size} width={size} color="#b11628" />
    </div>
  );
};

export default Loading;
