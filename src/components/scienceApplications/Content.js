import React from 'react';
// import { Link } from 'react-router-dom';

function Card({ image, altText /*, route */ }) {
  return (
    // <Link to={route}>
    <div className="card">
      <img className='imgStyle' src={image} alt={altText} />
      <div className="hover-text">
        {altText}
      </div>
    </div>
    // </Link>
  );
}

function CardsTable({ images }) {
  return (
    <div className="cards-table">
      {images.map((img, index) => (
        <Card key={index} image={img.src} altText={img.altText} />
      ))}
    </div>
  );
}

export default function Content() {
  const images = [
    { src: '', altText: 'Image 1' /*route="/page1"*/ },
    { src: '', altText: 'Image 2' /*route="/page1"*/ },
    { src: '', altText: 'Image 3' /*route="/page1"*/ },
    { src: '', altText: 'Image 4' /*route="/page1"*/ },
    { src: '', altText: 'Image 5' /*route="/page1"*/ },
    { src: '', altText: 'Image 6' /*route="/page1"*/ },
    { src: '', altText: 'Image 7' /*route="/page1"*/ },
    { src: '', altText: 'Image 8' /*route="/page1"*/ },
    { src: '', altText: 'Image 9' /*route="/page1"*/ },
    { src: '', altText: 'Image 10' /*route="/page1"*/ },
    { src: '', altText: 'Image 11' /*route="/page1"*/ },
    { src: '', altText: 'Image 12' /*route="/page1"*/ },
    { src: '', altText: 'Image 13' /*route="/page1"*/ },
    { src: '', altText: 'Image 14' /*route="/page1"*/ },
    { src: '', altText: 'Image 15' /*route="/page1"*/ },
    { src: '', altText: 'Image 16' /*route="/page1"*/ },
    { src: '', altText: 'Image 17' /*route="/page1"*/ },
    { src: '', altText: 'Image 18' /*route="/page1"*/ },
    { src: '', altText: 'Image 19' /*route="/page1"*/ },
    { src: '', altText: 'Image 20' /*route="/page1"*/ },
    { src: '', altText: 'Image 21' /*route="/page1"*/ },
    { src: '', altText: 'Image 22' /*route="/page1"*/ },
    { src: '', altText: 'Image 23' /*route="/page1"*/ },
    { src: '', altText: 'Image 24' /*route="/page1"*/ },
    { src: '', altText: 'Image 25' /*route="/page1"*/ },
    { src: '', altText: 'Image 26' /*route="/page1"*/ },
    { src: '', altText: 'Image 27' /*route="/page1"*/ },
    { src: '', altText: 'Image 28' /*route="/page1"*/ },
    { src: '', altText: 'Image 29' /*route="/page1"*/ },
    { src: '', altText: 'Image 30' /*route="/page1"*/ },
    { src: '', altText: 'Image 31' /*route="/page1"*/ },
    { src: '', altText: 'Image 32' /*route="/page1"*/ },
    { src: '', altText: 'Image 33' /*route="/page1"*/ },
    { src: '', altText: 'Image 34' /*route="/page1"*/ },
    { src: '', altText: 'Image 35' /*route="/page1"*/ },
    { src: '', altText: 'Image 36' /*route="/page1"*/ },
    { src: '', altText: 'Image 37' /*route="/page1"*/ },
    { src: '', altText: 'Image 38' /*route="/page1"*/ },
    { src: '', altText: 'Image 39' /*route="/page1"*/ },
    { src: '', altText: 'Image 40' /*route="/page1"*/ },
    { src: '', altText: 'Image 41' /*route="/page1"*/ },
    { src: '', altText: 'Image 42' /*route="/page1"*/ },
    { src: '', altText: 'Image 43' /*route="/page1"*/ },
    { src: '', altText: 'Image 44' /*route="/page1"*/ },
    { src: '', altText: 'Image 45' /*route="/page1"*/ },
    { src: '', altText: 'Image 46' /*route="/page1"*/ },
    { src: '', altText: 'Image 47' /*route="/page1"*/ },
    { src: '', altText: 'Image 48' /*route="/page1"*/ },
    { src: '', altText: 'Image 49' /*route="/page1"*/ },
    { src: '', altText: 'Image 50' /*route="/page1"*/ },
    // ... add up to 50 images here
  ];

  return (
    <div className="scienceApp">
      <CardsTable images={images} />
    </div>
  );
}
