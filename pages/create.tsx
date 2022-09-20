import styles from '@styles/create.module.scss'
import { useState } from 'react'

const CreatePage = (): JSX.Element => {
  const [formValues, setFormValues] = useState({
    title: '',
    slug: '',
    coverImage: '',
    coverImageAlt: '',
    content: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const id = e.target.id
    const newValue = e.target.value

    setFormValues({ ...formValues, [id]: newValue })
  }

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>): void => {
    // This prevents the default functionality of submitting a form
    e.preventDefault()

    console.log(formValues)
  }
  
  return (
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
        <button type="submit">Create</button>
      </form>
    </div>
  )
}

export default CreatePage
