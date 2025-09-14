import styles from './Heading.module.css'

type IHeadingProps = {
  value?: string
  className?: string
}

export const Heading = ({ value }: IHeadingProps) =>
  value && <header className={styles.heading}>{value}</header>
