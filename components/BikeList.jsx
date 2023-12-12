import BikeCard from "./BikeCard";

export default function BikeList({ bikeList }) {
  return (
    <div className="flex flex-wrap">
      {
        bikeList.length !== 0
        ?
        bikeList.map((bike, index) => {
          return (
            <BikeCard
              key={index}
              bike_id={bike._id}
              company={bike.company}
              model={bike.model}
              image={bike.image}
              cost={bike.price}
              color={bike.color}
              seller={bike.seller_id}
            />
          )
        })
        :
        <div className="flex items-center font-bold h-72 w-full place-self-center">
          <div className="m-auto">
            No Results
          </div>
        </div>
      }
    </div>
  )
}