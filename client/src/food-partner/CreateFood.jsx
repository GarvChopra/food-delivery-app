import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreateFood = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [video, setVideo] = useState(null)
  const [preview, setPreview] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleVideoChange = (e) => {
    const file = e.target.files[0]
    setVideo(file)
    if (file) {
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!name || !video) {
      setError('Name and video are required')
      return
    }

    setLoading(true)
    setError('')

    const formData = new FormData()
    formData.append('name', name)
    formData.append('description', description)
    formData.append('video', video)

    try {
      const res= await axios.post('http://localhost:5000/api/food/', formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      console.log("foodItem:", res.data.foodItem)
console.log("food_partner_id:", res.data.foodItem.food_partner_id)
      navigate(`/store/${res.data.foodItem.food_partner_id}`)
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed')
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#0a0a0a', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
      <div style={{ backgroundColor: '#141414', borderRadius: '20px', padding: '40px', width: '100%', maxWidth: '500px', boxShadow: '0 10px 40px rgba(0,0,0,0.5)' }}>
        <h1 style={{ color: '#fff', fontSize: '28px', marginBottom: '8px', textAlign: 'center' }}>Create Food</h1>
        <p style={{ color: '#888', fontSize: '14px', textAlign: 'center', marginBottom: '30px' }}>
          Upload a food video to showcase to customers
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label style={{ color: '#fff', fontSize: '14px', marginBottom: '8px', display: 'block' }}>Food Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Margherita Pizza"
              style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #333', backgroundColor: '#1a1a1a', color: '#fff', fontSize: '14px' }}
            />
          </div>

          <div>
            <label style={{ color: '#fff', fontSize: '14px', marginBottom: '8px', display: 'block' }}>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your food"
              rows={3}
              style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #333', backgroundColor: '#1a1a1a', color: '#fff', fontSize: '14px', resize: 'vertical' }}
            />
          </div>

          <div>
            <label style={{ color: '#fff', fontSize: '14px', marginBottom: '8px', display: 'block' }}>Video</label>
            <input
              type="file"
              accept="video/*"
              onChange={handleVideoChange}
              style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #333', backgroundColor: '#1a1a1a', color: '#fff', fontSize: '14px' }}
            />
          </div>

          {preview && (
            <video src={preview} controls style={{ width: '100%', borderRadius: '10px', maxHeight: '300px' }} />
          )}

          {error && <p style={{ color: '#ff4444', fontSize: '14px', margin: 0 }}>{error}</p>}

          <button
            type="submit"
            disabled={loading}
            style={{ backgroundColor: '#fff', color: '#000', padding: '14px', borderRadius: '10px', border: 'none', fontSize: '16px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.6 : 1 }}
          >
            {loading ? 'Uploading...' : 'Upload Food'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default CreateFood