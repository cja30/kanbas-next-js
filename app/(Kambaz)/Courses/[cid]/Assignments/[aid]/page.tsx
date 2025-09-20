export default function AssignmentEditor({
  params,
}: {
  params: { cid: string; aid: string };
}) {
  const { cid, aid } = params;

  return (
    <div id="wd-assignments-editor">
      <h2>Course {cid}</h2>
      <h3>Assignment Editor</h3>

      <label htmlFor="wd-name">Assignment Name</label>
      <br />
      <input id="wd-name" defaultValue="A1 - ENV + HTML" />
      <br />
      <br />

      <textarea id="wd-description" rows={8} cols={60} defaultValue={``} />
      <br />

      <table>
        <tbody>
          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-points">Points</label>
            </td>
            <td>
              <input id="wd-points" defaultValue={100} />
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-group">Assignment Group</label>
            </td>
            <td>
              <select id="wd-group" defaultValue="ASSIGNMENTS">
                <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                <option value="QUIZZES">QUIZZES</option>
                <option value="EXAMS">EXAMS</option>
                <option value="PROJECT">PROJECT</option>
              </select>
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-display-grade-as">Display Grade as</label>
            </td>
            <td>
              <select id="wd-display-grade-as" defaultValue="PERCENTAGE">
                <option value="PERCENTAGE">Percentage</option>
                <option value="POINTS">Points</option>
                <option value="LETTER">Letter Grade</option>
                <option value="COMPLETE">Complete/Incomplete</option>
              </select>
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-submission-type">Submission Type</label>
            </td>
            <td>
              <select id="wd-submission-type" defaultValue="ONLINE">
                <option value="ONLINE">Online</option>
                <option value="ON_PAPER">On Paper</option>
                <option value="NONE">No Submission</option>
              </select>

              <div style={{ marginTop: 8 }}>
                <b>Online Entry Options</b>
                <div>
                  <input id="wd-text-entry" type="checkbox" />{" "}
                  <label htmlFor="wd-text-entry">Text Entry</label>
                </div>
                <div>
                  <input id="wd-website-url" type="checkbox" />{" "}
                  <label htmlFor="wd-website-url">Website URL</label>
                </div>
                <div>
                  <input id="wd-media-recordings" type="checkbox" />{" "}
                  <label htmlFor="wd-media-recordings">Media Recordings</label>
                </div>
                <div>
                  <input id="wd-student-annotation" type="checkbox" />{" "}
                  <label htmlFor="wd-student-annotation">Student Annotation</label>
                </div>
                <div>
                  <input id="wd-file-upload" type="checkbox" />{" "}
                  <label htmlFor="wd-file-upload">File Uploads</label>
                </div>
              </div>
            </td>
          </tr>

          <tr>
            <td align="right" valign="top">
              <label htmlFor="wd-assign-to">Assign</label>
            </td>
            <td>
              <input id="wd-assign-to" defaultValue="Everyone" />
            </td>
          </tr>

          <tr>
            <td align="right">
              <label htmlFor="wd-due-date">Due</label>
            </td>
            <td>
              <input id="wd-due-date" type="date" defaultValue="2024-05-13" />
            </td>
          </tr>

          <tr>
            <td align="right">
              <label htmlFor="wd-available-from">Available from</label>
            </td>
            <td>
              <input
                id="wd-available-from"
                type="date"
                defaultValue="2024-05-06"
              />{" "}
              <label htmlFor="wd-available-until" style={{ marginLeft: 12 }}>
                Until
              </label>{" "}
              <input
                id="wd-available-until"
                type="date"
                defaultValue="2024-05-20"
              />
            </td>
          </tr>
        </tbody>
      </table>

      <div style={{ marginTop: 12 }}>
        <button>Cancel</button> <button>Save</button>
      </div>
    </div>
  );
}
