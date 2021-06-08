// import React, { createContext} from 'react';
// // import { Provider } from 'react-redux';

// // import store from './src/store';

// const AuthContext = createContext();

// export const wrapRootElement = ({ element }) => {
//     console.log("inside wrapRootElement", element)
//     return (
//         <AuthContext.Provider value={{user: {username: '', jwt: ''}}}>{element}</AuthContext.Provider>
//     );
// }






/* import React from 'react';
import { Provider } from 'react-redux';

import store from './src/store';

export const wrapRootElement = ({ element }) => {
  return (
    <Provider store={store}>{element}</Provider>
  );
} */

export { wrapRootElement } from './src/context/context'