import React from 'react';
import styled from 'styled-components';

const CTAContainer = styled.section`
  padding: 50px;
  text-align: center;
  background: linear-gradient(135deg, #e8f0fe 0%, #d1e3fa 100%);
  border-radius: 15px;
  margin: 20px 50px;
`;

const Title = styled.h2`
  font-size: 36px;
  font-weight: 600;
  color: #333;
  margin-bottom: 20px;
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: #666;
  margin-bottom: 30px;
`;

const Button = styled.button`
  padding: 15px 30px;
  background: #1a73e8;
  color: #fff;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #1557b0;
  }
`;

const CTA = () => {
  return (
    <CTAContainer>
      <Title>Ready to Get Started?</Title>
      <Subtitle>Join thousands of teams using TaskPro to manage their projects.</Subtitle>
      <Button>Sign Up Now</Button>
    </CTAContainer>
  );
};

export default CTA;