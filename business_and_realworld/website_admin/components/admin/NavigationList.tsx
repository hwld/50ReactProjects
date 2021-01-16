import { List } from "@chakra-ui/react";
import React from "react";
import { NavigationListItem } from "./NavigationListItem";

export type NavigationListProps = { current: "home" | "articles" | "settings" };

const Component: React.FC<NavigationListProps> = ({ current }) => {
  return (
    <List p={3}>
      <NavigationListItem isCurrent={current === "home"} href="/admin">
        ホーム
      </NavigationListItem>
      <NavigationListItem
        isCurrent={current === "articles"}
        href="/admin/articles"
      >
        記事
      </NavigationListItem>
    </List>
  );
};

export const NavigationList = Component;
