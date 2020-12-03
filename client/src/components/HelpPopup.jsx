import React from 'react';
import '../styles/HelpPopup.css';

const HelpPopup = ({ shouldShowHelpPopup, setShouldShowHelpPopup }) => {
  return shouldShowHelpPopup ? (
    <div className="popup">
      <p>Click and drag to add walls</p>
      <p>Hold w to add weights</p>
      <button
        className="exitButton"
        onClick={() => setShouldShowHelpPopup(false)}
      >
        {String.fromCharCode(10005)}
      </button>
    </div>
  ) : (
    <button
      className="helpButton"
      onClick={() => setShouldShowHelpPopup(true)}
    >
      {String.fromCharCode(0x003f)}
    </button>
  );
};

export default HelpPopup;
