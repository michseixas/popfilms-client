import CarouselCard from "../components/CarouselCard";
import NetflixRow from "../components/NetflixRow";

function HomePage() {
  return (
    <div className="bg-black text-white">
      <CarouselCard />
      <br/>
      <NetflixRow listId="drama" title="Dramas that embrace the rawness of human emotions." />
      <NetflixRow listId="adventure" title="Adventures that ignite the spark of exploration." />
      <NetflixRow listId="comedy" title="Comedies that leave you laughing 'til your sides ache." />
      <NetflixRow listId="animation" title="Where animation can bring dreams to vivid life." />
      <NetflixRow listId="action" title="Action that pushes the boundaries of excitement." />
      <NetflixRow listId="family" title="Family stories that warm hearts and create lasting memories." />
      <br/>
    </div>
  )
}

export default HomePage;