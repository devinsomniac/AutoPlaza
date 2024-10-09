import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./home";
import ContactPage from "./contact";
import { ClerkProvider } from '@clerk/clerk-react'
import Profile from "./profile/Profile";
import AddListing from "./add-listing/AddListing";
import { Toaster } from "./components/ui/sonner";
import SearchByCategory from "./Search/[category]";
import SearchByOption from "./Search";
import ListingDetail from "./listing-details/[id]";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/Contact",
    element: <ContactPage />,
  },
  {
    path:"/profile",
    element:<Profile/>
  },
  {
    path:"/add-listing",
    element:<AddListing/>
  },
  {
    path:"/Search/:category",
    element:<SearchByCategory/>
  },
  {
    path:"/Search",
    element:<SearchByOption/>
  },
  {
    path:"/listing-details/:id",
    element:<ListingDetail/>
  }

]);

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <RouterProvider router={router} />
      <Toaster />
    </ClerkProvider>
  </StrictMode>
);
