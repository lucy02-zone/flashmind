import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

const DashboardLayout = ({
  children
}) => {

  return (

    <div>

      <Sidebar />

      <main
        style={{
          marginLeft: "220px",
          minHeight: "100vh",
          padding: "30px",
          background: "#f5f7fb"
        }}
      >

        <Navbar />

        {children}

      </main>

    </div>

  );

};

export default DashboardLayout;