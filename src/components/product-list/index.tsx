import { FC, useState, ChangeEvent } from "react";

const ProductList = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const searchFieldValue = event.target.value.toLocaleLowerCase();
    setSearchValue(searchFieldValue);
  };

  return (
    <div>
      <div className="mx-8 my-10 flex h-14 flex-row items-center justify-between md:my-12 md:mx-16">
        <input
          className="w-96"
          type={"search"}
          placeholder={"Apple Watch, Samsung S21, Macbook Pro, ..."}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onSearchChange(e)
          }
        />
        <input className="" type={"search"} placeholder={"Apple"} />
      </div>
    </div>
  );
};

export default ProductList;
