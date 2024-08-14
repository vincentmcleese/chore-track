import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
  Button,
} from "@nextui-org/react";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import { Logo } from "@/components/common/icons";

export const Navbar = () => {
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
        <NavbarItem>
          <form action={" "}>
            <Button type="submit" color="secondary" variant="bordered">
              {" "}
              Sign In
            </Button>
          </form>
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
};
