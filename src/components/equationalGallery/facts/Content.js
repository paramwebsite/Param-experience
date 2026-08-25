import React, { forwardRef } from "react";

const Content = forwardRef(
  (
    {
      additionalClass,
      image,
      caption,
      headClass,
      heading,
      formula,
      subheading,
      content1,
      content2,
    },
    ref
  ) => {
    return (
      <>
        <div className="facts" id={additionalClass}>
          <div className="headContainer">
            <div className="content">
              <div className="contents">
                <div className="heading">
                  <h1 className={headClass}>{heading}</h1>
                </div>
                <div className="content1Container">
                  <div
                    className="content1"
                    dangerouslySetInnerHTML={{ __html: content1 }}
                  ></div>
                  <div className="formula">
                    <img
                      className="formulaExp"
                      src={formula}
                      alt={heading}
                      style={{ width: "auto", height: "auto" }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="inventorData">
              <div className="imageContainer">
                <img
                  className="image"
                  src={image}
                  alt={caption}
                  style={{ width: "22.4vw", height: "22.4vw" }}
                />
              </div>
            </div>
          </div>
          <div className="division">
            <hr className="hr1" />
            <hr className="hr2" />
          </div>
          <div className="subheadContainer">
            <div className="content">
              <div className="subheading">
                <h1>{subheading}</h1>
              </div>
              <div
                className="content2"
                dangerouslySetInnerHTML={{ __html: content2 }}
              ></div>
            </div>
            <div className="caption">
              <h3>{caption}</h3>
            </div>
          </div>
        </div>
      </>
    );
  }
);

export default Content;
