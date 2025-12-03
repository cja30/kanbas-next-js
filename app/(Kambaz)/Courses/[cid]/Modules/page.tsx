"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";

import {
  setModules,
  updateModuleLocal,
  editModule,
} from "./reducer";

import * as client from "../../client";

import {
  ListGroup,
  ListGroupItem,
  FormControl
} from "react-bootstrap";

import { BsGripVertical } from "react-icons/bs";

import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";

export default function Modules() {
  const { cid } = useParams<{ cid: string }>();
  const dispatch = useDispatch();

  const { currentUser } = useSelector((s: any) => s.accountReducer);
  const enrollments = useSelector((s: any) => s.enrollmentsReducer.enrollments);
  const { modules } = useSelector((state: any) => state.modulesReducer);

  const isAdmin = currentUser?.role === "ADMIN";
  const isFaculty = currentUser?.role === "FACULTY";
  const enrolled = enrollments.includes(cid.toLowerCase());
  const canEdit = isAdmin || (isFaculty && enrolled);

  const [moduleName, setModuleName] = useState("");

  useEffect(() => {
    const load = async () => {
      const data = await client.findModulesForCourse(cid);
      dispatch(setModules(data));
    };
    load();
  }, [cid, dispatch]);

  const onCreateModule = async () => {
    const newModule = await client.createModuleForCourse(cid, { name: moduleName });
    dispatch(setModules([...modules, newModule]));
    setModuleName("");
  };

  const onRemoveModule = async (moduleId: string) => {
    await client.deleteModule(moduleId);
    dispatch(setModules(modules.filter((m: any) => m._id !== moduleId)));
  };

  const onUpdateModule = async (module: any) => {
    const updated = await client.updateModule(module);
    dispatch(
        setModules(modules.map((m: any) =>
          m._id === module._id ? { ...module } : m
        ))
      );
  };

  return (
    <div id="wd-modules-page">
      {canEdit && (
        <ModulesControls
          moduleName={moduleName}
          setModuleName={setModuleName}
          addModule={onCreateModule}
        />
      )}

      <br /><br /><br /><br />

      <ListGroup id="wd-modules" className="rounded-0">
        {modules.length === 0 && (
          <ListGroupItem className="border-0 text-muted">
            No modules yet for this course.
          </ListGroupItem>
        )}

        {modules.map((module: any) => (
          <ListGroupItem key={module._id} className="wd-module p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />

                {!module.editing && <span>{module.name}</span>}

                {module.editing && canEdit && (
                  <FormControl
                    className="w-50 d-inline-block"
                    value={module.name}
                    onChange={(e) =>
                      dispatch(updateModuleLocal({ ...module, name: e.target.value }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                          const updatedModule = { ...module, editing: false };
                          onUpdateModule(updatedModule);
                        }

                    }}
                  />
                )}
              </div>

              {canEdit && (
                <ModuleControlButtons
                  moduleId={module._id}
                  deleteModule={onRemoveModule}
                  editModule={() => dispatch(editModule(module._id))}
                />
              )}
            </div>

            {module.lessons?.length > 0 && (
              <ListGroup className="wd-lessons rounded-0">
                {module.lessons.map((lesson: any) => (
                  <ListGroupItem key={lesson._id} className="wd-lesson p-3 ps-1 d-flex align-items-center justify-content-between">
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
