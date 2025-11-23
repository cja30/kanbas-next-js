import ClientCourseGate from "./ClientCourseGate.tsx";

export default function CourseLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { cid: string };
}) {
  return (
    <ClientCourseGate cid={params.cid}>
      {children}
    </ClientCourseGate>
  );
}
