import Sidebar from
  "../components/layout/Sidebar";

import Navbar from
  "../components/layout/Navbar";

const DashboardLayout = ({
  children
}) => {

  return (

    <div>

      <Sidebar />

      <div
        style={{
          marginLeft: "280px",
          padding: "20px"
        }}
      >

        <Navbar />

        {children}

      </div>

    </div>

  );

};

export default DashboardLayout;