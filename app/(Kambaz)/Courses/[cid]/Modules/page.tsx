export default function Modules() {
  return (
    <div>
      {/* Implement Collapse All button, View Progress button, etc. */}
      <div id="wd-modules-controls">
        <button id="wd-collapse-all">Collapse All</button>
        <button id="wd-view-progress">View Progress</button>
        <select id="wd-publish-all" defaultValue="publish">
          <option value="publish">Publish All</option>
          <option value="publish-all">Unpublish All</option>
        </select>
        <button id="wd-add-module">+ Module</button>
      </div>

      <hr />

       <ul>
        <li>
          <b>Week 1, Lecture 1 - Course Introduction, Syllabus, Agenda</b>
          <ul>
            <li><b>LEARNING OBJECTIVES</b>
              <ul>
                <li>Introduction to the course</li>
                <li>Learn what is Web Development</li>
              </ul>
            </li>
            <li><b>READING</b>
              <ul>
                <li>Full Stack Developer - Chapter 1 - Introduction</li>
                <li>Full Stack Developer - Chapter 2 - Creating User Interfaces</li>
              </ul>
            </li>
            <li><b>SLIDES</b>
              <ul>
                <li>Introduction to Web Development</li>
                <li>Creating an HTTP server with Node.js</li>
                <li>Creating a React Application</li>
              </ul>
            </li>
          </ul>
        </li>

        <li style={{ marginTop: 12 }}>
          <b>Week 1, Lecture 2 - Formatting User Interfaces with HTML</b>
          <ul>
            <li><b>LEARNING OBJECTIVES</b>
              <ul>
                <li>Learn how to create user interfaces with HTML</li>
                <li>Deploy the assignment to Netlify</li>
              </ul>
            </li>
            <li><b>SLIDES</b>
              <ul>
                <li>Introduction to HTML and the DOM</li>
                <li>Formatting Web content with Headings and Paragraphs</li>
                <li>Formatting content with Lists and Tables</li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
);}
