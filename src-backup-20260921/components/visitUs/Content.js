import React, { useCallback, useEffect, useRef, useState } from "react";
import GuidelinesData from "../Guidelines/GuidelinesData";
import { Link } from "react-router-dom";

export default function Content() {
  const topThreeGuidelines = GuidelinesData.slice(0, 2);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);
  const warningRef = useRef(null);
  const [formData, setFormData] = useState({
    Name: "",
    OrganisationName: "",
    EmailID: "",
    PhoneNumber: "",
    Message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const requiredFields = { ...formData };
    delete requiredFields.Message; // Remove 'Message' from the object to skip its validation

    // Check if all fields are filled
    const allFieldsFilled = Object.values(requiredFields).every(
      (val) => val.trim() !== ""
    );
    // Check if the phone number is numeric
    const phoneNumberIsNumeric = /^\d+$/.test(formData.PhoneNumber);

    return allFieldsFilled && phoneNumberIsNumeric;
  };

  const validatePhoneNumber = useCallback(() => {
    // console.log("validating phone number")
    if (formData.PhoneNumber.length > 10 || formData.PhoneNumber.length < 10) {
      // console.log(formData.PhoneNumber.length)
      setIsPhoneNumberValid(false);
      return;
    }
    setIsPhoneNumberValid(true);
  }, [formData.PhoneNumber, setIsPhoneNumberValid]);

  const handleSubmit = async (e) => {
    // e.preventDefault();
    if (!validateForm()) {
      // alert("Please fill in all fields correctly.");
      warningRef.current.innerText = "* All fields are important";
      warningRef.current.style.opacity = 1;
      setTimeout(() => {
        warningRef.current.style.opacity = 0;
      }, "2000");
      return;
    }

    if (!isPhoneNumberValid) {
      warningRef.current.innerText = "Enter a valid Phone Number";
      warningRef.current.style.opacity = 1;
      setTimeout(() => {
        warningRef.current.style.opacity = 0;
      }, "2000");
      return;
    }

    setIsSubmitting(true);
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    const body = JSON.stringify([
      {
        name: formData.Name,
        email: formData.EmailID,
        phoneNumber: formData.PhoneNumber,
        organisationName: formData.OrganisationName,
        message: formData.Message,
      },
    ]);

    const requestOptions = {
      method: "POST",
      headers: headers,
      body: body,
      redirect: "follow",
    };

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_ENDPOINT}/post_contactDetails`,
        requestOptions
      );
      const result = await response.text();
      console.log(result);

      if (response.ok) {
        setFormData({
          Name: "",
          OrganisationName: "",
          EmailID: "",
          PhoneNumber: "",
          Message: "",
        });
        setIsSubmitted(true);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } else {
        throw new Error("Server responded with an error: " + response.status);
      }
    } catch (error) {
      console.error("Failed to submit form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    validatePhoneNumber();
  }, [validatePhoneNumber]);

  let submitButtonColor = isSubmitting ? "#a2a2a2" : "#ffffff";

  return (
    <div className="visitUsContentContainer">
      {!isSubmitted ? (
        <div className="visitUsFormNGuidelines">
          <div className="visitUsContent">
            <div className="text">
              <h1 style={{ fontWeight: "bold", textTransform: "uppercase" }}>
                Ready To Plan A Group Visit?
              </h1>
              <p>
                Complete the form with necessary details, then submit. We’ll
                contact you to finalize registration. Institutions/organizations
                must confirm visit date and attendees two weeks prior via call
                or email. Once slots are confirmed, payment can be made via NEFT
                or UPI.
              </p>
            </div>
            <div className="form">
              <form onSubmit={handleSubmit}>
                <label>
                  Name *
                  <input
                    type="text"
                    name="Name"
                    placeholder="Enter your name"
                    value={formData.Name}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  Organisation Name *
                  <input
                    type="text"
                    name="OrganisationName"
                    placeholder="Enter Organisations name"
                    value={formData.OrganisationName}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  Email ID *
                  <input
                    type="email" // Changed to type="email" for proper validation
                    name="EmailID"
                    placeholder="Enter your Email ID"
                    value={formData.EmailID}
                    onChange={handleChange}
                    required
                  />
                </label>
                <label>
                  Phone Number *
                  <input
                    type="number" // Changed to type="tel" for proper validation
                    pattern="[0-9]{3}[0-9]{4}[0-9]{3}"
                    name="PhoneNumber"
                    placeholder="Enter your Phone number"
                    value={formData.PhoneNumber}
                    required
                    onChange={handleChange}
                  />
                </label>
                <label className="messageOrQuestion">
                  Your message or question
                  <textarea
                    name="Message"
                    placeholder="Type your question or message here"
                    rows="7"
                    value={formData.Message}
                    onChange={handleChange}
                  />
                </label>
              </form>
              <div className="submitForm">
                <span ref={warningRef}>* All fields are important</span>
                <div
                  className="submitButton"
                  onClick={() => {
                    if (validateForm && !isSubmitting) {
                      handleSubmit();
                    }
                  }}
                  style={{ color: submitButtonColor }}
                >
                  SUBMIT
                </div>
              </div>
            </div>
          </div>
          <div className="guidelines">
            <h1>GUIDELINES FOR SCHOOLS, COLLEGES AND CORPORATES</h1>
            <ul>
              {topThreeGuidelines.map((guideline, index) => (
                <li className="guideline" key={index}>
                  <p className="head">{guideline.heading}</p>
                  <p dangerouslySetInnerHTML={{
                    __html: guideline.content,
                  }}></p>
                </li>
              ))}
            </ul>
            <div className="seeMoreGuidelines">
              {/* <p>
                For any other group tours, such as family trips, summer camps,
                tuition centres, etc., please feel free to contact us at +91
                73385 80197 or marketing@paraminnovation.org.
              </p> */}
              <div className="seeMoreButton">
                <Link to={"/parsec/guidelines"}>SEE MORE</Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="formSubmitConfirmation">
          <div className="confirmationBox">
            <img className="confirmationIcon" src="/confirmation.svg" alt="" />
            <p style={{ textAlign: "left" }}>
              Thank you for reaching out to PARSEC. Our team shall reach out to
              you shortly.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
