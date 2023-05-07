import {useContext} from 'react';
import {SessionContext} from '@contexts';

const useSession = () => {
  const session = useContext(SessionContext);
  return session;
};

export default useSession;
