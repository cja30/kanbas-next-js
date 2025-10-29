"use client";

import Link from "next/link";

export default function Lab1() {
  return (
    <div id="wd-lab1">
      <h2>Lab 1</h2>

      <section id="wd-lab1-landing" style={{ marginBottom: 16 }}>
        <p>
          <b>Name:</b> Charlotte Anderson<br />
          <b>Section:</b> SEC 01
        </p>

        <h4>Lab Assignments</h4>
        <ul>
          <li>
            <Link href="/Labs/Lab1" id="wd-lab1-link">Lab 1</Link>
          </li>
          <li>
            <Link href="/Labs/Lab2" id="wd-lab2-link">Lab 2</Link>
          </li>
          <li>
            <Link href="/Labs/Lab3" id="wd-lab3-link">Lab 3</Link>
          </li>
        </ul>

        <h4>Kambaz Application</h4>
        <p>
          <a
            href="https://kanbas-next-jsa2.vercel.app/Account/Signin"
            id="wd-kambaz-link"
            target="_blank"
            rel="noreferrer"
          >
            Open the deployed Kambaz application
          </a>
        </p>

        <h4>Source Code</h4>
        <p>
          <a
            href="https://github.com/cja30/kanbas-next-js"
            id="wd-github"
            target="_blank"
            rel="noreferrer"
          >
            GitHub repository (wd-github)
          </a>
        </p>
      </section>

      <h3>HTML Examples</h3>

      {/* Exercise 1.3.1 Heading Tags */}
      <div id="wd-h-tag">
        <h4>Heading Tags</h4>
        Text documents are often broken up into several sections and subsections.
        Each section is usually prefaced with a short title or heading that
        attempts to summarize the topic of the section it precedes...
      </div>

      {/* Exercise 1.3.2 Paragraph Tag */}
      <div id="wd-p-tag">
        <h4>Paragraph Tag</h4>
        <p id="wd-p-1">
          This is a paragraph. We often separate a long set of sentences with
          vertical spaces to make the text easier to read...
        </p>
        <p id="wd-p-2">
          This is the first paragraph. The paragraph tag is used to format
          vertical gaps between long pieces of text like this one.
        </p>
        <p id="wd-p-3">
          This is the second paragraph. Even though there is a deliberate white
          gap between the paragraph above and this paragraph, by default browsers
          render them as one contiguous piece of text.
        </p>
        <p id="wd-p-4">
          This is the third paragraph. Wrap each paragraph with the paragraph tag
          to tell browsers to render the gaps.
        </p>
      </div>

      {/* Exercise 1.3.3 Ordered Lists */}
      <div id="wd-lists">
        <h4>List Tags</h4>
        <h5>Ordered List Tag</h5>
        How to make pancakes:
        <ol id="wd-pancakes">
          <li>Mix dry ingredients.</li>
          <li>Add wet ingredients.</li>
          <li>Stir to combine.</li>
          <li>Heat a skillet or griddle.</li>
          <li>Pour batter onto the skillet.</li>
          <li>Cook until bubbly on top.</li>
          <li>Flip and cook the other side.</li>
          <li>Serve and enjoy!</li>
        </ol>

        My favorite recipe:
        <ol id="wd-your-favorite-recipe">
          <li>Boil pasta until al dente.</li>
          <li>Prepare tomato sauce with garlic and basil.</li>
          <li>Combine pasta and sauce, then serve with parmesan.</li>
        </ol>

        {/* Exercise 1.3.4 Unordered Lists */}
        <h5>Unordered List Tag</h5>
        My favorite books (in no particular order)
        <ul id="wd-my-books">
          <li>Dune</li>
          <li>Lord of the Rings</li>
          <li>Ender&#39;s Game</li>
          <li>Red Mars</li>
          <li>The Forever War</li>
        </ul>

        Your favorite books (in no particular order)
        <ul id="wd-your-books">
          <li>Pride and Prejudice</li>
          <li>To Kill a Mockingbird</li>
          <li>The Great Gatsby</li>
        </ul>
      </div>

      {/* Exercise 1.3.5 Table Tag */}
      <div id="wd-tables">
        <h4>Table Tag</h4>
        <table border={1} width="100%">
          <thead>
            <tr>
              <th>Quiz</th>
              <th>Topic</th>
              <th>Date</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>Q1</td><td>HTML</td><td>2/3/21</td><td>85</td></tr>
            <tr><td>Q2</td><td>CSS</td><td>2/10/21</td><td>90</td></tr>
            <tr><td>Q3</td><td>JavaScript</td><td>2/17/21</td><td>95</td></tr>
            <tr><td>Q4</td><td>React</td><td>2/24/21</td><td>88</td></tr>
          </tbody>
          <tfoot>
            <tr><td colSpan={3}>Average</td><td>90</td></tr>
          </tfoot>
        </table>
      </div>

      {/* Exercise 1.3.6 Image Tag */}
      <div id="wd-images">
        <h4>Image Tag</h4>
        Loading an image from the internet: <br />
        <img
          id="wd-starship"
          width="400px"
          src="https://www.staradvertiser.com/wp-content/uploads/2021/08/web1_Starship-gap2.jpg"
          alt="Starship rocket"
        />
        <br />
        Loading a local image: <br />
        <img
          id="wd-teslabot"
          src="/images/teslabot.jpg"
          width="400px"
          alt="Teslabot concept"
        />
      </div>

      {/* Exercise 1.3.7 Forms */}
      <div id="wd-forms">
        <h4>Form Elements</h4>
        <form id="wd-text-fields">
          <h5>Text Fields</h5>
          <label htmlFor="wd-text-fields-username">Username:</label>
          <input placeholder="jdoe" id="wd-text-fields-username" /> <br />
          {/* ... (rest of your form code unchanged) ... */}

          <h4>Anchor tag</h4>
          Please{" "}
          <a href="https://www.lipsum.com" id="wd-lipsum">
            click here
          </a>{" "}
          to get dummy text<br />
          Check out my code on GitHub.{" "}
          <a href="https://github.com/cja30/kanbas-next-js" id="wd-github-2">
            Click here.
          </a>
        </form>
      </div>
    </div>
  );
}
