import React from 'react';
import { color, number, withKnobs } from '@storybook/addon-knobs';
import IconButton from './IconButton';
import iconPack from '../../styles/assets/icons/sprite.svg';
import { ReactComponent as BellIcon } from '../../styles/assets/icons/bell.svg';
import { ReactComponent as ArrowIcon } from '../../styles/assets/icons/arrow_forward_ios-24px.svg';

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

export const Icons = () => {
  const groupAppearance = 'IconButton-Appearance';
  const groupColors = 'IconButton-Colors';
  const sizeValue = number('Size', 60, { step: 1 }, groupAppearance);

  const backgroundColorValue = color(
    'backgroundColor',
    'transparent',
    groupColors
  );
  const backgroundColorHoverValue = color(
    'backgroundColorHover',
    'white',
    groupColors
  );
  const iconColorValue = color('iconColor', 'white', groupColors);
  const iconColorHoverValue = color('iconColorHover', 'blue', groupColors);
  return (
    <div className="buttons-stories">
      <div>
        {/* import iconPack from '../../styles/assets/icons/sprite.svg'; */}
        <IconButton size={60} iconHref={`${iconPack}#icon-heart-full`} />
      </div>
      <div>
        {/* import { ReactComponent as BellIcon } from '../../styles/assets/icons/bell.svg'; */}
        <IconButton size={60} textColor="orangered" iconSrc={BellIcon} />
      </div>
      <div>
        {/* import { ReactComponent as ArrowIcon } from '../../styles/assets/icons/arrow_forward_ios-24px.svg'; */}
        <IconButton
          size={sizeValue}
          textColor={iconColorValue}
          textColorHover={iconColorHoverValue}
          backgroundColor={backgroundColorValue}
          backgroundColorHover={backgroundColorHoverValue}
          iconSrc={ArrowIcon}
        />
      </div>
      <div>
        <ArrowIcon height={50} fill="orangered" />
      </div>
    </div>
  );
};
