import React from 'react';
import styled from 'styled-components';

const PricingContainer = styled.section`
  padding: 50px;
  background: #f7f9fc;
  border-radius: 15px;
  margin: 20px 50px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 36px;
  font-weight: 600;
  color: #333;
  margin-bottom: 50px;
`;

const PricingGrid = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 30px;
`;

const PricingCard = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  width: 30%;
`;

const PlanName = styled.h3`
  font-size: 24px;
  font-weight: 500;
  color: #333;
  margin-bottom: 10px;
`;

const Price = styled.p`
  font-size: 36px;
  font-weight: 600;
  color: #1a73e8;
  margin-bottom: 20px;
`;

const FeatureList = styled.ul`
  list-style: none;
  margin-bottom: 20px;
`;

const FeatureItem = styled.li`
  font-size: 16px;
  color: #666;
  margin-bottom: 10px;
`;

const Button = styled.button`
  padding: 10px 20px;
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

const Pricing = () => {
  return (
    <PricingContainer>
      <Title>Pricing Plans</Title>
      <PricingGrid>
        <PricingCard>
          <PlanName>Free</PlanName>
          <Price>$0/mo</Price>
          <FeatureList>
            <FeatureItem>Up to 5 users</FeatureItem>
            <FeatureItem>Basic task management</FeatureItem>
            <FeatureItem>Limited support</FeatureItem>
          </FeatureList>
          <Button>Get Started</Button>
        </PricingCard>
        <PricingCard>
          <PlanName>Pro</PlanName>
          <Price>$10/mo</Price>
          <FeatureList>
            <FeatureItem>Up to 20 users</FeatureItem>
            <FeatureItem>Advanced task management</FeatureItem>
            <FeatureItem>Priority support</FeatureItem>
          </FeatureList>
          <Button>Get Started</Button>
        </PricingCard>
        <PricingCard>
          <PlanName>Enterprise</PlanName>
          <Price>$25/mo</Price>
          <FeatureList>
            <FeatureItem>Unlimited users</FeatureItem>
            <FeatureItem>Full feature access</FeatureItem>
            <FeatureItem>Dedicated support</FeatureItem>
          </FeatureList>
          <Button>Get Started</Button>
        </PricingCard>
      </PricingGrid>
    </PricingContainer>
  );
};

export default Pricing;