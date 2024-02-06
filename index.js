function findRoutes(routes, currentDestination = null) {
  if (!routes.length) {
    return currentDestination;
  }

  let next;

  if (!currentDestination) {
    // let's create a map with all the possible from and to locations
    // only the start and final destinatioon will appear aonly once, the intermediate stops will appear twice
    const routeMap = routes.reduce((acc, current) => {
      const [from, to] = current;

      if (!acc[from]) {
        acc[from] = 1;
      } else {
        acc[from]++;
      }

      if (!acc[to]) {
        acc[to] = 1;
      } else {
        acc[to]++;
      }

      return acc;
    }, {});

    // transform our map to so it will contaiin only the name of the start and final destinatinos
    const startAndEnd = Object.entries(routeMap)
      .filter(([_destination, n]) => n === 1)
      .map(([key, _n]) => key);

    // lastly find the start location
    currentDestination = routes.find(([from, to]) =>
      startAndEnd.includes(from)
    )[0];
  }

  // the rest of the logic iis same as during the interview...
  const idx = routes.findIndex((route) => route[0] === currentDestination);

  next = routes[idx];
  routes.splice(idx, 1);
  return next[0] + ", " + findRoutes(routes, next[1]);
}

// first routes always come first in the routes array
console.log(
  findRoutes([
    ["USA", "BRA"],
    ["JPN", "PHL"],
    ["BRA", "UAE"],
    ["UAE", "JPN"],
  ]) === "USA, BRA, UAE, JPN, PHL"
);

console.log(
  findRoutes([
    ["UK", "GER"],
    ["GER", "BEL"],
    ["CAN", "FRA"],
    ["BEL", "CAN"],
  ]) === "UK, GER, BEL, CAN, FRA"
);

console.log(
  findRoutes([
    ["MNL", "TAG"],
    ["CEB", "TAC"],
    ["TAG", "CEB"],
    ["TAC", "BOR"],
  ]) === "MNL, TAG, CEB, TAC, BOR"
);

console.log(
  findRoutes([
    ["France", "Italy"],
    ["Canada", "United States"],
    ["Germany", "Spain"],
    ["New Zealand", "Canada"],
    ["Spain", "Morocco"],
    ["Morocco", "Japan"],
    ["Italy", "Germany"],
    ["Japan", "Australia"],
    ["Australia", "New Zealand"],
  ]) ===
    "France, Italy, Germany, Spain, Morocco, Japan, Australia, New Zealand, Canada, United States"
);

// find first routes
console.log(
  findRoutes([
    ["BRA", "KSA"],
    ["USA", "BRA"],
    ["JPN", "PHL"],
    ["KSA", "UAE"],
    ["UAE", "JPN"],
  ]) === "USA, BRA, KSA, UAE, JPN, PHL"
);

console.log(
  findRoutes([
    ["Chicago", "Winnipeg"],
    ["Halifax", "Montreal"],
    ["Montreal", "Toronto"],
    ["Toronto", "Chicago"],
    ["Winnipeg", "Seattle"],
  ]) === "Halifax, Montreal, Toronto, Chicago, Winnipeg, Seattle"
);

console.log(
  findRoutes([
    ["Agra", "Tokyo"],
    ["Seoul", "Ljubljana"],
    ["Ljubljana", "Wroclaw"],
    ["Wroclaw", "Nashville"],
    ["Nashville", "Amsterdam"],
    ["Amsterdam", "Hull"],
    ["Hull", "Vancouver"],
    ["Vancouver", "Agra"],
    ["Tokyo", "Manila"],
  ]) ===
    "Seoul, Ljubljana, Wroclaw, Nashville, Amsterdam, Hull, Vancouver, Agra, Tokyo, Manila"
);

console.log(
  findRoutes([
    ["Calgary", "Fargo"],
    ["Spokane", "Toronto"],
    ["Winnipeg", "Montreal"],
    ["Toronto", "Calgary"],
    ["Fargo", "Winnipeg"],
  ]) === "Spokane, Toronto, Calgary, Fargo, Winnipeg, Montreal"
);
