import { Icon, Layout } from '@components'
import { useAuth } from '@contexts/auth'
import { deletePost, getPostBySlug } from '@lib/firebase'
import { getFormattedDate } from '@lib/utils'
import styles from '@styles/post.module.scss'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { BlogPost } from 'types/types'

const PostPage = ({ post }: BlogPost): JSX.Element | undefined | null => {
  const router = useRouter()
  const [user] = useAuth()

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
          src={post.coverImage}
        />
        <div>
          <h1>{post.title}</h1>
          {user && (
            <div>
              <Link href={`/edit/${post.slug}`}>
                <a>
                  <Icon
                    name="pencil-alt"
                  />
                </a>
              </Link>
              <button
                onClick={(): void => {
                  const shouldDeletePost = confirm(
                    'Are you sure you want to delete this post?',
                  )
                  if (shouldDeletePost) {
                    deletePost(post.slug).then(() => {
                      router.push('/')
                    })
                  }
                }}
              >
                <Icon name="trash-alt" />
              </button>
            </div>
          )}
        </div>
        <span>
          Published
          {' '}
          {getFormattedDate(post.dateCreated)}
        </span>
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
