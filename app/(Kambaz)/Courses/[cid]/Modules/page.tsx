"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";

import {
  addModule,
  deleteModule,
  editModule,
  updateModule,
} from "./reducer";

import {
  ListGroup,
  ListGroupItem,
  FormControl,
} from "react-bootstrap";

import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";

export default function Modules() {
  const { cid } = useParams<{ cid: string }>();
  const dispatch = useDispatch();
  
  const { currentUser } = useSelector((s: any) => s.accountReducer);
  const { enrollments } = useSelector((s: any) => s.enrollmentsReducer);
  const { modules } = useSelector((state: any) => state.modulesReducer);

  const role = currentUser?.role;
  const isAdmin = role === "ADMIN";
  const isFaculty = role === "FACULTY";
  const isStudent = role === "STUDENT" || role === "USER";

  const enrolled = enrollments.some(
    (e: any) => e.user === currentUser?._id && e.course === cid
  );

  const canEdit = isAdmin || (isFaculty && enrolled);

  const [moduleName, setModuleName] = useState("");

  const courseModules = modules.filter((m: any) => m.course === cid);

  return (
    <div id="wd-modules-page">
      {canEdit && (
        <ModulesControls
          moduleName={moduleName}
          setModuleName={setModuleName}
          addModule={() => {
            dispatch(addModule({ name: moduleName, course: cid }));
            setModuleName("");
          }}
        />
      )}

      <br/><br/><br/><br/>

      <ListGroup id="wd-modules" className="rounded-0">
        {courseModules.length === 0 && (
          <ListGroupItem className="border-0 text-muted">
            No modules yet for this course.
          </ListGroupItem>
        )}

        {courseModules.map((module: any) => (
          <ListGroupItem
            key={module._id}
            className="wd-module p-0 mb-5 fs-5 border-gray"
          >
            <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center justify-content-between">

              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />

                {!module.editing && <span>{module.name}</span>}

                {module.editing && canEdit && (
                  <FormControl
                    className="w-50 d-inline-block"
                    defaultValue={module.name}
                    onChange={(e) =>
                      dispatch(updateModule({ ...module, name: e.target.value }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        dispatch(updateModule({ ...module, editing: false }));
                      }
                    }}
                  />
                )}
              </div>

              {canEdit && (
                <ModuleControlButtons
                  moduleId={module._id}
                  deleteModule={(moduleId) => dispatch(deleteModule(moduleId))}
                  editModule={(moduleId) => dispatch(editModule(moduleId))}
                />
              )}
            </div>

            {module.lessons?.length > 0 && (
              <ListGroup className="wd-lessons rounded-0">
                {module.lessons.map((lesson: any) => (
                  <ListGroupItem
                    key={lesson._id}
                    className="wd-lesson p-3 ps-1 d-flex align-items-center justify-content-between"
                  >
                    <div className="d-flex align-items-center">
                      <BsGripVertical className="me-2 fs-3" />
                      <span>{lesson.name}</span>
                    </div>

                    {canEdit && (
                      <LessonControlButtons
                        modules={modules}
                        module={module}
                        lesson={lesson}
                      />
                    )}
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
