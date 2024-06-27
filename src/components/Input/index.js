import { forwardRef } from 'react';
import styles from './Input.module.scss';
import classNames from 'classnames';


function Input({ value, onChange,  erro = false ,...outrosProps }, ref) {
  return (
    <input
      ref={ref}
      value={value}
      onChange={onChange}
      {...outrosProps}
      className={classNames(styles.input, {
        [styles['input-erro']]: erro,
      })}
    />
  )
}

export default forwardRef(Input);