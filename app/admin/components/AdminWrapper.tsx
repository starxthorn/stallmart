import AdminSidebar from "./AdminSidebar";

const AdminWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <main className="w-full lg:flex md:flex items-start justify-center hidden">
        <AdminSidebar />
        <section className="w-full h-[100vh] overflow-y-scroll p-4 px-6">
          {children}
        </section>
      </main>
    </>
  );
};

export default AdminWrapper;
