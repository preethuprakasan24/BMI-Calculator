import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVenus, faMars } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

function App() {
  const initialState = {
    gender: "",
    height: 100,
    weight: 50,
    age: 25,
  }
  const [value, setValue] = useState(initialState);
  const [result, setResult] = useState(0);
  const [bmiCategory, setBmiCategory] = useState("");
  const [tips, setTips] = useState("");
  const [image, setImage] = useState("");

  const bmiColors = {
    "Underweight": "#5dc5f0", 
    "Normal weight": "#5cb85c", 
    "Overweight": "#f0ad4e", 
    "Obesity": "#d9534f" 
  };

  const incrementWeight = () => {
    setValue({ ...value, weight: value.weight + 1 });
  };
  const decrementWeight = () => {
    setValue({ ...value, weight: value.weight - 1 });
  };
  const incrementAge = () => {
    setValue({ ...value, age: value.age + 1 });
  };
  const decrementAge = () => {
    setValue({ ...value, age: value.age - 1 });
  };
  const handleGenderClick = (gender) => {
    setValue({ ...value, gender });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const heightInMeter = value.height / 100;
    if (
      value.gender === "" ||
      value.height === "" ||
      value.weight === "" ||
      value.age === ""
    ) {
      alert("please provide all required details");
    } else {
      const bmi = Math.floor(value.weight / (heightInMeter * heightInMeter));
      setResult(bmi);
      determineBMICategory(bmi);
    }
  };
  const determineBMICategory = (bmi) => {
    let category = "";
    let tips = "";
    let imagePath = "";
    
    if (bmi < 18.5) {
      category = "Underweight";
      tips =
        "Eat more frequently. Choose nutrient-rich foods. Drink smoothies and shakes. Add calories.";
      imagePath = "/underweight.gif";
      
    } else if (bmi >= 18.5 && bmi < 24.9) {
      category = "Normal weight";
      tips =
        "Maintain a balanced diet. Continue regular physical activity. Monitor your weight regularly.";
      imagePath = "/normalweight.gif";
    } else if (bmi >= 25 && bmi < 29.9) {
      category = "Overweight";
      tips =
        "Exercise regularly. Eat a balanced diet. Avoid sugary drinks and snacks. Monitor your weight.";
      imagePath = "/overweight.gif";
    } else {
      category = "Obesity";
      tips =
        "Consult with a healthcare provider. Follow a structured weight loss plan. Increase physical activity. Avoid high-calorie foods.";
      imagePath = "/Obesity.gif";
    }
    setBmiCategory(category);
    setTips(tips);
    setImage(imagePath);
  };

  const handleReset = () => {
    setValue(initialState);
    setResult(0);
    setBmiCategory("");
    setTips("");
    setImage("");
  };

  console.log(value);
  console.log(result);
  return (
    <>
      <div
        className="row main d-flex justify-content-center align-items-center"
        style={{ width: "100%", height: "100vh" }}
      >
        <div className="col-md-1"></div>
        <div className="col-md-5 left-section rounded shadow">
          <div className="row ">
            <h3 className="text-center text-light pt-4 pb-3">
              How fit are you?
            </h3>
            <div className="d-flex justify-content-center align-items-center">
              <div
                className="border rounded-circle  shadow-container"
                style={{
                  width: "170px",
                  height: "170px",
                  position: "relative",
                }}
              >
                <div
                  className="shadow-container  rounded-circle innerCircle d-flex justify-content-center align-items-center "
                  style={{
                    width: "130px",
                    height: "130px",
                    backgroundColor: bmiColors[bmiCategory] || "#12f7ff",
                    
                  }}
                >
                  <h2 className="text-center">{result}</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8">
              {result > 0 && (
                <div className="categoryGif d-flex justify-content-center align-items-center mt-4">
                  <img src={image} alt="" width={"100px"} height={"100px"} />
                </div>
              )}
              {/* <div className="categoryGif d-flex justify-content-center align-items-center mt-4 ">
                <img src={image} alt="" width={"100px"} height={"100px"} />
              </div> */}
              <h5 className="text-center my-4 text-light">{bmiCategory}</h5>
              <div className="tip">
                <p className="text-center text-light mb-4">{tips}</p>
              </div>
            </div>
            <div className="col-md-2"></div>
          </div>

          <img src="./bmi.jpg" alt="" width={"100%"} height={"50px"} />
        </div>
        <div className="col-md-1"></div>
        <div className="col-md-4 rightSection shadow rounded d-flex justify-content-center align-items-center flex-column pb-4">
          <h3 className=" text-center pt-4 text-light">Calculate your BMI</h3>

          <div className="container  mt-3 ">
            <div className="row ">
              <div className="col-md-2"></div>
              <div className="col-md-8 height-container d-flex justify-content-center align-items-center ">
                <div className="col-md-4 me-4">
                  <button
                    style={{ width: "110px", padding: "10px" }}
                    className={`btn text-light rounded  me-2 shadow-container ${
                      value.gender === "male" ? "btn-info" : "text-light"
                    }`}
                    onClick={(e) => handleGenderClick("male")}
                    data-gender="male"
                  >
                    <FontAwesomeIcon
                      icon={faMars}
                      className="fa-sm pe-2 "
                      beat
                      style={{ color: "white" }}
                    />
                    Male
                  </button>
                </div>
                <div className="col-md-4 ">
                  <button
                    style={{ width: "110px", padding: "10px" }}
                    className={`btn text-light shadow-container rounded ms-2 ${
                      value.gender === "female" ? "btn-info" : "text-light"
                    }`}
                    onClick={(e) => handleGenderClick("female")}
                  >
                    <FontAwesomeIcon
                      icon={faVenus}
                      className="fa-sm pe-2"
                      beat
                      style={{ color: "white" }}
                    />
                    Female
                  </button>
                </div>
              </div>
              <div className="col-md-2"></div>
            </div>
          </div>

          <div className="container  mt-3 px-5">
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-md-2"></div>
              <div className="col-md-8 shadow-container rounded  height-container ">
                <p className="text-center text-light ">Height</p>
                <h3 className="text-center text-light">
                  {value.height}
                  <span>cm</span>
                </h3>
                <div className="d-flex justify-content-center mb-1 ">
                  <input
                    type="range"
                    min={0}
                    max={1000}
                    step={1}
                    style={{ width: "250px" }}
                    onChange={(e) =>
                      setValue({ ...value, height: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="col-md-2"></div>
            </div>
          </div>

          <div className="container mt-3 px-5">
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-md-2"></div>
              <div className="col-md-8  height-container d-flex justify-content-between align-items-center">
                <div
                  className=" shadow-container rounded px-2 py-1"
                  style={{ width: "120px", padding: "10px" }}
                >
                  <p className="text-center text-light">Weight (Kg)</p>
                  <h4 className="text-center text-light">
                    <b>{value.weight}</b>
                  </h4>
                  <div className="d-flex justify-content-center align-items-center pb-2">
                    <button
                      className="btn rounded-circle me-3"
                      style={{
                        height: "35px",
                        width: "35px",
                        backgroundColor: "white",
                        color: "black",
                      }}
                      onClick={incrementWeight}
                    >
                      <b>+</b>
                    </button>
                    <button
                      className="btn rounded-circle text-center"
                      style={{
                        height: "35px",
                        width: "35px",
                        backgroundColor: "white",
                        color: "black",
                      }}
                      onClick={decrementWeight}
                    >
                      <b>-</b>
                    </button>
                  </div>
                </div>

                <div
                  className="shadow-container rounded px-2 py-1"
                  style={{ width: "120px", padding: "10px" }}
                >
                  <p className="text-center text-light">Age (Year)</p>
                  <h4 className="text-center text-light">
                    <b>{value.age}</b>
                  </h4>
                  <div className="d-flex justify-content-center align-items-center pb-2">
                    <button
                      className="btn rounded-circle me-3 d-flex justify-content-center align-items-center"
                      style={{
                        height: "35px",
                        width: "35px",
                        backgroundColor: "white",
                        color: "black",
                      }}
                      onClick={incrementAge}
                    >
                      <b>+</b>
                    </button>
                    <button
                      className="btn  rounded-circle text-center"
                      style={{
                        height: "35px",
                        width: "35px",
                        backgroundColor: "white",
                        color: "black",
                      }}
                      onClick={decrementAge}
                    >
                      <b>-</b>
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-2"></div>
            </div>
          </div>

          <div className="container mt-3 px-5">
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-md-2"></div>
              <div className="col-md-8 height-container d-flex justify-content-between align-items-center">
                <div className=" rounded px-1 ">
                  <button
                    className="btn shadow-container text-light"
                    style={{ width: "120px", padding: "10px" }}
                    onClick={handleSubmit}
                  >
                    Calculate
                  </button>
                </div>

                <div className=" rounded px-2 py-1">
                  <button
                    className="btn shadow-container text-light"
                    style={{ width: "120px", padding: "10px" }}
                    onClick={handleReset}
                  >
                    Reset
                  </button>
                </div>
              </div>
              <div className="col-md-2"></div>
            </div>
          </div>
        </div>
        <div className="col-md-1"></div>
      </div>
    </>
  );
}

export default App;
