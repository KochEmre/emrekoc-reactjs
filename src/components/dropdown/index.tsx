import { FC, Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { ICategory } from "../product-list";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export interface IDropDownProps {
  optionAll?: boolean;
  options: Array<ICategory>;
  setSelected?: React.Dispatch<React.SetStateAction<string>>;
}

const initialPlaceholder: string = "Categories";

const DropDown: FC<IDropDownProps> = ({
  options,
  setSelected,
  optionAll = true,
}) => {
  const [shownText, setShownText] = useState<string>(initialPlaceholder);

  return (
    <Menu as="div" className="relative inline-block w-full text-left">
      <div>
        <Menu.Button
          className={`inline-flex h-11 w-full items-center justify-between rounded-xl border border-gray-300 bg-white px-2 sm:px-5 py-2 font-medium shadow-md ring-black hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-gray-100 ${
            shownText === initialPlaceholder ? "text-gray-400" : "text-gray-700"
          }`}
        >
          {shownText}
          <ChevronDownIcon
            className="-mr-1 ml-2 h-5 w-4 sm:w-5 text-gray-700"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-1 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {optionAll && (
              <Menu.Item>
                {({ active }) => (
                  <a
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2"
                    )}
                    onClick={() => {
                      setSelected?.("all");
                      setShownText("All");
                    }}
                  >
                    All
                  </a>
                )}
              </Menu.Item>
            )}
            {options?.map((child, index) => (
              <Menu.Item key={index}>
                {({ active }) => (
                  <a
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 "
                    )}
                    onClick={() => {
                      setSelected?.(child.name);
                      setShownText(child.name);
                    }}
                  >
                    {child.name}
                  </a>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default DropDown;
