import React from 'react';
import { action } from '@storybook/addon-actions';
import Button from './Button';

export default {
  title: 'Button',
  component: Button,
  decorators: [
    (story: () => React.ReactNode) => (
      <div className="story-wrap">{story()}</div>
    )
  ]
};

export const all = () => {
  const onClick = action('onClick');
  return (
    <div className="buttons-stories">
      <div>
        <p>Default</p>
        <Button onClick={onClick}>Default</Button>
      </div>
      <div>
        <p>Sizes</p>
        <Button onClick={onClick} size="tiny">
          tiny
        </Button>
        <Button onClick={onClick} size="small">
          small
        </Button>
        <Button onClick={onClick} size="medium">
          medium
        </Button>
        <Button onClick={onClick} size="large">
          large
        </Button>
      </div>
      <div>
        <p>Round</p>
        <Button onClick={onClick} size="tiny" rounded>
          tiny
        </Button>
        <Button onClick={onClick} size="small" rounded>
          small
        </Button>
        <Button onClick={onClick} size="medium" rounded>
          medium
        </Button>
        <Button onClick={onClick} size="large" rounded>
          large
        </Button>
      </div>
      <div>
        <p>Variant</p>
        <Button onClick={onClick} variant="white">
          white
        </Button>
        <Button onClick={onClick} variant="primary">
          primary
        </Button>
        <Button onClick={onClick} variant="secondary">
          secondary
        </Button>
      </div>
      <div>
        <Button onClick={onClick} variant="white" rounded>
          white
        </Button>
        <Button onClick={onClick} variant="primary" rounded>
          primary
        </Button>
        <Button onClick={onClick} variant="secondary" rounded>
          secondary
        </Button>
      </div>
    </div>
  );
};
