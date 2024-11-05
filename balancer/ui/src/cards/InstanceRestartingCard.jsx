import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';

import { BodyCard, CenteredCard, Button } from '../Components';
import { Spinner } from '../Spinner';

export const InstanceRestartingCard = ({ teamname }) => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    fetch(`/balancer/teams/${teamname}/wait-till-ready`, {
      method: 'GET',
      timeout: 3 * 60 * 1000,
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response;
      })
      .then(() => {
        setReady(true);
      })
      .catch(() => {
        console.error('Failed to wait for deployment readiness');
      });
  }, [teamname]);

  if (ready) {
    return (
      <BodyCard className="p-12 bg-white shadow-md rounded-md">
        <span className="block text-center">
          <span role="img" aria-label="Done">
            ✅
          </span>{' '}
          <span data-test-id="instance-status">
            <FormattedMessage
              id="instance_status_restarted"
              defaultMessage="Juice Shop Instance ready again"
            />
          </span>
        </span>
        <Button as="a" data-test-id="start-hacking-button" href="/" className="mt-4 bg-red-500 text-white py-2 px-4 rounded">
          <FormattedMessage
            id="instance_status_back_to_hacking"
            defaultMessage="Get back to Hacking"
          />
        </Button>
      </BodyCard>
    );
  } else {
    return (
      <CenteredCard className="flex items-center p-4 bg-white shadow-md rounded-md">
        <Spinner />
        <span data-test-id="instance-status" className="text-gray-700">
          <FormattedMessage
            id="instance_status_restarting"
            defaultMessage="Juice Shop Instance is currently restarting. It should be ready in a couple of seconds."
          />
        </span>
      </CenteredCard>
    );
  }
};