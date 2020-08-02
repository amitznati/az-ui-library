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
        <Button size="tiny">tiny</Button>
        <Button size="small">small</Button>
        <Button size="medium">medium</Button>
        <Button size="large">large</Button>
      </div>
      <div>
        <p>Round</p>
        <Button size="tiny" rounded>
          tiny
        </Button>
        <Button size="small" rounded>
          small
        </Button>
        <Button size="medium" rounded>
          medium
        </Button>
        <Button size="large" rounded>
          large
        </Button>
      </div>
      <div>
        <p>Variant</p>
        <Button variant="white">white</Button>
        <Button variant="primary">primary</Button>
        <Button variant="secondary">secondary</Button>
      </div>
      <div>
        <Button variant="white" rounded>
          white
        </Button>
        <Button variant="primary" rounded>
          primary
        </Button>
        <Button variant="secondary" rounded>
          secondary
        </Button>
      </div>
      <div>
        <p>With Hover Effect</p>
        <Button variant="white" withHoverEffect>
          white
        </Button>
        <Button variant="primary" withHoverEffect>
          primary
        </Button>
        <Button variant="secondary" withHoverEffect>
          secondary
        </Button>
        <Button variant="white" withHoverEffect rounded>
          white
        </Button>
        <Button variant="primary" withHoverEffect rounded>
          primary
        </Button>
        <Button variant="secondary" withHoverEffect rounded>
          secondary
        </Button>
      </div>
      <div>
        <p>Custom Variant</p>
        <Button variant="#3c3ce5">#3c3ce5</Button>
        <Button variant="#e53c73">#e53c73</Button>
        <Button variant="orangered">orangered</Button>
      </div>
      <div>
        <Button variant="orangered" rounded>
          orangered rounded
        </Button>
        <Button variant="orangered" rounded withHoverEffect>
          orangered rounded HoverEffect
        </Button>
        <Button
          variant={{ bg: 'rebeccapurple', text: 'white' }}
          rounded
          withHoverEffect
        >
          background = rebeccapurple, text = white
        </Button>
      </div>
    </div>
  );
};
