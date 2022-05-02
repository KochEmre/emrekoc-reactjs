import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="mx-4 sm:mx-8 my-6 sm:my-8 lg:my-10 flex h-16 flex-row items-center justify-between rounded-xl bg-white px-5 text-center text-lg font-bold italic no-underline shadow-xl sm:text-xl md:mx-16">
      <Link to="/">UPayments Store</Link>
      <Link to="/register">Register</Link>
    </div>
  );
};

export default Header;
