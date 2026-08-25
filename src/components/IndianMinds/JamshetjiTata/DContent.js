import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";

const chapterTitles = [
  "Navsari, Gujrat",
  "Elphinstone College, Mumbai",
  "Father's Business, Mumbai",
  "Manchester, UK",
  "Empress Mill, Nagpur",
  "Indian Institute of Science (IISc), Bangalore",
  "Taj Mahal Hotel, Mumbai",
];

const chapterContents = [
  '"I was born on March 3, 1839, in a town called Navsari in Gujarat. My family is Parsi, and we have strong traditions."',
  '"I loved learning. I got a scholarship to study at Elphinstone College in Mumbai and did well there."',
  '"In 1858, after college, I started working at my father\'s business, which was an international export company. This was where I first learned about doing business."',
  '"When I went to Manchester in the 1880s, I saw big steel factories and thought India should have one too. Even though I didn\'t see it happen while I was alive, Tata Steel started in Jamshedpur in 1907 because of my idea."',
  '"In 1874, I started a cotton factory in Nagpur. I named it Empress Mill after Queen Victoria. I made sure we used the newest machines there."',
  '"I thought India needed a good science school. So, I had the idea of starting one. After I passed away, the Indian Institute of Science (IISc) began in Bangalore in 1909."',
  '"I wanted to make a big, fancy hotel in Mumbai called the Taj Mahal Hotel. I wanted it to be for everyone, not just people from other countries. It opened in 1903 and became a famous hotel in India."',
];

const initialContent = //"...Hehe! just for testing..."
  "\"Namaste, I'm Jamset Ji. As I think back on my life, I see that everything around us tells a story. From my hometown of Navsari to the busy streets of Mumbai, I've had many dreams. Let me share the story of my early days, growing up in a traditional Parsi family to Taj Hotel.\"";

const epilogueContent =
  "\"In reflecting upon my journey, each step from Navsari's quiet streets to Mumbai's grandeur symbolises dreams realised. From Tata Steel's foundation to the majestic Taj Mahal Hotel, my aspirations found form. My legacy is not just in structures, but in the progress and innovation they represent for India. May India continue to rise, fueled by the dreams of visionaries past and present.\"";

export default function DContent() {
  const containerRef = useRef(null);
  const currentChapterRef = useRef(null);
  const viewedChaptersRef = useRef(new Set());
  const isTypingRef = useRef(false);
  const isLoaderVisRef = useRef(true);

  const [typingProgress, setTypingProgress] = useState(0);
  const lastViewedChapterRef = useRef(-1); // Using useRef to hold the value
  const lerpFactorRef = useRef(0.05); // Default lerp factor
  const jamsedjiOpacityRef = useRef(0);
  const textTypedRef = useRef(false);
  const canvasShownRef = useRef(false);
  const [initialTypingProgress, setInitialTypingProgress] = useState(0);
  const initialType = useRef(false);
  const canStart = useRef(false);
  const isTypingInitialContentRef = useRef(false);
  const [showEpilogue, setShowEpilogue] = useState(false);
  const [epilogueTypingProgress, setEpilogueTypingProgress] = useState(0);
  const isTypingEpilogueRef = useRef(false);
  const isEpilogueVisRef = useRef(false);
  const [currentChapterIndex, setCurrentChapterIndex] = useState(0); // Assuming 0 as the starting chapter index
  const [pendingChapterIndex, setPendingChapterIndex] = useState(null);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (
      pendingChapterIndex !== null &&
      pendingChapterIndex !== currentChapterIndex
    ) {
      setFadeOut(true);
      setTimeout(() => {
        setCurrentChapterIndex(pendingChapterIndex);
        setPendingChapterIndex(null);
        setFadeOut(false);
      }, 500); // Matches the transition duration in the CSS
    }
  }, [pendingChapterIndex, currentChapterIndex]);

  // Scene Initialization and Manipulation
  useEffect(() => {
    // Adding Class to Body for overflow hidden
    document.documentElement.classList.add("for-body"); // for <html>
    document.body.classList.add("for-body"); // for <body>

    let currentX = -3 * window.innerWidth;

    // const width = containerRef.current.clientWidth;
    // const height = containerRef.current.clientHeight;
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Create a scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 10000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor("#d5d2d2"); // Set background color

    // Set the size of the renderer and append it to the container
    renderer.setSize(width, height);
    containerRef.current.appendChild(renderer.domElement);

    // Calculate the plane's dimensions based on the background image's aspect ratio
    const planeWidth = 7 * window.innerWidth;
    const aspectRatio = window.innerHeight / (7 * window.innerWidth);
    const planeHeight = aspectRatio * planeWidth;

    // Texture Loader Initialized
    const textureLoader = new THREE.TextureLoader();
    textureLoader.encoding = THREE.sRGBEncoding; // sRGB encoding for accurate color reproduction
    if (textureLoader) {
      // Layer 1 each Chapters
      const layer1Textures = Array(7)
        .fill()
        .map((_, index) =>
          textureLoader.load(
            `https://digitalassestbucket.s3.amazonaws.com/JamshetjiTata/Scene${
              index + 1
            }layer1.webp`
          )
        );
      if (layer1Textures) {
        const layer1Planes = layer1Textures.map((texture, index) => {
          const layer1PlaneGeometry = new THREE.PlaneGeometry(
            1.3 * window.innerWidth,
            1.2 * window.innerHeight
          );
          const layer1PlaneMaterial = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
          });
          const layer1Plane = new THREE.Mesh(
            layer1PlaneGeometry,
            layer1PlaneMaterial
          );
          if (index === 0) {
            layer1Plane.scale.set(1.1, 1.1, 1.1);
          }
          layer1Plane.position.x = (index - 3) * window.innerWidth; // Centering the planes around the origin
          layer1Plane.position.z = -399; // Position slightly in front of the background
          return layer1Plane;
        });
        layer1Planes.forEach((plane) => scene.add(plane));
      }

      // Layer 2 each Chapters
      const layer2Textures = Array(7)
        .fill()
        .map((_, index) =>
          textureLoader.load(
            `https://digitalassestbucket.s3.amazonaws.com/JamshetjiTata/Scene${
              index + 1
            }layer2.webp`
          )
        );

      if (layer2Textures) {
        const layer2Planes = layer2Textures.map((texture, index) => {
          const layer2PlaneGeometry = new THREE.PlaneGeometry(
            window.innerWidth,
            window.innerHeight
          );
          const layer2PlaneMaterial = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
          });
          const layer2Plane = new THREE.Mesh(
            layer2PlaneGeometry,
            layer2PlaneMaterial
          );
          layer2Plane.position.x = (index - 3) * window.innerWidth; // Centering the planes around the origin
          layer2Plane.position.Y = 50;
          layer2Plane.position.z = 100;
          return layer2Plane;
        });
        layer2Planes.forEach((plane) => scene.add(plane));
      }

      // Layer 3 (Overlapping Textures between chapters)
      const layer3Textures = Array(6) // Assuming 6 overlapping images for 7 chapters
        .fill()
        .map((_, index) =>
          textureLoader.load(
            `https://digitalassestbucket.s3.amazonaws.com/JamshetjiTata/Scene${
              index + 1
            }layer3.webp`
          )
        );

      if (layer3Textures) {
        const layer3Planes = layer3Textures.map((texture, index) => {
          const layer3PlaneGeometry = new THREE.PlaneGeometry(
            window.innerWidth,
            window.innerHeight
          );
          const layer3PlaneMaterial = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
          });
          const layer3Plane = new THREE.Mesh(
            layer3PlaneGeometry,
            layer3PlaneMaterial
          );
          // Positioning the plane in between two chapters and slightly in front of layer 2
          layer3Plane.position.x =
            (index - 3) * window.innerWidth + window.innerWidth / 2;
          if (index !== 2 || index !== 4) {
            layer3Plane.scale.set(1.1, 1.1, 1.1);
          } else {
            layer3Plane.position.y = 70;
          }
          layer3Plane.position.z = 200;
          return layer3Plane;
        });
        layer3Planes.forEach((plane) => scene.add(plane));
      }

      // Layer 4 (Overlapping Textures between chapters)
      const layer4Textures = Array(6) // Assuming 6 overlapping images for 7 chapters
        .fill()
        .map((_, index) =>
          textureLoader.load(
            `https://digitalassestbucket.s3.amazonaws.com/JamshetjiTata/Scene${
              index + 1
            }layer4.webp`
          )
        );

      if (layer4Textures) {
        const layer4Planes = layer4Textures.map((texture, index) => {
          const layer4PlaneGeometry = new THREE.PlaneGeometry(
            window.innerWidth,
            window.innerHeight
          );
          const layer4PlaneMaterial = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
          });
          const layer4Plane = new THREE.Mesh(
            layer4PlaneGeometry,
            layer4PlaneMaterial
          );
          // Positioning the plane in between two chapters and slightly in front of layer 2
          layer4Plane.position.x =
            (index - 3) * window.innerWidth + window.innerWidth / 2;
          if (index === 2) {
            // layer4Plane.scale.set(0.8, 0.8, 0.8);
            layer4Plane.position.y = 100;
          }
          if (index === 4) {
            layer4Plane.position.x = layer4Plane.position.x + 20;
            layer4Plane.position.z = 250;
          } else {
            layer4Plane.position.z = 300;
          }
          return layer4Plane;
        });
        layer4Planes.forEach((plane) => scene.add(plane));
      }

      // Layer 5 (Overlapping Textures between chapters)
      const layer5Textures = Array(6) // Assuming 6 overlapping images for 7 chapters
        .fill()
        .map((_, index) =>
          textureLoader.load(
            `https://digitalassestbucket.s3.amazonaws.com/JamshetjiTata/Scene${
              index + 1
            }layer5.webp`
          )
        );

      if (layer5Textures) {
        const layer5Planes = layer5Textures.map((texture, index) => {
          const layer5PlaneGeometry = new THREE.PlaneGeometry(
            window.innerWidth,
            window.innerHeight
          );
          const layer5PlaneMaterial = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
          });
          const layer5Plane = new THREE.Mesh(
            layer5PlaneGeometry,
            layer5PlaneMaterial
          );
          // Positioning the plane in between two chapters and slightly in front of layer 2
          layer5Plane.position.x =
            (index - 3) * window.innerWidth + window.innerWidth / 2;
          // layer5Plane.scale.set(0.8, 0.8, 0.8);
          layer5Plane.position.y = 100;
          layer5Plane.position.z = 400;
          return layer5Plane;
        });
        layer5Planes.forEach((plane) => scene.add(plane));
      }
    }

    camera.setFocalLength(20); // For a 50mm lens
    camera.position.x = -3 * window.innerWidth;
    // camera.position.y = -50;
    const paddingFactor = 1.44; // 14.4% padding
    camera.position.z =
      (planeHeight / (2 * Math.tan((camera.fov * Math.PI) / 360))) *
      paddingFactor;

    // Initialize camera's target position
    let cameraTargetX = camera.position.x;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      // Lerp the camera's position towards the target for a smooth transition
      camera.position.x +=
        (cameraTargetX - camera.position.x) * lerpFactorRef.current; // 0.03 is the lerp factor, adjust for faster or slower transitions
      renderer.render(scene, camera);
    };
    animate();

    // Handle resizing
    const handleResize = () => {
      const newWidth = containerRef.current.clientWidth;
      const newHeight = containerRef.current.clientHeight;
      renderer.setSize(newWidth, newHeight);
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
    };

    const handleScroll = (event) => {
      if (isTypingInitialContentRef.current) {
        // If initial Dcontent is still being typed, exit early
        return;
      }

      if (isTypingEpilogueRef.current) {
        return;
      }
      const scrollAmount = event.deltaY;

      if (isLoaderVisRef.current) {
        isLoaderVisRef.current = false; // Hide loader
        jamsedjiOpacityRef.current = 1; // Show Jamshedji image
        return; // Do not scroll further
      }
      if (jamsedjiOpacityRef.current > 0 && !initialType.current) {
        // setTimeout(() => {
        // Add this delay
        initType();
        textTypedRef.current = true;
        // }, 100); // 1000 milliseconds or 1 second
        initialType.current = true;
        return;
      }
      if (textTypedRef.current) {
        canvasShownRef.current = true;
        canStart.current = true;
      }

      if (canStart.current) {
        const minX = -3 * window.innerWidth;
        const maxX = 3 * window.innerWidth;
        textTypedRef.current = false;
        // canvasShownRef.current = true;
        // Check for current chapter based on camera's position
        const chapterIndex = Math.round(
          (camera.position.x + window.innerWidth * 3) / window.innerWidth
        );

        setPendingChapterIndex(chapterIndex);
        // Speed up typing on each scroll event if already typing
        if (isTypingRef.current) {
          typeText();
          if (
            chapterIndex === 0 ||
            chapterIndex === chapterContents.length - 1
          ) {
            return;
          }
          // return; // Exit the function early
        }

        // If user tries to scroll back to a previous chapter and camera is typing, stop movement
        if (scrollAmount > 0 && chapterIndex < currentChapterRef.current) {
          return;
        }

        // Allow scrolling forward if current chapter is less than the last viewed chapter
        if (scrollAmount < 0 && chapterIndex < lastViewedChapterRef.current) {
          cameraTargetX += scrollAmount;
        }

        cameraTargetX += scrollAmount;
        if (currentX < maxX + 300) {
          currentX += scrollAmount;
        } else {
          currentX = maxX + 350;
        }

        if (currentX === maxX + 350 && scrollAmount < 0) {
          currentX = maxX;
        }

        // Clamp the target position to ensure it doesn't go beyond min or max
        cameraTargetX = Math.max(minX, Math.min(maxX, cameraTargetX));
        // Check if the user is trying to move past the last chapter

        if (chapterIndex !== currentChapterRef.current) {
          currentChapterRef.current = chapterIndex;
          setTypingProgress(0); // Reset typing progress
          isTypingRef.current = true; // Start typing
          lastViewedChapterRef.current = chapterIndex; // Update the last viewed chapter using .current
          // return;
        }

        if (
          chapterIndex === chapterContents.length - 1 &&
          lastViewedChapterRef.current
        ) {
          if (
            scrollAmount > 0 &&
            currentX >= maxX + 350 &&
            !isEpilogueVisRef.current
          ) {
            setShowEpilogue(true);
            isEpilogueVisRef.current = true;
            if (!isTypingEpilogueRef.current) {
              setEpilogueTypingProgress(0);
              typeEpilogueText();
            }
          }
          if (
            scrollAmount < 0 &&
            currentX <= maxX + 350 &&
            isEpilogueVisRef.current
          ) {
            isEpilogueVisRef.current = false;
            setShowEpilogue(false);
            setTypingProgress(0);
            typeText();
            isTypingRef.current = true;
          }
        }
      }
    };

    const initType = () => {
      // setTimeout(() => {
      isTypingInitialContentRef.current = true;
      if (initialContent) {
        // If the chapter hasn't been set, it means we're still at the initial Dcontent
        const typingInterval = setInterval(() => {
          setInitialTypingProgress((prevProgress) => {
            const nextProgress = prevProgress + 1;
            if (nextProgress >= initialContent.length) {
              textTypedRef.current = true; // Mark initial content as typed
              isTypingRef.current = false; // Stop typing
              isTypingInitialContentRef.current = false; // Reset the flag indicating initial content is being typed
              clearInterval(typingInterval); // Clear the interval
            }
            return nextProgress;
          });
        }, 10); // Adjust this interval for faster/slower typing speed
      }
      // }, 1000); // 1000 milliseconds or 1 second
    };

    const typeText = () => {
      if (currentChapterRef.current != null) {
        // If the chapter hasn't been viewed yet
        const typingInterval = setInterval(() => {
          setTypingProgress((prevProgress) => {
            const nextProgress = prevProgress + 1;
            if (
              nextProgress >= chapterContents[currentChapterRef.current].length
            ) {
              // Mark chapter as viewed once typing is complete
              viewedChaptersRef.current.add(currentChapterRef.current);
              isTypingRef.current = false; // Stop typing
              clearInterval(typingInterval); // Clear the interval
            }
            return nextProgress;
          });
        }, 300); // Adjust this interval for faster/slower typing speed
      } else {
        // If the chapter has already been viewed, ensure isTypingRef is set to false
        isTypingRef.current = false;
      }
    };

    const typeEpilogueText = () => {
      isTypingEpilogueRef.current = true;
      const typingInterval = setInterval(() => {
        setEpilogueTypingProgress((prevProgress) => {
          const nextProgress = prevProgress + 1;
          if (nextProgress >= epilogueContent.length) {
            isTypingEpilogueRef.current = false;
            clearInterval(typingInterval);
          }
          return nextProgress;
        });
      }, 10);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("wheel", handleScroll);
    

    return () => {
      // ScrollTrigger.getAll().forEach((st) => st.kill());
      document.documentElement.classList.remove("for-body"); // for <html>
      document.body.classList.remove("for-body"); // for <body>
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("wheel", handleScroll);
    };
  }, []);

  return (
    <div className="jamshedJIBio">
      {/*  Loader Screen  */}
      <div
        className="loader"
        style={{ opacity: isLoaderVisRef.current ? 1 : 0 }}
      >
        <img
          src="https://digitalassestbucket.s3.amazonaws.com/JamshetjiTata/Book.webp"
          alt="IISc"
          className="loader-book"
        />
        <img
          src="https://digitalassestbucket.s3.amazonaws.com/JamshetjiTata/loading.webp"
          alt="Loading"
          className="loader-loading"
        />
        <h2>Journey of Vision : The Legacy of Jamsetji Nusserwanji Tata</h2>
      </div>

      {/*  Initial Content  */}
      <div
        className="initial-content-container"
        style={{ display: textTypedRef.current ? "flex" : "none" }}
      >
        <div className="initial-content">
          {currentChapterRef.current === null
            ? initialContent.substring(0, initialTypingProgress)
            : "Loreum epsum tutorial get the hell out of here"}
        </div>
      </div>

      {/*  Canvas Container  */}
      <div
        className="canvas-container"
        ref={containerRef}
        style={{
          width: "100vw",
          height: "100vh",
          opacity: canvasShownRef.current ? 1 : 0, // control opacity here
        }}
      />

      {/*  Frame  */}
      <img
        src="https://digitalassestbucket.s3.amazonaws.com/JamshetjiTata/frame.webp"
        alt="Frame"
        className="frame-overlay"
      />

      {/*  Jamsetji Tata  */}
      <div
        id="jamshedji"
        className="jamshedji-overlay-container"
        style={{ opacity: showEpilogue ? 0 : jamsedjiOpacityRef.current }}
      >
        <img
          src="https://digitalassestbucket.s3.amazonaws.com/JamshetjiTata/jamshedji.webp"
          alt="Jamshedji"
          className="jamshedji-overlay"
        />
      </div>

      {/*  Chapter Title  */}
      <div
        className="chapter-title-container"
        style={{ opacity: showEpilogue ? 0 : 1 }}
      >
        {canvasShownRef.current && (
          <div className={`chapter-title ${fadeOut ? "fade-out" : ""}`}>
            {chapterTitles[currentChapterIndex]}
          </div>
        )}
      </div>

      {/*  Chapter Content  */}
      <div
        className="chapter-content-container"
        style={{ opacity: showEpilogue ? 0 : 1 }}
      >
        <div className="chapter-content">
          {currentChapterRef.current !== null &&
            chapterContents[currentChapterRef.current].substring(
              0,
              typingProgress
            )}
        </div>
      </div>

      {/*  Epilogue Image  */}
      <div className="epilogue" style={{ opacity: showEpilogue ? 1 : 0 }}>
        <div className="final-shot"></div>
      </div>

      {/*  Epilogue Content  */}
      <div
        className="epilogue-content-container"
        style={{ display: showEpilogue ? "flex" : "none" }}
      >
        <div className="epilogue-content">
          {epilogueContent.substring(0, epilogueTypingProgress)}
        </div>
      </div>
    </div>
  );
}
