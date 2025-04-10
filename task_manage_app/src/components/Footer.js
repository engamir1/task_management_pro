import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  padding: 50px;
  background: #333;
  color: #fff;
  text-align: center;
`;

const FooterText = styled.p`
  font-size: 14px;
  margin-bottom: 10px;
`;

const FooterLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
`;

const FooterLink = styled.a`
  color: #1a73e8;
  text-decoration: none;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterText>© 2025 TaskPro. All rights reserved.</FooterText>
      <FooterLinks>
        <FooterLink href="#">Privacy Policy</FooterLink>
        <FooterLink href="#">Terms of Service</FooterLink>
        <FooterLink href="#">Contact Us</FooterLink>
      </FooterLinks>
    </FooterContainer>
  );
};

export default Footer;