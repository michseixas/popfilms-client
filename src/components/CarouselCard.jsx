import Carousel from 'react-bootstrap/Carousel';

function CarouselCard() {
  return (
    <div className="d-flex justify-content-center">
      <div className="carousel-wrapper">
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/images/shawshank-redemption.webp"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>Top 250 Movies</h3>
              <p>Unforgettable stories on the silver screen.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/images/pulp-fiction.jpeg"
              alt="Second slide"
            />

            <Carousel.Caption>
              <h3>Most Popular Movies</h3>
              <p>The blockbusters that captivate the world.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/images/thelittlemermaid1.jpg"
              alt="Third slide"
            />

            <Carousel.Caption>
              <h3>Theater Movies</h3>
              <p>
              Immerse yourself in the magic of the big screen.
              </p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="/images/theflash.jpg"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>Coming Soon</h3>
              <p>Get ready for the next cinematic masterpiece.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
}

export default CarouselCard;