import { Layout } from '@components'
import { getPosts } from '@lib/firebase'
import { getFormattedDate } from '@lib/utils'
import styles from '@styles/index.module.scss'
import Link from 'next/link'
import { BlogPosts } from 'types/types'

const HomePage = ({ posts }: BlogPosts): JSX.Element => (
  <Layout>
    <div className={styles.HomePage}>
      <h1>Blog Posts</h1>
      {posts.map((post) => (
        <article key={post.slug}>
          <img
            alt={post.coverImageAlt}
            src={post.coverImage}
          />
          <div>
            <h2>{post.title}</h2>
            <span>{getFormattedDate(post.dateCreated)}</span>
            <p
              dangerouslySetInnerHTML={{
                __html: `${post.content.substring(0, 200)}...`,
              }}
            >
            </p>
            <Link href={`/post/${post.slug}`}>Continue Reading</Link>
          </div>
        </article>
      ))}
    </div>
  </Layout>
)

export async function getServerSideProps(): Promise<unknown> {
  const posts = await getPosts()

  return {
    props: {
      posts,
    },
  }
}

export default HomePage
