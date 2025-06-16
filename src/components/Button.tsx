import styles from './Button.module.css'
import React from 'react'

export default function Button(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  return <button type="button" className={styles.btn} {...props} />
}