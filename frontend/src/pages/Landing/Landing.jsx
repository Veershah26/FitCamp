import React from "react";
import NavBar from "../../components/NavBar/NavBar";

export default function Landing(props) {
  return (
    <div style={{ height: "100vh" }}>
      <NavBar />
      <div style={{ width: "600px", margin: "auto" }}>
        <h1
          className="emboss"
          style={{
            textAlign: "center",
            fontSize: "100px",
            marginBottom: "0",
            paddingBottom: "0",
          }}
        >
          FitCamp
        </h1>
        <p
          style={{
            width: "100%",
            textAlign: "justify",
            fontSize: "20px",
            color: "#b2b6b9",
          }}
        >
          Fit Camp is your one stop solution for all your fitness needs, from
          body fat percentage monitoring to exercise regimes, nutrition and
          music!
        </p>
      </div>
    </div>
  );
}
