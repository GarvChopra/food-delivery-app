import React, { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Store = () => {
  const { partnerId } = useParams()
  const navigate = useNavigate()
  const [foods, setFoods] = useState([])
  const [partner, setPartner] = useState(null)
  const [isOwner, setIsOwner] = useState(false)
  const [editingId, setEditingId] = useState(null)
  const [editName, setEditName] = useState('')
  const [editDescription, setEditDescription] = useState('')
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [toast, setToast] = useState(false)

  useEffect(() => {
    axios.get(`http://localhost:5000/api/food/store/${partnerId}`, { withCredentials: true })
      .then(res => {
        setFoods(res.data.foods)
        setPartner(res.data.partner)
        setIsOwner(res.data.isOwner)
      })
      .catch(err => console.log(err))
  }, [partnerId])

  const handleEdit = (food) => {
    setEditingId(food.id)
    setEditName(food.name)
    setEditDescription(food.description)
  }

  const handleSave = async (foodId) => {
    try {
      await axios.put(`http://localhost:5000/api/food/${foodId}`, {
        name: editName,
        description: editDescription
      }, { withCredentials: true })
      setFoods(foods.map(f => f.id === foodId ? { ...f, name: editName, description: editDescription } : f))
      setEditingId(null)
    } catch (err) {
      console.log(err)
    }
  }

  const handleDelete = async (foodId) => {
    if (!confirm('Delete this food item?')) return
    try {
      await axios.delete(`http://localhost:5000/api/food/${foodId}`, { withCredentials: true })
      setFoods(foods.filter(f => f.id !== foodId))
    } catch (err) {
      console.log(err)
    }
  }

  const handleAddToCart = (item) => {
    setCart((prevCart) => {
      const existing = prevCart.find((cartItem) => cartItem.id === item.id)
      if (existing) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        )
      }
      return [...prevCart, { ...item, quantity: 1 }]
    })
    setToast(true)
    setTimeout(() => setToast(false), 2000)
  }

  const handleChangeQuantity = (itemId, delta) => {
    setCart((prevCart) =>
      prevCart
        .map((cartItem) =>
          cartItem.id === itemId
            ? { ...cartItem, quantity: Math.max(1, cartItem.quantity + delta) }
            : cartItem
        )
        .filter((cartItem) => cartItem.quantity > 0)
    )
  }

  const handleRemoveFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((cartItem) => cartItem.id !== itemId))
  }

  const handlePlaceOrder = () => {
    if (cart.length === 0) return
    alert('Order placed successfully!')
    setCart([])
    setIsCartOpen(false)
  }

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <main className="min-h-screen bg-slate-950 text-white px-4 py-8 sm:px-8 pb-32">

      {toast && (
        <div style={{ position: 'fixed', top: '20px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#22c55e', color: '#fff', padding: '12px 28px', borderRadius: '30px', fontSize: '16px', fontWeight: 'bold', zIndex: 100, boxShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
          Added to cart ✓
        </div>
      )}

      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-6 rounded-[2rem] border border-slate-700 bg-slate-900/95 p-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-slate-400">Store</p>
              <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">{partner?.name || 'Loading...'}</h1>
            </div>
            {isOwner ? (
              <button
                onClick={() => navigate('/create-food')}
                className="rounded-3xl bg-white px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-100"
              >
                + Add Food
              </button>
            ) : (
              <Link to="/home" className="rounded-3xl bg-slate-700 px-6 py-3 text-sm font-semibold hover:bg-slate-600">
                ← Back to Feed
              </Link>
            )}
          </div>
        </div>

        {foods.length === 0 ? (
          <div className="text-center text-slate-400 py-20">Loading...</div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {foods.map((item) => (
              <article key={item.id} className="overflow-hidden rounded-[2rem] border border-slate-700 bg-slate-900/90">
                <video src={item.video} className="h-56 w-full object-cover" muted autoPlay loop playsInline />
                <div className="p-6">
                  {editingId === item.id ? (
                    <>
                      <input
                        type="text"
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        className="w-full bg-slate-800 text-white p-2 rounded mb-2"
                      />
                      <textarea
                        value={editDescription}
                        onChange={(e) => setEditDescription(e.target.value)}
                        className="w-full bg-slate-800 text-white p-2 rounded mb-2"
                        rows={3}
                      />
                      <div className="flex gap-2">
                        <button onClick={() => handleSave(item.id)} className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950">Save</button>
                        <button onClick={() => setEditingId(null)} className="rounded-full bg-slate-700 px-4 py-2 text-sm">Cancel</button>
                      </div>
                    </>
                  ) : (
                    <>
                      <h2 className="text-2xl font-semibold">{item.name}</h2>
                      <p className="mt-3 text-sm text-slate-400">{item.description}</p>
                      {isOwner ? (
                        <div className="mt-4 flex gap-2">
                          <button onClick={() => handleEdit(item)} className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950">Edit</button>
                          <button onClick={() => handleDelete(item.id)} className="rounded-full bg-red-600 px-4 py-2 text-sm font-semibold">Delete</button>
                        </div>
                      ) : (
                        <div className="mt-6 flex justify-end">
                          <button
                            onClick={() => handleAddToCart(item)}
                            className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
                          >
                            Add to Cart
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {!isOwner && (
        <div style={{ position: 'fixed', bottom: '30px', left: '50%', transform: 'translateX(-50%)', zIndex: 40 }}>
          <button
            onClick={() => setIsCartOpen(true)}
            style={{ backgroundColor: '#fff', color: '#000', padding: '16px 40px', borderRadius: '50px', fontSize: '18px', fontWeight: 'bold', border: 'none', cursor: 'pointer', boxShadow: '0 8px 30px rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', gap: '12px' }}
          >
            🛒 Cart
            {totalItems > 0 && (
              <span style={{ backgroundColor: '#ef4444', color: '#fff', borderRadius: '50%', width: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 'bold' }}>
                {totalItems}
              </span>
            )}
          </button>
        </div>
      )}

      {isCartOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 px-4 py-8 backdrop-blur-sm"
          onClick={() => setIsCartOpen(false)}
        >
          <div
            className="w-full max-w-[500px] overflow-hidden rounded-[2rem] border border-slate-700 bg-slate-900 p-6 shadow-2xl shadow-black/60"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-slate-700 pb-4">
              <h2 className="text-2xl font-semibold">Your Cart</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="rounded-full bg-slate-800 px-3 py-2 text-sm text-slate-300 hover:bg-slate-700"
              >
                Close
              </button>
            </div>

            <div className="mt-6 space-y-4">
              {cart.length === 0 ? (
                <div className="rounded-3xl border border-slate-700 bg-slate-950/80 p-6 text-center text-slate-400">
                  Your cart is empty.
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex gap-4 rounded-3xl border border-slate-700 bg-slate-950/90 p-4">
                    <div className="h-20 w-20 overflow-hidden rounded-3xl bg-slate-800">
                      <video src={item.video} className="h-full w-full object-cover" muted loop playsInline />
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <h3 className="text-lg font-semibold">{item.name}</h3>
                      <p className="text-sm text-slate-400">Qty: {item.quantity}</p>
                      <div className="flex flex-wrap items-center gap-2">
                        <button onClick={() => handleChangeQuantity(item.id, -1)} className="rounded-full bg-slate-800 px-3 py-2 text-sm font-semibold hover:bg-slate-700">-</button>
                        <button onClick={() => handleChangeQuantity(item.id, 1)} className="rounded-full bg-slate-800 px-3 py-2 text-sm font-semibold hover:bg-slate-700">+</button>
                        <button onClick={() => handleRemoveFromCart(item.id)} className="rounded-full bg-rose-600 px-3 py-2 text-sm font-semibold hover:bg-rose-500">Remove</button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="mt-6 flex flex-col gap-4 border-t border-slate-700 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-300">Total items: <span className="font-semibold text-white">{totalItems}</span></p>
              <div className="flex gap-3">
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="rounded-full border border-slate-700 bg-slate-800 px-5 py-3 text-sm font-semibold text-slate-300 hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePlaceOrder}
                  className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-slate-100"
                >
                  Place Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}

export default Store