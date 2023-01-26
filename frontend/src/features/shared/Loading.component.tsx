import { Triangle } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Triangle height={150} width={150} color="#b11628" />
    </div>
  );
};

export default Loading;
