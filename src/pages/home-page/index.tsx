import { FC, Fragment } from "react";
import AddButton from "../../components/addButton";
import ProductList from "../../components/product-list";

const HomePage: FC = () => {
  return (
    <Fragment>
      <ProductList />
      <AddButton />
    </Fragment>
  );
};

export default HomePage;
