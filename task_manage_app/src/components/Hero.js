import React from 'react';
import styled from 'styled-components';

const HeroContainer = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 50px 50px;
  background: linear-gradient(135deg, #e8f0fe 0%, #d1e3fa 100%);
  border-radius: 15px;
  margin: 20px 50px;
`;

const HeroText = styled.div`
  max-width: 50%;
`;

const HeroTitle = styled.h1`
  font-size: 48px;
  font-weight: 700;
  color: #333;
  margin-bottom: 20px;
`;

const HeroSubtitle = styled.p`
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

const HeroImage = styled.div`
  width: 40%;
  height: 300px;
  background: #d1e3fa;
  border-radius: 15px;
`;

const Hero = () => {
  return (
    <HeroContainer>
      <HeroText>
        <HeroTitle>Organize Your Work, Boost Your Productivity</HeroTitle>
        <HeroSubtitle>
          TaskPro helps teams manage projects, track progress, and collaborate seamlessly—all in one place.
        </HeroSubtitle>
        <Button>Get Started for Free</Button>
      </HeroText>
      <HeroImage />
    </HeroContainer>
  );
};

export default Hero;