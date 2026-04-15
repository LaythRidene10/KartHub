import { mockPosts } from './mockdata'

export class Post {
  constructor ({ build_id, user_name, likes, description, image = '', comments = [], shares = 0 }) {
    this.build_id = build_id
    this.user_name = user_name
    this.likes = likes ?? 0
    this.description = description
    this.image = image
    this.comments = comments
    this.shares = shares
  }
}

const STORAGE_KEY = 'kartbuilder_posts' // Use sessionStorage

function loadData () {
  const data = sessionStorage.getItem(STORAGE_KEY)
  if (data) {
    return JSON.parse(data)
  }
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(mockPosts))
  return [...mockPosts]
}

function saveData (data) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

export function getAllPosts () {
  return loadData()
}

export function addPost (post) {
  const list = loadData()
  list.push(post)
  saveData(list)
}

export function getPostByBuildId (build_id) {
  return loadData().find(post => post.build_id === build_id)
}

export function getPostsByUserName (user_name) {
  return loadData().filter(post => post.user_name === user_name)
}

export function updatePostByBuildId (build_id, updatedData) {
  const list = loadData()
  const post = list.find(post => post.build_id === build_id)
  if (post) {
    Object.assign(post, updatedData)
    saveData(list)
    return true
  }
  return false
}

export function deletePostByBuildId (build_id) {
  const list = loadData()
  const index = list.findIndex(post => post.build_id === build_id)
  if (index !== -1) {
    list.splice(index, 1)
    saveData(list)
    return true
  }
  return false
}
