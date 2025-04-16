import React from 'react';
import PropTypes from 'prop-types';

import { useState } from 'react';
import { createContext } from 'react';


export const LoadingContext = createContext();

const LoadingProvider = ( {children} ) => {

  const [ loading, setLoading ] = useState(true);

  return (
    <LoadingContext.Provider value={ {loading, setLoading} }>
      { children }
    </LoadingContext.Provider>
  );
};


LoadingProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default LoadingProvider;