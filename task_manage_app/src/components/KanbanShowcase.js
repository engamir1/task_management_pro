import React from 'react';
import styled from 'styled-components';

const ShowcaseContainer = styled.section`
  padding: 50px;
  background: #f7f9fc;
  border-radius: 15px;
  margin: 20px 50px;
`;

const Title = styled.h2`
  font-size: 36px;
  font-weight: 600;
  color: #333;
  text-align: center;
  margin-bottom: 50px;
`;

const KanbanBoard = styled.div`
  display: flex;
  gap: 20px;
  justify-content: space-around;
`;

const Column = styled.div`
  background: #e8ecef;
  padding: 20px;
  border-radius: 10px;
  width: 30%;
`;

const ColumnTitle = styled.h3`
  font-size: 20px;
  font-weight: 500;
  color: #333;
  margin-bottom: 20px;
`;

const TaskCard = styled.div`
  background: #fff;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
`;

const TaskTitle = styled.h4`
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin-bottom: 10px;
`;

const TaskDescription = styled.p`
  font-size: 14px;
  color: #666;
`;

const Tag = styled.span`
  display: inline-block;
  padding: 5px 10px;
  background: ${(props) => props.color};
  border-radius: 15px;
  font-size: 12px;
  color: #fff;
  margin-top: 10px;
`;

const KanbanShowcase = () => {
  return (
    <ShowcaseContainer>
      <Title>See TaskPro in Action</Title>
      <KanbanBoard>
        <Column>
          <ColumnTitle>To do</ColumnTitle>
          <TaskCard>
            <TaskTitle>Design System</TaskTitle>
            <TaskDescription>Create a design system for a hero section...</TaskDescription>
            <Tag color="#34c759">DESIGN</Tag>
          </TaskCard>
          <TaskCard>
            <TaskTitle>Typography Change</TaskTitle>
            <TaskDescription>Modify typography and styling on text...</TaskDescription>
            <Tag color="#ff2d55">TYPOGRAPHY</Tag>
          </TaskCard>
        </Column>
        <Column>
          <ColumnTitle>In progress</ColumnTitle>
          <TaskCard>
            <TaskTitle>Implement Screens</TaskTitle>
            <TaskDescription>Designer created 6 screens for a website...</TaskDescription>
            <Tag color="#ff2d55">DEVELOPMENT</Tag>
          </TaskCard>
        </Column>
        <Column>
          <ColumnTitle>Done</ColumnTitle>
          <TaskCard>
            <TaskTitle>Fix Bugs in CSS</TaskTitle>
            <TaskDescription>Fix small bugs in the CSS code...</TaskDescription>
            <Tag color="#ff2d55">DEVELOPMENT</Tag>
          </TaskCard>
          <TaskCard>
            <TaskTitle>Proofread Final Text</TaskTitle>
            <TaskDescription>The text provided by marketing...</TaskDescription>
            <Tag color="#1a73e8">TYPOGRAPHY</Tag>
          </TaskCard>
        </Column>
      </KanbanBoard>
    </ShowcaseContainer>
  );
};

export default KanbanShowcase;