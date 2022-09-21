import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames/bind'

import styles from './Icon.module.scss'

interface IconProps {
  name: IconProp
  small?: string
  large?: string
}

const Icon = ({ name, small, large }: IconProps): JSX.Element => {
  const cx = classNames.bind(styles)
  const className = cx('Icon', {
    'Icon--small': small,
    'Icon--large': large,
  })

  return (
    <FontAwesomeIcon
      className={className}
      icon={name}
    />
  )
}

export default Icon
