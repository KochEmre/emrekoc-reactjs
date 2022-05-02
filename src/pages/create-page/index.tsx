import { FC, Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as API from "../../api";
import DropDown from "../../components/dropdown";
import { ICategory, IProduct } from "../../components/product-list";
import Spinner from "../../components/spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface IPostData {
  name: string;
  price: number;
  category: string;
  description: string;
  avatar: string;
}

const CreatePage: FC = () => {
  const [categories, setCategories] = useState<Array<ICategory>>([]);
  const [productName, setProductName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    debugger;
    if (!category){
      toast.error("Please choose a category.");
      return;
    }

    const postData: IPostData = {
      name: productName,
      price,
      category,
      description,
      avatar: imageUrl,
    };

    API.createProduct(postData as IProduct)
      .then((result) => {
        toast.success(result.data.name.charAt(0).toUpperCase() + result.data.name.slice(1) + " is created.");
        console.log(result, "create");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });

    navigate("/");
  };

  useEffect(() => {

    const fetchCategories = () => {
      setLoading(true);
      API.getCategories()
        .then((result) => {
          /* Categories */
          if (result?.data.length > 0) {
            setCategories(result.data);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchCategories();
  }, []);

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <div className="mt-8 flex w-11/12 max-w-sm flex-col self-center">
          <h1 className="text-2xl sm:text-3xl font-semibold">Create Product</h1>
          <form className="mt-10 flex flex-col gap-6" onSubmit={handleSubmit}>
            <input
              className="w-full"
              type={"text"}
              placeholder={"Product name"}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setProductName(e.target.value)
              }
              required
            />
            <textarea
              className="h-24 w-full "
              placeholder={"Description"}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setDescription(e.target.value)
              }
              required
            />
            <input
              className="w-full"
              type={"text"}
              placeholder={"Image URL"}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setImageUrl(e.target.value)
              }
              required
            />
            <DropDown
              options={categories}
              setSelected={setCategory}
              optionAll={false}
            />

            <input
              className="w-full"
              type={"number"}
              placeholder={"Price"}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPrice(parseInt(e.target.value))
              }
              required
            />
            <button
              type="submit"
              className="h-11 rounded-xl bg-white p-2 text-center font-bold shadow-lg duration-200 ease-in-out hover:bg-gray-900 hover:text-white"
            >
              SUBMIT
            </button>
          </form>
        </div>
      )}
    </Fragment>
  );
};

export default CreatePage;
