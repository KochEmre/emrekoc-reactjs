import { useNavigate } from "react-router-dom";
import { ReactComponent as AddIcon } from "../../assets/icons/plus-circle.svg";

const AddButton = () => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate("/create");
  };
  return (
    <div
      className="fixed bottom-6 right-8 md:bottom-8 md:right-12 w-12 h-12 sm:h-16 sm:w-16 lg:h-20 lg:w-20 cursor-pointer rounded-full bg-white"
      onClick={handleOnClick}
    >
      <AddIcon />
    </div>
  );
};

export default AddButton;
