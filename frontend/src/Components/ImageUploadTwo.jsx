import { useState } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useUploadProductImageMutation } from "../Redux/Api/productApiSlice";
import PropTypes from "prop-types";

const ImageUploadTwo = ({ setImage, setImageUrl }) => {
  const { t } = useTranslation();
  const [uploadProductImage] = useUploadProductImageMutation();
  const [isLoading, setIsLoading] = useState(false);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.error(t("toast_img_required"));
      return;
    }

    const formData = new FormData();
    formData.append("image_two", file);

    setIsLoading(true);
    try {
      const res = await uploadProductImage(formData).unwrap();
      const uploadedImageUrl = res.files.image_two[0].path;
      setImage(uploadedImageUrl);
      setImageUrl(uploadedImageUrl);
      toast.success(t("toast_img_uploaded"));
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mb-4">
      <label className="block px-4 py-3 font-bold text-center text-white border rounded-lg cursor-pointer bg-mainColor">
        {isLoading ? t("loading") : t("product_list_upload_img")} 2
        <input
          type="file"
          name="image_two"
          accept="image/*"
          onChange={uploadFileHandler}
          className="hidden"
          required
        />
      </label>
    </div>
  );
};

ImageUploadTwo.propTypes = {
  setImage: PropTypes.func.isRequired,
  setImageUrl: PropTypes.func.isRequired,
};

export default ImageUploadTwo;
