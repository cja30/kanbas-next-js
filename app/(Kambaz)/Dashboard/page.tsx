"use client";

import ProtectedRoute from "../Account/ProtectedRoute";
import DashboardContent from "./DashboardContent";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}
