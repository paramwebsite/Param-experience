import React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import ReactDOM from "react-dom/client";
import Home from "./pages/Home/Home";
import ScienceFields from "./pages/ScienceFields/ScienceFields";

import EquationGallery from "./pages/EquationGallery/EquationGallery";
import Desmos from "./pages/EquationGallery/Desmos/Desmos";
import Harmonograph from "./pages/EquationGallery/Harmonograph/Harmonograph";
import Attractors from "./pages/EquationGallery/Attractors/Attractors";
import Facts from "./pages/EquationGallery/Facts/Facts";
import ScienceApplication from "./pages/ScienceApplications/ScienceApplication";
import IndianMinds from "./pages/IndianMinds/IndianMinds";
import CVRaman from "./pages/IndianMinds/CVRaman/CVRaman";
import PitchDeck from "./pages/PitchDeck/PitchDeck";
import Pysarun from "./pages/ScienceApplications/Pysarun/Pysarun";
import Poppus from "./pages/ScienceApplications/EyeOfPuppusChain/Puppus";
import Rorschachgenerator from "./pages/ScienceApplications/Rorschachgenerator/Rorschachgenerator";
import ElectricSphere from "./pages/ScienceApplications/ElectricSphere/ELectectricSphere";
import Recurssivecircle from "./pages/ScienceApplications/RecurssiveCircle/RecurssiveCircle";

import Circle from "./pages/ScienceApplications/Circle/Circle";
import Penrose from "./pages/ScienceApplications/PenroseZoom/PenroseZoom";
import QardTree from "./pages/ScienceApplications/QardTree/QardTree";
import DoubleDip from "./pages/ScienceApplications/DoubleDIp/DoubleDip";
import Factral from "./pages/ScienceApplications/Factral/Factral";
import Mandala from "./pages/ScienceApplications/Mandala/Mandala";
import Cardoid from "./pages/ScienceApplications/Cardoiod/Cardoid";
import TrignometryPlane from "./pages/ScienceApplications/TrignometryPlane/TrignometryPlane";
import PerlinNoiseASCII from "./pages/ScienceApplications/ASCII_Island/ASCIIisland";
import WavesOnSphere from "./pages/ScienceApplications/WavesOnSphere/WavesOnSphere";
import DigitalOrganism from "./pages/ScienceApplications/DigitalOrganism/DigitalOrganism";
import CrystalSucculent from "./pages/ScienceApplications/CrystalSucculent/CrystalSucculent";
import DreamCatcher from "./pages/ScienceApplications/DreamCatcher/DreamCatcher";
import SierpinskiWireframe from "./pages/ScienceApplications/SierpinskiWireframe/SierpinskiWireframe";
import CursedTriangle from "./pages/ScienceApplications/CursedTriangle/CursedTriangle";
import SquarePattern from "./pages/ScienceApplications/SquarePattern/SquarePattern";
import MandalaOfElements from "./pages/ScienceApplications/MandalaOfElements/MandalaOfElements";
import SqaureFlower from "./pages/ScienceApplications/SquareFlower/SquareFlower";
import Trignometry from "./pages/ScienceApplications/Trignometry/Trignometry";
import TrignometryFlower from "./pages/ScienceApplications/TrignometryFlower/TrignometryFlower";
import Scope from "./pages/ScienceApplications/Scope/Scope";
import TrippyTriangle from "./pages/ScienceApplications/TrippyTriangle/TrippyTriangle";
import NodeSpring from "./pages/ScienceApplications/NodeSpring/NodeSrping";
import ExplodingMouse from "./pages/ScienceApplications/ExplodingMouse/ExplodingMouse";
import FlowerDonut from "./pages/ScienceApplications/FlowerDonut/FlowerDonut";
import FactralLand from "./pages/ScienceApplications/FactralLand/FactralLand";
import GlassBreaker from "./pages/ScienceApplications/GlassBreaker/GlassBreaker";
import SlimeMoldSimulation from "./pages/ScienceApplications/SlimeMoldSimulation/SlimeMoldSimulation";
import RandomLissajousWebs from "./pages/ScienceApplications/RandomLissajousWebs/RandomLissajousWebs";
import QuadTreeBlob from "./pages/ScienceApplications/QuadTreeBlob/QuadTreeBlob";
import Diverge from "./pages/ScienceApplications/Diverge/Diverge";

import FloatingFunnel from "./pages/ScienceApplications/FloatingFunnel/FloatingFunnel";
import TunnelVision from "./pages/ScienceApplications/TunnelVision/TunnelVision";
import StrangeVibration from "./pages/ScienceApplications/StrangeVibration/StrangeVibration";
import OilSplill from "./pages/ScienceApplications/230609a/OilSplill";
import OilWaterPhaseSeparation from "./pages/ScienceApplications/Gassball/OilWaterPhaseSeparation";
import Jamsetji from "./pages/IndianMinds/JamshetjiTata/Jamsetji";
import Evolution from "./pages/EvolutionOfScience/Evolution";
import APJAbdulKalam from "./pages/IndianMinds/APJAbdulKalam/APJAbdulKalam";
import FunScience from "./pages/FunScience/FunScience";
import ScienceFieldsKiosk from "./pages/ScienceFieldsKiosk/ScienceFieldsKiosk";

import { ChakraProvider } from "@chakra-ui/react";
import RSSPitchDeck from "./pages/RssPitchDeck/RssPitchDeck";

function App() {
  const location = useLocation();
  function handlePopState() {
    window.location.reload();
  } // Add event listener for the popstate event
  window.addEventListener("popstate", handlePopState);

  return (
    <ChakraProvider>
      <React.Fragment key={location.pathname}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/indian-minds" element={<IndianMinds />} />
          <Route path="/cv-raman" element={<CVRaman />} />
          <Route path="/jamshetji-tata" element={<Jamsetji />} />
          <Route path="/apj-abdul-kalam" element={<APJAbdulKalam />} />
          <Route path="/fields-of-science" element={<ScienceFields />} />
          
          <Route path="/equational-gallery" element={<EquationGallery />} />
          <Route path="/desmos" element={<Desmos />} />
          <Route path="/harmonograph" element={<Harmonograph />} />
          <Route path="/Attractors" element={<Attractors />} />
          <Route path="/facts" element={<Facts />} />

          {/*   Sciene Application   */}
          <Route path="/Mathemartica" element={<ScienceApplication />} />
          {/*   Sciene Applications   */}
          <Route path="/BallAnimation" element={<Pysarun />} />
          <Route path="/EyeOfPoppusChain" element={<Poppus />} />
          <Route path="/Rorschachgenerator" element={<Rorschachgenerator />} />
          <Route path="/ElectricSphere" element={<ElectricSphere />} />
          <Route path="/StrangeVibration" element={<StrangeVibration />} />
          <Route path="/Recurssivecircle" element={<Recurssivecircle />} />
          <Route
            path="/OilWaterPhaseSeparation"
            element={<OilWaterPhaseSeparation />}
          />
          <Route path="/Circle" element={<Circle />} />
          <Route path="/Penrose" element={<Penrose />} />
          <Route path="/QardTree" element={<QardTree />} />
          <Route path="/DoubleDip" element={<DoubleDip />} />
          <Route path="/Fractal" element={<Factral />} />
          <Route path="/Mandala" element={<Mandala />} />
          <Route path="/Cardoiod" element={<Cardoid />} />
          <Route path="/TrignometryPlane" element={<TrignometryPlane />} />
          <Route path="/PerlinNoiseASCII" element={<PerlinNoiseASCII />} />
          <Route path="/WavesOnSphere" element={<WavesOnSphere />} />
          <Route path="/DigitalOrganism" element={<DigitalOrganism />} />
          <Route path="/CrystalSucculent" element={<CrystalSucculent />} />
          <Route path="/DreamCatcher" element={<DreamCatcher />} />
          <Route
            path="/SierpinskiWireframe"
            element={<SierpinskiWireframe />}
          />
          <Route path="/CursedTriangle" element={<CursedTriangle />} />
          <Route path="/SquarePattern" element={<SquarePattern />} />
          <Route path="/MandalaOfElements" element={<MandalaOfElements />} />
          <Route path="/SquareFlower" element={<SqaureFlower />} />
          <Route path="/Trignometry" element={<Trignometry />} />
          <Route path="/TrignometryFlower" element={<TrignometryFlower />} />
          <Route path="/Scope" element={<Scope />} />
          <Route path="/TrippyTriangle" element={<TrippyTriangle />} />
          <Route path="/NodeSpring" element={<NodeSpring />} />
          <Route path="/ExplodingMouse" element={<ExplodingMouse />} />
          <Route path="/FlowerDonut" element={<FlowerDonut />} />
          <Route path="/FractallLand" element={<FactralLand />} />
          <Route path="/GlassBreaker" element={<GlassBreaker />} />
          <Route
            path="/SlimeMoldSimulation"
            element={<SlimeMoldSimulation />}
          />
          <Route
            path="/RandomLissajousWebs"
            element={<RandomLissajousWebs />}
          />
          <Route path="/OilSplill" element={<OilSplill />} />
          <Route path="/QuadTreeBlob" element={<QuadTreeBlob />} />
          <Route path="/Diverge" element={<Diverge />} />
          <Route path="/FloatingFunnel" element={<FloatingFunnel />} />
          <Route path="/TunnelVision" element={<TunnelVision />} />

          {/*   Evolution Page   */}
          <Route
            path="/timeline-of-reality"
            element={<Evolution kiosk={false} />}
          />

          <Route path="/fun-with-science" element={<FunScience />} />

          

          {/* Hidden Paths */}
          <Route path="/pitch-deck" element={<PitchDeck />} />
          <Route path="/RSS-pitch-deck" element={<RSSPitchDeck/>}/>
          <Route
            path="/fields-of-science-kiosk"
            element={<ScienceFieldsKiosk />}
          />
          {/*   Evolution Page for kiosk   */}
          <Route
            path="/timeline-of-reality-kiosk"
            element={<Evolution kiosk={true} />}
          />
          {/* ---------------------------science avatar generator ----------------------------------------- */}

          {/* <Route path="/avatar" element={<AvatarGenerator />} /> */}
        </Routes>
      </React.Fragment>
    </ChakraProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
