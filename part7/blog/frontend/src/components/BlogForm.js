import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: 0,
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>Add a blog</h2>

      <form onSubmit={addBlog}>
        <div>
          title: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input
            value={newTitle}
            onChange={handleTitleChange}
            className='titleInput'
          />
        </div>

        <div>
          author: &nbsp;
          <input
            value={newAuthor}
            onChange={handleAuthorChange}
            className='authorInput'
          />
        </div>

        <div>
          url: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <input
            value={newUrl}
            onChange={handleUrlChange}
            className='urlInput'
          />
        </div>

        <button type="submit" className='form'>add</button>

      </form>
    </div>
  )
}

export default BlogForm
