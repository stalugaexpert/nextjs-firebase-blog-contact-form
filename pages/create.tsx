import { Layout } from '@components'
import { useAuth } from '@contexts/auth'
import { createPost } from '@lib/firebase'
import styles from '@styles/create.module.scss'
import { useRouter } from 'next/router'
import { useState } from 'react'

const CreatePage = (): JSX.Element | null => {
  const router = useRouter()

  const [user, userLoading] = useAuth()

  const [formValues, setFormValues] = useState({
    title: '',
    slug: '',
    coverImage: '',
    coverImageAlt: '',
    content: '',
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

    createPost(formValues)
      .then(() => {
        // Update the isLoading state and navigate to the home page.
        setIsLoading(false)
        router.push('/')
      })
      .catch((err) => {
        // Alert the error and update the isLoading state.
        alert(err)
        setIsLoading(false)
      })
  }

  if (userLoading) {
    return null
  }

  if (!user && typeof window !== 'undefined') {
    router.push('/404')
    return null
  }

  return (
    <Layout>
      <div className={styles.CreatePage}>
        <form onSubmit={handleSubmit}>
          <h1>Create a new post</h1>
          <div>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={formValues.title}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="slug">Slug</label>
            <input
              id="slug"
              type="text"
              value={formValues.slug}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="coverImage">Cover Image URL</label>
            <input
              id="coverImage"
              type="text"
              value={formValues.coverImage}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="coverImageAlt">Cover Image Alt</label>
            <input
              id="coverImageAlt"
              type="text"
              value={formValues.coverImageAlt}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              value={formValues.content}
              onChange={handleChange}
            />
          </div>
          <button
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? 'Creating...' : 'Create'}
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default CreatePage
