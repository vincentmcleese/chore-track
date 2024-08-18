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
import NextLink from "next/link";
import { Logo } from "@/components/common/icons";
import { auth } from "@/auth";
import * as actions from "@/actions";

export async function Navbar(): Promise<JSX.Element> {
  const session = await auth();
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
        {!session?.user ? (
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
                <Avatar src={session.user?.image ?? ""} />
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
}
