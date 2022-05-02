import { useNavigate } from "react-router";
import { FC } from "react";

export interface IProductCard {
  id: number;
  name: string;
  price: number;
  avatar: string;
}

interface IProductCardProps {
  data: IProductCard;
}

const ProductCard: FC<IProductCardProps> = ({ data }) => {
  const { id, name, price, avatar } = data;
  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate(`/detail/${id}`);
  };

  return (
    <div className="flex w-full flex-col justify-center ">
      <div
        className=" flex h-44 cursor-pointer items-center justify-center rounded-2xl bg-white p-2 duration-200 ease-in-out hover:scale-105 md:h-60 xl:h-72 md:p-3 "
        onClick={handleOnClick}
      >
        <img alt={name} src={avatar} className="h-full w-full object-contain" />
      </div>
      <div className="mt-2 flex h-20 flex-col gap-1 truncate px-2 text-lg font-semibold">
        <h3 className="truncate">
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </h3>
        <h3 className="truncate text-center">${price}</h3>
      </div>
    </div>
  );
};

export default ProductCard;
