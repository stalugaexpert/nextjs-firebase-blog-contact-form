import 'firebase/compat/database'
import 'firebase/compat/auth'

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

export const updatePost = async (post: BlogPost): Promise<void> => {
  initFirebase()

  return firebase.database().ref(`/posts/${post.slug}`).set(post)
}

export const deletePost = async (slug: string): Promise<void> => {
  initFirebase()

  return firebase.database().ref(`/posts/${slug}`).set(null)
}

export const getPostBySlug = async (slug: string): Promise<void> => {
  initFirebase()

  return await firebase
    .database()
    .ref(`/posts/${slug}`)
    .once('value')
    .then((snapshot) => snapshot.val())
}

interface ContactForm {
  id?: string
  name: string
  email: string
  message: string
  dateCreated?: number
}

export const createContactForm = async (contactForm: ContactForm): Promise<void> => {
  initFirebase()

  const dateCreated = new Date().getTime()
  const formId = Date.now() + Math.random()
  contactForm.dateCreated = dateCreated
  contactForm.id = formId.toString().replaceAll('.', '')

  return firebase.database().ref(`/contactForms/${contactForm.id}`).set(contactForm)
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const onAuthStateChanged = async (callback: any): Promise<any> => {
  initFirebase()

  return firebase.auth().onAuthStateChanged((user) => callback(user))
}

export const signIn = async (email: string, password: string): Promise<firebase.auth.UserCredential> => {
  initFirebase()

  return firebase.auth().signInWithEmailAndPassword(email, password)
}

export const signOut = async (): Promise<void> => {
  initFirebase()

  return firebase.auth().signOut()
}
