import { IconType } from "react-icons";
import { ReactText } from "react";
import { Flex, FlexProps, Icon, Link } from "@chakra-ui/react";

interface NavItemProps extends FlexProps {
  url: string;
  icon: IconType;
  children: any;
}

const NavItem = ({ url, icon, children, ...rest }: NavItemProps) => {
  return (
    <Link
      href={url}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="3"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "rgba(55,138,181,255)",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="8"
            fontSize="2xl"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

export default NavItem;