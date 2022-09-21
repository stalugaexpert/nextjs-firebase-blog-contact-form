import { useAuth } from '@contexts/auth'
import { signIn } from '@lib/firebase'
import styles from '@styles/signin.module.scss'
import { useRouter } from 'next/router'
import { useState } from 'react'

const SignInPage = (): JSX.Element | null => {
  const router = useRouter()
  const [user, userLoading] = useAuth()
  const [values, setValues] = useState({ email: '', password: '' })

  if (userLoading) {
    return <h1>Loading...</h1>
  }

  if (user && typeof window !== 'undefined') {
    router.push('/')
    return null
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const id = e.target.id
    const newValue = e.target.value

    setValues({ ...values, [id]: newValue })
  }

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault()

    const missingValues: string[] = []
    Object.entries(values).forEach(([key, value]) => {
      if (!value) {
        missingValues.push(key)
      }
    })

    if (missingValues.length > 1) {
      alert(`You're missing these fields: ${missingValues.join(', ')}`)
      return
    }

    signIn(values.email, values.password).catch((err) => {
      alert(err)
    })
  }

  return (
    <div className={styles.SignIn}>
      <form onSubmit={handleSubmit}>
        <h1>Please Sign In</h1>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          value={values.email}
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={values.password}
          onChange={handleChange}
        />
        <button type="submit">Sign In</button>
      </form>
    </div>
  )
}

export default SignInPage
