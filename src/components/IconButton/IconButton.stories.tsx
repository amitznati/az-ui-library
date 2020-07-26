import React from 'react';
import { color, number, withKnobs } from '@storybook/addon-knobs';
import IconButton from './IconButton';
import iconPack from '../../styles/assets/icons/sprite.svg';
import { ReactComponent as BellIcon } from '../../styles/assets/icons/bell.svg';
import { ReactComponent as ArrowIcon } from '../../styles/assets/icons/arrow_forward_ios-24px.svg'
// @ts-ignore
import stylesVars from '../../styles/abstracts/_variables.scss';

export default {
  title: 'IconButton',
  component: IconButton,
  decorators: [
    withKnobs,
    (story: () => React.ReactNode) => (
      <div className="story-wrap">{story()}</div>
    )
  ]
};
console.log(BellIcon);
export const Icons = () => {
  const groupAppearance = 'IconButton-Appearance';
  const groupColors = 'IconButton-Colors';
  const sizeValue = number('Size', 50, {}, groupAppearance);

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
  const iconColorValue = color('iconColor', stylesVars.whiteColor, groupColors);
  const iconColorHoverValue = color(
    'iconColorHover',
    stylesVars.primaryColor,
    groupColors
  );

  return (
    <div className="buttons-stories">
      <div>
        <IconButton
          size={60}
          iconColor="orangered"
          iconHref={`${iconPack}#icon-heart-full`}
        />
      </div>
      <div>
        <IconButton
          size={sizeValue}
          iconColor={iconColorValue}
          iconColorHover={iconColorHoverValue}
          backgroundColor={backgroundColorValue}
          backgroundColorHover={backgroundColorHoverValue}
          IconSrc={ArrowIcon}
        />
      </div>
      <div>
        <ArrowIcon height={50} fill="orangered" />
      </div>
    </div>
  );
};
