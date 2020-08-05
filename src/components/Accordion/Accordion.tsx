import React from 'react';
import styled from 'styled-components';

import { AccordionProps } from './Accordion.types';

// import './Accordion.scss';

import IconButton from '../IconButton/IconButton';
import { ReactComponent as ArrowIcon } from '../../styles/assets/icons/arrow_forward_ios-24px.svg';
import { absCenter } from '../GlobalStyles/mixing';
import { getColor } from '../GlobalStyles/utils';

const getStyledAccordion = (props): string => {
  return `
  .accordion-header {
    font-size: 2rem;
    text-align: center;
    color: ${getColor('white', props)};
    display: flex;
    justify-content: flex-end;
    align-items: center;
    line-height: 1;
    position: relative;
    padding: 1rem 0;
    box-shadow: 0 2px 4px rgba(0 ,0 ,0 , 0.3);
    background-color: ${getColor('primary', props)};
    .u-abs-center {
      ${absCenter}
      width: 100%;
    }
  }
  .accordion-expand-icon {
    margin-right: 2rem;
    svg {
      transform: rotate(${props.isOpen ? '-' : ''}90deg);
    }
  }

  .accordion-content {
    overflow: hidden;
    max-height: ${props.isOpen ? props.contentHeight : 0}px;
    will-change: max-height;
    transition: max-height 1s cubic-bezier(0.2, 0.68, 0.09, 1);
    background-color: ${getColor('white', props)};
  }
`;
};
const StyledAccordion = styled.div`
  ${(props): string => getStyledAccordion(props)}
`;
export const Accordion: React.FC<AccordionProps> = ({
  header,
  children,
  ...rest
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [contentHeight, setContentHeight] = React.useState(0);
  const contentRef = React.createRef<HTMLDivElement>();
  React.useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [contentRef.current]);
  const toggleAccordion = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <StyledAccordion
      {...{ contentHeight, isOpen }}
      aria-expanded={isOpen}
      {...rest}
    >
      <div className="accordion-header">
        <span className="u-abs-center">{header}</span>
        <div className="accordion-expand-icon">
          <IconButton size={30} iconSrc={ArrowIcon} onClick={toggleAccordion} />
        </div>
      </div>
      <div ref={contentRef} className="accordion-content" aria-hidden={!isOpen}>
        {children}
      </div>
    </StyledAccordion>
  );
};

export default Accordion;
