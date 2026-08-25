import React from "react";
import "./Facts.css";
import EquationNav from "../EquationNav";
import Content from "../../../components/equationalGallery/facts/Content";
import image01 from "./public/1.jpg";
import formula01 from "./public/1txt.png";
import image02 from "./public/2.jpeg";
import formula02 from "./public/2txt.png";
import image03 from "./public/3.jpeg";
import formula03 from "./public/3txt.png";
import image04 from "./public/4.jpeg";
import formula04 from "./public/4txt.png";
import image05 from "./public/5.jpeg";
import formula05 from "./public/5txt.png";
import image06 from "./public/6.jpeg";
import formula06 from "./public/6txt.png";
import image07 from "./public/7.jpeg";
import formula07 from "./public/7txt.png";
import image08 from "./public/8.jpg";
import formula08 from "./public/8txt.png";
import image09 from "./public/9.jpeg";
import formula09 from "./public/9txt.png";
import image10 from "./public/10.jpg";
import formula10 from "./public/10txt.png";
import image11 from "./public/11.jpeg";
import formula11 from "./public/11txt.png";
import image12 from "./public/12.png";
import formula12 from "./public/12txt.png";
import image13 from "./public/13.jpg";
import formula13 from "./public/13txt.png";
import image14 from "./public/14.jpg";
import formula14 from "./public/14txt.png";
import image15 from "./public/15.jpeg";
import formula15 from "./public/15txt.png";
import image16 from "./public/16.jpeg";
import formula16 from "./public/16txt.png";
import image17 from "./public/17.jpg";
import formula17 from "./public/17txt.png";

export default function Facts() {
  const contents = [
    {
      additionalClass: "addPad",
      image: image01,
      caption: "Pythagoras, 530 BC",
      headClass: "headTitle",
      heading: "Pythagoras’s Theorem",
      formula: formula01,
      subheading: "Applications of Pythagoras’s Theorem",
      content1:
        "The Pythagorean theorem is a statement in geometry that shows the relationship between the lengths of the sides of a right triangle – a triangle with one 90-degree angle​​.",
      content2:
        "The Pythagorean Theorem widely used in Architecture and Construction, Laying Out Square Angles, Surveying, and  Navigation.",
    },
    {
      additionalClass: "addInvPad",
      image: image02,
      caption: "John Napier, 1610",
      headClass: "",
      heading: "Logarithms",
      formula: formula02,
      subheading: "Applications of Logarithms",
      content1:
        "A logarithm determines the exponent needed to obtain a specific number. It represents the power required to reach a given value from a base number. In simple terms, it's the inverse operation of exponentiation.",
      content2:
        "Logarithms widely used to measure Earthquake intensity measurement, Acid measurement of solutions(pH Value), Sound intensity measurements, and express larger value.",
    },
    {
      additionalClass: "addInvPad",
      image: image03,
      caption: "Newton, 1668",
      headClass: "",
      heading: "Calculus",
      formula: formula03,
      subheading: "Applications of Calculus",
      content1:
        "Calculus is a form of mathematics which was developed from algebra and geometry. It is made up of two interconnected topics, differential calculus, and integral calculus.",
      content2:
        "Calculus is widely used for engineers, scientists, and economists. The contribution of these professionals has a huge impact on our daily life – from your microwaves, cell phones, TV, and car to medicine, economy, and national defense.",
    },
    {
      additionalClass: "addInvPad",
      image: image04,
      caption: "Newton, 1687",
      headClass: "",
      heading: "Law of Gravity",
      formula: formula04,
      subheading: "The significance of Gravitational Laws",
      content1:
        "Every object in the universe attracts every other object with a force directed along the line of centers for the two objects that is proportional to the product of their masses and inversely proportional to the square of the separation between the two objects.",
      content2:
        "Gravitational laws are used in many ways from small bicycle manufacturing to the aerodynamics of a Rocket.",
    },
    {
      additionalClass: "addInvPad",
      image: image05,
      caption: "Euler, 1750",
      headClass: "",
      heading: "The Square Root of Minus One",
      formula: formula05,
      subheading: "The significance of the Imaginary number ",
      content1: `Imaginary number is a complex number that can be written as a real number multiplied by the imaginary unit i, which is defined by its property i<sup>2</sup> = −1.`,
      content2:
        "In mathematics, we use the imaginary unit 'i' to represent the square root of -1. It helps simplify equations and calculations, especially in electrical engineering where these imaginary numbers are frequently utilized in various operations.",
    },
    {
      additionalClass: "addInvPad",
      image: image06,
      caption: "Euler, 1751",
      headClass: "",
      heading: "Euler’s Formula for Polyhedra",
      formula: formula06,
      subheading: "Significance of Euler's Identity",
      content1:
        "Euler's formula for polyhedra is a fundamental theorem that relates the number of vertices, edges, and faces of a polyhedron. The formula is given as:",
      content2:
        "A (convex) polyhedron is called a regular convex polyhedron if all its faces are congruent to a regular polygon, and all its vertices are surrounded alike. Plain experimentation with sticks will allow you to easily construct 5 regular polyhedra: tetrahedron, cube, octahedron, icosahedron, and dodecahedron.",
    },
    {
      additionalClass: "addInvPad",
      image: image07,
      caption: "C.F.Gauss, 1810",
      headClass: "",
      heading: "Normal Distribution",
      formula: formula07,
      subheading: "Normal Distribution application",
      content1:
        "The normal distribution, also known as the gaussian distribution, is a probability distribution that is symmetric about the mean, showing that data near the mean are more frequent in occurrence than data far from the mean.",
      content2:
        "The normal distribution is used in statistics to model real-world variables such as IQ scores or heights in populations, allowing for predictions and insights about the data. It also forms the basis for hypothesis testing in scientific research, enabling researchers to determine the significance of experimental results.",
    },
    {
      additionalClass: "addInvPad",
      image: image08,
      caption: "Jean le Rond d'Alembert, 1746",
      headClass: "",
      heading: " Wave Equation",
      formula: formula08,
      subheading: "Wave equation application",
      content1:
        "The wave equation is an important second-order linear partial differential equation for the description of waves—as they occur in classical physics—such as mechanical waves (e.g. water waves, sound waves and seismic waves) or light waves. It arises in fields like acoustics, electromagnetics, and fluid dynamics.",
      content2:
        "The wave equation is used to predict how waves propagate in various mediums, crucial for designing buildings in earthquake-prone areas. It's also fundamental in optics and telecommunications, guiding signal transmission and lens design.",
    },
    {
      additionalClass: "addInvPad",
      image: image09,
      caption: "J. Fourier, 1822",
      headClass: "",
      heading: "Fourier Transform",
      formula: formula09,
      subheading: "Applications of Fourier Transform",
      content1:
        "The fourier transform (ft) decomposes a function of time (a signal) into the frequencies that make it up, in a way similar to how a musical chord can be expressed as the frequencies (or pitches) of its constituent notes.",
      content2: `<ol>
        <li>Designing and using antennas</li>
        <li>Image Processing and filters</li>
        <li>Transformation, representation, and encoding</li>
        <li>Smoothing and sharpening</li>
        </ol>`,
    },
    {
      additionalClass: "addInvPad",
      image: image10,
      caption: "C. Navier, G. Stokes, 1845",
      headClass: "",
      heading: "Navier – Stokes Equation",
      formula: formula10,
      subheading: "Significance of Navier Stokes Equation",
      content1:
        "This equations arise from applying isaac newton’s second law to fluid motion, together with the assumption that the stress in the fluid is the sum of a diffusing viscousterm (proportional to the gradient of velocity) and a pressure term hence describing viscous flow.",
      content2:
        "Navier Stokes equation is used to describe the flow characteristics of a Newtonian fluid. A fluid in which relation between stress and rate of strain is linear. In other words, a fluid obeys Newton law of viscosity. Honey, Benzene, Water, Kerosene oil, are just a few examples of a Newtonian fluid.",
    },
    {
      additionalClass: "addInvPad",
      image: image11,
      caption: "J.C. Maxwell, 1865",
      headClass: "",
      heading: "Maxwell’s Equations",
      formula: formula11,
      subheading: "Significance of Maxwell’s Equations",
      content1:
        "Maxwell’s equations are a set of partial differential equations that, form the foundation of classical electromagnetism, classical optics, and electric circuits. The equations provide a mathematical model for electric, optical and radio technologies, such as power generation, electric motors, wireless communication, lenses, radar etc.",
      content2:
        "Maxwell’s equations often involve calculus, there are simplified versions of the equations. These versions only work in certain circumstances, but can be useful and save a lot of trouble.",
    },
    {
      additionalClass: "addInvPad",
      image: image12,
      caption: "L. Boltzmann, 1874",
      headClass: "",
      heading: "Second Law of Thermodynamics",
      formula: formula12,
      subheading: "Application of Second law of thermodynamics",
      content1:
        "The second law of thermodynamics states that the total entropy of an isolated system can never decrease over time, and is constant if and only if all processes are reversible. Isolated systems spontaneously evolve towards thermodynamic equilibrium, the state with maximum entropy.",
      content2:
        "The second law provides the basis for understanding why natural processes favour increased disorder, guiding chemical reaction predictions. It also informs the design and efficiency limits of renewable energy technologies like solar cells.",
    },
    {
      additionalClass: "addInvPad",
      image: image13,
      caption: "Einstien, 1905",
      headClass: "",
      heading: "Relativity",
      formula: formula13,
      subheading: "Applications of Relativity Equations",
      content1:
        "The increased relativistic mass (m) of body times the speed of light squared (c2) is equal to the kinetic energy (e) of that body.",
      content2: `Nuclear power production (Uranium, plutonium) and Atom Bomb's destructive force stem from E=mc^2 (radioactivity's principle).
      Fusion and Fission reactions in Atom Bomb rely on this equation for immense power.
      Radioactivity, x-rays, gamma rays, etc., linked to elements due to E=mc^2.`,
    },
    {
      additionalClass: "addInvPad",
      image: image14,
      caption: "E.Schrodinger, 1927",
      headClass: "",
      heading: "Schrodinger’s Equation",
      formula: formula14,
      subheading: "Significance of Schrodinger’s Equation",
      content1:
        "Schrödinger equation is a mathematical equation that describes the changes over time of a physical system in which quantum effects, such as wave particle duality, are significant.",
      content2:
        "The Schrodinger equation is used to find the allowed energy levels of quantum mechanical systems (such as atoms, or transistors). The associated wavefunction gives the probability of finding the particle at a certain position. The solution to this equation is a wave that describes the quantum aspects of a system.",
    },
    {
      additionalClass: "addInvPad",
      image: image15,
      caption: "E. Shannon, 1949",
      headClass: "",
      heading: "Information Theory",
      formula: formula15,
      subheading: "Applications of Information Theory",
      content1:
        "Information entropy is the rate of information produced by a random data source. It is calculated as the negative logarithm of the probability mass function for each potential data value.",
      content2: `<ol>
        <li>Lossless data compression (e.g. ZIP files).</li>
        <li>Lossy data compression (e.g. MP3s and JPEGs).</li>
        <li>Channel coding (e.g. for digital subscriber line (DSL)).</li>
        <li>An invention of the Compact Disc(CD).</li>
        </ol>`,
    },
    {
      additionalClass: "addInvPad",
      image: image16,
      caption: "Edward Lorenz, 530 BC",
      headClass: "",
      heading: "Chaos Theory",
      formula: formula16,
      subheading: "Principles of Chaos",
      content1:
        "The chaos theory is a study in mathematics to understand the dynamic behavior of nature. The butterfly effect is the best example of chaos theory, small wings flapping in one state can cause big effects at a later stage. Chaos theory deals with nonlinear things that are effectively impossible to predict or control. It also called the deterministic behavior of the system. Newtonian laws are completely deterministic one.",
      content2: `<ol>
        <li><strong>Butterfly Effect:</strong> Small changes, big results.</li>
        <li><strong>Fractals:</strong> Complex patterns from repetition.</li>
        <li><strong>Unpredictability:</strong> Complex systems, uncertain outcomes.</li>
        <li><strong>Feedback:</strong> Disorder through input.</li>
    </ol>`,
    },
    {
      additionalClass: "addInvPad",
      image: image17,
      caption: "F. Black, M. Scholes, 1990",
      headClass: "",
      heading: "Black – Scholes Equation",
      formula: formula17,
      subheading: "Applications of Black – Scholes Equation:",
      content1:
        "Black–scholes–merton model is a mathematical model for the dynamics of a financial market containing derivative investment instruments.",
      content2: `<ol>
        <li>Risk-Neutral valuation</li>
        <li>Market research</li>
        <li>Financial</li>
        <li>Investment</li>
        </ol>`,
    },
  ];
  return (
    <div className="factsContainer">
      <EquationNav />
      <div className="factsLogo">Eqautions that Changed the World</div>
      <div className="mobileDivision">
        <hr />
        <div className="MfactsLogo factsLogo">
          Eqautions that Changed the World
        </div>
        <hr />
      </div>
      <div className="factsContain">
        {contents.map((content, index) => (
          <Content
            key={index}
            additionalClass={content.additionalClass}
            image={content.image}
            caption={content.caption}
            headClass={content.headClass}
            heading={content.heading}
            formula={content.formula}
            subheading={content.subheading}
            content1={content.content1}
            content2={content.content2}
          />
        ))}
      </div>
    </div>
  );
}
