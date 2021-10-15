import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
const NavigationBar = ({ handleSubmit, query }) => {
  const form = handleSubmit && (
    <form onSubmit={handleSubmit}>
      <input type="text" ref={query} />
    </form>
  );
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">GoodWatch</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {/* <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link> */}
            <NavDropdown title="Menu" id="basic-nav-dropdown">
              <NavDropdown.Item href="/">Home</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Favourite</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Movie List</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Something else
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        {form}
      </Container>
    </Navbar>
  );
};
export default NavigationBar;
