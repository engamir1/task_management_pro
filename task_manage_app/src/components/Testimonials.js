import React from 'react';
import styled from 'styled-components';

const TestimonialsContainer = styled.section`
  padding: 50px;
  text-align: center;
`;

const Title = styled.h2`
  font-size: 36px;
  font-weight: 600;
  color: #333;
  margin-bottom: 50px;
`;

const TestimonialGrid = styled.div`
  display: flex;
  justify-content: space-around;
  gap: 30px;
`;

const TestimonialCard = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  width: 30%;
`;

const TestimonialText = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
`;

const TestimonialAuthor = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #333;
`;

const Testimonials = () => {
  return (
    <TestimonialsContainer>
      <Title>What Our Users Say</Title>
      <TestimonialGrid>
        <TestimonialCard>
          <TestimonialText>
            "TaskPro has transformed the way our team works. We’re more organized and productive than ever!"
          </TestimonialText>
          <TestimonialAuthor>— Sarah M., Project Manager</TestimonialAuthor>
        </TestimonialCard>
        <TestimonialCard>
          <TestimonialText>
            "The Kanban boards are so intuitive. I can see everything at a glance and stay on top of my tasks."
          </TestimonialText>
          <TestimonialAuthor>— John D., Developer</TestimonialAuthor>
        </TestimonialCard>
        <TestimonialCard>
          <TestimonialText>
            "I love how easy it is to collaborate with my team. TaskPro is a game-changer!"
          </TestimonialText>
          <TestimonialAuthor>— Emily R., Designer</TestimonialAuthor>
        </TestimonialCard>
      </TestimonialGrid>
    </TestimonialsContainer>
  );
};

export default Testimonials;