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
        <div className="mt-8 flex w-1/2 flex-col self-center">
          <div className="flex flex-row gap-10">
            <div className=" flex h-72 w-52 items-center justify-center rounded-2xl bg-white p-4 md:h-80 md:w-64 md:p-10">
              <img
                src={productDetail.avatar}
                alt={productDetail.name}
                className=" h-full w-full object-contain"
              />
            </div>
            <div className="flex flex-col justify-between">
              <h1 className="text-left text-5xl font-bold not-italic">
                {productDetail.name.charAt(0).toUpperCase() +
                  productDetail.name.slice(1)}
              </h1>
              <h2 className="text-2xl font-semibold">${productDetail.price}</h2>
            </div>
          </div>
          <div className="my-8 mx-3 flex-grow rounded-2xl border-t-4 border-neutral-400"></div>
          <div>
            <h2 className="mb-2 text-2xl font-semibold">Description:</h2>
            <p className="font-medium text-gray-500">
              {productDetail.description}
            </p>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default DetailPage;
