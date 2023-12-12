"use client";

import Image from "next/image";
import CustomButton from "./CustomButton";
import Link from "next/link";

const Hero = () => {
  const handleScroll = () => {};
  return (
    <div className="hero">
      <div className="flex-1 pt-36 padding-x">
        <h1 className="hero__title">Unleash your inner adventurer.</h1>
        <p className="hero__subtitle">
          Explore a world of motorbike excellence with our added trust.
        </p>
        <Link href="/explore">
          <CustomButton
            title="Explore Bikes"
            containerStyles="bg-primary-blue text-white rounded-full mt-10"
            handleClick={handleScroll}
          />
        </Link>
      </div>
      <div className="hero__image-container">
        <div className="hero__image ">
          <Image src="/hero.png" alt="hero" fill className="object-contain" />
        </div>
        <div className="hero__image-overlay" />
      </div>
    </div>
  );
};

export default Hero;
