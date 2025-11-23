"use client";

import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";

type LessonControlButtonsProps = {
  modules?: any;
  module?: any;
  lesson?: any;
};

export default function LessonControlButtons({
  modules,
  module,
  lesson,
}: LessonControlButtonsProps) {
  return (
    <div className="float-end">
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
