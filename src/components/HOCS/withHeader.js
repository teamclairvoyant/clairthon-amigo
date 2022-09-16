import React from "react";
import Header from "../HOCS/Header";
import Footer from '../HOCS/Footer'
/**
 * HOC for wrapping a component with the header
 */
function withHeader(WrappedComponent) {
  const onLogout = () => {
  };

  function withHeaderHOC() {
    return (
      <>
        <Header onLogout={onLogout} />
        <WrappedComponent />
        <Footer/>
      </>
    );
  }

  withHeaderHOC.displayName = "withHeaderHOC";
  return withHeaderHOC;
}

export default withHeader;
