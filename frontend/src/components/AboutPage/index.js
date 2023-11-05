import { useOrderContext } from "../../context/OrderContext";
import aboutMe from "./about-me.png";

export default function AboutPage() {
  const { scrollToAbout } = useOrderContext();

  return (
      <div class="card card-image-cover bg-primary">
        <img src={aboutMe} alt="steph-avatar" />
        <div class="card-body">
          <h2 class="card-header">About Me</h2>
          <div className="flex flex-col gap-5">
            <p>
              Hi!! I’m your press-on nail artist Stephanie, or Stephy, or Steph °˖✧◝(⁰▿⁰)◜✧˖° and I’ve been
              doing nails since crackle polish was still a thing (iykyk). I first started doing nails as a
              hobby and created my Instagram page as a way to showcase my art. In 2022 StephyX Nails was born
              after a friend asked if I could make her a set of press-ons and that’s how we’ve gotten to where
              we are now ｡^‿^｡
            </p>
            <p>
              I specialize in kawaii, anime, and 3D nail art. My designs and art have evolved over the years
              and really reflect who I am as a person and my interests.
            </p>
            <p>I would be honored to create something for you! (°◡°♡)</p>
          </div>
          {/* <div class="card-footer">
            <button class="btn-secondary btn">Learn More</button>
          </div> */}
        </div>
      </div>
  );
}
