import { FC, Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../../api";
import Spinner from "../../components/spinner";

interface IProductDetail {
  id: number;
  name: string;
  price: number;
  avatar: string;
  description: string;
}

const DetailPage: FC = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(true);

  const [productDetail, setProductDetail] = useState<IProductDetail>({
    id: 0,
    name: "",
    price: 0,
    description: "",
    avatar: "",
  });

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      getProduct(id?.toString() ?? "")
        .then((result) => {
          /* Product */
          if (result?.data) {
            setProductDetail(result.data);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchData();
  }, [id]);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <div className="mt-2 mb-8 md:mb-16 sm:mt-4 lg:mt-8 flex w-11/12 flex-col self-center md:w-2/3 xl:w-1/2">
          <div className="flex flex-row gap-4 sm:gap-6 md:gap-10">
            <div className=" flex h-48 sm:h-60 w-52 items-center justify-center rounded-2xl bg-white p-4 sm:p-5 md:h-72 md:w-64 lg:p-8 xl:h-80 xl:p-10">
              <img
                src={productDetail.avatar}
                alt={productDetail.name}
                className=" h-full w-full object-contain"
              />
            </div>
            <div className="flex flex-col justify-between">
              <h1 className="text-left text-3xl font-bold md:text-4xl lg:text-5xl">
                {productDetail.name.charAt(0).toUpperCase() +
                  productDetail.name.slice(1)}
              </h1>
              <h2 className="text-xl font-semibold md:text-2xl">
                ${productDetail.price}
              </h2>
            </div>
          </div>
          <div className="my-6 md:my-8 mx-3 flex-grow rounded-2xl border-t-4 border-neutral-400"></div>
          <div>
            <h2 className="mb-2 text-xl md:text-2xl font-semibold">Description:</h2>
            <p className="font-medium text-gray-500 text-sm sm:text-base">
              {productDetail.description}
            </p>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default DetailPage;
