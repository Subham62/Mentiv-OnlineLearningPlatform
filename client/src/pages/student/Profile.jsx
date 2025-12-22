import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import Course from "./Course";
import {
  useLoadUserQuery,
  useUpdateUserMutation,
  useChangePasswordMutation,
} from "@/features/api/authApi";
import { toast } from "sonner";
import LoadingSpinner from "@/components/LoadingSpinner";

const Profile = () => {
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [passwordInput, setPasswordInput] = useState({
    oldPassword: "",
    newPassword: "",
  });
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);

  const { data, isLoading, refetch } = useLoadUserQuery();
  const [
    updateUser,
    {
      data: updateUserdata,
      isLoading: updateUserIsLoading,
      error,
      isSuccess,
      isError,
    },
  ] = useUpdateUserMutation();

  const [
    changePassword,
    {
      data: changePasswordData,
      isLoading: changePasswordIsLoading,
      error: changePasswordError,
      isSuccess: changePasswordIsSuccess,
      isError: changePasswordIsError,
    },
  ] = useChangePasswordMutation();

  const onChangeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) setProfilePhoto(file);
  };

  const passwordChangeHandler = (e) => {
    const { name, value } = e.target;
    setPasswordInput({ ...passwordInput, [name]: value });
  };

  const updateUserHandler = async () => {
    // console.log(name, profilePhoto);
     // As we are sending file so take FormData().
    const formData = new FormData();
    formData.append("name", name);
    formData.append("profilePhoto", profilePhoto);
    await updateUser(formData);
  };

    // NOTE: why it added and its meaning:
   //   ❌ If a useState() or setName() triggers a re-render, refetch() is not called again.
   //  ✅ If you unmount the component (e.g., navigate to another route) and then come back, refetch() will be called again (since useEffect runs on mount).

   //   This means:

   // refetch() is called only once, when the component is first rendered.

   // After that, if the component re-renders (due to state/props changes), refetch() does not run again.

   // It will only run again if:

    // You manually call refetch() from some button or event, or

    // The component is unmounted and mounted again (e.g., you navigate away and come back to this component).
  const handleChangePassword = async () => {
    await changePassword(passwordInput);
  };

  useEffect(() => {
    refetch();
  }, []);

  // showing message after updating successfully
  useEffect(() => {
    if (isSuccess) {
      refetch();
      toast.success(updateUserdata?.message || "Profile updated successfully");
    }
    if (isError) {
      toast.error(error?.message || "Failed to update profile");
    }
  }, [error, updateUserdata, isSuccess, isError]);

  useEffect(() => {
    if (changePasswordIsSuccess) {
      toast.success(
        changePasswordData?.message || "Password changed successfully"
      );
      setPasswordInput({ oldPassword: "", newPassword: "" });
      setIsPasswordDialogOpen(false);
    }
    if (changePasswordIsError) {
      toast.error(
        changePasswordError?.data?.message || "Failed to change password"
      );
    }
  }, [changePasswordIsSuccess, changePasswordIsError]);

   // we have to include the below line as when isLoading=false then the next statement will not execute.
   // Otherwise the value of data will come "undefined"
   // And this line we have to include after all hooks as it has return statement .

  //  Better loading/error handling
  if (isLoading) {
    return <LoadingSpinner />;
  }

  //  Check if data exists before destructuring
  if (!data || !data.user) {
    return (
      <>
        <LoadingSpinner />
        <div className="flex items-center justify-center min-h-screen">
          <h1>Unable to load profile. Please try again.</h1>
        </div>
      </>
    );
  }

  const { user } = data; //  Now safe to destructure
  // const user = data && data.user;

  return (
    <div className="max-w-4xl mx-auto px-4 my-10">
      <h1 className="font-bold text-2xl text-center md:text-left">PROFILE</h1>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
        <div className="flex flex-col items-center">
          <Avatar className="h-24 w-24 md:h-32 md:w-32">
            <AvatarImage
              src={user.photoUrl || "https://github.com/shadcn.png"}
              alt="@shadcn"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <div>
            <h1 className="font-semibold text-gray-900 dark:text-gray-100">
              Name:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                {user.name}
              </span>
            </h1>
          </div>
          <div>
            <h1 className="font-semibold text-gray-900 dark:text-gray-100">
              Email:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                {user.email}
              </span>
            </h1>
          </div>
          <div>
            <h1 className="font-semibold text-gray-900 dark:text-gray-100">
              Role:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                {user.role.toUpperCase()}
              </span>
            </h1>
          </div>
          <div className="flex gap-2 mt-2">
            {/* Edit Profile Dialog */}
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm">Edit Profile</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you're
                    done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label>Name</Label>
                    <Input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Name"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label>Profile Photo</Label>
                    <Input
                      type="file"
                      onChange={onChangeHandler}
                      accept="image/*"
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button
                    disabled={updateUserIsLoading}
                    onClick={updateUserHandler}
                  >
                    {updateUserIsLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                      </>
                    ) : (
                      "Save changes"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            {/* Change Password Dialog */}
            <Dialog
              open={isPasswordDialogOpen}
              onOpenChange={setIsPasswordDialogOpen}
            >
              <DialogTrigger asChild>
                <Button size="sm" variant="outline">
                  Change Password
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Change Password</DialogTitle>
                  <DialogDescription>
                    Enter your current password and choose a new one. Click save
                    when done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="old-password">Current Password</Label>
                    <Input
                      id="old-password"
                      type="password"
                      name="oldPassword"
                      value={passwordInput.oldPassword}
                      onChange={passwordChangeHandler}
                      placeholder="Enter current password"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input
                      id="new-password"
                      type="password"
                      name="newPassword"
                      value={passwordInput.newPassword}
                      onChange={passwordChangeHandler}
                      placeholder="Enter new password"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      variant="outline"
                      onClick={() =>
                        setPasswordInput({ oldPassword: "", newPassword: "" })
                      }
                    >
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button
                    disabled={changePasswordIsLoading}
                    onClick={handleChangePassword}
                  >
                    {changePasswordIsLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Please wait
                      </>
                    ) : (
                      "Save changes"
                    )}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div>
        <h1 className="font-medium text-lg">Courses you're enrolled in</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
          {user.enrolledCourses.length === 0 ? (
            <h1>You haven't enrolled yet</h1>
          ) : (
            user.enrolledCourses.map((course) => (
              <Course course={course} key={course._id} />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
