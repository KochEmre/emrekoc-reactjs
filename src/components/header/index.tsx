import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="mx-8 my-10 flex h-16 flex-row items-center justify-between rounded-xl bg-white px-5 text-center text-xl font-bold italic shadow-xl md:mx-16">
      <h1 className="cursor-pointer">Upayments Store</h1>
      <h1 className="cursor-pointer">Register</h1>
      {/* <Link to="/">HOME</Link>
      <Link to="/Register">ABOUT</Link> */}
    </div>
  );
};

export default Header;
