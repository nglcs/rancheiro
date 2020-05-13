import React from 'react';
import Grid from '@material-ui/core/Grid';
import Host from "../components/Host";
import RancherHost from "../components/RancherHost";
import data from '../config/data.json'


export default function Diagram(props) {

  let hosts = data[props.mainHost].environment[props.envOption].hosts
  let filteredHosts = hosts.filter(host => {
    return host.labels.filter(label => {
      return label.search(props.input) >= 0
    }).length > 0
  });


  return (
    <Grid>
      <Grid container alignItems='center' direction="column" justify="center" spacing={3}>
        <Grid item>
          <RancherHost name={data[props.mainHost].name} />
        </Grid>
        <Grid item>
          <Grid direction="row" container >
            {
              filteredHosts.map(host => {
                return (
                  host.type === 'reverse' ?
                    < Grid item >
                      <Host name={host.hostname} roles={host.labels} type={host.type} />
                    </Grid>
                    :
                    null
                )

              })
            }
          </Grid>
        </Grid>
        <Grid item>
          <Grid direction="row" container  >
            {filteredHosts.map((host) =>
              host.type !== 'reverse' ?
                <Grid item>
                  <Host name={host.hostname} roles={host.labels} type={host.type} />
                </Grid>
                :
                null
            )}
          </Grid>
        </Grid>
      </Grid>
    </Grid >
  )

}
