import DashboardLayout
from "../layouts/DashboardLayout";

import {
  useAuth
} from "../contexts/AuthContext";

const DashboardPage = () => {

  const { user } =
    useAuth();

  return (
    <DashboardLayout>

      <h1>
        Welcome,
        {user?.name}
      </h1>

      <p>
        FlashMind AI Dashboard
      </p>

    </DashboardLayout>
  );

};

export default DashboardPage;