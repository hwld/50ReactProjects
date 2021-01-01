import { Header } from "../components/Header";
import { HomeMain } from "../components/HomeMain";

const Home: React.FC = () => {
  return (
    <>
      <Header currentPage="home" />
      <HomeMain />
    </>
  );
};

export default Home;
