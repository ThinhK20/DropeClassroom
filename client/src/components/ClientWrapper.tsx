import { useEffect, useState } from "react";

interface ClientWrapper {
  children: React.ReactNode;
}

function ClientWrapper({ children }: ClientWrapper) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if(!hasMounted) return null;

  return(
    <>
      {children}
    </>
  );
}

export default ClientWrapper;
