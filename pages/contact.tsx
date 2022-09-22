import { Layout } from '@components'
import { createContactForm } from '@lib/firebase'
import styles from '@styles/contact.module.scss'
import { useState } from 'react'

const ContactPage = (): JSX.Element | null => {
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const id = e.target.id
    const newValue = e.target.value

    setFormValues({ ...formValues, [id]: newValue })
  }

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>): void => {
    e.preventDefault()

    const missingValues: string[] = []
    Object.entries(formValues).forEach(([key, value]) => {
      if (!value) {
        missingValues.push(key)
      }
    })

    if (missingValues.length > 1) {
      alert(`You're missing these fields: ${missingValues.join(', ')}`)
      return
    }

    setIsLoading(true)

    createContactForm(formValues)
      .then(() => {
        // Update the isLoading state and navigate to the home page.
        setIsLoading(false)
        // router.push('/')
      })
      .catch((err) => {
        // Alert the error and update the isLoading state.
        alert(err)
        setIsLoading(false)
      })
  }

  return (
    <Layout>
      <div className={styles.ContactPage}>
        <form onSubmit={handleSubmit}>
          <h1>Send us a message</h1>
          <div>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              value={formValues.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              value={formValues.message}
              onChange={handleChange}
            />
          </div>
          <button
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default ContactPage
