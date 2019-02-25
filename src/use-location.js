import { useEffect, useState } from 'react';

export default function useLocation() {
  const [loc, setloc] = useState(window.location.href);

  useEffect(() => {
    setloc(window.location.href);
  }, [window.location.href]);

  return loc;
}
