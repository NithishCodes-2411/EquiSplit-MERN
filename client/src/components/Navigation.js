import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';

function NavigationMenu() {
  const navigate = useNavigate();

  return (
    <nav className="navbar bg-primary" data-bs-theme="dark">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          SplitWise-Clone
        </a>
        <Dropdown>
          <Dropdown.Toggle variant="light" id="dropdown-basic">
            Features
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item onClick={() => navigate('/Account')}>
              Your Account
            </Dropdown.Item>
            <Dropdown.Item href="#/action-2">Create a Group</Dropdown.Item>
            <Dropdown.Item href="#/action-3">Logout</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </nav>
  );
}

export default NavigationMenu;