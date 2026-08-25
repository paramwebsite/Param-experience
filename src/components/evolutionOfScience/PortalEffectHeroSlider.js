import React, { useEffect, useRef, useState } from "react";
import textData from "./Content";
import "./loader.css";
import { gsap } from "gsap";

const PortalEffectHeroSlider = () => {
  const portalImage = `https://digitalassestbucket.s3.amazonaws.com/SciEvolution/gate.png`;
  // const portalImage = `${process.env.PUBLIC_URL}/gate.webp`;
  const images = Array.from({ length: 18 }, (_, index) => {
    return `https://digitalassestbucket.s3.amazonaws.com/SciEvolution/BACKGROUND/Back@${
      index + 1
    }.webp`;
  });
  const [currentTextData, setCurrentTextData] = useState(textData[0]);
  const [nextTextData, setNextTextData] = useState(textData[1]);
  const [currentPortalImage, setPortalImage] = useState(images[0]);
  const [nextPortalImage, setNextPortalImage] = useState("");
  const [isAnimating, setAnimating] = useState(false);
  const [viewportSize, setViewportSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [isClicked, setIsClicked] = useState(false);
  const [lastClickTime, setLastClickTime] = useState(0);
  const isSmallScreen = useRef();
  const [showRapidClickWarning, setShowRapidClickWarning] = useState(false);
  const [lastThreeClicks, setLastThreeClicks] = useState([]);
  const [showLoader, setShowLoader] = useState(true);

  isSmallScreen.current = window.innerWidth <= 450;

  // Calculate image attributes to fit the height of the viewport and crop the sides
  const imageAspectRatio = 2.0; // Width is twice the height

  let imageX = 0,
    imageY = 0,
    imageWidth,
    imageHeight = viewportSize.height;

  // Width is calculated based on the aspect ratio and the height of the viewport
  imageWidth = imageHeight * imageAspectRatio;

  // Center the image horizontally
  if (viewportSize.width / viewportSize.height > imageAspectRatio) {
    // Screen is wider than the image's aspect ratio
    imageWidth = viewportSize.width;
    imageHeight = imageWidth / imageAspectRatio;
    imageY = (viewportSize.height - imageHeight) / 2;
  } else {
    // Screen is narrower or equal to the image's aspect ratio
    imageHeight = viewportSize.height;
    imageWidth = imageHeight * imageAspectRatio;
    imageX = (viewportSize.width - imageWidth) / 2;
  }

  const preloadImages = (imageArray, callback) => {
    let loadedImagesCount = 0;
    imageArray.forEach((src) => {
      const img = new Image();
      img.onload = () => {
        loadedImagesCount++;
        if (loadedImagesCount === imageArray.length) {
          callback();
        }
      };
      img.src = src;
    });
  };

  // Preload images on component mount
  useEffect(() => {
    preloadImages(images, () => {
      // console.log("Loaded 100%");
      setTimeout(() => {
        setShowLoader(false);
      }, 3000);
    });
  }, [images]);

  // Handle Resizing
  useEffect(() => {
    const handleResize = () => {
      setViewportSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Handle Portal Circle Expansion
  useEffect(() => {
    const startCircleExpansion = () => {
      const scaleUnit = isSmallScreen.current ? "vh" : "vw";
      // 1. First Teleporter and text-container-parent1 Animation
      gsap.to([".teleporter-image", ".text-container-parent1"], {
        scale: isSmallScreen.current ? 3 : 7,
        opacity: 0,
        duration: 1.6,
        onComplete: function () {
          // Reset the first teleporter
          gsap.set(".teleporter-image", { scale: 0 });
          gsap.set(".text-container-parent1", { scale: 0 });
        },
      });

      gsap.to(".circle2", {
        opacity: 1,
        duration: 1,
        ease: "none",
        onUpdate: function () {
          let progress = this.progress();
          let customEase = Math.pow(progress, 2);
          gsap.set(".circle2", {
            attr: { r: `${customEase * 60}${scaleUnit}` },
          });
        },
        onStart: () => {
          setAnimating(true);
        },
      });

      gsap.to(".circle1", {
        opacity: 1,
        duration: 1,
        ease: "none",
        delay: 0.1,
        onUpdate: function () {
          let progress = this.progress();
          let customEase = Math.pow(progress, 2);
          gsap.set(".circle1", {
            attr: { r: `${customEase * 60}${scaleUnit}` },
          });
        },
        onComplete: () => {
          setPortalImage(nextPortalImage);
          setNextPortalImage("");
          setAnimating(false);
        },
      });

      // 3. Second Teleporter Animation (starts with circle expansion but with a delay)
      gsap.fromTo(
        [".teleporter-image2", ".text-container-parent2"],
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          delay: 0.4,
        }
      );
    };

    gsap.set(".circle1", {
      attr: { r: 0, class: "circle1 ripple" /*, cx: "50%", cy: "50%"*/ },
      opacity: 1,
      // transform: "scale(1.1)",
    });
    gsap.set(".circle2", {
      attr: { r: 10, class: "circle2 ripple" /*, cx: "50%", cy: "50%"*/ },
      opacity: 1,
      // transform: "scale(1.1)",
    });

    // Updating text data for the next slide
    const currentIndex = images.indexOf(currentPortalImage);
    const nextIndex = (currentIndex + 1) % images.length;
    setCurrentTextData(textData[currentIndex]);

    if (nextPortalImage && !isAnimating) {
      // Set the data for text-container-parent2 to the next image's data
      setNextTextData(textData[nextIndex]);
      // Reset the states of teleporters before starting any animation
      gsap.set(".teleporter-image", { scale: 1, opacity: 1 });
      gsap.set(".teleporter-image2", { scale: 0, opacity: 0 });
      gsap.set(".text-container-parent1", { scale: 1, opacity: 1 });
      gsap.set(".text-container-parent2", { scale: 0, opacity: 0 });

      startCircleExpansion();
    }
  }, [nextPortalImage, isAnimating, currentPortalImage, images]);

  return (
    <>
      {showLoader && (
        <div className="loader">
          <svg
            version="1.1"
            id="L6"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
            xmlSpace="preserve"
          >
            <rect
              fill="none"
              stroke="#fff"
              strokeWidth="4"
              x="25"
              y="25"
              width="50"
              height="50"
            >
              <animateTransform
                attributeName="transform"
                dur="0.5s"
                from="0 50 50"
                to="180 50 50"
                type="rotate"
                id="strokeBox"
                attributeType="XML"
                begin="rectBox.end"
              />
            </rect>
            <rect x="27" y="27" fill="#fff" width="46" height="50">
              <animate
                attributeName="height"
                dur="1.3s"
                attributeType="XML"
                from="50"
                to="0"
                id="rectBox"
                fill="freeze"
                begin="0s;strokeBox.end"
              />
            </rect>
          </svg>
        </div>
      )}
      <div
        className={`portal-slider-container ${isAnimating ? "animating" : ""}`}
        onClick={() => {
          const currentTime = new Date().getTime();
          // Add this click time to the array and only keep the last three entries
          setLastThreeClicks((prev) => [currentTime, ...prev].slice(0, 3));

          // Calculate the time between the first and third rapid clicks
          if (
            lastThreeClicks.length === 3 &&
            lastThreeClicks[0] - lastThreeClicks[2] <= 2100
          ) {
            setShowRapidClickWarning(true);
            setTimeout(() => {
              setShowRapidClickWarning(false);
            }, 2000); // hide after 2 seconds
          }

          if (!isAnimating && currentTime - lastClickTime > 2100) {
            setLastClickTime(currentTime);
            if (!isClicked) {
              setIsClicked(true);
            }
            const currentIndex = images.indexOf(currentPortalImage);
            const nextIndex = (currentIndex + 1) % images.length;

            // Set the nextPortalImage to trigger the animation
            setNextPortalImage(images[nextIndex]);
          }
        }}
      >
        <div className="text-container-parent1">
          <div className="text-container">
            <div className="left-part">
              <div className="caption">TELEPORT YOURSELF</div>
              <div className="head-container">
                <div className="heading">{currentTextData.heading}</div>
              </div>
            </div>
            <div className="right-part">
              <div className="info">{currentTextData.info}</div>
            </div>
          </div>
        </div>
        <div className="text-container-parent2">
          <div className="text-container">
            <div className="left-part">
              <div className="caption">TELEPORT YOURSELF</div>
              <div className="head-container">
                <div className="heading">{nextTextData.heading}</div>
              </div>
            </div>
            <div className="right-part">
              <div className="info">{nextTextData.info}</div>
            </div>
          </div>
        </div>
        <img
          src={currentPortalImage}
          alt="Portal"
          className="portal-image"
          // style={{ filter: "url(#bomb);" }}
        />
        <div className="teleporter-container">
          <img
            src={portalImage}
            alt="Teleporter"
            className="teleporter-image"
          />
          <img
            src={portalImage}
            alt="Teleporter"
            className="teleporter-image2"
          />
        </div>

        <div className="next-portal-image-mask">
          <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${viewportSize.width} ${viewportSize.height}`}
            // viewBox={`-10 10 ${viewportSize.width + 50 } ${viewportSize.height + 20}`}
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <filter
                id="magnifyEffect"
                x="0%"
                y="0%"
                width="150%"
                height="150%"
              >
                <feTurbulence
                  type="turbulence"
                  baseFrequency="0.01"
                  numOctaves="1"
                  result="turbulence"
                  seed="4"
                />
                <feDisplacementMap
                  in2="turbulence"
                  in="SourceGraphic"
                  scale="100"
                  xChannelSelector="R"
                  yChannelSelector="G"
                />
              </filter>
              <filter id="blurMe">
                <feGaussianBlur in="SourceGraphic" stdDeviation="20" />
              </filter>
              <filter id="darkenCircle">
                <feColorMatrix
                  type="matrix"
                  values="1 0 0 0 0
                        0 1 0 0 0
                        0 0 1 0 0
                        0 0 0 1 0"
                />
              </filter>
              <mask id="mask1">
                <rect width="100%" height="100%" fill="black" />
                <circle
                  className="circle1"
                  cx="50%"
                  cy="50%"
                  r="0"
                  fill="white"
                  filter="url(#darkenCircle) url(#blurMe) url(#magnifyEffect)" //url(#blurMe)
                />
              </mask>
              <mask id="mask2">
                <rect width="100%" height="100%" fill="black" />
                <circle
                  className="circle2"
                  cx="50%"
                  cy="50%"
                  r="10"
                  fill="white"
                  filter="url(#blurMe) url(#magnifyEffect)" // url(#magnifyEffect)
                />
              </mask>
            </defs>
            <image
              href={nextPortalImage}
              x={imageX}
              y={imageY}
              width={imageWidth}
              height={viewportSize.height}
              mask="url(#mask1)"
            />
            <image
              href={nextPortalImage}
              x={imageX}
              y={imageY}
              width={imageWidth}
              height={viewportSize.height}
              mask="url(#mask2)"
            />
          </svg>
        </div>

        {/*   Instructions and Warnings */}

        <div
          className={`rapid-click-warning ${
            showRapidClickWarning ? "show" : ""
          }`}
        >
          Rapid clicks are not supported
        </div>

        {isSmallScreen.current ? (
          <div className={`instruction ${isClicked ? "fade-out" : ""}`}>
            Tap to Teleport
          </div>
        ) : (
          <div className={`instruction ${isClicked ? "fade-out" : ""}`}>
            Click to Teleport
          </div>
        )}
      </div>
    </>
  );
};

export default PortalEffectHeroSlider;
