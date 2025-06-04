import React from "react";
import BarChart from "../components/BarChart";
import PiChart from "../components/PiChart";
import { Col, Row } from "react-bootstrap";

function DashBoardPage() {
  const genderChartData = {
    labels: ["Men", "Women", "Others"],
    datasets: [
      {
        data: [19512, 10452, 801],
        backgroundColor: ["#23b26d", "#f5c443", "#7a6ff0"], // green, yellow, blue
        hoverBackgroundColor: ["#1a8a54", "#d4a537", "#5c53c6"],
      },
    ],
  };

  const labels = ["Cat 01", "Cat 02", "Cat 03"];
  const data = {
    labels: labels,
    datasets: [
      {
        axis: "y",
        label: "Registration Category",
        data: [19512, 10452, 681],
        fill: false,
        backgroundColor: ["rgb(0, 132, 22)", "rgb(0, 146, 131)", "rgb(0, 255, 213)"],
        borderColor: ["rgb(0, 132, 22)", "rgb(0, 145, 131)", "rgb(0, 255, 229)"],
        borderWidth: 1,
        borderRadius: 5,
        borderSkipped: false,
      },
    ],
  };

  return (
    <div className="custom-border p-4 my-5 bg-danger-subtle " >
      <Row className="g-4 justify-content-center align-content-center">
        <Col xs={12} md={8} lg={4} className="d-flex justify-content-center">
          <div className="custom-border p-3 w-100" >
            <PiChart chartData={genderChartData} />
          </div>
        </Col>
        <Col xs={12} md={12} lg={8} className="d-flex justify-content-center">
          <div className="custom-border p-3 w-100" >
            <BarChart data={data} />
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default DashBoardPage;
