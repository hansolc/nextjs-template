"use client";

import Link from "next/link";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { usePathname, useRouter } from "next/navigation";

export default function NavBar() {
  // use next/navigation in App Router
  const pathname = usePathname();

  return (
    <Navbar
      bg="primary"
      variant="dark"
      sticky="top"
      expand="sm"
      collapseOnSelect
    >
      <Container>
        {/* as={Link}
            bootstrap에게 nextjs Link로 동작하도록 설정
            caching문제 해결
        */}
        <Navbar.Brand as={Link} href="/">
          NextJS 13.4 Image Gallary
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav>
            <Nav.Link as={Link} href="/static" active={pathname === "/static"}>
              static
            </Nav.Link>
            <Nav.Link
              as={Link}
              href="/dynamic"
              active={pathname === "/dynamic"}
            >
              dynamic
            </Nav.Link>
            <Nav.Link as={Link} href="/isr" active={pathname === "/isr"}>
              ISR
            </Nav.Link>
            <NavDropdown title="Topics" id="topics-dropdown">
              <NavDropdown.Item as={Link} href="/topics/health">
                Health
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} href="/topics/fitness">
                fitness
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} href="/topics/coding">
                coding
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} href="/search" active={pathname === "/search"}>
              Search
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
