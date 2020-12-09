import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMusic } from "@fortawesome/free-solid-svg-icons";

export const Nav = ({ libraryStatus, setLibraryStatus }) => {
  const toggleLibraryHandler = () => {
    setLibraryStatus(!libraryStatus);
  };

  return (
    <nav>
      <h1>Waves</h1>
      <div className="logo_wrapper">
        <FontAwesomeIcon icon={faMusic} className="logo" />
      </div>
      <button onClick={toggleLibraryHandler}>
        Library
        <FontAwesomeIcon icon={faMusic} />
      </button>
    </nav>
  );
};
