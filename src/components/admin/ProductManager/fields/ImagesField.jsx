
import MultiImageUploader from "./MultiImageUploader";

const ImagesField = ({ images, onChange }) => {
  return (
    <div className="mt-2">
      <MultiImageUploader images={images} onChange={onChange} />
    </div>
  );
};

export default ImagesField;
