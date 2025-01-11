import React, { ReactNode } from 'react';
import { InputNumberProps as AntdInputNumberProps } from 'antd';
import * as S from './InputNumber.styles';

export interface InputNumberProps extends AntdInputNumberProps {
  className?: string;
  $block?: boolean;
  children?: ReactNode;
}

export const InputNumber = React.forwardRef<HTMLInputElement, InputNumberProps>(
  ({ className, children, $block, ...props }, ref) => (
    <S.InputNumber ref={ref} className={className} $block={$block} {...props}>
      {children}
    </S.InputNumber>
  ),
);

// import React, { ReactNode, forwardRef, ForwardedRef } from 'react';
// import { InputNumberProps as AntdInputNumberProps } from 'antd/es/input-number';
// import * as S from './InputNumber.styles';

// export interface InputNumberProps extends AntdInputNumberProps {
//   className?: string;
//   $block?: boolean;
//   children?: ReactNode;
// }

// export const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(
//   ({ className, children, $block, ...props }, ref: ForwardedRef<HTMLInputElement>) => (
//     <S.InputNumber ref={ref} className={className} $block={$block} {...props}>
//       {children}
//     </S.InputNumber>
//   ),
// );
