import { map, tileLayer } from "leaflet";
import Swal from "sweetalert2";

var requestOptions = {
  method: "GET",
};

const mapdiv = document.querySelector("#map") as HTMLDivElement;
const searchBtn = document.querySelector("#search_btn");
let mymap: any;

function mapview(lat: number, lng: number) {
  const mapOptions: object = {
    center: [lat, lng],
    zoom: 15,
  };

  mymap = map("map", mapOptions);

  // Creating a Layer object
  var layer = tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png");

  // Adding layer to the map
  layer.addTo(mymap);
}

searchBtn!.addEventListener("click", (event) => {
  event.preventDefault();
  if (mymap) {
    mymap.remove();
    mapdiv.innerHTML = "<p>Loading!</p>";
  }
  const address = (document.querySelector("#address") as HTMLInputElement)
    .value;
  fetchCoordinates(address);
});

function fetchCoordinates(address: string) {
  console.log(address);

  fetch(
    `https://api.geoapify.com/v1/geocode/search?text=${address}&apiKey=8cd801b44f154384b8d1c9f3e852437c`,
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      if (result.features.length === 0) {
        mapdiv.innerHTML = "<p>Sry! Tye Differrent Address</p>";
        Swal.fire({
          title: "Error!",
          text: "Enter a Valid Address",
          icon: "error",
          confirmButtonText: "Cool",
        });
        return;
      }
      const latitude: number = result.features[0].properties.lat;
      const longitude: number = result.features[0].properties.lon;
      mapview(latitude, longitude);
      console.log(latitude, longitude);
    })
    .catch((error) => console.log("error", error));
}
