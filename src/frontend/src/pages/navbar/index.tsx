import { useSelector, useDispatch } from "react-redux";
import { AuthState, setLogout } from "../../state";

const Navbar = () => {
  const dispatch = useDispatch();

  const email = useSelector((state: AuthState) => state.email);
  const role = useSelector((state: AuthState) => state.role);
  const token = useSelector((state: AuthState) => state.token);

  return (
    <nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          MyRestaurant
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarColor02"
          aria-controls="navbarColor02"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarColor02">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link active" href="#">
                Home
                <span className="visually-hidden">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Privacy
              </a>
            </li>
            {role === "Admin" && (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                  href="#"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Content Management
                </a>
                <div className="dropdown-menu">
                  <a className="dropdown-item" href="/coupon">
                    Coupon
                  </a>
                  <a className="dropdown-item" href="/product">
                    Product
                  </a>
                </div>
              </li>
            )}
          </ul>

          {token === null ? (
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link" href="/login">
                  Login
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/register">
                  Register
                </a>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link">Hey {email}</a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="/login"
                  onClick={() => dispatch(setLogout())}
                >
                  Logout
                </a>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
