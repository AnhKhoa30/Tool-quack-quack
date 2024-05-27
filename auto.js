const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQzNTQ5MSwidGltZXN0YW1wIjoxNzE2Nzg1NTQzODA5LCJ0eXBlIjoxLCJpYXQiOjE3MTY3ODU1NDMsImV4cCI6MTcxNzM5MDM0M30._fsd4NBU3Pmj6zntDW--5DIdzFZZvpfek-J25Os8U7g";

let listColect = [];
let listDuck = [];

Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)];
};

function getTotalEgg() {
  fetch("https://api.quackquack.games/balance/get", {
    headers: {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9,vi;q=0.8",
      authorization: "Bearer " + ACCESS_TOKEN,
      "if-none-match": 'W/"1a9-I7Onn3jBU9AHo0MlzSY8mMECNvQ"',
      priority: "u=1, i",
      "sec-ch-ua":
        '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site",
      Referer: "https://dd42189ft3pck.cloudfront.net/",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
    body: null,
    method: "GET",
  })
    .then((response) => response.json())
    .then((res) => {
      // console.log(res);
      res.data.data.map((item) => {
        if (item.symbol === "EGG") {
          console.log("");
          console.log("Da thu thap", Number(item.balance), "trung");
          console.log("");
        }
      });
    })
    .catch((error) => {
      console.log("ERROR", error);
    });
}

function getListReload() {
  fetch("https://api.quackquack.games/nest/list-reload", {
    headers: {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9,vi;q=0.8",
      authorization: "Bearer " + ACCESS_TOKEN,
      "if-none-match": 'W/"1218-LZvWPzXbQkzjfWJ5mauEo0z3f9c"',
      priority: "u=1, i",
      "sec-ch-ua":
        '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site",
      Referer: "https://dd42189ft3pck.cloudfront.net/",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
    body: null,
    method: "GET",
  })
    .then((response) => response.json())
    .then((res) => {
      // console.log(res);

      if (listDuck.length === 0) {
        res.data.duck.map((item) => {
          listDuck.push(item.id);
        });
      }

      res.data.nest.map((item) => {
        // console.log(item);
        if (item.type_egg) listColect.push(item.id);
      });

      console.log("So trung co the thu thap:", listColect.length);
      console.log(listColect);
      console.log("");
    })
    .catch((error) => {
      console.log("ERROR", error);
    });
}

function collect() {
  if (listColect.length === 0) return setTimeout(collect, 3e3);

  const egg = listColect[0];
  console.log("egg", egg);

  fetch("https://api.quackquack.games/nest/collect", {
    headers: {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9,vi;q=0.8",
      authorization: "Bearer " + ACCESS_TOKEN,
      "content-type": "application/x-www-form-urlencoded",
      priority: "u=1, i",
      "sec-ch-ua":
        '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site",
      Referer: "https://dd42189ft3pck.cloudfront.net/",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
    body: "nest_id=" + egg,
    method: "POST",
  })
    .then((response) => response.json())
    .then((res) => {
      //   console.log(res);
      console.log("Thu thap thanh cong trung", egg);
      layEgg(egg);
    })
    .catch((error) => {
      console.log("ERROR", error);
      setTimeout(() => {
        collect(egg);
      }, 3e3);
    });
}

function layEgg(egg) {
  const duck = listDuck.random();
  console.log("duck", duck);
  fetch("https://api.quackquack.games/nest/lay-egg", {
    headers: {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9,vi;q=0.8",
      authorization: "Bearer " + ACCESS_TOKEN,
      "content-type": "application/x-www-form-urlencoded",
      priority: "u=1, i",
      "sec-ch-ua":
        '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "cross-site",
      Referer: "https://dd42189ft3pck.cloudfront.net/",
      "Referrer-Policy": "strict-origin-when-cross-origin",
    },
    body: "nest_id=" + egg + "&duck_id=" + duck,
    method: "POST",
  })
    .then((response) => response.json())
    .then((res) => {
      //   console.log(res);
      getTotalEgg();
      listColect.shift();
      setTimeout(collect, 3e3);
    })
    .catch((error) => {
      console.log("ERROR", error);
      setTimeout(() => {
        layEgg(egg);
      }, 3e3);
    });
}

getTotalEgg();
getListReload();

setInterval(() => {
  getListReload();
}, 10e3);

collect();
