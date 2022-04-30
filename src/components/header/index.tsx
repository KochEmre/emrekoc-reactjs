import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="mx-8 my-10 flex h-16 flex-row items-center justify-between rounded-xl bg-white px-5 shadow-xl md:mx-16">
      <Link to="/">Upayments Store</Link>
      <Link to="/register">Register</Link>
    </div>
  );
};

export default Header;
