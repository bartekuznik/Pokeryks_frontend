// src/cards/cardImages.js

function importAll(r) {
    let images = {};
    r.keys().forEach((item) => { images[item.replace('./', '')] = r(item); });
    return images;
  }
  
  const cardImages = importAll(require.context('./', false, /\.(png|jpe?g|svg)$/));
  
  export default cardImages;
  