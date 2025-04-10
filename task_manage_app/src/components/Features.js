import React from 'react';
import styled from 'styled-components';
import { FaTasks, FaUsers, FaChartLine } from 'react-icons/fa';

const FeaturesContainer = styled.section`
  padding: 50px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 36px;
  font-weight: 600;
  color: #333;
  margin-bottom: 50px;
`;

const FeatureGrid = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 30px;
`;

const FeatureCard = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  width: 30%;
  text-align: left;
`;

const FeatureIcon = styled.div`
  font-size: 40px;
  color: #1a73e8;
  margin-bottom: 20px;
`;

const FeatureTitle = styled.h3`
  font-size: 24px;
  font-weight: 500;
  color: #333;
  margin-bottom: 10px;
`;

const FeatureDescription = styled.p`
  font-size: 16px;
  color: #666;
`;

const Features = () => {
  return (
    <FeaturesContainer>
      <Title>Why Choose TaskPro?</Title>
      <FeatureGrid>
        <FeatureCard>
          <FeatureIcon><FaTasks /></FeatureIcon>
          <FeatureTitle>Task Management</FeatureTitle>
          <FeatureDescription>
            Create, assign, and track tasks with ease using our intuitive Kanban boards.
          </FeatureDescription>
        </FeatureCard>
        <FeatureCard>
          <FeatureIcon><FaUsers /></FeatureIcon>
          <FeatureTitle>Team Collaboration</FeatureTitle>
          <FeatureDescription>
            Collaborate in real-time with your team, share updates, and stay aligned.
          </FeatureDescription>
        </FeatureCard>
        <FeatureCard>
          <FeatureIcon><FaChartLine /></FeatureIcon>
          <FeatureTitle>Progress Tracking</FeatureTitle>
          <FeatureDescription>
            Monitor project progress with detailed analytics and reports.
          </FeatureDescription>
        </FeatureCard>
      </FeatureGrid>
    </FeaturesContainer>
  );
};

export default Features;