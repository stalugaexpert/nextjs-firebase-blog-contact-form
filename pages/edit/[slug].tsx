import { Layout } from '@components'
import { useAuth } from '@contexts/auth'
import { getPostBySlug, updatePost } from '@lib/firebase'
import styles from '@styles/edit.module.scss'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { BlogPost } from 'types/types'

const EditPage = ({ post }: BlogPost): JSX.Element | null => {
  const router = useRouter()
  const [user, userLoading] = useAuth()
  const [values, setValues] = useState(post)
  const [isLoading, setIsLoading] = useState(false)

  if (userLoading) {
    return null
  }

  if (!user && typeof window !== 'undefined') {
    router.push('/signin')
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

    setIsLoading(true)
    updatePost(values)
      .then(() => {
        setIsLoading(false)
        router.push(`/post/${post.slug}`)
      })
      .catch((err) => {
        alert(err)
        setIsLoading(false)
      })
  }

  return (
    <Layout>
      <div className={styles.EditPage}>
        <form onSubmit={handleSubmit}>
          <h1>
            Edit Post:
            {' '}
            {post.slug}
          </h1>
          <div>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={values.title}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="coverImage">Cover Image URL</label>
            <input
              id="coverImage"
              type="text"
              value={values.coverImage}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="coverImageAlt">Cover Image Alt</label>
            <input
              id="coverImageAlt"
              type="text"
              value={values.coverImageAlt}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              value={values.content}
              onChange={handleChange}
            />
          </div>
          <button
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? 'Updating...' : 'Update'}
          </button>
        </form>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context: { query: { slug: string } }): Promise<unknown> {
  const post = await getPostBySlug(context.query.slug)

  return {
    props: {
      post,
    },
  }
}

export default EditPage
