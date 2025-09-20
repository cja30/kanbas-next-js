import Link from "next/link";
import Image from "next/image";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses (8)</h2>
      <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/reactjs.jpg" width={250} height={150} alt="React JS course thumbnail" />
            <div>
              <h5>CS1234 React JS</h5>
              <p className="wd-dashboard-course-title">Full Stack software developer</p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/Courses/3500" className="wd-dashboard-course-link">
            <Image src="/images/ood.jpg" width={250} height={150} alt="Object-Oriented Design course thumbnail" />
            <div>
              <h5>CS3500 Object-Oriented Design</h5>
              <p className="wd-dashboard-course-title"></p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/Courses/3000" className="wd-dashboard-course-link">
            <Image src="/images/algo.jpg" width={250} height={150} alt="Algorithms and Data course thumbnail" />
            <div>
              <h5>CS3000 Algorithms and Data</h5>
              <p className="wd-dashboard-course-title"></p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/Courses/3650" className="wd-dashboard-course-link">
            <Image src="/images/systems.jpg" width={250} height={160} alt="Computer Systems course thumbnail" />
            <div>
              <h5>CS3650 Computer Systems</h5>
              <p className="wd-dashboard-course-title"></p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/Courses/4100" className="wd-dashboard-course-link">
            <Image src="/images/ai.jpg" width={250} height={160} alt="Artificial Intelligence course thumbnail" />
            <div>
              <h5>CS4100 Artificial Intelligence</h5>
              <p className="wd-dashboard-course-title"></p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/Courses/4120" className="wd-dashboard-course-link">
            <Image src="/images/nlp.jpg" width={250} height={160} alt="Natural Language Processing course thumbnail" />
            <div>
              <h5>CS4120 Natural Language Processing</h5>
              <p className="wd-dashboard-course-title"></p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/Courses/3800" className="wd-dashboard-course-link">
            <Image src="/images/toc.jpg" width={250} height={160} alt="Theory of Computation course thumbnail" />
            <div>
              <h5>CS3800 Theory of Computation</h5>
            <p className="wd-dashboard-course-title"></p>
              <button>Go</button>
            </div>
          </Link>
        </div>

        <div className="wd-dashboard-course">
          <Link href="/Courses/2550" className="wd-dashboard-course-link">
            <Image src="/images/cy.jpg" width={250} height={160} alt="Foundations of Cybersecurity course thumbnail" />
            <div>
              <h5>CY2550 Foundations of Cybersecurity</h5>
              <p className="wd-dashboard-course-title"></p>
              <button>Go</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
