import { Button } from "@/components/ui/button";
import { db } from "./../../../configs";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CarImages, CarList } from "./../../../configs/schema";
import { desc, eq } from "drizzle-orm";
import { useUser } from "@clerk/clerk-react";
import { FormatResult } from "./../../Shared/Service";
import CarItem from "@/components/CarItem";
import { FaEdit } from "react-icons/fa";
import { FaRegTrashAlt } from "react-icons/fa";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const MyListing = () => {
  const { user } = useUser();
  const [carList, setCarList] = useState([]);
  const [deleteCarId, setDeleteCarId] = useState(null);
  useEffect(() => {
    user && getUserCarListing();
  }, [user]);
  const getUserCarListing = async () => {
    const result = await db
      .select()
      .from(CarList)
      .leftJoin(CarImages, eq(CarList.id, CarImages.carListId))
      .where(eq(CarList.createdBy, user?.primaryEmailAddress?.emailAddress))
      .orderBy(desc(CarList.id));
    const res = FormatResult(result);
    setCarList(res);
    console.log(res);
  };

  const handleDelete = async () => {
    if (!deleteCarId) return
    try {
      await db.delete(CarList).where(eq(CarList.id, deleteCarId))
      setCarList(prevList => prevList.filter(car => car.id !== deleteCarId)) 
      setDeleteCarId(null) 
    } catch (err) {
      console.error("Error deleting the car", err)
    }
  }
  return (
    <div className="mt-6">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-4xl">My Listing</h2>
        <Link to={"/add-listing"}>
          <Button>+ Add New Listing</Button>
        </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-7 gap-5">
        {carList.map((item, index) => (
          <div key={index}>
            <CarItem car={item} />
            <div className="flex justify-around p-2 rounded-lg gap-2">
              <Link
                to={"/add-listing?mode=edit&id=" + item?.id}
                className="w-full"
              >
                <Button variant="outline" className="w-full">
                  <FaEdit />
                </Button>
              </Link>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={() => setDeleteCarId(item.id)}
                  >
                    <FaRegTrashAlt />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you sure you want to delete?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. Deleting this listing will
                      remove it permanently.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyListing;
