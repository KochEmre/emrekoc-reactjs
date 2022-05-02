import { FC, useState } from "react";
import DropDown from "../../components/dropdown";
import { ICategory } from "../../components/product-list";

const CreatePage: FC = () => {
    const [categories, setCategories] = useState<Array<ICategory>>([]);
   const [productName, setProductName] = useState<string>("");
   const [description, setDescription] = useState<string>("");
   const [imageUrl, setImageUrl] = useState<string>("");
   const [category, setCategory] = useState<string>("");
   const [price, setPrice] = useState<number>(0);
  return (
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
        <DropDown options={categories}/>

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
  );
};

export default CreatePage;
