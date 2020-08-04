const request = require("request-promise");
const cheerio = require("cheerio");
const fs = require("fs");

const scraper = {
  get_luxurybrandsusa: async url => {
    // THIS ONLY GET THE WEBPAGE
    const response = await request(url);
    const $ = cheerio.load(response);

    let linkList = [];
    $("table.gv-table-view td a").each((i, element) => {
      const link = $(element).attr("href");
      linkList.push({ link });
    });

    const cleanLink = linkList.filter(link =>
      link.link.includes("luxurybrandsusa.com")
    );

    return cleanLink;
  },
  getdata_luxurybrandsusa: async () => {
    const page = JSON.parse(
      fs.readFileSync("luxurybrandusa-link.json", "utf8")
    );

    for (let i = 0; i < page[0].length; i++) {
      const response = await request(page[0][i].link);
      const $ = cheerio.load(response);

      const name = $("h3").text();
      const email = $("div.gv-list-view-subtitle a[href^=mail]").text();
      const website = $("div.gv-list-view-subtitle a[href^=www]").text();
      const phone = $("div.gv-list-view-subtitle [href^=tel]").text();
      const address = $("#gv-field-1-6").contents().eq(1).text();
      const city = $("#gv-field-1-6").contents().eq(3).text().split(",")[0];
      const state = $("#gv-field-1-6")
        .contents()
        .eq(3)
        .text()
        .split(",")[1]
        .split(" ")[1];
      const zipcode = $("#gv-field-1-6")
        .contents()
        .eq(3)
        .text()
        .split(",")[1]
        .split(" ")[2];
      const country = $("#gv-field-1-6").contents().eq(5).text();

      const current = {
        name,
        email,
        website,
        phone,
        address,
        city,
        state,
        zipcode,
        country
      };

      console.log(current);
      debugger;
    }

    debugger;
  }
};

module.exports = scraper;
