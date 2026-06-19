import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Home = () => {
  const navigate = useNavigate()
  const [reels, setReels] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/api/food/', { withCredentials: true })
      .then(res => setReels(res.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <div style={{ width: '100vw', height: '100vh', backgroundColor: '#000', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <style>{`
        .reel-scroll::-webkit-scrollbar { display: none; }
        .reel-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
      <div className="reel-scroll" style={{ height: '95vh', width: '700px', overflowY: 'scroll', scrollSnapType: 'y mandatory', borderRadius: '20px' }}>
        {reels.length === 0 ? (
          <div style={{ height: '95vh', display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff' }}>
            Loading...
          </div>
        ) : (
          reels.map((reel) => (
            <section key={reel.id} style={{ height: '95vh', width: '700px', scrollSnapAlign: 'start', position: 'relative', overflow: 'hidden', borderRadius: '20px' }}>
              <video
                style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
                src={reel.video}
                autoPlay
                muted
                loop
                playsInline
              />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '30px 20px', background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.9))', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <h3 style={{ color: '#fff', fontSize: '22px', fontWeight: 'bold', margin: 0 }}>{reel.name}</h3>
                <p style={{ color: '#fff', fontSize: '18px', fontWeight: 'bold', margin: 0, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: '1.4' }}>
                  {reel.description}
                </p>
                <button
                  onClick={() => navigate(`/store/${reel.food_partner_id}`)}
                  style={{ backgroundColor: '#fff', color: '#000', borderRadius: '25px', padding: '14px 40px', fontSize: '18px', fontWeight: 'bold', border: 'none', cursor: 'pointer', alignSelf: 'flex-start' }}
                >
                  Visit Store
                </button>
              </div>
            </section>
          ))
        )}
      </div>
    </div>
  )
}

export default Home