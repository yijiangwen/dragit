import React from 'react';
import { resolveNode } from 'designer/Core/resoveNode';

const Field = React.forwardRef((props:{as:string}, ref:any) => {
  const {as, ...rest} = props
  const InputControl = resolveNode(as);
  return (
    <InputControl 
      {...rest} 
      ref={ref}
    />
  )
});

export default Field