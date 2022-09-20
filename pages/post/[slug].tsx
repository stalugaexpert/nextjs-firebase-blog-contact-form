import styles from '@styles/post.module.scss'
import { useRouter } from 'next/router'

const PostPage = (): JSX.Element => {
  const router = useRouter()
  const { slug } = router.query

  return (
    <div className={styles.PostPage}>
      <h1>Hello, from post: {slug}!</h1>
    </div>
  )
}

export default PostPage
