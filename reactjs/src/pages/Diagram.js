import React from 'react';
import Grid from '@material-ui/core/Grid';
import Host from "../components/Host";
import RancherHost from "../components/RancherHost";


export default function Diagram(props) {
  if (props.data.length === 0)
    return (<div></div>)


  let hosts = props.data[props.mainHost].environment[props.envOption].hosts
  let filteredHosts = []


  if (props.stateSwitch)
    filteredHosts = hosts.filter(host => {
      return host.hostname.search(props.input) >= 0
    });
  else
    filteredHosts = hosts.filter(host => {
      return host.labels.filter(label => {
        return label.search(props.input) >= 0
      }).length > 0
    });


  if (props.stateRadio === 'b')
    filteredHosts.sort(function (a, b) {
      return a.annotations.cpu - b.annotations.cpu;
    });
  else if (props.stateRadio === 'c')
    filteredHosts.sort(function (a, b) {
      return a.annotations.memory - b.annotations.memory;
    });
  else if (props.stateRadio === 'd')
    filteredHosts.sort(function (a, b) {
      return a.annotations.storage - b.annotations.storage;
    });



  return (
    <Grid>
      <Grid container alignItems='center' direction="column" justify="center" spacing={3}>
        <Grid item>
          <RancherHost name={props.data[props.mainHost].name} />
        </Grid>
        <Grid item>
          <Grid direction="row" container >
            {
              filteredHosts.map(host => {
                return (
                  host.type === 'reverse' ?
                    < Grid item >
                      <Host name={host.hostname} roles={host.labels} type={host.type} annotation={host.annotations} />
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
              host.type === 'control' ?
                <Grid item>
                  <Host name={host.hostname} roles={host.labels} type={host.type} annotation={host.annotations} />
                </Grid>
                :
                null
            )}
          </Grid>
        </Grid>
        <Grid item>
          <Grid direction="row" container  >
            {filteredHosts.map((host) =>
              host.type === 'worker' ?
                <Grid item>
                  <Host name={host.hostname} roles={host.labels} type={host.type} annotation={host.annotations} />
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
