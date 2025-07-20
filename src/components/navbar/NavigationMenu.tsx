import {
  NavigationMenu as NavMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"

interface Props {
  menus?: { href: string; label: string; active: boolean }[]
}
export default function NavigationMenu({ menus }: Props) {
  return (
    <NavMenu className="max-md:hidden">
      <NavigationMenuList className="gap-2">
        {menus?.map((link, index) => (
          <NavigationMenuItem key={index}>
            <NavigationMenuLink
              active={link.active}
              href={link.href}
              className="text-muted-foreground hover:text-primary py-1.5 font-medium"
            >
              {link.label}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavMenu>
  )
}
