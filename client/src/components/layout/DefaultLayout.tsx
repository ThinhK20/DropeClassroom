import { useEffect, useState } from "react";

interface DefaultLayout {
  children: React.ReactNode;
}

function DefaultLayout({ children }: DefaultLayout) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    console.log("use effect: has mounted");
  }, []);

  if(!hasMounted) return null;

  return(
    <>
      {children}
    </>
  );
}

export default DefaultLayout;
