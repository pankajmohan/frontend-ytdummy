import { NavLink } from "react-router-dom";
const NotFound = () => {
  return (
    <div style={{ padding: 20, textAlign: 'center' }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <p><NavLink to={"/"}>Please click here to go back to home</NavLink></p>
    </div>
  );
};

export default NotFound;
