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
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@nextui-org/react";
import NextLink from "next/link";
import { Logo } from "@/components/common/icons";
import { auth } from "@/auth";
import * as actions from "@/actions";
import { Link } from "react-router-dom";

export async function Navbar(): Promise<JSX.Element> {
  const session = await auth();
  const content = (
    <PopoverContent>
      <NextLink href="/manage">
        <Button type="submit" color="secondary" variant="light">
          Chore data
        </Button>
      </NextLink>

      <form action={actions.signOut}>
        <Button type="submit" color="default" variant="light">
          Sign Out
        </Button>
      </form>
    </PopoverContent>
  );
  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <Logo />
          <NextLink className="flex justify-start items-center gap-1" href="/">
            Nigellestraat12
          </NextLink>
        </NavbarBrand>
        {/* <NavbarItem>
          <NextLink className="" color="foreground" href="/manage">
            manage
          </NextLink>
        </NavbarItem> */}
      </NavbarContent>
      <NavbarContent
        className="sm:flex basis-1/5 sm:basis-full overflow-visible"
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
          <NavbarItem style={{ cursor: "pointer" }}>
            <Popover placement="bottom-end" color="default">
              <PopoverTrigger>
                <Avatar src={session.user?.image ?? ""} />
              </PopoverTrigger>
              {content}
            </Popover>
          </NavbarItem>
        )}
      </NavbarContent>
    </NextUINavbar>
  );
}
