import React from 'react';
import NavigationLink from './NavigationLink';
import {
  boolean,
  color,
  select,
  text,
  withKnobs
} from '@storybook/addon-knobs';
import { jsxDecorator } from 'storybook-addon-jsx';
// @ts-ignore
import stylesVars from '../../styles/abstracts/_variables.scss';

export default {
  title: 'NavigationLink',
  component: NavigationLink,
  decorators: [withKnobs, jsxDecorator]
};
const groupAppearance = 'NavigationLink-Appearance';
const groupColors = 'NavigationLink-Colors';
export const navigationLink = () => {
  const sizeValue = select(
    'Size',
    ['tiny', 'small', 'medium', 'large'],
    'medium',
    groupAppearance
  );
  const textValue = text('Text', 'default with knobs', groupAppearance);
  const backgroundColorValue = color(
    'backgroundColor',
    'transparent',
    groupColors
  );
  const backgroundColorHoverValue = color(
    'backgroundColorHover',
    stylesVars.whiteColor,
    groupColors
  );
  const textColorValue = color('textColor', stylesVars.whiteColor, groupColors);
  const textColorHoverValue = color(
    'textColorHover',
    stylesVars.primaryColor,
    groupColors
  );
  const roundedValue = boolean('rounded', false, groupAppearance);
  return (
    <div className="navigation-stories">
      <div>
        <p>Default (with knobs)</p>
        <NavigationLink
          size={sizeValue}
          backgroundColor={backgroundColorValue}
          backgroundColorHover={backgroundColorHoverValue}
          rounded={roundedValue}
          textColor={textColorValue}
          textColorHover={textColorHoverValue}
          linkTo="#"
        >
          {textValue}
        </NavigationLink>
      </div>
      <div>
        <p>Sizes</p>
        <NavigationLink linkTo="#" size="tiny">
          tiny
        </NavigationLink>
        <NavigationLink linkTo="#" size="small">
          small
        </NavigationLink>
        <NavigationLink linkTo="#" size="medium">
          medium
        </NavigationLink>
        <NavigationLink linkTo="#" size="large">
          large
        </NavigationLink>
      </div>
      <div>
        <p>Round</p>
        <NavigationLink linkTo="#" rounded size="tiny">
          tiny
        </NavigationLink>
        <NavigationLink linkTo="#" rounded size="small">
          small
        </NavigationLink>
        <NavigationLink linkTo="#" rounded size="medium">
          medium
        </NavigationLink>
        <NavigationLink linkTo="#" rounded size="large">
          large
        </NavigationLink>
      </div>
    </div>
  );
};

