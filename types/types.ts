export interface BlogPostData {
  content: string
  coverImage: string
  coverImageAlt: string
  dateCreated: number
  slug: string
  title: string
}

export interface BlogPost {
  post: BlogPostData
}

export interface BlogPosts {
  posts: BlogPostData[]
}
