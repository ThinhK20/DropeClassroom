interface ContainerProps {
  children: React.ReactNode;
  varian?: string;
}

function Container({ children, varian }: ContainerProps) {
  return (
    <div className={varian}>
        {children}
    </div>
  );
}

export default Container;
