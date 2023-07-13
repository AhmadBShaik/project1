"use client";
import { Database } from "@/lib/database.types";
import { Menu } from "@headlessui/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
                  className="rounded-full"
                  alt="Profile Avatar"
                />
              </div>
              <div className="text-left">
                <div className="text-sm font-bold">{name}</div>
                <div className="text-xs">{email}</div>
              </div>
            </div>
          </div>

          <div className="flex sm:hidden items-center">
            <div className="w-15 h-15">
              <Image
                src="/default-profile-avatar.svg"
                width={35}
                height={35}
                className="rounded-full"
                alt="Profile Avatar"
              />
            </div>
          </div>
        </Menu.Button>
        <Menu.Items>
          <div className="absolute right-0 top-4.5 z-10 mt-6 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none space-y-1 p-2.5">
            <Menu.Item>
              {({ active }) => (
                <div
                  className={`cursor-pointer px-2.5 py-1 border-b border-orange-200 mb-2 sm:hidden`}
                >
                  <div className="text-sm font-bold">{name}</div>
                  <div className="text-sm">{email}</div>
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div
                  className={`${
                    active && "bg-orange-500 text-white rounded"
                  } cursor-pointer px-2.5 py-1`}
                  onClick={async () => {
                    router.push("/profile");
                    router.refresh();
                  }}
                >
                  Profile
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div
                  className={`${
                    active && "bg-orange-500 text-white rounded"
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
