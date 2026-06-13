import {
  useAuth
} from "../contexts/AuthContext";

const DashboardPage = () => {

  const {
    user,
    logout
  } = useAuth();

  return (
    <div>

      <h1>
        Welcome
      </h1>

      <p>
        {user?.name}
      </p>

      <button
        onClick={logout}
      >
        Logout
      </button>

    </div>
  );

};

export default DashboardPage;