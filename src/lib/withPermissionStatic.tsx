export function withPermissionStatic(getStaticPropsFunc?: Function) {
  return async (ctx: any) => {

    

    if(getStaticPropsFunc){
      return {
          props: {
            data: await getStaticPropsFunc(ctx),
          }
        };
      }
  }
}