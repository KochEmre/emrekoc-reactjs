import { useState, ChangeEvent, useEffect } from "react";
import DropDown from "../dropdown";
import * as API from "../../api/index";
import ProductCard, { IProductCard } from "../product-card";
import Spinner from "../spinner";

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
  const [loading, setLoading] = useState<boolean>(true);

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const searchFieldValue = event.target.value.toLowerCase();
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
      return item.name.toLowerCase().includes(searchValue);
    });

    /* Empty Data Filter */
    const filteredData = searchFilteredData.filter((item) => {
      return item.name || item.avatar ? true : false;
    });

    setProducts(filteredData);
  }, [productList, selectedCategory, searchValue]);

  useEffect(() => {
    const getAllData = () => {
      setLoading(true);
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
        .finally(() => {
          setLoading(false);
        });
    };
    getAllData();
  }, [setProductList, setCategories]);

  return (
    <div className="flex flex-col">
      <div className="mx-4 sm:mx-8 my-2 sm:my-6 flex h-14 flex-row items-center justify-between md:my-8 md:mx-16">
        <input
          className=" w-40 sm:w-60 lg:w-72 xl:w-96"
          type={"search"}
          placeholder={"Apple Watch, Samsung S21, Macbook Pro, ..."}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onSearchChange(e)
          }
        />
        <div className="w-32 sm:w-48 md:w-64">
          <DropDown options={categories} setSelected={setSelectedCategory} />
        </div>
      </div>
      {loading ? (
        <Spinner />
      ) : products.length > 0 ? (
        <div className="my-4 sm:my-6 grid w-11/12 grid-cols-3 gap-4 sm:gap-6 md:gap-10 self-center px-1 lg:my-10 lg:grid-cols-4 lg:gap-14 lg:px-6 xl:w-3/5">
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
        <h1 className="text-center text-2xl">There Aren't Any Products</h1>
      )}
    </div>
  );
};

export default ProductList;
