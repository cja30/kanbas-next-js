import { ReactNode } from "react";
import CourseNavigation from "./Navigation";

type CoursesLayoutInput = {
  children: ReactNode;
  params: { cid: string };
};

export default function CoursesLayout(input: unknown) {
  const { children, params } = input as CoursesLayoutInput;
  const { cid } = params;

  return (
    <div id="wd-courses">
      <h2>Courses {cid}</h2>
      <hr />
      <table>
        <tbody>
          <tr>
            <td valign="top" width="200">
              <CourseNavigation cid={cid} />
            </td>
            <td valign="top" width="100%">{children}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}