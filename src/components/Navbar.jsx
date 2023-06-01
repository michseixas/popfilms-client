
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
<nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
  <div className="container-fluid">
    <Link className="navbar-brand">Popfilms</Link>
    <Link className="navbar-brand">Menu</Link>
    <form className="d-flex flex-grow-1" role="search">
      <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
      <button className="btn btn-outline-success" type="submit">Search</button>
    </form>
    <Link className="navbar-brand">Signup</Link>
    <Link className="navbar-brand">Login</Link>
  </div>
</nav>
  );
};

export default Navbar;
