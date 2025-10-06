import Link from "next/link";
import {
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
} from "react-bootstrap";

type Course = {
  img: string;
  title: string;
  desc: string;
};

const courses: Course[] = [
  { img: "/images/reactjs.jpg", title: "CS1234 React JS", desc: "Full Stack software developer" },
  { img: "/images/ood.jpg",     title: "CS3500 Object-Oriented Design", desc: "Design principles and patterns" },
  { img: "/images/algo.jpg",    title: "CS3000 Algorithms and Data",    desc: "Asymptotics, graphs, greedy & DP" },
  { img: "/images/systems.jpg", title: "CS3650 Computer Systems",        desc: "Memory, concurrency, and OS" },
  { img: "/images/ai.jpg",      title: "CS4100 Artificial Intelligence", desc: "Search, planning, agents" },
  { img: "/images/nlp.jpg",     title: "CS4120 Natural Language Processing", desc: "Text, transformers, and tasks" },
  { img: "/images/toc.jpg",     title: "CS3800 Theory of Computation",   desc: "Automata, decidability, complexity" },
  { img: "/images/cy.jpg",      title: "CY2550 Foundations of Cybersecurity", desc: "Threats, crypto, protocols" },
];

export default function Dashboard() {
  const linkTarget = "/Courses/1234/Home";

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title" className="mb-1">Dashboard</h1>
      <hr className="my-2" />
      <h2 id="wd-dashboard-published" className="fs-4 text-muted">
        Published Courses ({courses.length})
      </h2>
      <hr className="my-3" />

      <div id="wd-dashboard-courses">
        <Row xs={1} md={4} className="g-0 wd-courses-row">
          {courses.map((c, i) => (
            <Col key={i} className="wd-dashboard-course" style={{ width: 260 }}>
              <Card className="shadow-sm h-100">
                <Link
                  href={linkTarget}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <CardImg variant="top" src={c.img} width="100%" height={160} />
                  <CardBody>
                    <CardTitle className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {c.title}
                    </CardTitle>
                    <CardText
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {c.desc}
                    </CardText>
                    <Button variant="primary">Go</Button>
                  </CardBody>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}

