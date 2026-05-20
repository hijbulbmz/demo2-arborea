import { cx } from '../../utils/formatters'

export function Skeleton({ className }) {
  return <div className={cx('skeleton rounded-2xl', className)} />
}
