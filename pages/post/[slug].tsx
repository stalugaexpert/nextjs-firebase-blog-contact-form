import { Layout } from '@components'
import { getPostBySlug } from '@lib/firebase'
import { getFormattedDate } from '@lib/utils'
import styles from '@styles/post.module.scss'
import { useRouter } from 'next/router'
import { BlogPost } from 'types/types'

const PostPage = ({ post }: BlogPost): JSX.Element | undefined | null => {
  const router = useRouter()

  if (!post && typeof window !== 'undefined') {
    router.push('/404')
    return
  }

  if (!post) {
    return null
  }

  return (
    <Layout>
      <div className={styles.PostPage}>
        <img
          alt={post.coverImageAlt}
          src={post.coverImage} />
        <h1>{post.title}</h1>
        <span>Published {getFormattedDate(post.dateCreated)}</span>
        <p dangerouslySetInnerHTML={{ __html: post.content }}></p>
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

export default PostPage
