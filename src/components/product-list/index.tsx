import { useState, ChangeEvent, useEffect } from "react";
import DropDown from "../dropdown";
import * as API from "../../api/index";
import ProductCard, { IProductCard } from "../product-card";

export interface IProduct {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  avatar: string;
  developerEmail?: string;
}

export interface ICategory {
  id: number;
  name: string;
}

const ProductList = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [productList, setProductList] = useState<Array<IProduct>>([]);
  const [products, setProducts] = useState<Array<IProduct>>([]);
  const [categories, setCategories] = useState<Array<ICategory>>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const searchFieldValue = event.target.value.toLocaleLowerCase();
    setSearchValue(searchFieldValue);
  };

  useEffect(() => {
    /* Filter data depend on Category and Search Field*/
    let categoryFilteredData: Array<IProduct> = [];

    /*Category Filter*/
    if (selectedCategory === "all") {
      categoryFilteredData = productList;
    } else {
      categoryFilteredData = productList.filter((item) => {
        return item.category
          ?.toLowerCase()
          .includes(selectedCategory?.toLowerCase());
      });
    }

    /* Search Filter */
    const searchFilteredData = categoryFilteredData.filter((item) => {
      return item.name.toLowerCase().includes(searchValue.toLowerCase());
    });

    /* Empty Data Filter */
    const filteredData = searchFilteredData.filter((item) => {
      return item.name || item.avatar ? true : false;
    });

    setProducts(filteredData);
  }, [productList, selectedCategory, searchValue]);

  useEffect(() => {
    const getAllData = () => {
      Promise.all([API.getProducts(), API.getCategories()])
        .then((result) => {
          /* Products */
          if (result[0]?.data.length > 0) {
            setProductList(result[0].data);
          }

          /* Categories */
          if (result[1]?.data.length > 0) {
            setCategories(result[1].data);
          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {});
    };
    getAllData();
  }, [setProductList, setCategories]);

  return (
    <div className="flex flex-col">
      <div className="mx-8 my-6 flex h-14 flex-row items-center justify-between md:my-8 md:mx-16">
        <input
          className="w-96"
          type={"search"}
          placeholder={"Apple Watch, Samsung S21, Macbook Pro, ..."}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onSearchChange(e)
          }
        />
        <DropDown options={categories} setSelected={setSelectedCategory} />
      </div>
      {products.length > 0 ? (
        <div className="my-6 grid w-3/5 grid-cols-3 gap-8 self-center md:my-10 md:grid-cols-4 md:gap-14 md:px-6">
          {products.map((product, index) => {
            return (
              <ProductCard
                key={index}
                data={
                  {
                    id: product.id,
                    name: product.name,
                    avatar: product.avatar,
                    price: product.price,
                  } as IProductCard
                }
              />
            );
          })}
        </div>
      ) : (
        <h1 className="text-center text-2xl not-italic">
          There Aren't Any Products
        </h1>
      )}
    </div>
  );
};

export default ProductList;
