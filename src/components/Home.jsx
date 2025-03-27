import { Image } from "react-bootstrap";

const Home = () => {
  return (
    <div className="home-hero">
      <h3>Welcome to</h3>
      <h1>Rekode Distributors</h1>
      <Image
        src="/src/assets/mainimg.avif"
        className="main-image"
        alt="Distribution network"
      />
    </div>
  );
};

export default Home;
 