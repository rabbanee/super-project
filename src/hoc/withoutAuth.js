export const WithoutAuth = (WrappedComponent) => {
  const WithoutAuth = (props) => {
    console.log(WrappedComponent);
    return (
      <WrappedComponent { ...props }/>
    );
  }
  return WithoutAuth;
}