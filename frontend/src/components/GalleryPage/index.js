import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function GalleryPage() {
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
    return (
        <div>
            <Carousel responsive={responsive}>
                <div>
                    <img src="https://mangterest-pic.s3.amazonaws.com/e0c31739011b474e9666709692cfadad.jpg" />
                </div>
                <div>
                    <img src="https://mangterest-pic.s3.amazonaws.com/5a5f64b3924f4990b576557394be0962.jpg" />
                </div>
                <div>
                    <img src="https://mangterest-pic.s3.amazonaws.com/e0c31739011b474e9666709692cfadad.jpg" />
                </div>
                <div>
                    <img src="https://mangterest-pic.s3.amazonaws.com/5a5f64b3924f4990b576557394be0962.jpg" />
                </div>
            </Carousel>
        </div>
    )
}
