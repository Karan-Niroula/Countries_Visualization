//getting top 10 most populated countries

let arrayOfAllPopulation = countries_data.map((con) => {
  return {
    country: con.name,
    population: con.population,
  };
});

const mostPopulatedCountries = arrayOfAllPopulation
  .sort((a, b) => {
    return b.population - a.population;
  })
  .slice(0, 10);
console.log(mostPopulatedCountries);

//getting top 10 most spoken language

let arrayOfAllLanguages = countries_data.map((lang) => {
  return lang.languages;
});

let allLanguages = [];
arrayOfAllLanguages.forEach((lang) => {
  for (i = 0; i < lang.length; i++) {
    allLanguages.push(lang[i]);
  }
});

// Create a dictionary to store the number of times each language appears in the array.
const languageCounts = {};
allLanguages.forEach((language) => {
  if (languageCounts[language]) {
    languageCounts[language]++;
  } else {
    languageCounts[language] = 1;
  }
});

// Getting 10 most spoken languages.
const mostSpokenLanguages = Object.entries(languageCounts)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 10);
console.log(mostSpokenLanguages);

function getGraphWidthOfPopl(conPopl) {
  let totalPopl = 0;
  mostPopulatedCountries.forEach((eachObj) => {
    totalPopl += eachObj.population;
  });
  let hundredPercent = totalPopl;
  return (100 / hundredPercent) * conPopl;
}
//getting DOM elements
let textBelowBtn = document.getElementById("below-btn-txt");
let container = document.querySelector(".container");
let populationBtn = document.getElementById("population");
let languagesBtn = document.getElementById("languages");

populationBtn.onclick = function getPopulation() {
  if (!(container.innerHTML = "")) {
    container.innerHTML = "";
  }
  textBelowBtn.textContent = "10 Most populated countries in the world";
  mostPopulatedCountries.forEach((entry) => {
    // appending the countries in the first column
    let countryName = document.createElement("p");
    countryName.textContent = entry.country;
    countryName.style.fontSize = "12px";
    countryName.style.marginRight = "auto";
    countryName.style.textAlign = "center";
    container.appendChild(countryName);
    countryName.style.gridColumn = "1";

    // appending the graph data
    let graph = document.createElement("div");

    graph.style.height = "20px";
    graph.classList.add("animate");
    graph.style.backgroundColor = "#f5a535";
    graph.style.marginRight = "auto";
    graph.style.gridColumn = "2";
    container.append(graph);

    // appending the countries population in the third column of grid
    let population = document.createElement("p");
    population.textContent = entry.population;
    population.style.fontSize = "12px";
    population.style.marginRight = "auto";
    population.style.textAlign = "center";
    container.append(population);
    population.style.gridColumn = "3";

    //getting the data for graph width
    let width = getGraphWidthOfPopl(entry.population);
    let percentageWidth = `${width * 3}%`; //I am multiplying the width of graph by 3 inorder to make the graph look good, nice and long.
    document.documentElement.style.setProperty("--graphWidth", percentageWidth);
    graph.style.width = percentageWidth;
  });
};

languagesBtn.onclick = function getLanguages() {
  if (!(container.innerHTML = "")) {
    container.innerHTML = "";
  }

  textBelowBtn.textContent = "10 Most Spoken languages in the world";
  mostSpokenLanguages.forEach((lang) => {
    // appending the countries in the first column
    let countryName = document.createElement("p");
    countryName.textContent = lang[0];
    countryName.style.fontSize = "12px";
    countryName.style.textAlign = "center";
    countryName.style.marginRight = "auto";
    container.appendChild(countryName);
    countryName.style.gridColumn = "1";

    // appending the graph data
    let graph = document.createElement("div");

    graph.style.height = "20px";
    graph.classList.add("animate");
    graph.style.backgroundColor = "#f5a535";
    graph.style.marginRight = "auto";
    graph.style.gridColumn = "2";
    container.append(graph);

    // appending the countries population in the third column of grid
    let data = document.createElement("p");
    data.textContent = lang[1];
    data.style.fontSize = "12px";
    data.style.marginRight = "auto";
    data.style.textAlign = "center";
    container.append(data);
    data.style.gridColumn = "3";

    //getting the data for graph width
    let percentageWidth = `${lang[1]}%`;
    document.documentElement.style.setProperty("--graphWidth", percentageWidth);
    graph.style.width = percentageWidth;
  });
};
