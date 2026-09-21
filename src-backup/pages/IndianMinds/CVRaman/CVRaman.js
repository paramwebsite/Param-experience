import React, { useState ,useEffect} from "react";
import IMNavbar from "../../../components/IndianMinds/IMNavbar";
import './CVRaman.css'



export default function CVRaman() {
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    // Fetch the content of cvraman.html
    fetch("https://digital-applications-assets.sgp1.cdn.digitaloceanspaces.com/digitalassestbucket/CVRaman/Cvraman.html")
      .then((response) => response.text())
      .then((data) => setHtmlContent(data))
      .catch((error) => console.error("Error fetching HTML:", error));
  }, []);
  return (
    <div>
      <IMNavbar />

      <div className="CvRaman">
      <iframe src="https://digital-applications-assets.sgp1.cdn.digitaloceanspaces.com/digitalassestbucket/CVRaman/Cvraman.html" title="External Page" id="cviframe" frameborder="0"></iframe>
           
      
      {/* Include external CSS */}
      <link rel="stylesheet" href="https://digital-applications-assets.sgp1.cdn.digitaloceanspaces.com/digitalassestbucket/CVRaman/style.ff1c4cab.css" />
      
      {/* Include external JavaScript */}
      <script src="https://digital-applications-assets.sgp1.cdn.digitaloceanspaces.com/digitalassestbucket/CVRaman/cvraman.js"></script>
      </div>

    </div>
  );
}


