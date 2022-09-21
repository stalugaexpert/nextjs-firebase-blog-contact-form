import Link from "next/link"
import React, { PropsWithChildren } from "react"

import styles from './Layout.module.scss'

const Layout = ({children}: PropsWithChildren): JSX.Element =>   
  <div className={styles.Layout}>
    <nav>
      <span>
        <Link href="/">My Next.js Blog</Link>
      </span>
    </nav>
    <main>{children}</main>
  </div>

export default Layout
