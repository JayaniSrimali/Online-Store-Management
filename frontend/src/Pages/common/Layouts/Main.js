import React from 'react';
import SimpleImageSlider from "react-simple-image-slider";


const images = [
  { url: "https://t3.ftcdn.net/jpg/03/13/90/78/240_F_313907853_HyWafTpcdxlKcE7KE2ckXTiDtAgahbFo.jpg" },
  { url: "https://img.freepik.com/premium-photo/tea-cup-wooden-table-with-green-landscape-background_183352-3546.jpg?w=740" },
  { url: "https://img.freepik.com/free-photo/front-view-tea-brewer-with-honey_23-2148567598.jpg?t=st=1713619475~exp=1713623075~hmac=83856a04c6ebbad1db9990d10276afc836096f8e8c86c4d29ba1ec8e97fabef3&w=740" },
  { url: "https://t4.ftcdn.net/jpg/02/27/88/19/240_F_227881943_SABhdakS4Tz1wrlguNriKjihNf5OVrun.jpg" },
  { url: "https://as1.ftcdn.net/v2/jpg/01/25/67/22/1000_F_125672265_be09hvxvnpW6ZYA52OchlUcn9YJCgaC7.jpg" },
];

const Home = () => (
  <blockquote class="blockquote text-center">
    <br></br>  <br></br>
    <h1 class="h1" style={{ fontSize: "30px" }}>Welcome to Tea product</h1>
    <div>
      <SimpleImageSlider
        style={{ marginTop: '4%' }}
        width='100%'
        height={604}
        images={images}
        showBullets={true}
        showNavs={true}
      />
    </div>
    <br></br>
  
    <footer class="blockquote-footer" style={{ color: "black" }}>
      <cite title="Source Title"> Alhena Tea product.</cite>
    </footer>
  </blockquote>
);

export default Home;
