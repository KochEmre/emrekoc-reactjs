import { useNavigate } from "react-router-dom";
import { ReactComponent as AddIcon } from "../../assets/icons/plus-circle.svg";

const AddButton = () => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate("/create");
  };
  return (
    <div
      className="fixed bottom-8 right-12 h-24 w-24 cursor-pointer rounded-full bg-white"
      onClick={handleOnClick}
    >
      <AddIcon />
    </div>
  );
};

export default AddButton;
