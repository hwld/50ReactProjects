import NextLink from "next/link";
import { Link, Text } from "@chakra-ui/react";

type NavItemProps = {
  href: string;
  isCurrent: boolean;
};

export const NavItem: React.FC<NavItemProps> = ({
  children,
  href,
  isCurrent,
}) => {
  // isCurrentがfalseのときにLinkをラップする
  const content = (
    <Text
      cursor="pointer"
      fontSize="xl"
      fontWeight="bold"
      color={isCurrent ? "yellow.300" : "white"}
      mr="4"
    >
      {children}
    </Text>
  );

  return (
    <>
      {isCurrent ? (
        content
      ) : (
        <NextLink href={href}>
          <Link>{content}</Link>
        </NextLink>
      )}
    </>
  );
};
