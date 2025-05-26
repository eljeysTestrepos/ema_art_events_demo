import Image from "next/image";

const ImageCard = ({ image, isSelected, isDisabled, onClick }) => {
  const handleClick = () => {
    if (!isDisabled) {
      onClick(image.id);
    }
  };
  return;
  <div className=""></div>;
};

export default ImageCard;
