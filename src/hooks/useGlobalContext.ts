import {useContext} from 'react';
import {GlobalContext} from '../context/GlobalContext/GlobalContext';

export const useGlobalContext = () => {
  const {globalContextState, ...context} = useContext(GlobalContext);

  return {
    ...globalContextState,
    ...context,
  };
};
