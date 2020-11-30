const videoIdList = [
  "XCJwcNmGxRc",
  "Aewj-0wcMIo",
  "BLC5GiVT7Rk",
  "_k9lqHdNKOg",
  "PkBu-mnXOAk",
  "bg6vYLs5DKg",
  "q_7Y24A6oFY",
  "JxS5E-kZc2s",
  "XHjFgaQaKCg",
  "dNii8KLtJWg",
  "_f0ClDGDXo4",
  "zm-GRaId-3U",
  "jvupK5lHOqU",
  "e97wlB_OXxI",
  "YBw-4YkFrt8",
  "iaXlrYqNr-0",
  "Z10gHrOrlL8",
  "w5qUScDTZE8",
  "BGn7kExSbiU",
  "XF5-QwvCzXE",
  "LHiPMLELjUE",
  "D9iZtB0dhF0",
  "D9iZtB0dhF0",
  "Yym5xcpnA4E",
  "rnpdvLyVnIs"
];

const embedData = [];

for (let i = 0; i < videoIdList.length; i++) {
  let videoSrc = "https:www.youtube.com/embed/" + videoIdList[i];

  let video = {
    width: "560",
    height: "315",
    src: videoSrc,
    frameborder: "0",
    allow:
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
    allowfullscreen: true
  };

  embedData.push(video);
}

//console.log("embedData", embedData);

export default embedData;
