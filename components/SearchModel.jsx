"use client";
import Image from "next/image";
import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";

//import { manufacturers } from "@/constants";

const SearchModel = ({ models, model, setModel }) => {
  const [query, setQuery] = useState("");
  
  const filteredModels =
    query === ""
      ? models
      : models.filter((item) =>
          item
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );
  
  return (
    <div className="search-model">
      <Combobox value={model} onChange={setModel}>
        <div className="relative w-full">
          {/* Button for the combobox. Click on the icon to see the complete dropdown */}
          <Combobox.Button className="absolute top-[14px]">
            <Image
              src="/logo.svg"
              width={40}
              height={40}
              alt="bike model"
            />
          </Combobox.Button>
  
          {/* Input field for searching */}
          <Combobox.Input
            className="search-model__input"
            displayValue={(item) => item}
            onChange={(event) => {setQuery(event.target.value); setModel(event.target.value);}} // Update the search query when the input changes
            placeholder="Model"
          />
  
          {/* Transition for displaying the options */}
          <Transition
            as={Fragment} // group multiple elements without introducing an additional DOM node i.e., <></>
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")} // Reset the search query after the transition completes
          >
            <Combobox.Options
              className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              static
            >
              {filteredModels.length === 0 && query !== "" ? (
                <Combobox.Option
                  value={query}
                  className="search-model__option"
                >
                  {query}
                </Combobox.Option>
              ) : (
                filteredModels.map((item) => (
                  <Combobox.Option
                    key={item}
                    className={({ active }) =>
                      `relative search-model__option ${
                        active ? "bg-primary-blue text-white" : "text-gray-900"
                      }`
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {item}
                        </span>
                        
                        {/* Show an active blue background color if the option is selected */}
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active
                                ? "text-white"
                                : "text-pribg-primary-purple"
                            }`}
                          ></span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
};

export default SearchModel;
