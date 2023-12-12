"use client"
import { BikeList, SearchBar } from "@/components"
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function Explore () {
  const [companyObj,setCompanyObj] = useState({});
  const [bikeList,setBikeList] = useState([]);
  const [filteredBikeList,setFilteredBikeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const urlParams = useSearchParams()

  const makeBikeList = async () => {
    try {
      let companyDict = {};
      let i = 0;
      const bikes = await fetch('https://bike-showroom-backend-l81h.onrender.com/getRoute/get-product')
      const bikeData = await bikes.json();
      bikeData.map(async (bike) => {
        i++;
        if (!(bike.company in companyDict))
          companyDict[bike.company] = [];
        if (!(companyDict[bike.company].includes(bike.model)))
          companyDict[bike.company].push(bike.model);
      })
      console.log(bikeData);
      setBikeList(bikeData);
      setCompanyObj(companyDict);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  const getFilteredBikeList = () => {
    let filteredBikes = [];
    if (urlParams.size !== 0) {
      if (urlParams.has("manufacturer") && urlParams.has("model")) {
        bikeList.map((bike) => {
          if ((bike.company.toLowerCase() === urlParams.get("manufacturer")) && (bike.model.toLowerCase() === urlParams.get("model"))) {
            filteredBikes.push(bike);
          }
        })
      }
      else if (urlParams.has("manufacturer")) {
        bikeList.map((bike) => {
          if (bike.company.toLowerCase() === urlParams.get("manufacturer"))
            filteredBikes.push(bike);
        })
      }
      else {
        bikeList.map((bike) => {
          if (bike.model.toLowerCase() === urlParams.get("model"))
            filteredBikes.push(bike);
        })
      }
      setFilteredBikeList(filteredBikes);
    }
  }

  useEffect(() => {
    makeBikeList();
  }, [])

  useEffect(() => {
    getFilteredBikeList();
  }, [urlParams, bikeList])

  return (
    <main className="overflow-hidden">
      <div className="mt-28 padding-x padding-y max-width" id="discover">
        <div className="home__text-container">
          <h1 className="text-4xl font-extrabold">Bike Catalogue</h1>
          <p>Explore out bikes you might like</p>
        </div>

        {
          isLoading
          ?
          <div className="py-48"></div>
          :
          <div>
            <div className="home__filters">
              <SearchBar manufacturerObj={companyObj}></SearchBar>
            </div>
            {
              urlParams.size === 0
              ?
              <BikeList bikeList={bikeList}></BikeList>
              :
              <BikeList bikeList={filteredBikeList}></BikeList>
            }
          </div>
        }

      </div>
    </main>
  )
}