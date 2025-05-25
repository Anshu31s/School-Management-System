"use client";

import * as Clerk from "@clerk/elements/common";
import * as SignIn from "@clerk/elements/sign-in";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LoginPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const role = user?.publicMetadata.role;
    if (isLoaded && isSignedIn && role) {
      router.push(`/${role}`);
    }
  }, [isLoaded, isSignedIn, user, router]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex md:h-screen w-screen items-center overflow-hidden px-2">
      <SignIn.Root>
        <SignIn.Step
          name="start"
          className="relative flex w-96 flex-col space-y-5 rounded-lg border bg-white px-5 py-10 shadow-xl sm:mx-auto"
        >
          <div className="mx-auto mb-2 space-y-3">
            <h1 className="text-center text-3xl font-bold text-gray-700 flex items-center justify-center gap-2">
              <Image src="/logo.png" alt="School Logo" width={24} height={24} />
              Sign in
            </h1>
            <p className="text-gray-500">Sign in to access your account</p>
          </div>
          <Clerk.GlobalError className="text-red-500 text-center text-sm" />
          <Clerk.Field name="identifier" className="relative mt-2 w-full">
            <Clerk.Input
              type="text"
              required
              maxLength={20}
              className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
            />
            <Clerk.Label
              className="origin-[0] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300"
            >
              User ID
            </Clerk.Label>
            <Clerk.FieldError className="text-red-500 text-xs mt-1" />
          </Clerk.Field>
          <Clerk.Field name="password" className="relative mt-4 w-full">
            <Clerk.Input
              type={showPassword ? "text" : "password"}
              required
              className="peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
            />
            <Clerk.Label
              className="absolute left-1 top-2 z-10 origin-0 -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600"
            >
              Password
            </Clerk.Label>
            <div
              id="togglePassword"
              style={{ position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%)", cursor: "pointer" }}
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <svg
                  id="eye-closed"
                  fill="currentColor"
                  className="w-5 h-5"
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.26 11.6A6.97 6.97 0 0 1 10 6c3.2 0 6.06 2.33 6.74 5.6a.5.5 0 0 0 .98-.2A7.97 7.97 0 0 0 10 5a7.97 7.97 0 0 0-7.72 6.4.5.5 0 0 0 .98.2ZM10 8a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-2.5 3.5a2.5 2.5 0 1 1 5 0 2.5 2.5 0 0 1-5 0Z"
                    fill="currentColor"
                  ></path>
                </svg>
              ) : (
                <svg
                  id="eye-open"
                  fill="currentColor"
                  className="w-5 h-5"
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.85 2.15a.5.5 0 1 0-.7.7l3.5 3.5a8.1 8.1 0 0 0-3.37 5.05.5.5 0 1 0 .98.2 7.09 7.09 0 0 1 3.1-4.53l1.6 1.59a3.5 3.5 0 1 0 4.88 4.89l4.3 4.3a.5.5 0 0 0 .71-.7l-15-15Zm9.27 10.68a2.5 2.5 0 1 1-3.45-3.45l3.45 3.45Zm-2-4.83 3.38 3.38A3.5 3.5 0 0 0 10.12 8ZM10 6c-.57 0-1.13.07-1.67.21l-.8-.8A7.65 7.65 0 0 1 10 5c3.7 0 6.94 2.67 7.72 6.4a.5.5 0 0 1-.98.2A6.97 6.97 0 0 0 10 6Z"
                    fill="currentColor"
                  ></path>
                </svg>
              )}
            </div>
            <Clerk.FieldError className="text-red-500 text-xs mt-1" />
          </Clerk.Field>
          <div className="mt-2">
            <Link
              href="/forgot-password"
              className="text-center text-sm font-medium text-gray-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
          <SignIn.Action
            submit
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-8"
          >
            Sign in
          </SignIn.Action>
        </SignIn.Step>
      </SignIn.Root>
    </div>
  );
};

export default LoginPage;