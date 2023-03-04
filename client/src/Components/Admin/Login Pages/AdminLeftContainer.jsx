import React from 'react'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const AdminLeftContainer = () => {
  return (
    <div className="lg:flex flex-col hidden w-1/2 bg-blue-600 h-screen font-roboto">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showStatus={false}
        className="w-full h-screen flex items-center"
      >
        <div
          className="w-full h-screen bg-feature-1 bg-cover bg-no-repeat bg-center flex justify-center flex-col items-center"
          style={{ height: "80vh" }}
        >
          <h2 className="font-medium text-2xl">Special offer2</h2>
          <h1 className="text-sale font-rowdies text-7.5xl m-0">SALE</h1>
          <h3 className="font-semibold text-3xl mt-0 text-sub-feature-1">
            UP TO 50% OFF
          </h3>
        </div>
        <div
          className="w-full h-screen bg-feature-2 bg-cover bg-no-repeat bg-center flex justify-center flex-col items-start pl-24 text-pink-300"
          style={{ height: "80vh" }}
        >
          <h2 className="font-gochi text-8xl m-0">Summer</h2>
          <h1 className="text-7xl m-0">Fashion</h1>
          <h2 className="text-4xl font-roboto font-medium text-white m-0">
            sale
          </h2>
          <h2 className="text-4xl font-roboto font-medium text-white m-0">
            UP TO 70% OFF
          </h2>
        </div>
        <div
          className="w-full h-screen bg-feature-3 bg-cover bg-no-repeat bg-center flex justify-center flex-col items-center"
          style={{ height: "80vh" }}
        >
          <h1 className="text-6xl pt-8 m-0">BIG SALE</h1>
          <h1 className="text-6xl pt-8 m-0 text-white">BIG SALE</h1>
          {/* <hr /> */}
          <h3 className="font-semibold text-red-700 text-3xl mt-80">
            Don't Miss the Deal
          </h3>
          <p className="text-2xl font-medium">Get Up To 70% OFF</p>
        </div>
      </Carousel>
    </div>
  )
}

export default AdminLeftContainer