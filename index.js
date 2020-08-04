const scraper = require("./scraper");
const fs = require("fs");

(async () => {
  // GET LIST OF LINK
  // let masterLink = [];

  // for (let i = 1; i < 10; i++) {
  //   console.log("🚀 Launching Page " + i);
  //   let data = await scraper.get_luxurybrandsusa(
  //     `https://luxurybrandsusa.com/dealers-dir/?pagenum=${i}`
  //   );
  //   masterLink.push(data);
  // }

  // const json = JSON.stringify(masterLink);
  // fs.writeFileSync("luxurybrandusa-link.json", `${json}`);

  // console.log(masterLink);
  const data = await scraper.getdata_luxurybrandsusa();
  console.log(data);
  debugger;
})();
