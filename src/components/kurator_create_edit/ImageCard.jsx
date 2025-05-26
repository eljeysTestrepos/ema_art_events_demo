import Image from "next/image";

const ImageCard = ({ image, isSelected, isDisabled, onClick }) => {
  const handleClick = () => {
    if (!isDisabled) {
      onClick(image.id);
    }
  };
  return;
  <div
    className={`image-card ${isSelected ? "selected" : ""} ${
      isDisabled ? "disabled" : ""
    }`}
    onClick={handleClick}
    aria-checked={isSelected}
    role="checkbox"
    tabIndex={isDisabled ? -1 : 0}
  >
    <Image
      src={image.thumbnail}
      alt={image.title}
      width={200}
      height={200}
      objectFit="cover"
    >
      {isSelected && (
        <div className="checkmark-overlay">
          <span>&#10003</span>
        </div>
      )}
      <p>{image.title}</p>
    </Image>
  </div>;
};

export default ImageCard;
