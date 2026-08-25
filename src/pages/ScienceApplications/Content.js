import React from 'react';
import { Link } from 'react-router-dom';
import './scienceAplication.css'

function Card({key, image, altText, route /*, route */ }) {
  return (
    <Link to={route}>
     
    <div className="card">
      <img className='imgStyle' src={image} alt={altText} />
      <div className="hover-text">
        {altText}
      </div>
    </div>
    </Link>
  );
}

function CardsTable({ images }) {
  return (
    
    <div className="cards-table">
      
      {images.map((img, index) => (
    <>
    
     <Card key={index} image={img.src} altText={img.altText} route={img.route} />
    </>
       
      ))}
    </div>
  );
}

export default function Content() {
  const images = [
    { src: 'https://digitalassestbucket.s3.amazonaws.com/ScienceApplication/Balls+Animations+.jpg', altText: 'Ball Animation' ,route:"/BallAnimation" /*route="/page1"*/ },
    { src: 'https://digitalassestbucket.s3.amazonaws.com/ScienceApplication/eyeOfPappusChain.jpg', altText: 'Eye Of Poppus Chain' ,route:"/EyeOfPoppusChain" /*route="/page1"*/ },
    { src: 'https://digitalassestbucket.s3.amazonaws.com/ScienceApplication/Rorschach.generator.jpg', altText: 'Rorschach Generator' ,route:"/Rorschachgenerator" /*route="/page1"*/ },
    { src: 'https://digitalassestbucket.s3.amazonaws.com/ScienceApplication/Electric+Sphere.jpg', altText: 'Electric Sphere' ,route:"/ElectricSphere" /*route="/page1"*/ },
    { src: 'https://digitalassestbucket.s3.amazonaws.com/ScienceApplication/StrangeVibration.jpg', altText: 'Strange Vibration' ,route:"/StrangeVibration" /*route="/page1"*/ },
    { src: 'https://digitalassestbucket.s3.amazonaws.com/ScienceApplication/Recursive+Circle+Rotations.jpg', altText: 'Recurssive Circle' ,route:"/Recurssivecircle" /*route="/page1"*/ },
    // { src: 'https://digitalassestbucket.s3.amazonaws.com/ScienceApplication/Networking.jpg', altText: 'Networking' ,route:"/Networking" /*route="/page1"*/ },
    { src: 'https://digitalassestbucket.s3.amazonaws.com/ScienceApplication/Oil+Water.jpg', altText: 'Oil Water Separation' ,route:"/OilWaterPhaseSeparation" /*route="/page1"*/ },
    { src: 'https://digitalassestbucket.s3.amazonaws.com/ScienceApplication/Constilation.png', altText: 'Web sphere' ,route:"/Circle" /*route="/page1"*/ },
    { src: 'https://digitalassestbucket.s3.amazonaws.com/ScienceApplication/Penrose+tiling.jpg', altText: 'Penrose' ,route:"/Penrose" /*route="/page1"*/ },
    { src: 'https://digitalassestbucket.s3.amazonaws.com/ScienceApplication/Mondrian+QuadTree.jpg', altText: 'Qard Tree' ,route:"/QardTree" /*route="/page1"*/ },
    { src: 'https://digitalassestbucket.s3.amazonaws.com/ScienceApplication/Double-Dip+Sierpinski+Carpet.jpg', altText: 'DoubleDip' ,route:"/DoubleDip" /*route="/page1"*/ },
    { src: 'https://digitalassestbucket.s3.amazonaws.com/ScienceApplication/Peter+de+Jong+Fractal.jpg', altText: 'Fractal' ,route:"/Fractal" /*route="/page1"*/ },
    { src: 'https://digitalassestbucket.s3.amazonaws.com/ScienceApplication/Pulsating+Mandala.jpg', altText: 'Mandala' ,route:"/Mandala" /*route="/page1"*/ },
    // { src: './ScienceApplication/SnowFlakeModoki.jpg', altText: 'Snow Flake' ,route:"/SnowFlake" /*route="/page1"*/ },
    // { src: './ScienceApplication/lifeMeditation.jpg', altText: 'Life Meditation' ,route:"/LifeMeditation" /*route="/page1"*/ },
    // { src: './ScienceApplication/mandala.jpg', altText: 'Mobius Transformation' ,route:"/MobiusTransformation" /*route="/page1"*/ },
    { src: 'https://digitalassestbucket.s3.amazonaws.com/ScienceApplication/Cardioid.jpg', altText: 'Cardoiod' ,route:"/Cardoiod" /*route="/page1"*/ },
    { src: 'https://digitalassestbucket.s3.amazonaws.com/ScienceApplication/Trigonometry+Plane.jpg', altText: 'Trigonometry Plane' ,route:"/TrignometryPlane" /*route="/page1"*/ },
    { src: 'https://digitalassestbucket.s3.amazonaws.com/ScienceApplication/ASCII+Islands.jpg', altText: 'Perlin Noise ASCII' ,route:"/PerlinNoiseASCII" /*route="/page1"*/ },
    { src: 'https://digitalassestbucket.s3.amazonaws.com/ScienceApplication/WavesOnSphere.jpg', altText: 'Waves On Sphere' ,route:"/WavesOnSphere" /*route="/page1"*/ },
    // { src: './ScienceApplication/Image Matrix .jpg', altText: 'Image Matrix' ,route:"/ImageMatrix" /*route="/page1"*/ },
    { src: 'https://digitalassestbucket.s3.amazonaws.com/ScienceApplication/Digital+Organism.jpg', altText: 'Digital Organism' ,route:"/DigitalOrganism" /*route="/page1"*/ },
    { src: 'https://digitalassestbucket.s3.amazonaws.com/ScienceApplication/Crystal+succulent.jpg', altText: 'Crystal Succulent' ,route:"/CrystalSucculent" /*route="/page1"*/ },
    { src: 'https://digitalassestbucket.s3.amazonaws.com/ScienceApplication/Dreamcatcher+.jpg', altText: 'Dream Catcher' ,route:"/DreamCatcher" /*route="/page1"*/ },
    { src: 'https://digitalassestbucket.s3.amazonaws.com/ScienceApplication/Sierpinski+Wireframe+.jpg', altText: 'Sierpinski Wireframe' ,route:"/SierpinskiWireframe" /*route="/page1"*/ },
    { src: 'https://digitalassestbucket.s3.amazonaws.com/ScienceApplication/Cursed+Triangle+.jpg', altText: 'Cursed Triangle' ,route:"/CursedTriangle" /*route="/page1"*/ },
    { src: 'https://digitalassestbucket.s3.amazonaws.com/ScienceApplication/Square+Patterns.jpg', altText: 'Square Pattern' ,route:"/SquarePattern" /*route="/page1"*/ },
    { src: 'https://digitalassestbucket.s3.amazonaws.com/ScienceApplication/Mandala+of+Elements.jpg', altText: 'Elemental Mandala' ,route:"/MandalaOfElements" /*route="/page1"*/ },
    { src: 'https://digitalassestbucket.s3.amazonaws.com/ScienceApplication/Square+Flower.jpg', altText: 'Square  Flower' ,route:"/SquareFlower" /*route="/page1"*/ },
    { src: 'https://digitalassestbucket.s3.amazonaws.com/ScienceApplication/Trigonometry+Plane.jpg', altText: 'Trigonometry' ,route:"/Trignometry" /*route="/page1"*/ },
    { src: 'https://digitalassestbucket.s3.amazonaws.com/ScienceApplication/Trigonometry+Sphere+Flower.jpg', altText: 'Trigonometry Flower' ,route:"/TrignometryFlower" /*route="/page1"*/ },
    { src: 'https://digitalassestbucket.s3.amazonaws.com/ScienceApplication/Scope.jpg', altText: 'Scope' ,route:"/Scope" /*route="/page1"*/ },
    { src: 'https://digitalassestbucket.s3.amazonaws.com/ScienceApplication/Trippy+Triangle.jpg', altText: 'Trippy Triangle' ,route:"/TrippyTriangle" /*route="/page1"*/ },
    { src: 'https://digitalassestbucket.s3.amazonaws.com/ScienceApplication/Node+Spring.jpg', altText: 'Node Spring' ,route:"/NodeSpring" /*route="/page1"*/ },
    { src: 'https://digitalassestbucket.s3.amazonaws.com/ScienceApplication/Exploding+mouse.jpg', altText: 'Exploding Mouse' ,route:"/ExplodingMouse" /*route="/page1"*/ },
    { src: 'https://digitalassestbucket.s3.amazonaws.com/ScienceApplication/Flower+Donut.jpg', altText: 'Flower Donut' ,route:"/FlowerDonut" /*route="/page1"*/ },
    { src: 'https://digitalassestbucket.s3.amazonaws.com/ScienceApplication/Fractal+Land.jpg', altText: 'Fractal Land' ,route:"/FractallLand" /*route="/page1"*/ },
    { src: 'https://digitalassestbucket.s3.amazonaws.com/ScienceApplication/Glass+Breaker.jpg', altText: 'Glass Breaker' ,route:"/GlassBreaker" /*route="/page1"*/ },
    { src: 'https://digitalassestbucket.s3.amazonaws.com/ScienceApplication/Slime+Mold+.jpg', altText: 'Slime Mold Simulation' ,route:"/SlimeMoldSimulation" /*route="/page1"*/ },
    // { src: './ScienceApplication/Metro Madness.jpg', altText: 'Metro Madness' ,route:"/MetroMadness" /*route="/page1"*/ },
    // { src: './ScienceApplication/Chains.jpg', altText: 'Chain' ,route:"/Chain" /*route="/page1"*/ },
    { src: 'https://digitalassestbucket.s3.amazonaws.com/ScienceApplication/Random+Lissajous+Webs+.jpg', altText: 'Random Lissajous' ,route:"/RandomLissajousWebs" /*route="/page1"*/ },
    { src: 'https://digitalassestbucket.s3.amazonaws.com/ScienceApplication/oilSpill.png', altText: 'Oil Splill' ,route:"/OilSplill" /*route="/page1"*/ },
    { src: 'https://digitalassestbucket.s3.amazonaws.com/ScienceApplication/Quadtree.jpg', altText: 'Quad Tree Blob' ,route:"/QuadTreeBlob" /*route="/page1"*/ },
    { src: 'https://digitalassestbucket.s3.amazonaws.com/ScienceApplication/Diverge.jpg', altText: 'Diverge' ,route:"/Diverge" /*route="/page1"*/ },
    // { src: './ScienceApplication/Lunacy.jpg', altText: 'Lunacy' ,route:"/Lunacy" /*route="/page1"*/ },
    { src: 'https://digitalassestbucket.s3.amazonaws.com/ScienceApplication/FloatingFunnel.jpg', altText: 'Floating Funnel' ,route:"/FloatingFunnel" /*route="/page1"*/ },
    // { src: './ScienceApplication/Fluid GPU-IO.jpg', altText: 'Mobius' ,route:"/Mobius" /*route="/page1"*/ },
    { src: 'https://digitalassestbucket.s3.amazonaws.com/ScienceApplication/TunnelVision.jpg', altText: 'Tunnel Vision' ,route:"/TunnelVision" /*route="/page1"*/ },
    // ... add up to 50 images here
  ];

  return (
    <div className="scienceApp">
      <CardsTable images={images} />
    </div>
  );
}
