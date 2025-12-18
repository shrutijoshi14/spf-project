import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  // Just redirect to login page
  const handleLogout = () => {
    // Clear session/localStorage here if needed
    navigate("/");
  };

  return (
    <div>
      <h1>You have been logged out</h1>
      <button onClick={handleLogout}>Go to Login</button>
    </div>
  );
}
export default Logout;
