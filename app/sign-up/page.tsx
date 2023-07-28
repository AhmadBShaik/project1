"use client";
import React, { ReactNode, useState } from "react";
import { Eye, EyeOff } from "react-feather";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";

const signUpFormData = z
  .object({
    name: z.string().min(3).max(20),
    is_admin: z.boolean(),
    email: z.string().email(),
    password: z.string().min(6).max(20),
    confirmPassword: z.string().min(6).max(20),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignUpFormData = z.infer<typeof signUpFormData>;

export default function SignUp() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [info, setInfo] = useState<ReactNode>();
  const [loading, setLoading] = useState<boolean>(false);
  const supabase = createClientComponentClient<Database>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormData),
  });

  const submitData = async (data: SignUpFormData) => {
    setLoading(true);
    // console.log(data)
    const signUpResponse = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: `${location.origin}/api/auth/callback`,
        data: {
          name: data.name,
          is_admin: data.is_admin,
        }
      },
    });

    if (!signUpResponse.error) {
      setInfo(
        <div
          className={
            "w-full bg-green-200 text-green-700 border border-green-300 rounded py-2 space-y-1"
          }
        >
          <div className="text-center font-bold">Success!</div>
          <div className="text-center">
            Please check your email to verify your account
          </div>
        </div>
      );
    } else {
      setInfo(
        <div
          className={
            "w-full bg-red-200 text-red-700 border border-red-300 rounded py-2 space-y-1"
          }
        >
          <div className="text-center font-bold">Something went wrong!</div>
          <div className="text-center">Please try again later</div>
        </div>
      );
      setLoading(false);
    }
  };
  return (
    <>
      <main className="flex-1 mt-18 w-full flex items-center justify-center p-3 mt-20">
        <section className="w-full max-w-lg bg-neutral-800 p-5 shadow-md rounded-md">
          <form
            className="space-y-3"
            onSubmit={handleSubmit(submitData)}
            autoComplete="off"
          >
            <legend className="text-green-500 mb-5">
              <div className="font-bold text-2xl">Get started</div>
              <div className="text-sm">Create a new account</div>
            </legend>
            {!!info ? <>{info}</> : null}

            <label className="block">
              <span className="block text-sm font-medium text-neutral-200">
                Name
              </span>
              <input
                className="w-full outline-0 px-2 py-0.5 rounded bg-neutral-600 text-neutral-100"
                placeholder="Enter name"
                {...register("name")}
              />
              {errors.name ? (
                <span className="text-sm text-red-500">
                  {errors.name.message}
                </span>
              ) : null}
            </label>

            <label className="block">
              <span className="block text-sm font-medium text-neutral-200">
                Email
              </span>
              <input
                className="w-full outline-0 px-2 py-0.5 rounded bg-neutral-600 text-neutral-100"
                placeholder="Enter email"
                {...register("email")}
              />
              {errors.email ? (
                <span className="text-sm text-red-500">
                  {errors.email.message}
                </span>
              ) : null}
            </label>

            <label className="block">
              <span className="block text-sm font-medium text-neutral-200">
                Password
              </span>
              <div className="relative">
                <input
                  className="w-full outline-0 px-2 py-0.5 rounded bg-neutral-600 text-neutral-100"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  {...register("password")}
                />
                {showPassword ? (
                  <Eye
                    className="absolute text-green-500 top-0.5 right-2.5 w-5 cursor-pointer"
                    onClick={() => {
                      setShowPassword((prevState) => !prevState);
                    }}
                  />
                ) : (
                  <EyeOff
                    className="absolute text-green-500 top-0.5 right-2.5 w-5 cursor-pointer"
                    onClick={() => {
                      setShowPassword((prevState) => !prevState);
                    }}
                  />
                )}
              </div>
              {errors.password ? (
                <span className="text-sm text-red-500">
                  {errors.password.message}
                </span>
              ) : null}
            </label>

            <label className="block">
              <span className="block text-sm font-medium text-neutral-200">
                Confirm password
              </span>
              <input
                className="w-full outline-0 px-2 py-0.5 rounded bg-neutral-600 text-neutral-100"
                type="password"
                placeholder="Confirm password"
                {...register("confirmPassword")}
              />
              {errors.confirmPassword ? (
                <span className="text-sm text-red-500">
                  {errors.confirmPassword.message}
                </span>
              ) : null}
            </label>

            <label className="flex space-x-2">
              <input type="checkbox" {...register("is_admin")} 
              className="bg-neutral-600 text-neutral-100"/>
              <span className=" font-medium text-neutral-200 ">
                Sign up as admin
              </span>
            </label>
            <div className="pt-5">
              <input
                disabled={loading}
                type="submit"
                value={"Sign Up"}
                className={`w-full font-bold ${
                  loading ? "bg-green-300" : "bg-green-500"
                } text-neutral-100 py-2 rounded cursor-pointer`}
              />
            </div>
          </form>
        </section>
      </main>
    </>
  );
}
