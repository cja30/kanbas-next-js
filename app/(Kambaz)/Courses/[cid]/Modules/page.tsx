"use client";

import { useParams } from "next/navigation";
import * as db from "../../../Database"; 

import {
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";

import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";

export default function Modules() {
  const { cid } = useParams<{ cid: string }>();

  const modules = (db.modules ?? []).filter((m: any) => m.course === cid);

  return (
    <div id="wd-modules-page">
      <ModulesControls />
      <br /><br /><br /><br />

      <ListGroup id="wd-modules" className="rounded-0">
        {modules.length === 0 && (
          <ListGroupItem className="border-0 text-muted">
            No modules yet for this course.
          </ListGroupItem>
        )}

        {modules.map((module: any) => (
          <ListGroupItem
            key={module._id ?? module.name}
            className="wd-module p-0 mb-5 fs-5 border-gray"
          >
          
            <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <span>{module.name}</span>
              </div>
              <ModuleControlButtons />
            </div>

            {Array.isArray(module.lessons) && module.lessons.length > 0 && (
              <ListGroup className="wd-lessons rounded-0">
                {module.lessons.map((lesson: any) => (
                  <ListGroupItem
                    key={lesson._id ?? `${module._id}-${lesson.name}`}
                    className="wd-lesson p-3 ps-1 d-flex align-items-center justify-content-between"
                  >
                    <div className="d-flex align-items-center">
                      <BsGripVertical className="me-2 fs-3" />
                      <span>{lesson.name}</span>
                    </div>
                    <LessonControlButtons />
                  </ListGroupItem>
                ))}
              </ListGroup>
            )}
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
}
