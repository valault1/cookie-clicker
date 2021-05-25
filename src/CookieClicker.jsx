import React from "react";
import { generators as originalGenerators } from "./cookie-generators/cookie-generators";
import {
  ListItem,
  List,
  ListItemText,
  ListItemSecondaryAction,
  Container,
  Grid,
  Card,
} from "@material-ui/core";

export default function CookieClicker() {
  const defaultNumDecimalPlaces = 2;
  const [score, setScore] = React.useState(10);
  const [generators, setGenerators] = React.useState(originalGenerators);
  const generateCookies = () => {
    var scoreIncrease = 0;
    for (var generator of generators) {
      scoreIncrease += generator.number * generator.cookiesPerSecond;
    }

    setScore((prevScore) => prevScore + scoreIncrease);
  };

  useInterval(() => {
    generateCookies();
  }, 1000);

  const getCookie = () => {
    setScore((prevScore) => prevScore + 1);
  };

  const getGenerator = (generator) => {
    if (score < getGeneratorCost(generator)) return;
    setScore((prevScore) => prevScore - getGeneratorCost(generator));
    var generatorsCopy = [...generators];
    var index = 0;
    for (var i in generatorsCopy) {
      if (generators[i].name === generator.name) {
        index = i;
      }
    }
    generatorsCopy[index].number += 1;
    setGenerators(generatorsCopy);
  };

  const getGeneratorCost = (generator) => {
    return generator.costFactor ** generator.number * generator.initialCost;
  };

  const round = (number, n = defaultNumDecimalPlaces) => {
    return Math.round((number * 10 ** n) / 10 ** n);
  };

  ////
  //this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000);

  return (
    <div className="App">
      <h1>Cookie Clicker</h1>
      cookies: {round(score)} <br />
      <h3>
        <label onClick={getCookie}>Click here to get a cookie </label>
      </h3>
      <br />
      {generators.map((generator, index) => {
        return (
          <div>
            <br />
            <Grid
              container
              directon="column"
              justify="center"
              alignItems="center"
            >
              <Grid item xs={3}>
                <List>
                  <Card>
                    <ListItem>
                      <ListItemText
                        primary={
                          "buy a " +
                          generator.name +
                          " (costs " +
                          round(getGeneratorCost(generator)) +
                          " cookies.)"
                        }
                        secondary={
                          "Number of " +
                          generator.name +
                          "s owned: " +
                          generator.number
                        }
                      ></ListItemText>

                      <ListItemSecondaryAction>
                        <h1>
                          <label
                            style={
                              getGeneratorCost(generator) > score
                                ? { color: "white" }
                                : { color: "black" }
                            }
                            onClick={() => getGenerator(generator)}
                          >
                            +
                          </label>
                        </h1>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </Card>
                </List>
              </Grid>
            </Grid>
            <br />
          </div>
        );
      })}
    </div>
  );
}

function useInterval(callback, delay) {
  const savedCallback = React.useRef();

  // Remember the latest function.
  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  React.useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
