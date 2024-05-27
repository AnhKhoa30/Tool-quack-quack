const ACCESS_TOKEN = "";

let listNest = [];
let listDuck = [];
let egg = null;
let duckBefore = null;
Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)];
};
const getListReload = async () => {
  const req = fetch("https://api.quackquack.games/nest/list-reload", {
    headers: {
      accept: "*/*",
      "accept-language": "vi,fr-FR;q=0.9,fr;q=0.8,en-US;q=0.7,en;q=0.6",
      authorization: "Bearer " + ACCESS_TOKEN,
      "if-none-match": 'W/"b9e-BCLR6Cu4sXju87aun8hTLor6JwE"',
      "sec-ch-ua":
        '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
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
  });
  const res = await (await req).json();
  if (listNest.length == 0) {
    res.data.nest.map(async (nests) => {
      listNest.push(nests.id);
    });
  }
  if (listDuck.length == 0) {
    res.data.duck.map(async (ducks) => {
      listDuck.push(ducks.id);
    });
  }
};
const collectEgg = async () => {
  if (listNest.length == 0) {
    await getListReload();
  }
  egg = listNest[0];
  console.log("những trứng có thể lấy", listNest);
  const req = await fetch("https://api.quackquack.games/nest/collect", {
    headers: {
      accept: "*/*",
      "accept-language": "vi,fr-FR;q=0.9,fr;q=0.8,en-US;q=0.7,en;q=0.6",
      authorization: "Bearer " + ACCESS_TOKEN,
      "content-type": "application/x-www-form-urlencoded",
      "sec-ch-ua":
        '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
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
  });
  if (req.status == 200) {
    console.log("Thu thành công trứng", egg);
  } else {
    console.log("lỗi không thu được trứng");
  }
  await setTimeout(layEgg, 3000);
};

const layEgg = async () => {
  egg = listNest[0];
  await totalEgg();
  let duck = listDuck.random();
  if (duck == duckBefore) {
    duck = listDuck.random();
  }

  const req = await fetch("https://api.quackquack.games/nest/lay-egg", {
    headers: {
      accept: "*/*",
      "accept-language": "vi,fr-FR;q=0.9,fr;q=0.8,en-US;q=0.7,en;q=0.6",
      authorization: "Bearer " + ACCESS_TOKEN,
      "content-type": "application/x-www-form-urlencoded",
      "sec-ch-ua":
        '"Google Chrome";v="123", "Not:A-Brand";v="8", "Chromium";v="123"',
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
  });

  if (req.status == 200) {
    listNest.shift();
    duckBefore = duck;
    console.log("đã lấy trứng");
  }
  await collectEgg();
};
const totalEgg = async () => {
  const req = await fetch("https://api.quackquack.games/balance/get", {
    headers: {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9",
      authorization: "Bearer " + ACCESS_TOKEN,
      "if-none-match": 'W/"1aa-l4NC/Q00lYoWNUmvx10AMo8FC/Q"',
      priority: "u=1, i",
      "sec-ch-ua":
        '"Microsoft Edge";v="125", "Chromium";v="125", "Not.A/Brand";v="24"',
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
  });
  const response = await (await req).json();

  response.data.data.map((item) => {
    if (item.symbol === "EGG") {
      console.log("");
      console.log("Da thu thap", Number(item.balance), "trung");
      console.log("");
    }
  });
};

collectEgg();
