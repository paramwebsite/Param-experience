import React, { useState ,useEffect} from "react";
import IMNavbar from "../../../components/IndianMinds/IMNavbar";
import './CVRaman.css'



export default function CVRaman() {
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    // Fetch the content of cvraman.html
    fetch("https://digitalassestbucket.s3.amazonaws.com/CVRaman/Cvraman.html")
      .then((response) => response.text())
      .then((data) => setHtmlContent(data))
      .catch((error) => console.error("Error fetching HTML:", error));
  }, []);
  return (
    <div>
      <IMNavbar />

      <div className="CvRaman">
      <iframe src="https://digitalassestbucket.s3.amazonaws.com/CVRaman/Cvraman.html" title="External Page" id="cviframe" frameborder="0"></iframe>
           
      
      {/* Include external CSS */}
      <link rel="stylesheet" href="https://digitalassestbucket.s3.amazonaws.com/CVRaman/style.ff1c4cab.css" />
      
      {/* Include external JavaScript */}
      <script src="https://digitalassestbucket.s3.amazonaws.com/CVRaman/cvraman.js"></script>
      </div>

    </div>
  );
}
