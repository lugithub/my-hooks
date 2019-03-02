import React, { useState, Fragment, memo } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import ColorContext from './color-context';
import MouseTracker from './mouse-tracker';
import useLocation from './use-location';
import Counter from './counter';
import './App.css';

function Apple() {
  return <h1>apple</h1>;
}

function App() {
  const [showCounter, setShowCounter] = useState(true);
  const [color, setColor] = useState('red');
  const location = useLocation();

  return (
    <div className="App">
      <nav className="nav">
        <Link to="/counter-without-context-provider">
          counter-without-context-provider
        </Link>
        <Link to="/mouse-tracker">mouse-tracker</Link>
      </nav>

      <p>{location}</p>

      <div>
        <Route path="/counter-without-context-provider" component={Counter} />
      </div>

      <Route path="/mouse-tracker">
        {({ match, location, history }) =>
          match && (
            <Fragment>
              <Switch>
                <Route path={`${match.url}/apple`} component={Apple} />
                <Route>
                  {({ match }) =>
                    match && (
                      <ColorContext.Provider value={color}>
                        <MouseTracker showCounter={showCounter} />
                        <button onClick={() => setShowCounter(!showCounter)}>
                          toggle showCounter
                        </button>

                        <button
                          onClick={() => {
                            setColor(prev =>
                              prev === 'red' ? 'green' : 'red'
                            );
                          }}
                        >
                          toggle theme
                        </button>
                      </ColorContext.Provider>
                    )
                  }
                </Route>
              </Switch>
            </Fragment>
          )
        }
      </Route>
    </div>
  );
}

export default memo(App);
