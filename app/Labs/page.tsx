import { redirect } from "next/navigation";
import store from "../state/store"; 
import { Provider } from "react-redux";

export default function LabsIndex() {
  redirect("/Labs/Lab1");
}
