import { UserButton, SignInButton, useUser } from "@clerk/clerk-react";
import React from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const Header = () => {
  const { user, isSignedIn } = useUser();
  return (
    <div className="flex justify-between items-center shadow-sm p-5">
      <img src="/logo.svg" width={180} height={10} />
      <ul className="hidden md:flex gap-16">
        <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary ">
          Home
        </li>
        <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary ">
          Search
        </li>
        <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary ">
          New
        </li>
        <li className="font-medium hover:scale-105 transition-all cursor-pointer hover:text-primary ">
          Preowned
        </li>
      </ul>
      {isSignedIn ? (
        <div className="flex justify-center items-center gap-5">
          <Link to={"/profile"}>
          <UserButton />
          </Link>
          <Link to="/add-listing">
            <Button>Submit Listing</Button>
          </Link>
        </div>
      ) : (<div className="flex justify-center items-center gap-5">
        <SignInButton mode="modal" />
        <Link to="/profile">
          <Button>Submit Listing</Button>
        </Link>
      </div>
      )}
    </div>
  );
};

export default Header;
