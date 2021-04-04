import { Center } from "@chakra-ui/layout";
import { NextPage } from "next";
import { Piano } from "../components/Piano";

const Home: NextPage = () => {
  return (
    <Center mt={10}>
      <Piano minW="800px" />
    </Center>
  );
};

export default Home;
