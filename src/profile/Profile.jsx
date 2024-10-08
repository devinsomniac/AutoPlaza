import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import MyListing from "./Components/MyListing";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Skeleton } from "@/components/ui/skeleton";

const Profile = () => {
  const [isMyListingReady, setIsMyListingReady] = useState(false);

  useEffect(() => {
    // Delay loading the MyListing component by 2 seconds
    const timer = setTimeout(() => {
      setIsMyListingReady(true);
    }, 5000); // 2-second delay, adjust as needed

    // Cleanup function to clear the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <Header />
      <div className="px-10 md:px-20 my-10">
        <Tabs defaultValue="account" className="w-full">
          <TabsList className="w-full flex justify-start">
            <TabsTrigger value="myListings">My Listings</TabsTrigger>
            <TabsTrigger value="inbox">Inbox</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="myListings">
            {isMyListingReady ? (
              <MyListing /> // Render MyListing after the delay
            ) : (
              <>
                <div className=" flex flex-col space-y-3">
                  <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="bg-slate-400 h-4 w-[250px]" />
                    <Skeleton className="bg-slate-400 h-4 w-[200px]" />
                  </div>
                </div>
                <div className=" flex flex-col space-y-3">
                  <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                  <div className="space-y-2">
                    <Skeleton className="bg-slate-400 h-4 w-[250px]" />
                    <Skeleton className="bg-slate-400 h-4 w-[200px]" />
                  </div>
                </div>
              </>
            )}
          </TabsContent>

          <TabsContent value="inbox">List of Messages</TabsContent>

          <TabsContent value="profile">My Profile Details</TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
