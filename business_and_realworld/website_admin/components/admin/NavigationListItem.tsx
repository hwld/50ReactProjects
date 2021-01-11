import { ListItem } from "@chakra-ui/react";
import React from "react";
import Link from "next/link";

type Props = { isCurrent: boolean; href: string };

const Component: React.FC<Props> = ({ children, isCurrent, href }) => {
  return (
    <Link href={href}>
      <ListItem
        p={3}
        borderBottomWidth="1px"
        borderBottomColor="gray.400"
        bg={isCurrent ? "blue.500" : ""}
        _hover={{ opacity: 0.8 }}
      >
        {children}
      </ListItem>
    </Link>
  );
};

export const NavigationListItem = Component;
