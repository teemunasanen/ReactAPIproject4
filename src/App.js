// imports from react, react-bootstrap and material ui
// React was really annoying because I just didn't get it at this time
// better luck next time :)
import React, { useState, useEffect } from "react";
import "./App.css";

import Jumbotron from "react-bootstrap/Jumbotron";
import Toast from "react-bootstrap/Toast";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Form from "react-bootstrap/Form";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";

// project info toast
const Info = ({ children }) => {
  const [show, toggleShow] = useState(false); //toggle with show, start hidden

  return (
    //when hidden show button, onclick show toast --> close toast show button
    <>
      {!show && (
        <Button id="toastButton" onClick={() => toggleShow(true)}>
          Project Info
        </Button>
      )}
      <Toast show={show} onClose={() => toggleShow(false)}>
        <Toast.Header>
          <strong className="mr-auto">Project Info</strong>
        </Toast.Header>
        <Toast.Body>{children}</Toast.Body>
      </Toast>
    </>
  );
};

//Table (material UI) for courses
const ShowCourses = ({ courses }) => {
  return (
    <>
      {courses.length > 0 && (
        <div>
          <TableContainer>
            <Table aria-label="collapsible table">
              <TableHead>
                <TableRow>
                  <TableCell>Course ID</TableCell>
                  <TableCell>Course name</TableCell>
                  <TableCell>Credits</TableCell>
                  <TableCell>Grade</TableCell>
                  <TableCell>Info</TableCell>
                  <TableCell>Edit</TableCell>
                  <TableCell>Remove</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {courses.map((courses) => (
                  <TableRow key={courses._id}>
                    <TableCell>{courses._id}</TableCell>
                    <TableCell>{courses.name}</TableCell>
                    <TableCell>{courses.credits}</TableCell>
                    <TableCell>{courses.grade}</TableCell>
                    <TableCell>{courses.info}</TableCell>
                    <TableCell>
                      <IconButton aria-label="edit">
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      {" "}
                      <IconButton aria-label="delete">
                        <DeleteIcon color="secondary" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </>
  );
};
// the App...
const App = () => {
  const [courses, setCourses] = useState([]);
  // get courses effect
  useEffect(() => {
    getCourses();
  }, []);
//AJAX-call to API
  const getCourses = () => {
    fetch("https://restaapi3.herokuapp.com/getall")
      .then((courses) => {
        return courses.json();
      })
      .then((data) => {
        const items = data;
        setCourses(items);
        console.log(data);
      });
  };
//...Page...
  return (
    <>
      <Container className="p-3">
        <Jumbotron>
          <h1 className="header">React-front end for API</h1>
          <Info>
            <p>
              Created by Teemu Näsänen <br />
              <a href="https://www.laurea.fi/en/">
                Laurea University of Applied Sciences
              </a>
            </p>
            <p>
              Source code in
              <a href="https://github.com/teemunasanen?tab=repositories">
                {" "}
                Github
              </a>
            </p>
            <p>
              <a href="https://react-bootstrap.github.io/">React Bootstrap</a>{" "}
              and <a href="https://material-ui.com/">Matrial UI</a> for Design
            </p>
            <p></p>
          </Info>
        </Jumbotron>
        <Tabs defaultActiveKey="courseTab" id="tabs">
          <Tab eventKey="courseTab" onClick={getCourses} title="Courses">
            <Container>
              <ShowCourses courses={courses} />
            </Container>
          </Tab>
          <Tab eventKey="courseById" title="Course by Id">
            <Form>
              <Form.Group controlId="formBasicByID">
                <Form.Label>Course Id</Form.Label>
                <Form.Control type="text" placeholder="Enter course Id" />
              </Form.Group>
              <Button variant="primary" type="button">
                Submit
              </Button>
            </Form>
          </Tab>
          <Tab eventKey="addCourse" title="Add course">
            <Form>
              <Form.Group controlId="formBasicName">
                <Form.Label>Course Name</Form.Label>
                <Form.Control type="text" placeholder="Enter course name" />
              </Form.Group>
              <Form.Group controlId="formBasicCredits">
                <Form.Label>Credits</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Credit points given..."
                />
              </Form.Group>
              <Form.Group controlId="formBasicGrade">
                <Form.Label>Grade</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Grade given... number or text"
                />
              </Form.Group>
              <Form.Group controlId="formBasicInfo">
                <Form.Label>Course Info</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Course information"
                />
              </Form.Group>
              <Button variant="primary" type="button">
                Submit
              </Button>
            </Form>
          </Tab>
        </Tabs>
      </Container>
    </>
  );
};
//export App
export default App;
