import { Triangle } from "react-loader-spinner";

const Loading = ({
  size = 150,
  color = "#b11628",
}: {
  size?: number;
  color?: string;
}) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Triangle height={size} width={size} color={color} />
    </div>
  );
};

export default Loading;
