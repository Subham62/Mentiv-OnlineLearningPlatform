import { Menu, School } from "lucide-react";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Darkmode from "@/Darkmode";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "@/features/api/authApi";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import Logo from "../assets/logo.jpg";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "User Logged out");
      navigate("/login");
    }
  }, [isSuccess]);

  return (
    // <div className="h-16 dark:bg-[#020817] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
    <div className="h-16 dark:bg-gray-900/95 bg-white border-b dark:border-b-gray-700 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-10">
      {/* Desktop */}
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full">
        <div className="flex gap-2 items-center">
          <img
            src={Logo}
            alt="Mentiv Logo"
            className="w-10 h-10 object-contain rounded-md"
          />
          <Link to="/">
            <h1 className="hidden md:block font-extrabold text-2xl">Mentiv</h1>
          </Link>
        </div>
        <div className="flex items-center gap-8">
          {/* User icons and dark mode icons */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="flex flex-row">
                  <Avatar>
                    <AvatarImage
                      src={user?.photoUrl || "https://github.com/shadcn.png"}
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <p className="font-bold text-base sm:text-lg text-center mx-4 my-3">
                    {user.name}
                  </p>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="start">
                <DropdownMenuLabel className="px-2 py-1 text-xs font-semibold uppercase tracking-wide text-gray-900 dark:text-gray-200 cursor-default">My Account</DropdownMenuLabel>
                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <Link to="my-learning">My learning</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link to="profile">Edit profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logoutHandler}>
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuGroup>

                {user?.role === "instructor" && (
                  <>
                    <DropdownMenuSeparator className=" bg-gray-200 dark:bg-gray-700" />
                    <DropdownMenuItem>
                      <Link to="/admin/dashboard">Dashboard</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => navigate("/login")}>
                Login
              </Button>
              <Button onClick={() => navigate("/login")}>Signup</Button>
            </div>
          )}
          <Darkmode />
        </div>
      </div>
      
      {/* Mobile devices */}
      <div className="flex md:hidden items-center justify-between px-4 h-full">
        {/* <div className="flex gap-2 "> */}
        <div className="flex gap-2 items-center">
          <img
            src={Logo}
            alt="Mentiv Logo"
            className="w-8 h-8 object-contain rounded-md"
          />
          <Link to="/">
            <h1 className="font-extrabold text-2xl">Mentiv</h1>
          </Link>
        </div>
        {user ? (
          <MobileNavbar user={user} logoutHandler={logoutHandler} />
        ) : (
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate("/login")}>
              Login
            </Button>
            <Button size="sm" onClick={() => navigate("/login")}>Signup</Button>
            <Darkmode />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

const MobileNavbar = ({ user, logoutHandler }) => {
  const firstName = user?.name.split(" ")[0];
  // const role = "instructor";
  // const navigate = useNavigate();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" className="rounded-full" variant="outline">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col ">
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <div className="flex flex-row">
            <Avatar>
              <AvatarImage
                src={user?.photoUrl || "https://github.com/shadcn.png"}
                alt="@shadcn"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <p className="font-bold text-base sm:text-lg text-center mx-4 my-3">
              Hi, {firstName}
            </p>
          </div>

          <Darkmode />
        </SheetHeader>
        <Separator className="mr-2" />
        <nav className="flex flex-col space-y-4">
          <span>
            <Link to="my-learning">My learning</Link>
          </span>
          <span>
            <Link to="profile">Edit profile</Link>
          </span>
          <p onClick={logoutHandler} className="cursor-pointer hover:text-red-500">
            Log Out
          </p>
        </nav>
        {user?.role === "instructor" && (
          <SheetFooter>
            <SheetClose asChild>
              <div className="flex flex-col">
                <Button type="submit">
                  <Link to="/admin/dashboard">Dashboard</Link>
                </Button>
                <Button type="submit" className="mt-2">
                  <Link to="/admin/course">Courses</Link>
                </Button>
              </div>
            </SheetClose>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
};
