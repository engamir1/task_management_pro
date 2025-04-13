import React from 'react';
import styled from 'styled-components';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 50px;
  background: #fff;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const Logo = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #1a73e8;
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #666;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: #1a73e8;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  background: #1a73e8;
  color: #fff;
  border: none;
  border-radius: 25px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #1557b0;
  }
`;

const Header = () => {
  const navigate = useNavigate();
  return (
    <>
      <HeaderContainer>
        <Logo>TaskPro</Logo>
        <Nav>
          <NavLink to="/">Why TaskPro?</NavLink>
          {/* <NavLink to="/features">Features</NavLink> */}
          <NavLink to="/pricing">Pricing</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/main">Main</NavLink>
        </Nav>
        <section><Button>Sign Up</Button>
          <Button onClick={() => navigate('/login')}
            style={{
              padding: '8px 16px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}>LogIn</Button> </section>
      </HeaderContainer>


      <Outlet />
    </>
  );
};

export default Header;