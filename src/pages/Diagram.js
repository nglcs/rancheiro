import React from 'react';
import Grid from '@material-ui/core/Grid';
import Host from "../components/Host";
import RancherHost from "../components/RancherHost";


export default function Diagram() {
  const roles = [
    { name: 'role-internal-reverse-1' },
    { name: 'role-internal-reverse-2' },
    { name: 'role-internal-reverse-3' },
    { name: 'role-internal-reverse-4' },
  ];

  const hosts = [
    { name: 'containerc3', roles, type: 'reverse' },
    { name: 'containerv71', roles, type: 'reverse' },
    { name: 'containerc2', roles, type: 'reverse' },
    { name: 'containerc2', roles, type: 'reverse' },
    { name: 'containerc2', roles, type: 'worker' },
  ];
  return (

    <Grid container alignItems='center' direction="column" justify="center" spacing={3}>
      <Grid item>
        <RancherHost name='rancherserver' />
      </Grid>
      <Grid item>
        <Grid direction="row" container >
          {hosts.map((host) =>
            host.type === 'reverse' ?
              <Grid item>
                <Host name={host.name} roles={host.roles} type={host.type} />
              </Grid>
              :
              null
          )}
        </Grid>
      </Grid>
      <Grid item>
        <Grid direction="row" container >
          {hosts.map((host) =>
            host.type !== 'reverse' ?
              <Grid item>
                <Host name={host.name} roles={host.roles} type={host.type} />
              </Grid>
              :
              null
          )}
        </Grid>
      </Grid>
    </Grid>
  )

}
