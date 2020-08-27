import React from 'react';
import styled from 'styled-components';

import { AccordionProps } from './Accordion.types';

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
    padding: 2rem;
    box-shadow: 0 2px 4px rgba(0 ,0 ,0 , 0.3);
    background-color: ${getColor('primary', props)};
    .u-abs-center {
      ${absCenter}
      width: 100%;
    }
  }
  .accordion-expand-icon {
    svg {
      transform: rotate(${props.isOpen ? '-' : ''}90deg);
    }
  }

  .accordion-content {
    overflow: hidden;
    max-height: ${props.isOpen ? props.contentHeight : 0}px;
    will-change: max-height;
    transition: max-height 0.8s cubic-bezier(0.2, 0.68, 0.09, 1);
    background-color: ${getColor('white', props)};
  }
`;
};
const StyledAccordion = styled.div`
  ${(props): string => getStyledAccordion(props)}
`;

export class Accordion extends React.Component<
  AccordionProps,
  { isOpen: boolean; contentHeight?: number }
> {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      contentHeight: 0
    };
  }

  private contentRef = React.createRef<HTMLDivElement>();
  componentDidMount(): void {
    this.setState({ contentHeight: this.contentRef.current?.scrollHeight });
  }

  componentDidUpdate(): void {
    if (this.contentRef.current?.scrollHeight !== this.state.contentHeight) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ contentHeight: this.contentRef.current?.scrollHeight });
    }
  }

  toggleAccordion = (): void => {
    this.setState((s) => ({
      isOpen: !s.isOpen
    }));
  };

  render(): JSX.Element {
    const { header, children, ...rest } = this.props;
    const { contentHeight, isOpen } = this.state;
    return (
      <StyledAccordion
        {...{ contentHeight, isOpen }}
        aria-expanded={isOpen}
        {...rest}
      >
        <div className="accordion-header">
          <span className="u-abs-center">{header}</span>
          <div className="accordion-expand-icon">
            <IconButton
              size={40}
              iconSrc={ArrowIcon}
              // variant="secondary"
              onClick={this.toggleAccordion}
            />
          </div>
        </div>
        <div
          ref={this.contentRef}
          className="accordion-content"
          aria-hidden={!isOpen}
        >
          {children}
        </div>
      </StyledAccordion>
    );
  }
}

export default Accordion;
