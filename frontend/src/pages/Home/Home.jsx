import React, { useEffect, useRef, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import { Pie } from "react-chartjs-2";
import server from "../../utils/server";
import "./Home.css";

const options = [
  "Lose weight",
  "Gain weight",
  "Gain muscle mass",
  "Increase body fat percentage",
];

export default function Home(props) {
  const [dropDownOption, setDropDownOption] = useState(0);
  const [bodyFatPercentage, setBodyFatPercentage] = useState(null);
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileinp = useRef();

  const handleFileChange = async (e) => {
    //Do api call
    //Get body fat percentage and exercise routine
    console.log(e.target.files[0]);
    const { bodyFatPercentage: BFP, exercises: ex } = await server.analyseImage(
      props.user.uid,
      e.target.files[0],
      options[dropDownOption]
    );
    setBodyFatPercentage(BFP);
    setExercises(ex);
    setLoading(false);
  };

  return (
    <div>
      <NavBar />
      {!loading && !Boolean(bodyFatPercentage) ? (
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "row",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          <div>
            <h1>What is the goal you want to achieve?</h1>
            {options.map((option, i) => {
              return (
                <label class="radio" onClick={() => setDropDownOption(i)}>
                  <span class="sr-only">Checkbox</span>
                  <input
                    type="radio"
                    class="radio__input"
                    name="example"
                    checked={i == dropDownOption}
                  />
                  <span class="radio__checkmark"></span>
                  <span>{option}</span>
                </label>
              );
            })}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <button className="button button--primary">Take an image</button>
            <br />
            <button
              className="button button--primary"
              onClick={(e) => fileinp.current.click()}
            >
              Upload an image
            </button>
            <input
              ref={fileinp}
              type="file"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </div>
        </div>
      ) : Boolean(bodyFatPercentage) ? (
        <div style={{ display: "flex", width: "100vw" }}>
          <div>
            <h1 style={{ textAlign: "center", width: "50vw" }}>
              Body Fat Percentage
            </h1>
            <Pie
              data={{
                labels: ["Body Fat Percentage"],
                datasets: [
                  {
                    label: "Body Fat Percentage",
                    data: [bodyFatPercentage, 100 - bodyFatPercentage],
                    backgroundColor: [
                      "rgba(255, 99, 132, 0.2)",
                      "rgba(54, 162, 235, 0.2)",
                    ],
                  },
                ],
              }}
            />
          </div>
          <div>
            <h1 style={{ marginBottom: "0", paddingBottom: "0" }}>
              Recommended Exercises for you to achieve your goal!
            </h1>
            {exercises.map((exercise, index) => (
              <>
                <h3>
                  {index + 1}. {exercise.exercise_name}
                </h3>
                <h5 style={{ margin: "0", padding: "0" }}>Preparation</h5>
                <p style={{ margin: "0", padding: "0" }}>
                  {exercise.preparation}
                </p>
                <h5 style={{ margin: "0", padding: "0" }}>Execution</h5>
                <p style={{ margin: "0", padding: "0" }}>
                  {exercise.execution}
                </p>
              </>
            ))}
          </div>
        </div>
      ) : (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
        >
          "Analysing..."
        </div>
      )}
    </div>
  );
}
