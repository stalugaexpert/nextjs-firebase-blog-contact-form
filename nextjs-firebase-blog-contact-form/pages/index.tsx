import { getPosts } from '@lib/firebase'
import styles from '@styles/index.module.scss'

interface FormatOptions {
  weekday: "long" | "short";
  month: "long" | "short" | "numeric" | "2-digit" | "narrow" | undefined
  day: "numeric" | "2-digit" | undefined
  year: "numeric" | "2-digit"
  timeZone: string
}

const getFormattedDate = (milliseconds: number): string => {
  const formatOptions: FormatOptions = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  }
  const date = new Date(milliseconds)
  return date.toLocaleDateString(undefined, formatOptions)
}

const HomePage = ({ posts }: BlogPosts): JSX.Element => (
  <div className={styles.HomePage}>
    <h1>Blog Posts</h1>
    {posts.map((post) => (
      <article key={post.slug}>
        <img
          alt={post.coverImageAlt}
          src={post.coverImage} />
        <div>
          <h2>{post.title}</h2>
          <span>{getFormattedDate(post.dateCreated)}</span>
          <p
            dangerouslySetInnerHTML={{
              __html: `${post.content.substring(0, 200)}...`,
            }}
          ></p>
        </div>
      </article>
    ))}
  </div>
)

interface BlogPost {
  content: string
  coverImage: string
  coverImageAlt: string
  dateCreated: number
  slug: string
  title: string
}

interface BlogPosts {
  posts: BlogPost[]
}

export async function getServerSideProps(): Promise<unknown> {
  const posts = await getPosts()

  return {
    props: {
      posts,
    },
  }
}

export default HomePage
