"use client";
import { Database } from "@/lib/database.types";
import { Menu } from "@headlessui/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";

export function ProfileDropdown({
  name,
  email,
  imageUrl,
  postfix,
}: {
  name: string;
  email: string;
  imageUrl?: string;
  postfix?: ReactNode;
}) {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const pathname = usePathname();

  return (
    <div className="relative flex items-center">
      <Menu>
        <Menu.Button>
          <div className="hidden sm:flex items-center">
            <div className="flex items-center space-x-2">
              <div className="w-15 h-15">
                <Image
                  src="/default-profile-avatar.svg"
                  width={35}
                  height={35}
                  className="rounded-full bg-white"
                  alt="Profile Avatar"
                />
              </div>
              <div className="text-left">
                <div className="text font-bold tracking-wide	">{name}</div>
                <div className="text-sm tracking-wide	">{email}</div>
              </div>
            </div>
          </div>

          <div className="flex sm:hidden items-center">
            <div className="w-15 h-15">
              <Image
                src="/default-profile-avatar.svg"
                width={35}
                height={35}
                className="rounded-full bg-white"
                alt="Profile Avatar"
              />
            </div>
          </div>
        </Menu.Button>
        <Menu.Items>
          <div className="absolute right-0 top-5.5 z-10 mt-6 w-56 origin-top-right rounded-md bg-neutral-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none space-y-1 p-2.5">
            <Menu.Item>
              {({ active }) => (
                <div
                  className={`cursor-pointer px-2.5 py-1 border-b border-green-800 mb-2 sm:hidden`}
                >
                  <div className="text font-bold tracking-wide">{name}</div>
                  <div className="text-sm tracking-wide">{email}</div>
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div
                  className={`${
                    active && "bg-green-500 text-white rounded"
                  } cursor-pointer px-2.5 py-1`}
                  onClick={
                    pathname === "/"
                      ? undefined
                      : async () => {
                          router.push("/");
                        }
                  }
                >
                  Home
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div
                  className={`${
                    active && "bg-green-500 text-white rounded"
                  } cursor-pointer px-2.5 py-1`}
                  onClick={
                    pathname === "/profile"
                      ? undefined
                      : async () => {
                          router.push("/profile");
                        }
                  }
                >
                  Profile
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div
                  className={`${
                    active && "bg-green-500 text-white rounded"
                  } cursor-pointer px-2.5 py-1`}
                  onClick={
                    pathname === "/agents"
                      ? undefined
                      : async () => {
                          router.push("/agents");
                        }
                  }
                >
                  Agents
                </div>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <div
                  className={`${
                    active && "bg-green-500 text-white rounded"
                  } cursor-pointer px-2.5 py-1`}
                  onClick={
                    pathname === "/pricing"
                      ? undefined
                      : async () => {
                          router.push("/pricing");
                        }
                  }
                >
                  Pricing
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div
                  className={`${
                    active && "bg-green-500 text-white rounded"
                  } cursor-pointer px-2.5 py-1`}
                  onClick={async () => {
                    await supabase.auth.signOut();
                    router.push("/sign-in");
                    router.refresh();
                  }}
                >
                  Sign out
                </div>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Menu>
      {!!postfix ? <span className="ml-2">{postfix}</span> : null}
    </div>
  );
}
