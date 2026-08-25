import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function DContent() {
  const canvasRef = useRef();
  const [isLoading, setIsLoading] = useState(true);
  const instructionRef = useRef();
  const [isAtTop, setIsAtTop] = useState(true);
  const frameCount = 573;
  const lastLoadedFrameRef = useRef(0);
  const preloadAmount = 200; // Number of images to preload ahead of the current frame
  const imageCache = useRef(); // Store loaded images for quick access/Users/software/Documents/Shivam/Hackathon/Space/public/Comp 1/space (1).png
  const currentScrollRef = useRef(0); // Initializing a ref to store currentScroll


  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    const handleLoad = () => {
      window.scrollTo(0, 0);
    };
    handleLoad();
  }, []);

  useEffect(() => {
    // Save the original value
    const originalBodyHeight = document.body.style.height;

    // Change the body height when the component mounts
    document.body.style.height = "10000vh";

    // Reset the body height when the component unmounts
    return () => {
      document.body.style.height = originalBodyHeight;
    };
  }, []); // Empty dependency array means this useEffect runs once when component mounts and cleans up when it unmounts

  useEffect(() => {
    const currentFrame = function (index) {
      if (index > frameCount || index < 1) {
        return;
      }
      // let reverseIndex = frameCount - index + 1;
      return "https://digitalassestbucket.s3.amazonaws.com/APJ+abdul+Kalam/Kalam+(" + index + ").webp";
    //   return "/Kalam/Kalam (" + index + ").webp";
    };

    const context = canvasRef.current.getContext("2d");
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    canvasRef.current.width = window.innerWidth;
    canvasRef.current.height = window.innerHeight;
    const canvas = canvasRef.current;

    let initialLoad = true;
    const loadImagesRange = function (start, end, callback) {
      let loadedCount = 0;
      for (let i = start; i <= end; i++) {
        if (!imageCache[i]) {
          // Check if the image is already in the cache
          let img = new Image();
          img.src = currentFrame(i);
          img.onload = imageOnLoadHandler.bind(
            null,
            img,
            i,
            imageCache,
            context
          );

          function imageOnLoadHandler(imgObj, index, cache, context) {
            cache[index] = imgObj; // Cache the loaded image
            loadedCount++;
            if (initialLoad && loadedCount === end - start + 1) {
              context.drawImage(
                cache["1"],
                0,
                0,
                canvasRef.current.width,
                canvasRef.current.height
              );
              setIsLoading(false);
              initialLoad = false;
              if (callback) {
                callback();
              }
            }
          }
        }
      }
    };

    // Use native browser's API to get the initial scroll position
    let initialProgress =
      window.scrollY /
      (document.documentElement.scrollHeight - window.innerHeight);
    let initialScroll = Math.floor(initialProgress * frameCount * 2);
    let initialStart = Math.max(1, initialScroll - preloadAmount);
    let initialEnd = initialScroll + preloadAmount;

    loadImagesRange(initialStart, initialEnd, function () {
      // Once initial images are loaded, draw the frame corresponding to the current scroll position
      if (imageCache[initialScroll]) {
        context.drawImage(
          imageCache[initialScroll],
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
        console.log("images loaded");
      }
    });
    lastLoadedFrameRef.current = initialEnd;

    // Use GSAP's ScrollTrigger to load more images as user scrolls
    ScrollTrigger.create({
      //   scroller, // Ensure it targets the intended scroll container
      start: "top top",
      end: "bottom bottom",
      onUpdate: ({ progress, direction, isActive }) => {
        let currentScroll = Math.floor(progress * frameCount * 2);

        if (currentScroll > frameCount) {
        //   console.log(currentScroll);
          currentScroll = frameCount;
        //   console.log(currentScroll);
        //   return;
        }

        if (currentScroll < 1) {
          currentScroll = 1;
        }
        // currentScroll = Math.max(1, Math.min(currentScroll, frameCount));
        if (
          direction === 1 &&
          currentScroll > lastLoadedFrameRef.current - preloadAmount / 2
        ) {
            // console.log("scrolling down")
          // Scrolling down
          loadImagesRange(
            lastLoadedFrameRef.current + 1,
            lastLoadedFrameRef.current + preloadAmount
          );
          lastLoadedFrameRef.current += preloadAmount;
        } else if (
          direction === -1 &&
          currentScroll < lastLoadedFrameRef.current - preloadAmount
        ) {
            // console.log("scrolling up")
          // Scrolling up
          loadImagesRange(currentScroll - preloadAmount, currentScroll);
          lastLoadedFrameRef.current -= preloadAmount;
        }

        // Draw the image corresponding to the current scroll position
        if (imageCache[currentScroll]) {
          context.clearRect(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
          );
          context.drawImage(
            imageCache[currentScroll],
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
          );
        }

        // Show/hide the instruction based on scroll position
        if (progress !== 0) {
          setIsAtTop(false);
        } else {
          setIsAtTop(true);
        }
      },
    });
    // Refresh ScrollTrigger
    ScrollTrigger.refresh();
    return () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, []);

  return (
    <div className="APJContainer">
      {isLoading && ( // Conditionally render the loader based on the isLoading state
        <div className="loaderContainer">
          <div className="loader">
            <div className="loader__bar"></div>
            <div className="loader__bar"></div>
            <div className="loader__bar"></div>
            <div className="loader__bar"></div>
            <div className="loader__bar"></div>
            <div className="loader__ball"></div>
          </div>
        </div>
      )}
      <canvas ref={canvasRef} id="hero-lightpass"></canvas>
      <div
        className={`instruction ${isAtTop ? "" : "hidden"}`}
        ref={instructionRef}
      >
        <p className="p1">Scroll</p>
        <p className="p2">Slowly</p>
      </div>
    </div>
  );
}

export default DContent;
