import { FC, Fragment, useEffect, useState } from "react";
import { getCategories } from "../../api";
import DropDown from "../../components/dropdown";
import { ICategory } from "../../components/product-list";
import Spinner from "../../components/spinner";

const CreatePage: FC = () => {
  const [categories, setCategories] = useState<Array<ICategory>>([]);
  const [productName, setProductName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCategories = () => {
      setLoading(true);
      getCategories()
        .then((result) => {
          /* Product */
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
        <div className="mt-8 flex w-96 flex-col self-center">
          <h1 className="text-3xl font-semibold">Create Product</h1>
          <form className="mt-10 flex flex-col gap-6">
            <input
              className="w-full"
              type={"text"}
              placeholder={"Product name"}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setProductName(e.target.value)
              }
              required
            />
            <input
              className="w-full"
              type={"text"}
              placeholder={"Description"}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDescription(e.target.value)
              }
              required
            />
            <input
              className="w-full"
              type={"text"}
              placeholder={"Product name"}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setImageUrl(e.target.value)
              }
              required
            />
            <DropDown options={categories} setSelected={setSelectedCategory} optionAll={false}/>

            <input
              className="w-full"
              type={"number"}
              placeholder={"Product name"}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPrice(parseInt(e.target.value))
              }
              required
            />
          </form>
        </div>
      )}
    </Fragment>
  );
};

export default CreatePage;
