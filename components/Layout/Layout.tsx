import { useAuth } from '@contexts/auth'
import { signOut } from '@lib/firebase'
import Link from "next/link"
import React, { PropsWithChildren } from "react"

import styles from './Layout.module.scss'

const Layout = ({ children }: PropsWithChildren): JSX.Element => {
  const [user] = useAuth()

  return (
    <div className={styles.Layout}>
      <nav>
        <span>
          <Link href="/">My Next.js Blog</Link>
        </span>
        {user && (
          <span>
            <button onClick={(): Promise<void> => signOut()}>Sign Out</button>
          </span>
        )}
      </nav>
      <main>{children}</main>
    </div>
  )}

export default Layout
