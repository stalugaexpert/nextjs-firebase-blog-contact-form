import 'firebase/compat/database'

import { API_KEY, DATABASE_URL, PROJECT_ID } from 'config/config'
import firebase from 'firebase/compat/app'

interface BlogPost {
  title: string,
  slug: string,
  coverImage: string,
  coverImageAlt: string,
  content: string,
  dateCreated?: number,
}

const initFirebase = async (): Promise<void> => {
  if (!firebase.apps.length) {
    firebase.initializeApp({
      apiKey: API_KEY,
      databaseURL: DATABASE_URL,
      projectId: PROJECT_ID,
    })
  }
}

export const getPosts = async (): Promise<unknown> => {
  initFirebase()

  const posts = await firebase
    .database()
    .ref('/posts')
    .orderByChild('dateCreated')
    .once('value')
    .then((snapshot) => {
      const snapshotVal = snapshot.val()

      const result = []
      for (const slug in snapshotVal) {
        const post = snapshotVal[slug]
        result.push(post)
      }

      return result.reverse()
    })

  return posts
}

export const createPost = async (post: BlogPost): Promise<void> => {
  initFirebase()

  const dateCreated = new Date().getTime()
  post.dateCreated = dateCreated

  return firebase.database().ref(`/posts/${post.slug}`).set(post)
}

export const getPostBySlug = async (slug: string): Promise<void> => {
  initFirebase()

  return await firebase
    .database()
    .ref(`/posts/${slug}`)
    .once('value')
    .then((snapshot) => snapshot.val())
}
