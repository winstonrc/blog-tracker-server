import { useState } from 'react'

const Blog = ({ blog, user, updateBlog, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [likes, setLikes] = useState(blog.likes)
  const [showDetails, setShowDetails] = useState(false)
  const [label, setLabel] = useState('expand')

  const toggleShowDetails = () => {
    setShowDetails(!showDetails)
    !showDetails ? setLabel('collapse') : setLabel('expand')
  }

  const addLike = (event) => {
    event.preventDefault()
    const blogObject = ({
      ...blog,
      likes: blog.likes + 1
    })

    updateBlog(blogObject)
    setLikes(likes + 1)
  }

  const removeBlog = (event) => {
    event.preventDefault()
    deleteBlog(blog)
  }

  const showRemoveButton =() => {
    console.log('user', user.username)
    console.log('blog', blog.user.username)
    if (user && blog.user) {
      return blog.user.username === user.username ? <div><button onClick={removeBlog} className='removeBlogButton'>remove</button></div> : ''
    }
  }

  return (
    <div style={blogStyle} className='blog'>
      {blog.title} &nbsp; <button onClick={toggleShowDetails} className='toggleDetailsButton'>{label}</button>
      {showDetails ? <div>
        <div className='blogAuthor'>{blog.author}</div>
        <div className='blogUrl'>{blog.url}</div>
        <div className='blogLikes'>Likes: {likes} &nbsp; <button onClick={addLike} className='addLikeButton'>like</button></div>
        {showRemoveButton()}
      </div> : ''
      }
    </div>
  )
}

export default Blog