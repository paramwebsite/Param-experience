import React, { useEffect, useState } from 'react';
import "./DialogBox.css"; // Create a CSS file for styling
import { forwardRef } from 'react';

const DialogBox = forwardRef((prop, ref) => {
  const [showDialog, setShowDialog] = useState(true);

  useEffect(() => {
    if (showDialog) {
      // Set a timeout to hide the dialog after 2 seconds
      const timer = setTimeout(() => {
        setShowDialog(false);
      }, 8000);

      // Clean up the timer when the component unmounts or showDialog becomes false
      return () => clearTimeout(timer);
    }
  }, [showDialog]);

  return (
    <div className={`dialog-container ${showDialog ? 'show' : 'hide'}`}>
      <div className="dialog-content"><p>{prop.value}</p></div>
      <div class="loader"></div>
    </div>
  );
});

export default DialogBox;
