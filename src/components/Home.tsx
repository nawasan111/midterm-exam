import { useEffect } from "react";

function Home() {
  useEffect(() => {
    document.title = "pet clinic";
  }, []);
  return <div>Home</div>;
}

export default Home;
