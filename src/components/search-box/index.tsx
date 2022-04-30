import { ChangeEvent } from "react";

type SearchBoxProps = {
  className: string;
  placeholder?: string;
  type?: string;
  onChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
};

const SearchBox = ({
  className,
  placeholder,
  type,
  onChangeHandler,
}: SearchBoxProps) => (
  <input
    className={`search-box ${className}`}
    type={type ?? "text"}
    placeholder={placeholder}
    onChange={onChangeHandler}
  />
);

export default SearchBox;
