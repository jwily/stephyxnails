import { useOrderContext } from "../../context/OrderContext";

export default function AboutPage() {
  const { scrollToAbout } = useOrderContext();

  return (
    <div className="rounded-2xl m-4 bg-primary p-4" ref={scrollToAbout}>
      <h1 className="text-center mb-3">About Me</h1>
      <div className="flex">
        <div></div>
        <div>
          <p>
            Hi!! I’m your press-on nail artist Stephanie, or Stephy, or Steph °˖✧◝(⁰▿⁰)◜✧˖° and I’ve been
            doing nails since crackle polish was still a thing (iykyk). I first started doing nails as a hobby
            and created my Instagram page as a way to showcase my art. In 2022 StephyX Nails was born after a
            friend asked if I could make her a set of press-ons and that’s how we’ve gotten to where we are
            now ｡^‿^｡
            <br />
              I specialize in kawaii, anime, and 3D nail art. My designs and art have evolved over the years
              and really reflect who I am as a person and my interests.
            <br/>I would be honored to create something for you! (°◡°♡)
          </p>
        </div>
      </div>
      <button>click</button>
    </div>
  );
}
