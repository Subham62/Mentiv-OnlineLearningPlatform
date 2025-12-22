// import { AppWindowIcon, CodeIcon, Loader2 } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { useEffect, useState } from "react";
// import {
//   useLoginUserMutation,
//   useRegisterUserMutation,
// } from "@/features/api/authApi";
// import { toast } from "sonner";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [signupInput, setSignupInput] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });
//   const [loginInput, setLoginInput] = useState({ email: "", password: "" });

//   const [
//     registerUser,
//     {
//       data: registerData,
//       error: registerError,
//       isLoading: registerIsLoading,
//       isSuccess: registerIsSuccess,
//     },
//   ] = useRegisterUserMutation();
//   const [
//     loginUser,
//     {
//       data: loginData,
//       error: loginError,
//       isLoading: loginIsLoading,
//       isSuccess: loginIsSuccess,
//     },
//   ] = useLoginUserMutation();

//   const changeInputHandler = (e, type) => {
//     const { name, value } = e.target;
//     if (type === "signup") {
//       setSignupInput({ ...signupInput, [name]: value });
//     } else {
//       setLoginInput({ ...loginInput, [name]: value });
//     }
//   };

//   const navigate = useNavigate();

//   const handleRegistration = async (type) => {
//     const inputData = type === "signup" ? signupInput : loginInput;
//     const action = type === "signup" ? registerUser : loginUser;
//     await action(inputData);
//   };

//   useEffect(() => {
//     if (registerIsSuccess && registerData) {
//       toast.success(registerData.message || "Signup successfully");
//     }

//     if (registerError) {
//       toast.error(registerError?.data?.message || "Signup Failed");
//     }

//     if (loginIsSuccess && loginData) {
//       toast.success(loginData.message || "Login successfully");
//       navigate('/');
//     }

//     if (loginError) {
//       toast.error(loginError?.data?.message || "Login Failed");
//     }
//   }, [registerIsSuccess, registerError, loginIsSuccess, loginError]);

//   return (
//     <div className="flex items-center justify-center w-full mt-16">
//       <div className="flex w-full max-w-sm flex-col gap-6">
//         <Tabs defaultValue="login">
//           <TabsList className="grid w-full grid-cols-2">
//             <TabsTrigger value="signup">Signup</TabsTrigger>
//             <TabsTrigger value="login">Login</TabsTrigger>
//           </TabsList>
//           <TabsContent value="signup">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-center">Signup</CardTitle>
//                 <CardDescription>
//                   Create a new account and click signup when you&apos;re done.
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="signup-name">Name</Label>
//                   <Input
//                     id="signup-name"
//                     type="text"
//                     name="name"
//                     value={signupInput.name}
//                     onChange={(e) => {
//                       changeInputHandler(e, "signup");
//                     }}
//                     placeholder="Eg., patel"
//                     required
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="signup-email">Email</Label>
//                   <Input
//                     id="signup-email"
//                     type="email"
//                     name="email"
//                     value={signupInput.email}
//                     onChange={(e) => {
//                       changeInputHandler(e, "signup");
//                     }}
//                     placeholder="Eg., patel@example.com"
//                     required
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="signup-password">Password</Label>
//                   <Input
//                     id="signup-password"
//                     type="password"
//                     name="password"
//                     value={signupInput.password}
//                     onChange={(e) => {
//                       changeInputHandler(e, "signup");
//                     }}
//                     placeholder="Eg., xyz123#"
//                     required
//                   />
//                 </div>
//               </CardContent>
//               <CardFooter className="pt-4">
//                 <Button 
//                   disabled={registerIsLoading} 
//                   onClick={() => handleRegistration("signup")}
//                   className="w-full"
//                 >
//                   {registerIsLoading ? (
//                     <>
//                       <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
//                     </>
//                   ) : "Sign Up"}
//                 </Button>
//               </CardFooter>
//             </Card>
//           </TabsContent>
//           <TabsContent value="login">
//             <Card>
//               <CardHeader>
//                 <CardTitle className="text-center">Login</CardTitle>
//                 <CardDescription>
//                   Login your password here. After signup, you&apos;ll be logged
//                   in.
//                 </CardDescription>
//               </CardHeader>
//               <CardContent className="space-y-4">
//                 <div className="space-y-2">
//                   <Label htmlFor="login-email">Email</Label>
//                   <Input
//                     id="login-email"
//                     type="email"
//                     name="email"
//                     value={loginInput.email}
//                     onChange={(e) => {
//                       changeInputHandler(e, "login");
//                     }}
//                     placeholder="Eg., patel@example.com"
//                     required
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="login-password">Password</Label>
//                   <Input
//                     id="login-password"
//                     type="password"
//                     name="password"
//                     value={loginInput.password}
//                     onChange={(e) => {
//                       changeInputHandler(e, "login");
//                     }}
//                     placeholder="Eg., xyz123#"
//                     required
//                   />
//                 </div>
//               </CardContent>
//               <CardFooter className="pt-4">
//                 <Button 
//                   disabled={loginIsLoading} 
//                   onClick={() => handleRegistration("login")}
//                   className="w-full"
//                 >
//                   {loginIsLoading ? (
//                     <>
//                       <Loader2 className="mr-2 h-4 w-4 animate-spin"/> Please wait
//                     </>
//                   ) : "Login"}
//                 </Button>
//               </CardFooter>
//             </Card>
//           </TabsContent>
//         </Tabs>
//       </div>
//     </div>
//   );
// };

// export default Login;



import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} from "@/features/api/authApi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [signupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loginInput, setLoginInput] = useState({ email: "", password: "" });
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [resetPasswordInput, setResetPasswordInput] = useState({
    email: "",
    code: "",
    newPassword: "",
  });
  const [showResetForm, setShowResetForm] = useState(false);

  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation();

  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();

  const [forgotPassword, { isLoading: forgotIsLoading }] = useForgotPasswordMutation();
  const [resetPassword, { isLoading: resetIsLoading }] = useResetPasswordMutation();

  const navigate = useNavigate();

  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupInput({ ...signupInput, [name]: value });
    } else if (type === "login") {
      setLoginInput({ ...loginInput, [name]: value });
    } else if (type === "reset") {
      setResetPasswordInput({ ...resetPasswordInput, [name]: value });
    }
  };

  const handleRegistration = async (type) => {
    const inputData = type === "signup" ? signupInput : loginInput;
    const action = type === "signup" ? registerUser : loginUser;
    await action(inputData);
  };

  //  Handle forgot password with .unwrap()
  const handleForgotPassword = async () => {
    try {
      const result = await forgotPassword({ email: forgotPasswordEmail }).unwrap();
      toast.success(result.message || "Reset code sent to your email");
      setShowResetForm(true);
      setResetPasswordInput({ email: forgotPasswordEmail, code: "", newPassword: "" });
    } catch (error) {
      toast.error(error?.data?.message || "Failed to send reset code");
    }
  };

  //  Handle reset password with .unwrap()
  const handleResetPassword = async () => {
    try {
      const result = await resetPassword(resetPasswordInput).unwrap();
      toast.success(result.message || "Password reset successfully");
      setShowResetForm(false);
      setForgotPasswordEmail("");
      setResetPasswordInput({ email: "", code: "", newPassword: "" });
    } catch (error) {
      toast.error(error?.data?.message || "Failed to reset password");
    }
  };

  // Keeping only register/login useEffect
  useEffect(() => {
    if (registerIsSuccess && registerData) {
      toast.success(registerData.message || "Signup successfully");
    }
    if (registerError) {
      toast.error(registerError?.data?.message || "Signup Failed");
    }
    if (loginIsSuccess && loginData) {
      toast.success(loginData.message || "Login successfully");
      navigate("/");
    }
    if (loginError) {
      toast.error(loginError?.data?.message || "Login Failed");
    }
  }, [registerIsSuccess, registerError, loginIsSuccess, loginError]);

  return (
    <div className="flex items-center justify-center w-full mt-16">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Tabs defaultValue="login">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="signup">Signup</TabsTrigger>
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="forgot">Forgot Password</TabsTrigger>
          </TabsList>

          {/* Signup Tab */}
          <TabsContent value="signup">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Signup</CardTitle>
                <CardDescription>
                  Create a new account and click signup when you&apos;re done.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Name</Label>
                  <Input
                    id="signup-name"
                    type="text"
                    name="name"
                    value={signupInput.name}
                    onChange={(e) => changeInputHandler(e, "signup")}
                    placeholder="Eg., subham"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    name="email"
                    value={signupInput.email}
                    onChange={(e) => changeInputHandler(e, "signup")}
                    placeholder="Eg., subham@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    name="password"
                    value={signupInput.password}
                    onChange={(e) => changeInputHandler(e, "signup")}
                    placeholder="Eg., xyz123#"
                    required
                  />
                </div>
              </CardContent>
              <CardFooter className="pt-4">
                <Button
                  disabled={registerIsLoading}
                  onClick={() => handleRegistration("signup")}
                  className="w-full"
                >
                  {registerIsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                    </>
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Login Tab */}
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">Login</CardTitle>
                <CardDescription>
                  Login to your account. After login, you&apos;ll be redirected to home.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    name="email"
                    value={loginInput.email}
                    onChange={(e) => changeInputHandler(e, "login")}
                    placeholder="Eg., subham@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    name="password"
                    value={loginInput.password}
                    onChange={(e) => changeInputHandler(e, "login")}
                    placeholder="Eg., xyz123#"
                    required
                  />
                </div>
              </CardContent>
              <CardFooter className="pt-4">
                <Button
                  disabled={loginIsLoading}
                  onClick={() => handleRegistration("login")}
                  className="w-full"
                >
                  {loginIsLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Forgot Password Tab */}
          <TabsContent value="forgot">
            <Card>
              <CardHeader>
                <CardTitle className="text-center">
                  {showResetForm ? "Reset Password" : "Forgot Password"}
                </CardTitle>
                <CardDescription>
                  {showResetForm
                    ? "Enter the code sent to your email and your new password"
                    : "Enter your email to receive a password reset code"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!showResetForm ? (
                  <div className="space-y-2">
                    <Label htmlFor="forgot-email">Email</Label>
                    <Input
                      id="forgot-email"
                      type="email"
                      value={forgotPasswordEmail}
                      onChange={(e) => setForgotPasswordEmail(e.target.value)}
                      placeholder="Eg., subham@example.com"
                      required
                    />
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="reset-email">Email</Label>
                      <Input
                        id="reset-email"
                        type="email"
                        name="email"
                        value={resetPasswordInput.email}
                        onChange={(e) => changeInputHandler(e, "reset")}
                        placeholder="Eg., subham@example.com"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reset-code">Reset Code</Label>
                      <Input
                        id="reset-code"
                        type="text"
                        name="code"
                        value={resetPasswordInput.code}
                        onChange={(e) => changeInputHandler(e, "reset")}
                        placeholder="Enter 6-digit code"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="reset-password">New Password</Label>
                      <Input
                        id="reset-password"
                        type="password"
                        name="newPassword"
                        value={resetPasswordInput.newPassword}
                        onChange={(e) => changeInputHandler(e, "reset")}
                        placeholder="Enter new password"
                        required
                      />
                    </div>
                  </>
                )}
              </CardContent>
              <CardFooter className="pt-4 flex-col gap-2">
                <Button
                  disabled={forgotIsLoading || resetIsLoading}
                  onClick={showResetForm ? handleResetPassword : handleForgotPassword}
                  className="w-full"
                >
                  {(forgotIsLoading || resetIsLoading) ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                    </>
                  ) : showResetForm ? (
                    "Reset Password"
                  ) : (
                    "Send Reset Code"
                  )}
                </Button>
                {showResetForm && (
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowResetForm(false);
                      setResetPasswordInput({ email: "", code: "", newPassword: "" });
                    }}
                    className="w-full"
                  >
                    Back
                  </Button>
                )}
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Login;

