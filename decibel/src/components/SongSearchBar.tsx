import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { useState, useEffect } from "react";
import { getToken, searchForItem } from "../API/auth.js";

//

export default function Form() {
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e) => {
    setSearchInput(e.target.value);
    console.log(`searchInput: ${searchInput}`);
  };

  return (
    <>
      <form style={{ width: "400px", margin: "50px auto" }}>
        <label
          htmlFor="email"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Search for an artist
        </label>
        <div className="mt-2 grid grid-cols-1">
          <input
            id="email"
            name="email"
            type="text"
            placeholder=""
            className="col-start-1 row-start-1 block w-full rounded-md bg-white py-1.5 pl-10 pr-3 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:pl-9 sm:text-sm/6"
            onChange={handleChange}
          />
          <MagnifyingGlassIcon
            aria-hidden="true"
            className="pointer-events-none col-start-1 row-start-1 ml-3 size-5 self-center text-gray-400 sm:size-4"
            style={{ color: "grey" }}
          />
        </div>
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            console.log("Button clicked");
          }}
          className="rounded bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          style={{
            margin: "20px auto",
            display: "flex",
            justifyContent: "center",
          }}
        >
          Search
        </button>
      </form>
    </>
  );
}
