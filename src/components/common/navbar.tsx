"use client";

import { useSession } from "next-auth/react";
import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
  Button,
  Avatar,
} from "@nextui-org/react";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import { Logo } from "@/components/common/icons";
import * as actions from "@/actions";

export const Navbar = () => {
  const session = useSession();
  console.log(session.data?.user);
  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <Logo />
          <NextLink className="flex justify-start items-center gap-1" href="/">
            Nigellestraat12
          </NextLink>
        </NavbarBrand>
        <NavbarItem>
          <NextLink className="" color="foreground" href="/manage">
            manage
          </NextLink>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        {!session.data?.user ? (
          <NavbarItem>
            <form action={actions.signIn}>
              <Button type="submit" color="secondary" variant="solid">
                Sign In
              </Button>
            </form>
          </NavbarItem>
        ) : (
          <>
            <NavbarItem>
              <form action={actions.signOut}>
                <Avatar src={session.data.user?.image ?? ""} />
              </form>
            </NavbarItem>
            <NavbarItem>
              <form action={actions.signOut}>
                <Button type="submit" color="secondary" variant="bordered">
                  Sign Out
                </Button>
              </form>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </NextUINavbar>
  );
};
