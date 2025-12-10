"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import loginImage from "../../../public/login-image.png";
import { loginSchema, type LoginInput } from "../../../src/lib/validations/login";
import { forgotEmailSchema } from "../../../src/lib/validations/forgotEmail";
import { forgotOtpSchema } from "../../../src/lib/validations/forgotOtp";
import { resetPasswordSchema } from "../../../src/lib/validations/resetPassword";

export default function AuthPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState("");

  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});

  const [forgotMode, setForgotMode] = useState(false);
  const [registerMode, setRegisterMode] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [newPasswordMode, setNewPasswordMode] = useState(false);

  const validEmail = "rohithb1998@gmail.com";
  const fixedOTP = "123456";

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("loggedIn");
    if (isLoggedIn) router.push("/dashboard");
  }, []);

  // -----------------------------------------
  // LOGIN
  // -----------------------------------------
  const handleLogin = (e: any) => {
    e.preventDefault();

    const data: LoginInput = { email, password };
    const result = loginSchema.safeParse(data);

    if (!result.success) {
      const err: any = {};
      result.error.issues.forEach((i) => (err[i.path[0]] = i.message));
      setErrors(err);
      return;
    }

    if (email !== validEmail || password !== "123456") {
      setErrors({ password: "Invalid email or password" });
      return;
    }

    localStorage.setItem("loggedIn", "true");
    router.push("/dashboard");
  };

  // -----------------------------------------
  // REGISTER
  // -----------------------------------------
  const handleRegister = (e: any) => {
    e.preventDefault();

    let err: any = {};

    if (!email) err.email = "Email is required";
    if (!password) err.password = "Password is required";
    if (password !== confirmPassword)
      err.confirmPassword = "Passwords do not match";

    if (Object.keys(err).length > 0) {
      setErrors(err);
      return;
    }

    alert("Account created successfully!");

    localStorage.setItem("loggedIn", "true");
    router.push("/dashboard");
  };

  // -----------------------------------------
  // STEP 1 – SEND OTP
  // -----------------------------------------
  const handleSendOtp = () => {
    const result = forgotEmailSchema.safeParse({ email });

    if (!result.success) {
      const err: any = {};
      result.error.issues.forEach((i) => (err[i.path[0]] = i.message));
      setErrors(err);
      return;
    }

    if (email !== validEmail) {
      setErrors({ email: "Email not found" });
      return;
    }

    setErrors({});
    setOtpSent(true);
  };

  // -----------------------------------------
  // STEP 2 – VERIFY OTP
  // -----------------------------------------
  const handleVerifyOtp = () => {
    const result = forgotOtpSchema.safeParse({ otp });

    if (!result.success) {
      const err: any = {};
      result.error.issues.forEach((i) => (err[i.path[0]] = i.message));
      setErrors(err);
      return;
    }

    if (otp !== fixedOTP) {
      setErrors({ otp: "Invalid OTP" });
      return;
    }

    setErrors({});
    setNewPasswordMode(true);
  };

  // -----------------------------------------
  // STEP 3 – RESET PASSWORD
  // -----------------------------------------
  const handleResetPassword = () => {
    const result = resetPasswordSchema.safeParse({
      password,
      confirmPassword,
    });

    if (!result.success) {
      const err: any = {};
      result.error.issues.forEach((i) => (err[i.path[0]] = i.message));
      setErrors(err);
      return;
    }

    alert("Password reset successful!");

    setForgotMode(false);
    setOtpSent(false);
    setNewPasswordMode(false);
    setRegisterMode(false);

    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setOtp("");
  };

  return (
    <section className="bg-green-50 py-[50px]">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-center items-center bg-white shadow-lg rounded-2xl p-10 gap-10">

          <div className="w-full max-w-md">

            {/* -------------------------- */}
            {/* REGISTER FORM */}
            {/* -------------------------- */}
            {registerMode && !forgotMode && (
              <>
                <h2 className="text-3xl font-bold text-center">Create Account</h2>

                <form onSubmit={handleRegister} className="mt-6 space-y-5">
                  <div>
                    <label className="block font-medium mb-1">Email</label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    />
                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block font-medium mb-1">Password</label>
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                  </div>

                  <div>
                    <label className="block font-medium mb-1">Confirm Password</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    />
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
                    )}
                  </div>

                  <button className="w-full bg-red-500 text-white py-2 rounded-lg">
                    Sign Up
                  </button>
                </form>

                <p
                  onClick={() => {
                    setRegisterMode(false);
                    setErrors({});
                  }}
                  className="text-center text-gray-500 mt-4 cursor-pointer"
                >
                  Already have an account?{" "}
                  <span className="text-red-500 font-semibold">Sign In</span>
                </p>
              </>
            )}

            {/* -------------------------- */}
            {/* FORGOT PASSWORD – EMAIL */}
            {/* -------------------------- */}
            {forgotMode && !otpSent && !newPasswordMode && (
              <>
                <h2 className="text-3xl font-bold text-center">Forgot Password</h2>

                <div className="mt-6">
                  <label className="font-medium mb-1 block">Enter your email</label>

                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  />

                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                <button
                  onClick={handleSendOtp}
                  className="w-full bg-red-500 text-white mt-4 py-2 rounded-lg"
                >
                  Send OTP
                </button>

                <p
                  onClick={() => setForgotMode(false)}
                  className="text-center mt-4 text-gray-500 cursor-pointer"
                >
                  Back to Login
                </p>
              </>
            )}

            {/* -------------------------- */}
            {/* FORGOT PASSWORD – OTP */}
            {/* -------------------------- */}
            {forgotMode && otpSent && !newPasswordMode && (
              <>
                <h2 className="text-3xl font-bold text-center">Verify OTP</h2>

                <div className="mt-6">
                  <label className="font-medium mb-1 block">Enter OTP</label>

                  <input
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  />

                  {errors.otp && (
                    <p className="text-red-500 text-sm mt-1">{errors.otp}</p>
                  )}
                </div>

                <button
                  onClick={handleVerifyOtp}
                  className="w-full bg-red-500 text-white mt-4 py-2 rounded-lg"
                >
                  Verify OTP
                </button>
              </>
            )}

            {/* -------------------------- */}
            {/* FORGOT PASSWORD – RESET PASSWORD */}
            {/* -------------------------- */}
            {forgotMode && newPasswordMode && (
              <>
                <h2 className="text-3xl font-bold text-center">Reset Password</h2>

                <div className="mt-6">
                  <label className="font-medium mb-1 block">New Password</label>
                  <input
                    value={password}
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                  )}
                </div>

                <div className="mt-4">
                  <label className="font-medium mb-1 block">Confirm Password</label>
                  <input
                    value={confirmPassword}
                    type="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
                  )}
                </div>

                <button
                  onClick={handleResetPassword}
                  className="w-full bg-red-500 text-white mt-4 py-2 rounded-lg"
                >
                  Reset Password
                </button>
              </>
            )}

            {/* -------------------------- */}
            {/* NORMAL LOGIN VIEW */}
            {/* -------------------------- */}
            {!forgotMode && !registerMode && (
              <>
                <h2 className="text-3xl font-bold text-center">Welcome Back</h2>

                <form onSubmit={handleLogin} className="mt-6 space-y-5">
                  <div>
                    <label className="block font-medium mb-1">Email</label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block font-medium mb-1">Password</label>
                    <input
                      value={password}
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    />
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                    )}
                  </div>

                  <div className="flex justify-between text-sm">
                    <label className="flex gap-2 items-center">
                      <input type="checkbox" /> Remember me
                    </label>

                    <p
                      onClick={() => {
                        setForgotMode(true);
                        setRegisterMode(false);
                      }}
                      className="text-red-500 cursor-pointer"
                    >
                      Forgot password?
                    </p>
                  </div>

                  <button className="w-full bg-red-500 text-white py-2 rounded-lg">
                    Sign In
                  </button>
                </form>

                <p className="text-center text-sm text-gray-500 mt-6">
                  Don’t have an account?
                  <span
                    onClick={() => {
                      setRegisterMode(true);
                      setForgotMode(false);
                      setErrors({});
                    }}
                    className="text-red-500 font-semibold cursor-pointer hover:underline ml-1"
                  >
                    Sign up for free!
                  </span>
                </p>
              </>
            )}
          </div>

          <div className="hidden md:block">
            <Image
              src={loginImage}
              alt="Login Image"
              width={450}
              height={600}
              className="rounded-xl"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
