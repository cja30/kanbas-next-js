"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { setModules, updateModule, editModule } from "./reducer";

import * as client from "../../client";

import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";

import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";

export default function Modules() {
  const { cid } = useParams<{ cid: string }>();
  const dispatch = useDispatch();

  const cidNorm = cid.toLowerCase();

  const { currentUser } = useSelector((s: any) => s.accountReducer);
  const enrollments = useSelector((s: any) => s.enrollmentsReducer.enrollments);
  const { modules } = useSelector((state: any) => state.modulesReducer);

  const role = currentUser?.role;
  const isAdmin = role === "ADMIN";
  const isFaculty = role === "FACULTY";

  // 🔹 local state that mirrors Redux enrollments for this course
  const [enrolledState, setEnrolledState] = useState(false);

  useEffect(() => {
    setEnrolledState(enrollments.includes(cidNorm));
  }, [enrollments, cidNorm]);

  const canEdit = isAdmin || (isFaculty && enrolledState);

  const [moduleName, setModuleName] = useState("");

  useEffect(() => {
    const fetchModules = async () => {
      const data = await client.findModulesForCourse(cid);
      dispatch(setModules(data));
    };
    fetchModules();
  }, [cid, dispatch]);

  const onCreateModuleForCourse = async () => {
    if (!cid) return;
    const newModule = { name: moduleName };
    const module = await client.createModuleForCourse(cid, newModule);
    dispatch(setModules([...modules, module]));
    setModuleName("");
  };

  const onRemoveModule = async (moduleId: string) => {
    await client.deleteModule(cid, moduleId);
    dispatch(setModules(modules.filter((m: any) => m._id !== moduleId)));
  };

  const onUpdateModule = async (module: any) => {
    await client.updateModule(cid, module);

    const newModules = modules.map((m: any) =>
      m._id === module._id ? module : m
    );
    dispatch(setModules(newModules));
  };

  return (
    <div id="wd-modules-page">
      {canEdit && (
        <ModulesControls
          moduleName={moduleName}
          setModuleName={setModuleName}
          addModule={onCreateModuleForCourse}
        />
      )}

      <br />
      <br />
      <br />
      <br />

      <ListGroup id="wd-modules" className="rounded-0">
        {modules.length === 0 && (
          <ListGroupItem className="border-0 text-muted">
            No modules yet for this course.
          </ListGroupItem>
        )}

        {modules.map((module: any) => (
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
                    value={module.name}
                    onChange={(e) =>
                      dispatch(
                        updateModule({ ...module, name: e.target.value })
                      )
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        onUpdateModule({ ...module, editing: false });
                      }
                    }}
                  />
                )}
              </div>

              {canEdit && (
                <ModuleControlButtons
                  moduleId={module._id}
                  deleteModule={onRemoveModule}
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
