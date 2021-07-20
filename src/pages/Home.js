import Countries from "../components/Countries";
import Logo from "../components/logo";
import Navigation from "../components/Navigation";

const Home = () => {
  return (
    <div className="home">
      <Navigation />
      <Logo />
      <Countries />
      <h1>Accueil</h1>
    </div>
  );
};

export default Home;
