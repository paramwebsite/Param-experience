import React, { forwardRef } from "react";

const ScienceField = forwardRef((props, ref) => {
  const { id } = props; 
  const basePath = `https://digitalassestbucket.s3.amazonaws.com/Fields+of+Science`;

  // Generate paths dynamically
  const paths = {
    background: `${basePath}/Background/Bg${id}.svg`,
    image: `${basePath}/Image/Img${id}.svg`,
    title: `${basePath}/Group/Group ${id}.svg`,
    text: `${basePath}/Text/Txt${id}.svg`,
    number: `${basePath}/Number/Num${id}.svg`,
  };

  return (
    // Attach the forwarded ref to a DOM element
    <div className="science-field" id={`field-${id}`} ref={ref}>
      <div
        className="background"
        style={{ backgroundImage: `url('${paths.background}')` }}
      >
        <div className="content">
          <div
            className="field-image"
            style={{ backgroundImage: `url('${paths.image}')` }}
          />
          <div
            className="field-title"
            style={{ backgroundImage: `url('${paths.title}')` }}
          />
          <div
            className="field-text"
            style={{ backgroundImage: `url('${paths.text}')` }}
          />
          <div
            className="field-number"
            style={{ backgroundImage: `url('${paths.number}')` }}
          />
        </div>
      </div>
    </div>
  );
});

export default ScienceField;
