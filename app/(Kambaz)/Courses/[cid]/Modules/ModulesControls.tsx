"use client";

import { useState } from "react";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
import ModuleEditor from "./ModuleEditor";

export default function ModulesControls({
  moduleName,
  setModuleName,
  addModule,
}: {
  moduleName: string;
  setModuleName: (name: string) => void;
  addModule: () => void;
}) {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <div id="wd-modules-controls" className="text-nowrap">
      
      <Button
        variant="danger"
        size="lg"
        className="me-1 float-end"
        id="wd-add-module-btn"
        onClick={handleShow}
      >
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Module
      </Button>

      <ModuleEditor
        show={show}
        handleClose={handleClose}
        dialogTitle="Add Module"
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={addModule}
      />

      <Dropdown className="float-end me-2">
        <DropdownToggle variant="secondary" size="lg" id="wd-publish-all-btn">
          <GreenCheckmark /> Publish All
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem><GreenCheckmark /> Publish All</DropdownItem>
          <DropdownItem><GreenCheckmark /> Publish all modules and items</DropdownItem>
          <DropdownItem><GreenCheckmark /> Publish modules only</DropdownItem>
          <DropdownItem>Unpublish all modules and items</DropdownItem>
          <DropdownItem>Unpublish modules only</DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <Button variant="secondary" size="lg" className="float-end me-2">
        View Progress
      </Button>
      <Button variant="secondary" size="lg" className="float-end me-2">
        Collapse All
      </Button>
    </div>
  );
}
