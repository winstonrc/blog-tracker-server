import axios from 'axios'

const baseUrl = 'http://localhost:3001/notes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNote = async (content) => {
    const object = { content, important: false }
    const response = await axios.post(baseUrl, object)
    return response.data
}

const updateNote = async (note) => {
    const object = {...note, important: !note.important}
    const response = await axios.put(`${baseUrl}/${note.id}`, object)
    return response.data
}

export default { getAll, createNote, updateNote }
