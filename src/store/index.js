import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import reducers from '../reducers/index';

const composeEnhancers = composeWithDevTools({
  trace: true, limit: 25
});

export default function configureStore(initialState={}) {
  return createStore(
    reducers,
     /* preloadedState, */ 
     composeEnhancers(
      applyMiddleware(thunk, logger)
     )     
  );
};
