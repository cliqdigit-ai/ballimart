import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import { CATEGORIES, PRODUCTS, SHOPS, BANNERS } from './data';

const CAT_COLORS = ['#d8f3dc','#ffe8cc','#ffd6e0','#dde5ff','#fff3cd','#e8f4f8','#fce4ec','#e8eaf6'];

function Toast({ msg }) {
  return msg ? <div className="toast">✓ {msg}</div> : null;
}

function ProductCard({ product, cartQty, onAdd, onRemove }) {
  return (
    <div className="product-card">
      <span className="product-emoji">{product.emoji}</span>
      <div className="product-name">{product.name}</div>
      <div className="product-qty">{product.qty}</div>
      <div className="product-shop">📍 {product.shop}</div>
      <div className="product-bottom">
        <span className="price">₹{product.price}</span>
        {cartQty === 0 ? (
          <button className="add-btn" onClick={() => onAdd(product)}>+</button>
        ) : (
          <div className="qty-control">
            <button className="qty-btn" onClick={() => onRemove(product)}>−</button>
            <span className="qty-num">{cartQty}</span>
            <button className="qty-btn" onClick={() => onAdd(product)}>+</button>
          </div>
        )}
      </div>
    </div>
  );
}

function HomePage({ cart, onAdd, onRemove, onSearch }) {
  const [bannerIdx, setBannerIdx] = useState(0);
  const [activeCat, setActiveCat] = useState(null);
  const [searchVal, setSearchVal] = useState('');

  useEffect(() => {
    const t = setInterval(() => setBannerIdx(i => (i + 1) % BANNERS.length), 3500);
    return () => clearInterval(t);
  }, []);

  const banner = BANNERS[bannerIdx];
  const filteredProducts = activeCat
    ? PRODUCTS.filter(p => p.cat === activeCat)
    : PRODUCTS.filter(p => p.popular);

  const handleSearch = (e) => {
    setSearchVal(e.target.value);
    if (e.target.value.length > 1) onSearch(e.target.value);
  };

  return (
    <div className="page">
      <header className="header">
        <div className="header-row1">
          <div className="logo">Balli<span>Mart</span></div>
          <div className="header-icons">
            <button className="icon-btn">🔔</button>
            <button className="icon-btn">👤</button>
          </div>
        </div>
        <div className="location-row">
          <span>📍</span>
          <span>Ballia, UP — Civil Lines</span>
          <span style={{fontSize:12}}>▼</span>
        </div>
        <div className="search-box" onClick={() => onSearch('')}>
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{color:'#2d6a4f'}}>
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            placeholder="Atta, chawal, sabzi dhundho..."
            value={searchVal}
            onChange={handleSearch}
            onFocus={() => onSearch('')}
          />
        </div>
      </header>

      <div className="banner-wrap">
        <div className="banner" style={{ background: banner.bg }}>
          <div className="banner-tag">🎉 Special Offer</div>
          <h2>{banner.title}</h2>
          <p>{banner.sub}</p>
          <div className="banner-emoji">{banner.emoji}</div>
        </div>
        <div className="banner-dots">
          {BANNERS.map((_, i) => (
            <div key={i} className={`dot ${i === bannerIdx ? 'active' : ''}`} onClick={() => setBannerIdx(i)} />
          ))}
        </div>
      </div>

      <div className="offer-strip">
        <span>🚴‍♂️ Free delivery on orders above ₹299 · Ballia city mein</span>
      </div>

      <div className="section">
        <div className="sec-header">
          <span className="sec-title">Categories</span>
        </div>
        <div className="cats-scroll">
          {CATEGORIES.map((cat, i) => (
            <div key={cat.id} className="cat-item" onClick={() => setActiveCat(activeCat === cat.id ? null : cat.id)}>
              <div className="cat-circle" style={{ background: CAT_COLORS[i % CAT_COLORS.length] }}>
                {cat.emoji}
              </div>
              <span className="cat-name">{cat.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="section" style={{ marginTop: 20 }}>
        <div className="sec-header">
          <span className="sec-title">{activeCat ? CATEGORIES.find(c => c.id === activeCat)?.name : 'Popular Items'}</span>
          {activeCat && <button className="see-all" onClick={() => setActiveCat(null)}>Sab dikhao</button>}
        </div>
        <div className="products-grid">
          {filteredProducts.map(p => (
            <ProductCard
              key={p.id}
              product={p}
              cartQty={cart[p.id]?.qty || 0}
              onAdd={onAdd}
              onRemove={onRemove}
            />
          ))}
        </div>
      </div>

      <div className="section" style={{ marginTop: 24, marginBottom: 8 }}>
        <div className="sec-header">
          <span className="sec-title">Local Dukaanein</span>
        </div>
        <div className="shops-list">
          {SHOPS.map(shop => (
            <div key={shop.id} className="shop-card">
              <div className="shop-icon-wrap">{shop.emoji}</div>
              <div className="shop-info">
                <div className="shop-name">{shop.name}</div>
                <div className="shop-meta">{shop.area} · {shop.dist} · {shop.rating}⭐ · {shop.time}</div>
              </div>
              <span className={`shop-badge ${shop.open ? 'badge-open' : 'badge-closed'}`}>
                {shop.open ? 'Open' : 'Closed'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SearchPage({ query, cart, onAdd, onRemove }) {
  const [q, setQ] = useState(query);
  const results = q.length > 0
    ? PRODUCTS.filter(p =>
        p.name.toLowerCase().includes(q.toLowerCase()) ||
        p.shop.toLowerCase().includes(q.toLowerCase())
      )
    : PRODUCTS;

  return (
    <div className="page">
      <header className="header">
        <div className="header-row1">
          <div className="logo">Balli<span>Mart</span></div>
        </div>
        <div className="search-box">
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{color:'#2d6a4f'}}>
            <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
          </svg>
          <input
            placeholder="Kya dhundh rahe hain?"
            value={q}
            onChange={e => setQ(e.target.value)}
            autoFocus
          />
          {q && <button onClick={() => setQ('')} style={{background:'none',border:'none',cursor:'pointer',fontSize:18,color:'#999'}}>×</button>}
        </div>
      </header>
      <div className="search-results">
        <div className="sec-title" style={{margin:'12px 0 10px'}}>{q ? `"${q}" ke results` : 'Sab Products'}</div>
        {results.length === 0 ? (
          <div className="no-result">😕 Koi product nahi mila</div>
        ) : (
          <div className="products-grid">
            {results.map(p => (
              <ProductCard
                key={p.id}
                product={p}
                cartQty={cart[p.id]?.qty || 0}
                onAdd={onAdd}
                onRemove={onRemove}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function CartPage({ cart, onAdd, onRemove, onPlaceOrder }) {
  const [coupon, setCoupon] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [payMethod, setPayMethod] = useState('cod');

  const items = Object.values(cart);
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const delivery = subtotal >= 299 ? 0 : 30;
  const discount = couponApplied ? 50 : 0;
  const total = subtotal + delivery - discount;

  const applyCoupon = () => {
    if (coupon.toUpperCase() === 'BALLIA50' && subtotal >= 199) {
      setCouponApplied(true);
    } else {
      alert('Invalid coupon or min ₹199 order required');
    }
  };

  const handleOrder = () => {
    if (!name || !phone || !address) {
      alert('Please fill name, phone, and address');
      return;
    }
    onPlaceOrder({ name, phone, address, payMethod, total });
  };

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="empty-orders">
          <div className="empty-icon">🛒</div>
          <div className="empty-title">Cart Khaali Hai!</div>
          <div className="empty-sub">Kuch items add karo</div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-header">🛒 Mera Cart ({items.length} items)</div>

      {items.map(item => (
        <div key={item.id} className="cart-item">
          <span className="cart-item-emoji">{item.emoji}</span>
          <div className="cart-item-info">
            <div className="cart-item-name">{item.name}</div>
            <div className="cart-item-qty-label">{item.qty}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
            <span className="cart-item-price">₹{item.price * item.qty}</span>
            <div className="qty-control">
              <button className="qty-btn" onClick={() => onRemove(item)}>−</button>
              <span className="qty-num">{item.qty}</span>
              <button className="qty-btn" onClick={() => onAdd(item)}>+</button>
            </div>
          </div>
        </div>
      ))}

      <div className="cart-summary">
        <div className="cart-row"><span>Subtotal</span><span>₹{subtotal}</span></div>
        <div className="cart-row"><span>Delivery</span><span>{delivery === 0 ? '🎉 FREE' : `₹${delivery}`}</span></div>
        {couponApplied && <div className="cart-row" style={{color:'#2d6a4f'}}><span>Coupon (BALLIA50)</span><span>−₹50</span></div>}
        <div className="cart-row total"><span>Total</span><span>₹{total}</span></div>
        <div className="coupon-row">
          <input className="coupon-input" placeholder="Coupon code daalo" value={coupon} onChange={e => setCoupon(e.target.value)} />
          <button className="coupon-btn" onClick={applyCoupon}>Apply</button>
        </div>
      </div>

      <div className="address-box">
        <div className="address-title">📦 Delivery Details</div>
        <div className="input-group">
          <label className="input-label">Aapka Naam</label>
          <input className="text-input" placeholder="Ramesh Kumar" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className="input-group">
          <label className="input-label">Mobile Number</label>
          <input className="text-input" placeholder="9876543210" type="tel" value={phone} onChange={e => setPhone(e.target.value)} />
        </div>
        <div className="input-group">
          <label className="input-label">Delivery Address</label>
          <input className="text-input" placeholder="Ghar/mohalla, Ballia..." value={address} onChange={e => setAddress(e.target.value)} />
        </div>
      </div>

      <div className="address-box" style={{marginTop:12}}>
        <div className="address-title">💳 Payment Method</div>
        <div className="payment-opts">
          {[
            { id: 'cod', icon: '💵', label: 'Cash on Delivery' },
            { id: 'upi', icon: '📱', label: 'UPI (GPay / PhonePe)' },
            { id: 'card', icon: '💳', label: 'Debit / Credit Card' },
          ].map(opt => (
            <div key={opt.id} className={`pay-option ${payMethod === opt.id ? 'selected' : ''}`} onClick={() => setPayMethod(opt.id)}>
              <span className="pay-option-icon">{opt.icon}</span>
              <span className="pay-option-text">{opt.label}</span>
              {payMethod === opt.id && <span style={{marginLeft:'auto',color:'#2d6a4f',fontWeight:700}}>✓</span>}
            </div>
          ))}
        </div>
      </div>

      <button className="place-order-btn" onClick={handleOrder}>
        Order Place Karo — ₹{total}
      </button>
    </div>
  );
}

function OrderSuccessPage({ order, onHome }) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setStep(1), 1500),
      setTimeout(() => setStep(2), 4000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const steps = [
    { label: 'Order confirm ho gaya', icon: '✓', state: 'done' },
    { label: 'Dukandaar pack kar raha hai', icon: '📦', state: step >= 1 ? 'active' : 'pending' },
    { label: 'Delivery boy aata hai', icon: '🚴', state: step >= 2 ? 'active' : 'pending' },
    { label: 'Aapke ghar pahunch jayega', icon: '🏠', state: 'pending' },
  ];

  return (
    <div className="success-page">
      <div className="success-icon">🎉</div>
      <div className="success-title">Order Place Ho Gaya!</div>
      <div className="success-sub">30 minute mein delivery milegi</div>
      <div className="order-id">Order #{order.id} · ₹{order.total} · {order.payMethod.toUpperCase()}</div>

      <div className="track-card" style={{width:'100%'}}>
        <div style={{fontWeight:700, marginBottom:14, color:'#1b4332'}}>📍 Live Order Tracking</div>
        <div className="track-steps">
          {steps.map((s, i) => (
            <div key={i} className="track-step">
              <div className={`step-dot ${s.state === 'done' ? 'step-done' : s.state === 'active' ? 'step-active' : 'step-pending'}`}>
                {s.icon}
              </div>
              <span className={`step-text ${s.state}`}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <button className="home-btn" onClick={onHome}>🏠 Home par jao</button>
    </div>
  );
}

function OrdersPage({ pastOrders }) {
  if (pastOrders.length === 0) {
    return (
      <div className="orders-page">
        <div className="sec-title" style={{marginBottom:20}}>Mere Orders</div>
        <div className="empty-orders">
          <div className="empty-icon">📦</div>
          <div className="empty-title">Koi order nahi!</div>
          <div className="empty-sub">Abhi pehla order karo</div>
        </div>
      </div>
    );
  }
  return (
    <div className="orders-page">
      <div className="sec-title" style={{marginBottom:16}}>Mere Orders</div>
      {pastOrders.map(order => (
        <div key={order.id} className="order-card">
          <div className="order-top">
            <span className="order-id-text">#{order.id}</span>
            <span className={`order-status ${order.status === 'Delivered' ? 'status-delivered' : 'status-pending'}`}>
              {order.status}
            </span>
          </div>
          <div className="order-items-text">{order.items} items · {order.payMethod.toUpperCase()}</div>
          <div className="order-total">₹{order.total}</div>
          <div className="order-date">{order.date}</div>
        </div>
      ))}
    </div>
  );
}

function ProfilePage() {
  const menu = [
    { icon: '📍', label: 'Mera Address' },
    { icon: '💳', label: 'Payment Methods' },
    { icon: '🎁', label: 'Mere Coupons' },
    { icon: '⭐', label: 'Reviews & Ratings' },
    { icon: '🤝', label: 'Refer Karein, ₹50 Paayein' },
    { icon: '❓', label: 'Help & Support' },
    { icon: '📞', label: 'Contact Us' },
  ];
  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="avatar">RK</div>
        <div>
          <div className="profile-name">Ramesh Kumar</div>
          <div className="profile-phone">📱 +91 98765 43210</div>
          <div style={{fontSize:12, marginTop:4, opacity:0.8}}>📍 Civil Lines, Ballia</div>
        </div>
      </div>
      <div className="menu-section">
        {menu.map((m, i) => (
          <div key={i} className="menu-item">
            <div className="menu-item-icon">{m.icon}</div>
            <span className="menu-item-text">{m.label}</span>
            <span className="menu-item-arrow">›</span>
          </div>
        ))}
      </div>
      <div style={{textAlign:'center', padding:'10px 0 4px', color:'#999', fontSize:12}}>
        BallMart v1.0 · Ballia, UP 🌾
      </div>
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState('home');
  const [cart, setCart] = useState({});
  const [toast, setToast] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [pastOrders, setPastOrders] = useState([]);
  const [currentOrder, setCurrentOrder] = useState(null);

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2000);
  }, []);

  const addToCart = useCallback((product) => {
    setCart(prev => {
      const existing = prev[product.id];
      return { ...prev, [product.id]: { ...product, qty: (existing?.qty || 0) + 1 } };
    });
    showToast(`${product.name} cart mein add hua!`);
  }, [showToast]);

  const removeFromCart = useCallback((product) => {
    setCart(prev => {
      const existing = prev[product.id];
      if (!existing || existing.qty <= 1) {
        const next = { ...prev };
        delete next[product.id];
        return next;
      }
      return { ...prev, [product.id]: { ...existing, qty: existing.qty - 1 } };
    });
  }, []);

  const cartCount = Object.values(cart).reduce((s, i) => s + i.qty, 0);
  const cartTotal = Object.values(cart).reduce((s, i) => s + i.price * i.qty, 0);

  const handleSearch = (q) => {
    setSearchQuery(q);
    setTab('search');
  };

  const handlePlaceOrder = (details) => {
    const order = {
      id: 'BM' + Date.now().toString().slice(-6),
      ...details,
      items: Object.values(cart).length,
      status: 'Preparing',
      date: new Date().toLocaleDateString('hi-IN'),
    };
    setCurrentOrder(order);
    setPastOrders(prev => [{ ...order, status: 'Delivered' }, ...prev]);
    setCart({});
    setTab('success');
  };

  const tabs = [
    { id: 'home', icon: '🏠', label: 'Home' },
    { id: 'search', icon: '🔍', label: 'Search' },
    { id: 'orders', icon: '📦', label: 'Orders' },
    { id: 'profile', icon: '👤', label: 'Profile' },
  ];

  return (
    <>
      <Toast msg={toast} />

      {tab === 'home' && <HomePage cart={cart} onAdd={addToCart} onRemove={removeFromCart} onSearch={handleSearch} />}
      {tab === 'search' && <SearchPage query={searchQuery} cart={cart} onAdd={addToCart} onRemove={removeFromCart} />}
      {tab === 'cart' && <CartPage cart={cart} onAdd={addToCart} onRemove={removeFromCart} onPlaceOrder={handlePlaceOrder} />}
      {tab === 'orders' && <OrdersPage pastOrders={pastOrders} />}
      {tab === 'profile' && <ProfilePage />}
      {tab === 'success' && currentOrder && <OrderSuccessPage order={currentOrder} onHome={() => setTab('home')} />}

      {cartCount > 0 && tab !== 'cart' && tab !== 'success' && (
        <div className="cart-bar" onClick={() => setTab('cart')}>
          <span className="cart-bar-left">🛒 {cartCount} items · Cart dekhein</span>
          <span className="cart-bar-right">₹{cartTotal} →</span>
        </div>
      )}

      <div className="tab-bar">
        {tabs.map(t => (
          <div key={t.id} className={`tab-item ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>
            <span className="tab-icon">{t.icon}</span>
            <span className="tab-label">{t.label}</span>
          </div>
        ))}
      </div>
    </>
  );
}
