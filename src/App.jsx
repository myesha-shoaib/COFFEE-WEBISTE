import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Clock3,
  Coffee,
  Heart,
  Leaf,
  MapPin,
  Menu,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  Star,
  Trash2,
  Truck,
  X,
} from 'lucide-react'
import { BrowserRouter, Link, NavLink, Route, Routes, useLocation, useParams } from 'react-router-dom'
import {
  brewMethods,
  categories,
  coffeeJourney,
  galleryImages,
  journalPosts,
  products,
  roastProfiles,
} from './data'
import './App.css'

const currentYear = new Date().getFullYear()
const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
}

function Reveal({ children, className = '' }) {
  return (
    <motion.div
      className={className}
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
    >
      {children}
    </motion.div>
  )
}

function Header({ bagCount }) {
  const [menuOpen, setMenuOpen] = useState(false)

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <>
      <div className="announcement">
        <span>Small batch roasted. Big morning energy.</span>
        <Link to="/shop">Free US shipping over $45 <ArrowUpRight size={12} /></Link>
      </div>
      <header className="site-header">
        <Link className="brand" to="/" aria-label="Morrow Coffee home" onClick={closeMenu}>
          <span className="brand-mark"><Coffee size={19} strokeWidth={1.7} /></span>
          <span>MORROW<span className="brand-dot">.</span></span>
        </Link>
        <button
          className="mobile-menu-toggle"
          type="button"
          aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
          <NavLink to="/shop" onClick={closeMenu}>Shop</NavLink>
          <NavLink to="/coffee-guide" onClick={closeMenu}>Coffee guide</NavLink>
          <NavLink to="/story" onClick={closeMenu}>Our story</NavLink>
          <NavLink to="/journal" onClick={closeMenu}>Journal</NavLink>
          <NavLink className="nav-photo-link" to="/gallery" onClick={closeMenu}>Photo diary</NavLink>
          <NavLink to="/visit" onClick={closeMenu}>Visit us</NavLink>
          <NavLink className="nav-cta" to="/shop" onClick={closeMenu}>
            Find your coffee <ArrowUpRight size={14} />
          </NavLink>
          <Link className="bag-link" to="/cart" aria-label={`Shopping bag, ${bagCount} items`} onClick={closeMenu}>
            <ShoppingBag size={18} />
            <span>Bag</span>
            <span className="bag-count">{bagCount}</span>
          </Link>
        </nav>
      </header>
    </>
  )
}

function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  function subscribe(event) {
    event.preventDefault()
    if (email.trim()) setSubscribed(true)
  }

  return (
    <>
      <section className="newsletter">
        <div>
          <p className="eyebrow"><span className="eyebrow-line" /> A NOTE FROM MORROW</p>
          <h2>A little good<br />in your <em>inbox.</em></h2>
          <p className="newsletter-copy">New beans, slow mornings, and the occasional very good thing.</p>
        </div>
        <form className="newsletter-form" onSubmit={subscribe}>
          <label className="visually-hidden" htmlFor="newsletter-email">Your email address</label>
          <input
            id="newsletter-email"
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            disabled={subscribed}
          />
          <button type="submit" disabled={subscribed}>
            {subscribed ? 'Thanks — you’re on the list' : 'Count me in'} <ArrowUpRight size={16} />
          </button>
          <p className="form-note" aria-live="polite">
            {subscribed ? 'A little note from us is on its way.' : 'No spam. Just the good stuff, now and then.'}
          </p>
        </form>
      </section>
      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-about">
            <Link className="brand footer-brand" to="/">
              <span className="brand-mark"><Coffee size={19} strokeWidth={1.7} /></span>
              <span>MORROW<span className="brand-dot">.</span></span>
            </Link>
            <p>Good coffee. Good people.<br />A little more room for slow.</p>
          </div>
          <div className="footer-links">
            <span>EXPLORE</span>
            <Link to="/shop">Shop all coffee</Link>
            <Link to="/coffee-guide">Coffee guide</Link>
            <Link to="/story">Our story</Link>
            <Link to="/journal">The journal</Link>
            <Link to="/gallery">Photo diary</Link>
            <Link to="/visit">Visit the cafe</Link>
          </div>
          <div className="footer-links">
            <span>COME ON IN</span>
            <p>42 Alder Street<br />Portland, OR 97204</p>
            <p>Mon–Fri, 7am–4pm<br />Sat–Sun, 8am–3pm</p>
            <a href="mailto:hello@morrow.coffee">hello@morrow.coffee</a>
          </div>
          <div className="footer-hours-note">
            <span className="footer-coffee-mark"><Coffee size={23} /></span>
            <p>Take the long way.<br />Stay for one more.</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {currentYear} Morrow Coffee House</span>
          <span>Thoughtfully sourced. Happily shared.</span>
          <a href="#top" className="back-top">BACK TO TOP ↑</a>
        </div>
      </footer>
    </>
  )
}

function PageIntro({ label, title, description, image, className = '' }) {
  return (
    <section className={`page-intro ${className}`}>
      {image && <img className="page-intro-image" src={image} alt="" />}
      <div className="page-intro-shade" />
      <div className="page-intro-content">
        <p className="eyebrow"><span className="eyebrow-line" /> {label}</p>
        <h1>{title}</h1>
        {description && <p className="page-intro-description">{description}</p>}
      </div>
      <div className="hero-side-note">SLOW COFFEE. GOOD COMPANY.</div>
    </section>
  )
}

function ProductCard({ product, index = 0, onAdd }) {
  function tiltCard(event) {
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 10
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * -10
    event.currentTarget.style.setProperty('--tilt-x', `${x}deg`)
    event.currentTarget.style.setProperty('--tilt-y', `${y}deg`)
  }

  function resetTilt(event) {
    event.currentTarget.style.setProperty('--tilt-x', '0deg')
    event.currentTarget.style.setProperty('--tilt-y', '0deg')
  }

  return (
    <motion.article
      className="product-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: (index % 4) * 0.07 }}
      viewport={{ once: true }}
      onMouseMove={tiltCard}
      onMouseLeave={resetTilt}
    >
      <Link className="product-card-link" to={`/shop/${product.id}`}>
        <div className="product-image-wrap">
          <img src={product.image} alt={`${product.name} coffee`} loading="lazy" />
          <span className="product-card-badge">{product.roast} roast</span>
          <span className="product-card-open" aria-hidden="true"><ArrowUpRight size={16} /></span>
          <span className="product-image-caption">{product.origin}</span>
        </div>
        <div className="product-meta">
          <span>{product.category} · {product.weight}</span>
          <span>${product.price}</span>
        </div>
        <h3>{product.name}</h3>
        <p className="product-notes">{product.notes}</p>
      </Link>
      <button className="quick-add" type="button" onClick={() => onAdd(product)}>
        <Plus size={14} /> Add to bag
      </button>
    </motion.article>
  )
}

function ProductGrid({ items, onAdd, className = '' }) {
  return (
    <div className={`product-grid ${className}`}>
      {items.map((product, index) => (
        <ProductCard key={product.id} product={product} index={index} onAdd={onAdd} />
      ))}
    </div>
  )
}

function HomePage({ onAdd }) {
  const [reviewIndex, setReviewIndex] = useState(0)
  const reviews = [
    { quote: 'The kind of coffee that makes you cancel your next meeting just to sit with it a little longer.', name: 'Maya Chen', note: 'Regular since 2021' },
    { quote: 'Finally, a neighbourhood coffee shop that feels like it was made for slow mornings.', name: 'Oliver James', note: 'Neighbour & coffee person' },
    { quote: 'Their Sunday Morning blend is a tiny ritual I look forward to all week.', name: 'Amara Brooks', note: 'Morrow coffee club' },
  ]

  return (
    <>
      <section className="hero home-hero">
        <video className="hero-video" autoPlay muted loop playsInline poster="/images/coffee-hero.jpg" aria-label="Freshly brewed coffee being poured">
          <source src="/images/coffee-pour.mp4" type="video/mp4" />
        </video>
        <div className="hero-shade" />
        <div className="hero-content">
          <motion.p className="eyebrow hero-eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }}>
            <span className="eyebrow-line" /> YOUR NEIGHBOURHOOD COFFEE HOUSE
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            Make room<br />for <em>slow.</em>
          </motion.h1>
          <motion.div className="hero-bottom" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65, duration: 0.7 }}>
            <p>Thoughtfully sourced coffee, made for the moments in between.</p>
            <Link className="round-link" to="/story" aria-label="Discover our story"><ArrowDown size={18} /></Link>
          </motion.div>
        </div>
        <div className="hero-side-note">SMALL BATCH. BIG HEART.</div>
        <div className="hero-counter"><span>01</span> / 03</div>
        <div className="hero-product" aria-label="Our Velvet Espresso coffee bag">
          <span className="hero-product-seal">M<br />✳<br />R</span>
          <span className="hero-product-small">MORROW · HOUSE BLEND</span>
          <span className="hero-product-name">Velvet<br /><em>Espresso</em></span>
          <span className="hero-product-origin">BRAZIL · COLOMBIA<br />NOTES OF CACAO & FIG</span>
          <span className="hero-product-weight">250 G · WHOLE BEAN</span>
          <span className="hero-product-shine" />
        </div>
      </section>

      <div className="marquee" aria-label="Made slowly, served warmly, shared daily">
        <div className="marquee-track">
          {[0, 1].map((repeat) => (
            <span className="marquee-group" key={repeat} aria-hidden={repeat === 1}>
              MADE SLOWLY <span>✳</span> SERVED WARMLY <span>✳</span> SHARED DAILY <span>✳</span>
              MADE SLOWLY <span>✳</span> SERVED WARMLY <span>✳</span> SHARED DAILY <span>✳</span>
            </span>
          ))}
        </div>
      </div>

      <section className="promise-strip">
        <div><Leaf size={17} /><span>Thoughtfully sourced</span></div>
        <span className="promise-divider">✳</span>
        <div><Coffee size={17} /><span>Roasted in small batches</span></div>
        <span className="promise-divider">✳</span>
        <div><Heart size={17} /><span>Made to be shared</span></div>
        <span className="promise-divider">✳</span>
        <div><Truck size={17} /><span>At your door in a few days</span></div>
      </section>

      <section className="story section-pad">
        <Reveal className="story-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> A LITTLE ABOUT US</p>
          <h2>Good things take<br />their <em>sweet time.</em></h2>
          <p className="body-copy">We believe the best part of your day shouldn’t be rushed. So we find beautiful beans, roast them with care, and make every cup like it matters — because it does.</p>
          <Link className="text-link" to="/story">Get to know us <ArrowUpRight size={16} /></Link>
          <div className="story-stamp" aria-hidden="true"><span>ROASTED WITH CARE</span><Coffee size={25} strokeWidth={1.3} /><span>SHARED WITH LOVE</span></div>
        </Reveal>
        <motion.div className="story-visual" initial={{ opacity: 0, scale: 0.96, rotateY: -8 }} whileInView={{ opacity: 1, scale: 1, rotateY: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <img src="/images/coffee-shop.jpg" alt="Warm light falling across a neighbourhood coffee shop" loading="lazy" />
          <div className="story-photo-caption"><span>EST. 2018</span><span>PORTLAND, OR</span></div>
          <div className="story-photo-note">A place to<br />stay awhile.</div>
        </motion.div>
      </section>

      <section className="coffee-section section-pad">
        <div className="section-heading">
          <div><p className="eyebrow"><span className="eyebrow-line" /> ROASTED HERE. LOVED EVERYWHERE.</p><h2>Meet your <em>new regular.</em></h2></div>
          <Link className="text-link heading-link" to="/shop">Shop all coffee <ArrowUpRight size={16} /></Link>
        </div>
        <ProductGrid items={products.slice(0, 3)} onAdd={onAdd} />
      </section>

      <section className="origin-banner">
        <img src="/images/gallery-20.jpg" alt="Coffee ready for the morning" loading="lazy" />
        <div className="origin-overlay" />
        <div className="origin-copy">
          <p className="eyebrow"><span className="eyebrow-line" /> FROM THE FARM TO YOUR FAVOURITE MUG</p>
          <h2>Good coffee has<br /><em>a good story.</em></h2>
          <p>Meet the growers, the roasters, and all the hands in between.</p>
          <Link className="text-link" to="/story">The way we do things <ArrowUpRight size={16} /></Link>
        </div>
        <span className="origin-coordinate">PORTLAND, OR · 45°31′12″ N</span>
      </section>

      <section className="journal-preview section-pad">
        <div className="section-heading">
          <div><p className="eyebrow"><span className="eyebrow-line" /> POSTCARDS FROM MORROW</p><h2>A little <em>slow reading.</em></h2></div>
          <Link className="text-link heading-link" to="/journal">Visit the journal <ArrowUpRight size={16} /></Link>
        </div>
        <JournalCards items={journalPosts.slice(0, 3)} />
      </section>

      <section className="quote-band">
        <div className="quote-decoration" aria-hidden="true">“</div>
        <motion.div className="quote-inner" key={reviewIndex} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
          <p className="eyebrow"><span className="eyebrow-line" /> WORDS FROM OUR PEOPLE</p>
          <div className="review-stars" aria-label="5 out of 5 stars">{Array.from({ length: 5 }, (_, index) => <Star key={index} size={13} fill="currentColor" />)}</div>
          <blockquote>“{reviews[reviewIndex].quote}”</blockquote>
          <p className="review-byline">{reviews[reviewIndex].name}<span> · {reviews[reviewIndex].note}</span></p>
          <div className="review-controls">
            <button type="button" className="slider-arrow" aria-label="Previous review" onClick={() => setReviewIndex((reviewIndex + reviews.length - 1) % reviews.length)}><ArrowLeft size={17} /></button>
            <span>0{reviewIndex + 1} <i>/</i> 0{reviews.length}</span>
            <button type="button" className="slider-arrow" aria-label="Next review" onClick={() => setReviewIndex((reviewIndex + 1) % reviews.length)}><ArrowRight size={17} /></button>
          </div>
        </motion.div>
      </section>

      <VisitTeaser />
    </>
  )
}

function VisitTeaser() {
  return (
    <section className="visit section-pad">
      <div className="visit-card">
        <div className="visit-photo">
          <img src="/images/coffee-latte.jpg" alt="A freshly made latte ready to enjoy" loading="lazy" />
          <span className="visit-photo-tag">PULL UP A CHAIR</span>
          <span className="visit-photo-index">01 — YOUR NEIGHBOURHOOD</span>
        </div>
        <div className="visit-info">
          <p className="eyebrow"><span className="eyebrow-line" /> YOUR TABLE'S WAITING</p>
          <h2>See you<br /><em>in a minute.</em></h2>
          <div className="visit-detail"><MapPin size={16} /><span>42 Alder Street<br />Portland, OR 97204</span></div>
          <div className="visit-detail"><Clock3 size={16} /><span>Mon–Fri, 7am–4pm<br />Sat–Sun, 8am–3pm</span></div>
          <Link className="text-link" to="/visit">A little more about the cafe <ArrowUpRight size={16} /></Link>
        </div>
      </div>
    </section>
  )
}

function ShopPage({ onAdd }) {
  const [activeCategory, setActiveCategory] = useState('All coffee')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('Featured')
  const filteredProducts = products
    .filter((product) => activeCategory === 'All coffee' || product.category === activeCategory)
    .filter((product) => `${product.name} ${product.origin} ${product.notes}`.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => sort === 'Price: low to high' ? a.price - b.price : sort === 'Price: high to low' ? b.price - a.price : 0)

  return (
    <>
      <PageIntro label="ROASTED WITH A LITTLE MORE CARE" title={<>Coffee for<br /><em>your kind of day.</em></>} description="Small-batch, thoughtfully sourced, and ready to make itself at home in your kitchen." image="/images/gallery-21.jpg" />
      <main className="shop-page section-pad">
        <div className="shop-toolbar">
          <div className="category-list" role="group" aria-label="Filter coffee by category">
            {categories.map((category) => <button key={category} className={activeCategory === category ? 'category-chip active' : 'category-chip'} type="button" onClick={() => setActiveCategory(category)}>{category}</button>)}
          </div>
          <div className="shop-tools">
            <label className="search-field"><Search size={16} /><span className="visually-hidden">Search coffee</span><input type="search" placeholder="Find your coffee" value={search} onChange={(event) => setSearch(event.target.value)} /></label>
            <label className="sort-field"><span className="visually-hidden">Sort coffee</span><select value={sort} onChange={(event) => setSort(event.target.value)}><option>Featured</option><option>Price: low to high</option><option>Price: high to low</option></select><ChevronDown size={14} /></label>
          </div>
        </div>
        <p className="results-count">{filteredProducts.length} lovely coffees <span>·</span> Always freshly roasted</p>
        {filteredProducts.length ? <ProductGrid items={filteredProducts} onAdd={onAdd} /> : <div className="empty-results"><Coffee size={25} /><h2>No coffee in that corner just yet.</h2><button className="text-link" type="button" onClick={() => { setSearch(''); setActiveCategory('All coffee') }}>See all coffee <ArrowRight size={15} /></button></div>}
        <div className="shop-promise"><span><Check size={14} /> Roasted fresh every week</span><span><Check size={14} /> Free shipping over $45</span><span><Check size={14} /> Help from a real coffee person</span></div>
      </main>
    </>
  )
}

function ProductPage({ onAdd }) {
  const { productId } = useParams()
  const product = products.find((item) => item.id === productId)
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  if (!product) return <NotFound />

  function addProduct() {
    onAdd(product, quantity)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1800)
  }

  return (
    <main className="product-detail-page section-pad">
      <nav className="breadcrumbs" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><Link to="/shop">Coffee</Link><span>/</span><span>{product.name}</span></nav>
      <div className="product-detail">
        <div className="product-detail-visual">
          <img src={product.image} alt={`${product.name}, freshly roasted coffee`} />
          <span className="detail-photo-note">A LITTLE<br />GOOD IN<br />EVERY CUP.</span>
          <div className="detail-photo-count">MORROW ROASTERS <span>✳</span> PORTLAND, OR</div>
        </div>
        <div className="product-detail-info">
          <p className="eyebrow"><span className="eyebrow-line" /> {product.category.toUpperCase()} · {product.roast.toUpperCase()} ROAST</p>
          <h1>{product.name}</h1>
          <div className="detail-rating"><span>★★★★★</span> <span>4.9 · 128 coffee people</span></div>
          <p className="detail-price">${product.price}<span> / {product.weight}</span></p>
          <p className="detail-description">{product.description}</p>
          <div className="tasting-notes"><span>IN THE CUP</span><p>{product.notes}</p></div>
          <div className="detail-origin-grid"><div><span>GROWN IN</span><p>{product.origin}</p></div><div><span>PROCESS</span><p>{product.process}</p></div></div>
          <div className="purchase-row">
            <div className="quantity-picker">
              <button type="button" aria-label="Remove one" disabled={quantity <= 1} onClick={() => setQuantity(quantity - 1)}><Minus size={14} /></button>
              <span aria-live="polite">{quantity}</span>
              <button type="button" aria-label="Add one" onClick={() => setQuantity(quantity + 1)}><Plus size={14} /></button>
            </div>
            <button type="button" className={added ? 'button-primary added' : 'button-primary'} onClick={addProduct}>{added ? <><Check size={16} /> Added to your bag</> : <>Add to bag — ${product.price * quantity} <ShoppingBag size={16} /></>}</button>
          </div>
          <p className="shipping-note"><Truck size={15} /> Free shipping when your coffee bag reaches $45</p>
          <div className="brew-card"><Coffee size={20} /><div><span>MAKE IT YOUR WAY</span><p>Lovely as a pour-over, French press, or your favourite espresso.</p></div><Link to="/journal/pour-over-notes" aria-label="Read our brew guide"><ArrowUpRight size={17} /></Link></div>
        </div>
      </div>
      <div className="detail-extra"><span>MORE TO LOVE</span><Link className="text-link" to="/shop">Shop all coffee <ArrowUpRight size={15} /></Link></div>
      <ProductGrid items={products.filter((item) => item.id !== product.id).slice(0, 4)} onAdd={onAdd} />
    </main>
  )
}

function CartPage({ items, onUpdateQuantity, onRemove }) {
  const subtotal = items.reduce((total, item) => total + item.product.price * item.quantity, 0)
  const shippingRemaining = Math.max(0, 45 - subtotal)
  const order = items.map(({ product, quantity }) => `${quantity} × ${product.name} (${product.weight})`).join('\n')
  const subject = encodeURIComponent('A little Morrow coffee order')
  const body = encodeURIComponent(`${order}\n\nSubtotal: $${subtotal.toFixed(2)}\n\nPlease let me know about shipping and next steps.`)

  return (
    <main className="cart-page section-pad">
      <nav className="breadcrumbs" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><span>Your bag</span></nav>
      <div className="cart-heading"><div><p className="eyebrow"><span className="eyebrow-line" /> JUST THE GOOD STUFF</p><h1>Your coffee<br /><em>bag.</em></h1></div><Link className="text-link" to="/shop">Keep wandering <ArrowRight size={15} /></Link></div>
      {items.length ? (
        <div className="cart-layout">
          <div className="cart-items">
            {items.map(({ product, quantity }) => (
              <article className="cart-item" key={product.id}>
                <Link to={`/shop/${product.id}`} className="cart-item-image"><img src={product.image} alt="" /></Link>
                <div className="cart-item-info">
                  <span>{product.category} · {product.weight}</span>
                  <h2><Link to={`/shop/${product.id}`}>{product.name}</Link></h2>
                  <p>{product.notes}</p>
                  <div className="cart-item-actions">
                    <div className="quantity-picker">
                      <button type="button" aria-label={`Remove one ${product.name}`} onClick={() => onUpdateQuantity(product.id, quantity - 1)}><Minus size={13} /></button>
                      <span aria-live="polite">{quantity}</span>
                      <button type="button" aria-label={`Add one ${product.name}`} onClick={() => onUpdateQuantity(product.id, quantity + 1)}><Plus size={13} /></button>
                    </div>
                    <button className="remove-item" type="button" onClick={() => onRemove(product.id)}><Trash2 size={13} /> Remove</button>
                  </div>
                </div>
                <strong className="cart-item-price">${(product.price * quantity).toFixed(2)}</strong>
              </article>
            ))}
          </div>
          <aside className="cart-summary">
            <p className="eyebrow"><span className="eyebrow-line" /> A LITTLE ORDER MATH</p>
            <h2>Your total.</h2>
            <div className="cart-subtotal"><span>Subtotal</span><strong>${subtotal.toFixed(2)}</strong></div>
            <p className="cart-shipping">{shippingRemaining ? `Add $${shippingRemaining.toFixed(2)} more for free US shipping.` : 'Lovely — your US shipping is on us.'}</p>
            <div className="cart-shipping-bar"><span style={{ width: `${Math.min(100, (subtotal / 45) * 100)}%` }} /></div>
            <p className="cart-shipping-footnote">Shipping and any applicable tax are confirmed when we reply.</p>
            <a className="button-primary cart-checkout" href={`mailto:hello@morrow.coffee?subject=${subject}&body=${body}`}>Email your order inquiry <ArrowUpRight size={15} /></a>
            <p className="cart-demo-note">No online payment here—just your order, ready to email to a real coffee person.</p>
            <Link className="text-link" to="/visit">Questions? Come say hello <ArrowRight size={14} /></Link>
          </aside>
        </div>
      ) : (
        <div className="empty-cart"><span><ShoppingBag size={25} /></span><h2>It is a little quiet in here.</h2><p>Your next favourite cup is waiting to be found.</p><Link className="button-primary" to="/shop">Find your coffee <ArrowUpRight size={15} /></Link></div>
      )}
    </main>
  )
}

function StoryPage() {
  return (
    <>
      <PageIntro label="A SMALL PLACE WITH A BIG SOFT SPOT FOR COFFEE" title={<>A little more<br />room for <em>slow.</em></>} description="We are Morrow: a neighbourhood coffee house, a very small roastery, and a good excuse to stay a little longer." image="/images/gallery-22.jpg" />
      <main className="story-page">
        <section className="story-intro section-pad">
          <Reveal><p className="eyebrow"><span className="eyebrow-line" /> HOW IT STARTED</p><h2>One little table.<br /><em>One really good cup.</em></h2></Reveal>
          <Reveal className="story-intro-copy"><p>In 2018, we found an old corner space on Alder Street, a second-hand espresso machine, and a table that was always a little too small.</p><p>We opened Morrow to make a kind of coffee house we wanted in our own neighbourhood: good coffee without the fuss, a warm hello without an agenda, and room for one more chair whenever somebody needed one.</p><p>A few years and an awful lot of cups later, that is still the idea. It just smells a little more like a roastery now.</p></Reveal>
        </section>
        <section className="story-photo-grid section-pad">
          <figure className="story-photo-large"><img src="/images/gallery-23.jpg" alt="A beautifully made cup of coffee at the cafe" loading="lazy" /><figcaption>THE FIRST CUP IS ALWAYS OUR FAVOURITE.</figcaption></figure>
          <figure className="story-photo-small"><img src="/images/gallery-24.jpg" alt="Coffee made with care in our neighbourhood cafe" loading="lazy" /><figcaption>42 ALDER STREET · EST. 2018</figcaption></figure>
        </section>
        <section className="values-section section-pad">
          <div className="section-heading"><div><p className="eyebrow"><span className="eyebrow-line" /> WHAT WE BELIEVE</p><h2>Good coffee.<br /><em>No funny business.</em></h2></div></div>
          <div className="values-grid">
            <article><span>01</span><Leaf size={24} /><h3>Know where it comes from.</h3><p>We buy from growers we know, pay fair prices, and keep looking for better ways to care for the places that make coffee possible.</p></article>
            <article><span>02</span><Coffee size={24} /><h3>Make it with care.</h3><p>Small batches, curious roasters, fresh beans. No shortcuts, no tricks—just a lot of attention to the details that make a great cup.</p></article>
            <article><span>03</span><Heart size={24} /><h3>Make room for people.</h3><p>Everyone gets a warm hello, an unhurried coffee, and a place at the table. The best cup is the one you share.</p></article>
          </div>
        </section>
        <section className="story-ending">
          <img src="/images/gallery-25.jpg" alt="Come by for a slow cup and a little conversation" loading="lazy" />
          <div><p className="eyebrow"><span className="eyebrow-line" /> THE KETTLE'S ALWAYS ON</p><h2>We saved<br />you a <em>seat.</em></h2><Link className="text-link" to="/visit">Come visit us <ArrowUpRight size={16} /></Link></div>
        </section>
      </main>
    </>
  )
}

function JournalCards({ items }) {
  return (
    <div className="journal-grid">
      {items.map((post, index) => (
        <motion.article className="journal-card" key={post.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }} viewport={{ once: true }}>
          <Link to={`/journal/${post.slug}`} className="journal-image"><img src={post.image} alt="" loading="lazy" /><span><ArrowUpRight size={17} /></span></Link>
          <div className="journal-meta"><span>{post.category}</span><span>{post.readTime}</span></div>
          <h3><Link to={`/journal/${post.slug}`}>{post.title}</Link></h3>
          <p>{post.excerpt}</p>
          <Link className="journal-read-link" to={`/journal/${post.slug}`}>Read the story <ArrowRight size={14} /></Link>
        </motion.article>
      ))}
    </div>
  )
}

function JournalPage() {
  const [activeCategory, setActiveCategory] = useState('All stories')
  const journalCategories = ['All stories', ...new Set(journalPosts.map((post) => post.category))]
  const posts = activeCategory === 'All stories' ? journalPosts : journalPosts.filter((post) => post.category === activeCategory)

  return (
    <>
      <PageIntro label="NOTES FROM OUR LITTLE CORNER" title={<>Stories for a<br /><em>slower moment.</em></>} description="Coffee people, good places, and small rituals worth taking your time over." image="/images/gallery-26.jpg" />
      <main className="journal-page section-pad">
        <div className="category-list journal-filters" role="group" aria-label="Filter journal by category">
          {journalCategories.map((category) => <button key={category} type="button" className={activeCategory === category ? 'category-chip active' : 'category-chip'} onClick={() => setActiveCategory(category)}>{category}</button>)}
        </div>
        <JournalCards items={posts} />
        <section className="journal-photo-archive"><div><p className="eyebrow"><span className="eyebrow-line" /> LIFE AROUND THE ROASTERY</p><h2>Little things<br />we <em>love looking at.</em></h2><p className="archive-intro">A hundred little moments from the people, places, and cups that make Morrow.</p><Link className="text-link" to="/gallery">Wander through all 100 photos <ArrowUpRight size={15} /></Link></div><div className="archive-photo-grid">{galleryImages.slice(52, 60).map((photo, index) => <img key={photo.src} src={photo.src} alt={`A moment around Morrow Coffee, ${index + 1}`} loading="lazy" />)}</div></section>
      </main>
    </>
  )
}

function CoffeeGuidePage() {
  const [activeMethodId, setActiveMethodId] = useState(brewMethods[0].id)
  const [servings, setServings] = useState(1)
  const [activeRoastId, setActiveRoastId] = useState(roastProfiles[1].id)
  const [openQuestion, setOpenQuestion] = useState(0)
  const activeMethod = brewMethods.find((method) => method.id === activeMethodId) ?? brewMethods[0]
  const activeRoast = roastProfiles.find((profile) => profile.id === activeRoastId) ?? roastProfiles[1]
  const brewQuestions = [
    { question: 'How fresh should my coffee be?', answer: 'For the clearest flavour, give freshly roasted coffee about a week to rest, then enjoy it over the next four to six weeks. Once a bag is open, keep it sealed and out of heat, sunlight, and moisture.' },
    { question: 'Should I grind my beans before brewing?', answer: 'Whole beans keep their aroma for longer. Grind just before brewing, and match the grind to your brewer: finer for espresso, medium for pour-over, and coarser for a French press.' },
    { question: 'My coffee tastes sour. What should I adjust?', answer: 'Try a slightly finer grind or warmer water, and let the coffee brew a little longer. Change just one thing at a time so you can find what makes the cup sweeter.' },
    { question: 'My coffee tastes bitter. What should I adjust?', answer: 'A coarser grind, a little less brew time, or slightly cooler water can help. Also check that your beans and equipment are clean and the dose matches your water.' },
    { question: 'Can I brew a delicious cup without a scale?', answer: 'Of course. A scale makes the first try easier to repeat, but measuring spoonfuls, keeping the method consistent, and trusting your taste work just fine.' },
  ]

  return (
    <>
      <PageIntro
        label="A FEW FRIENDLY NOTES ABOUT COFFEE"
        title={<>Coffee, made<br /><em>a little clearer.</em></>}
        description="A practical little field guide: where beans come from, how to brew them, and how to find your own favourite cup."
        image="/images/gallery-59.jpg"
      />
      <main className="coffee-guide-page">
        <nav className="guide-toc section-pad" aria-label="Coffee guide sections">
          <a href="#journey">From cherry to cup <ArrowDown size={13} /></a>
          <a href="#roasts">Find your roast <ArrowDown size={13} /></a>
          <a href="#brew-recipes">Brew a lovely cup <ArrowDown size={13} /></a>
          <a href="#coffee-questions">A few questions <ArrowDown size={13} /></a>
        </nav>

        <section className="guide-intro section-pad">
          <div className="guide-intro-lead">
            <p className="eyebrow"><span className="eyebrow-line" /> FIRST THINGS FIRST</p>
            <h2>Coffee starts<br />with a <em>cherry.</em></h2>
          </div>
          <div className="guide-intro-copy">
            <p>Every coffee bean is a seed from a coffee cherry. The grower, the place, the harvest, and the way each cherry is processed all leave a mark on the cup.</p>
            <p>You do not need to memorize tasting notes or buy a shelf full of gadgets. A little curiosity, fresh beans, and the method already in your kitchen are more than enough to get started.</p>
            <div className="guide-fact-row"><span><strong>5</strong> little steps</span><span><strong>4</strong> brew recipes</span><span><strong>0</strong> rules to memorize</span></div>
          </div>
        </section>

        <section className="journey-section section-pad" id="journey">
          <div className="guide-section-heading">
            <p className="eyebrow"><span className="eyebrow-line" /> A LONG WAY, LOVINGLY TRAVELLED</p>
            <h2>From the branch<br />to your <em>favourite mug.</em></h2>
            <p>Good coffee does not happen by accident. Here is the lovely, many-handed journey behind a cup.</p>
          </div>
          <div className="journey-list">
            {coffeeJourney.map((stage, index) => (
              <article className={`journey-card ${index % 2 ? 'journey-card-reverse' : ''}`} key={stage.step}>
                <div className="journey-image">
                  <img src={stage.image} alt={`${stage.title}: ${stage.detail}`} loading="lazy" />
                  <span>{stage.step} / 05</span>
                </div>
                <div className="journey-copy">
                  <span>{stage.title}</span>
                  <h3>{stage.heading}</h3>
                  <p>{stage.body}</p>
                  <small>{stage.detail}</small>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="roast-section section-pad" id="roasts">
          <div className="guide-section-heading">
            <p className="eyebrow"><span className="eyebrow-line" /> NO SECRET HANDSHAKE REQUIRED</p>
            <h2>Pick a roast<br />that sounds <em>like you.</em></h2>
            <p>Roast level is one small clue—not a quality score or a rule about how you have to drink your coffee.</p>
          </div>
          <div className="roast-picker" role="group" aria-label="Choose a coffee roast level">
            {roastProfiles.map((profile, index) => (
              <button
                type="button"
                aria-pressed={profile.id === activeRoastId}
                className={`roast-option ${profile.id === activeRoastId ? 'active' : ''}`}
                key={profile.id}
                onClick={() => setActiveRoastId(profile.id)}
              >
                <span className="roast-marker" style={{ '--roast-color': profile.color }}><i /><i /><i /></span>
                <span>0{index + 1} · {profile.label}</span>
                <span className="roast-chevron"><ArrowUpRight size={15} /></span>
              </button>
            ))}
          </div>
          <motion.div
            className="roast-detail"
            id="roast-detail"
            aria-live="polite"
            key={activeRoast.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28 }}
          >
            <span>WHAT IT MIGHT TASTE LIKE</span>
            <h3>{activeRoast.character}</h3>
            <p>{activeRoast.notes}</p>
            <small>{activeRoast.detail}</small>
          </motion.div>
        </section>

        <section className="brew-section section-pad" id="brew-recipes">
          <div className="guide-section-heading brew-heading">
            <p className="eyebrow"><span className="eyebrow-line" /> FOUR WAYS TO MAKE A MOMENT</p>
            <h2>Let’s brew<br />a <em>good one.</em></h2>
            <p>Pick what you have at home. The little recipe below adjusts itself when you make coffee for more people.</p>
          </div>
          <div className="brew-method-tabs" role="group" aria-label="Choose how to brew">
            {brewMethods.map((method) => (
              <button
                type="button"
                aria-pressed={method.id === activeMethodId}
                className={`brew-method-tab ${method.id === activeMethodId ? 'active' : ''}`}
                key={method.id}
                onClick={() => setActiveMethodId(method.id)}
              >
                <span>{method.icon}</span>
                {method.name}
                <small>{method.maker}</small>
              </button>
            ))}
          </div>
          <motion.div
            className="brew-recipe-card"
            id="brew-method-detail"
            aria-live="polite"
            key={activeMethod.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="recipe-overview">
              <div><p className="eyebrow"><span className="eyebrow-line" /> A RECIPE TO MAKE YOUR OWN</p><h3>{activeMethod.name}, nice and easy.</h3><p>Start here. Then follow your taste: every brewer, grinder, and bag of coffee has its own little quirks.</p></div>
              <div className="serving-picker">
                <span>MAKE IT FOR</span>
                <div role="group" aria-label="Number of servings">
                  {[1, 2, 3, 4].map((count) => (
                    <button className={count === servings ? 'active' : ''} type="button" aria-pressed={count === servings} key={count} onClick={() => setServings(count)}>{count}</button>
                  ))}
                </div>
                <small>{activeMethod.id === 'espresso' ? `${servings} ${servings === 1 ? 'shot' : 'shots'}` : `${servings} ${servings === 1 ? 'cup' : 'cups'}`}</small>
              </div>
            </div>
            <div className="recipe-stats">
              <div><span>COFFEE</span><strong>{activeMethod.dose * servings}<small> g</small></strong></div>
              <div><span>WATER IN</span><strong>{activeMethod.water * servings}<small> g</small></strong></div>
              <div><span>GOOD WAIT</span><strong>{activeMethod.time}</strong></div>
              <div><span>GRIND</span><strong>{activeMethod.grind}</strong></div>
              <div><span>WATER TEMP</span><strong>{activeMethod.temperature}</strong></div>
            </div>
            <ol className="recipe-steps">
              {activeMethod.steps.map((step, index) => <li key={step}><span>0{index + 1}</span><p>{step}</p></li>)}
            </ol>
            <p className="recipe-footer-note"><Coffee size={15} /> Let your taste have the last word. A slightly different grind can change everything.</p>
          </motion.div>
        </section>

        <section className="coffee-questions section-pad" id="coffee-questions">
          <div className="guide-section-heading">
            <p className="eyebrow"><span className="eyebrow-line" /> NO QUIZ AT THE END, PROMISE</p>
            <h2>A few <em>good questions.</em></h2>
            <p>Little fixes for the things we get asked over a cup.</p>
          </div>
          <div className="coffee-faq-list">
            {brewQuestions.map((item, index) => (
              <div className={openQuestion === index ? 'coffee-faq-item open' : 'coffee-faq-item'} key={item.question}>
                <button type="button" aria-expanded={openQuestion === index} onClick={() => setOpenQuestion(openQuestion === index ? -1 : index)}>
                  <span><small>0{index + 1}</small>{item.question}</span>
                  {openQuestion === index ? <Minus size={16} /> : <Plus size={16} />}
                </button>
                {openQuestion === index && <p>{item.answer}</p>}
              </div>
            ))}
          </div>
        </section>

        <section className="guide-last-word section-pad">
          <img src="/images/gallery-57.jpg" alt="A quiet cup of coffee surrounded by green leaves" loading="lazy" />
          <div>
            <p className="eyebrow"><span className="eyebrow-line" /> ONE LAST THING</p>
            <h2>Your favourite cup<br />is <em>the one you love.</em></h2>
            <p>Not the one in a tasting chart. Not the one made with the fanciest kettle. Start where you are, make yourself a cup, and trust what tastes good to you.</p>
            <Link className="text-link" to="/shop">Find a coffee to try <ArrowUpRight size={15} /></Link>
          </div>
        </section>
      </main>
    </>
  )
}

function GalleryPage() {
  const [visibleCount, setVisibleCount] = useState(24)
  const [selectedIndex, setSelectedIndex] = useState(null)
  const photosToShow = galleryImages.slice(0, visibleCount)

  useEffect(() => {
    if (selectedIndex === null) return undefined

    function handleKeyDown(event) {
      if (event.key === 'Escape') setSelectedIndex(null)
      if (event.key === 'ArrowRight') setSelectedIndex((selectedIndex + 1) % galleryImages.length)
      if (event.key === 'ArrowLeft') setSelectedIndex((selectedIndex + galleryImages.length - 1) % galleryImages.length)
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [selectedIndex])

  return (
    <>
      <PageIntro label="100 LITTLE MOMENTS · ALL OUR OWN" title={<>The Morrow<br /><em>photo diary.</em></>} description="A hundred cups, corners, beans, and in-between moments. Every photo, right here in the project." image="/images/gallery-65.jpg" />
      <main className="gallery-page section-pad">
        <div className="gallery-heading">
          <div><p className="eyebrow"><span className="eyebrow-line" /> LITTLE THINGS, LOOKING LOVELY</p><h2>A hundred ways<br />to take it <em>slow.</em></h2></div>
          <p>Every image has been downloaded into this project. Pick a photo, take a closer look, and stay awhile.</p>
        </div>
        <div className="gallery-count"><span>SHOWING <strong>{photosToShow.length}</strong> OF <strong>{galleryImages.length}</strong></span><span>✳ ALL IMAGES STORED LOCALLY</span></div>
        <div className="photo-gallery">
          {photosToShow.map((photo, index) => (
            <button className={`photo-tile ${index % 12 === 0 || index % 12 === 5 ? 'photo-tile-tall' : ''} ${index % 12 === 3 || index % 12 === 9 ? 'photo-tile-wide' : ''}`} key={photo.src} type="button" aria-label={`View coffee photo ${index + 1}`} onClick={() => setSelectedIndex(index)}>
              <img src={photo.src} alt={photo.alt} loading={index < 12 ? 'eager' : 'lazy'} />
              <span className="photo-tile-caption"><span>MORROW MOMENT</span><span>{String(index + 1).padStart(2, '0')} / 100</span></span>
              <span className="photo-tile-open" aria-hidden="true"><ArrowUpRight size={16} /></span>
            </button>
          ))}
        </div>
        {visibleCount < galleryImages.length && (
          <button className="gallery-load-more" type="button" onClick={() => setVisibleCount(Math.min(visibleCount + 20, galleryImages.length))}>
            A few more moments <Plus size={16} /><span>{galleryImages.length - visibleCount} photos waiting</span>
          </button>
        )}
        {selectedIndex !== null && (
          <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label={`Coffee photo ${selectedIndex + 1} of ${galleryImages.length}`} onClick={(event) => { if (event.target === event.currentTarget) setSelectedIndex(null) }}>
            <button className="lightbox-close" type="button" aria-label="Close photo" onClick={() => setSelectedIndex(null)}><X size={20} /></button>
            <button className="lightbox-arrow lightbox-previous" type="button" aria-label="Previous photo" onClick={() => setSelectedIndex((selectedIndex + galleryImages.length - 1) % galleryImages.length)}><ArrowLeft size={20} /></button>
            <figure className="lightbox-figure">
              <img src={galleryImages[selectedIndex].src} alt={galleryImages[selectedIndex].alt} />
              <figcaption><span>A LITTLE MOMENT FROM MORROW</span><span>{String(selectedIndex + 1).padStart(2, '0')} / {galleryImages.length}</span></figcaption>
            </figure>
            <button className="lightbox-arrow lightbox-next" type="button" aria-label="Next photo" onClick={() => setSelectedIndex((selectedIndex + 1) % galleryImages.length)}><ArrowRight size={20} /></button>
          </div>
        )}
      </main>
    </>
  )
}

function JournalArticlePage() {
  const { slug } = useParams()
  const post = journalPosts.find((item) => item.slug === slug)
  if (!post) return <NotFound />

  return (
    <main className="article-page">
      <div className="article-top section-pad"><nav className="breadcrumbs" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><Link to="/journal">Journal</Link><span>/</span><span>{post.category}</span></nav><Link className="back-journal" to="/journal"><ArrowLeft size={14} /> All stories</Link></div>
      <header className="article-header"><p className="eyebrow"><span className="eyebrow-line" /> {post.category.toUpperCase()} · {post.readTime.toUpperCase()}</p><h1>{post.title}</h1><p>{post.excerpt}</p><span>{post.date} <i>·</i> A note from Morrow</span></header>
      <figure className="article-image"><img src={post.image} alt="" /><figcaption>A little moment from around the roastery.</figcaption></figure>
      <article className="article-body">
        <div className="article-side-note">MORROW JOURNAL<br />SLOW COFFEE, GOOD COMPANY</div>
        {post.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        <aside><Coffee size={21} /><p>A cup is better when you take your time.<br /><span>See you around the table.</span></p></aside>
        <Link className="text-link" to="/shop">Find a coffee for the ritual <ArrowUpRight size={15} /></Link>
      </article>
      <section className="related-stories section-pad"><div className="section-heading"><div><p className="eyebrow"><span className="eyebrow-line" /> KEEP WANDERING</p><h2>More <em>little stories.</em></h2></div><Link className="text-link heading-link" to="/journal">The whole journal <ArrowUpRight size={15} /></Link></div><JournalCards items={journalPosts.filter((item) => item.slug !== slug).slice(0, 3)} /></section>
    </main>
  )
}

function VisitPage() {
  const [openQuestion, setOpenQuestion] = useState(0)
  const [sent, setSent] = useState(false)
  const faqs = [
    { q: 'Do you have oat milk?', a: 'Always. We also have whole milk and a couple of other friendly alternatives. Just tell us what sounds good.' },
    { q: 'Can I bring my dog?', a: 'Well-behaved dogs and their favourite people are very welcome at our outdoor tables.' },
    { q: 'Do you sell coffee beans at the cafe?', a: 'Yes! Our full rotating selection is on the shelf, and the team can help you choose beans for your brew setup.' },
    { q: 'Is there a spot to work for a little while?', a: 'There are a few window seats with outlets, especially on weekday mornings. The wifi password is on the menu.' },
  ]

  function sendMessage(event) {
    event.preventDefault()
    setSent(true)
  }

  return (
    <>
      <PageIntro label="A COZY CORNER ON ALDER STREET" title={<>Your seat is<br /><em>waiting.</em></>} description="Come for the coffee. Stay because you are right where you need to be." image="/images/gallery-27.jpg" />
      <main className="visit-page section-pad">
        <section className="visit-map-card">
          <div className="visit-map-photo"><img src="/images/gallery-28.jpg" alt="Inside the Morrow neighbourhood coffee house" /><span className="map-pin"><MapPin size={19} /></span><span className="map-photo-caption">42 ALDER ST. · PORTLAND, OR</span></div>
          <div className="visit-map-info"><p className="eyebrow"><span className="eyebrow-line" /> FIND YOUR WAY HERE</p><h2>Come on<br /><em>over.</em></h2><div className="visit-detail"><MapPin size={17} /><span>42 Alder Street<br />Portland, Oregon 97204</span></div><div className="visit-detail"><Clock3 size={17} /><span>Monday–Friday · 7am–4pm<br />Saturday–Sunday · 8am–3pm</span></div><a className="button-outline" href="https://maps.google.com/?q=42+Alder+Street+Portland+OR" target="_blank" rel="noreferrer">Get directions <ArrowUpRight size={15} /></a></div>
        </section>
        <section className="cafe-details">
          <div><span>01 / COME AS YOU ARE</span><h3>There's always<br />room for one more.</h3><p>A quiet corner, a favourite seat by the window, or a place outside in the sunshine. Bring a book, bring a friend, or just bring yourself.</p></div>
          <div className="cafe-detail-photo"><img src="/images/gallery-29.jpg" alt="A quiet cafe table ready for a slow cup" loading="lazy" /><span>YOUR TABLE'S WAITING</span></div>
        </section>
        <section className="visit-faq">
          <div><p className="eyebrow"><span className="eyebrow-line" /> A FEW GOOD THINGS TO KNOW</p><h2>Quick little<br /><em>questions.</em></h2><p>If we missed anything, send us a note. A real person reads every one.</p><a className="text-link" href="mailto:hello@morrow.coffee">hello@morrow.coffee <ArrowUpRight size={15} /></a></div>
          <div className="faq-list">{faqs.map((item, index) => <div className={openQuestion === index ? 'faq-item open' : 'faq-item'} key={item.q}><button type="button" aria-expanded={openQuestion === index} onClick={() => setOpenQuestion(openQuestion === index ? -1 : index)}><span>{item.q}</span>{openQuestion === index ? <Minus size={16} /> : <Plus size={16} />}</button>{openQuestion === index && <p>{item.a}</p>}</div>)}</div>
        </section>
        <section className="contact-section">
          <div><p className="eyebrow"><span className="eyebrow-line" /> SAY A LITTLE HELLO</p><h2>We'd love to<br /><em>hear from you.</em></h2><p>Questions, a kind word, a good coffee recommendation? We're all ears.</p></div>
          <form className="contact-form" onSubmit={sendMessage}>
            <label>Your name<input name="name" type="text" placeholder="How should we say hello?" required disabled={sent} /></label>
            <label>Your email<input name="email" type="email" placeholder="you@somewhere.com" required disabled={sent} /></label>
            <label>A little note<textarea name="message" rows="3" placeholder="What's on your mind?" required disabled={sent} /></label>
            <button className="button-primary" type="submit" disabled={sent}>{sent ? <>Note received <Check size={16} /></> : <>Send a little note <ArrowUpRight size={16} /></>}</button>
            {sent && <p className="form-note">Thanks for reaching out. Our friendly human reply is coming soon.</p>}
          </form>
        </section>
      </main>
    </>
  )
}

function NotFound() {
  return <main className="not-found"><p className="eyebrow"><span className="eyebrow-line" /> A LITTLE DETOUR</p><h1>This page<br /><em>stepped out.</em></h1><p>We can help you find your way back to something good.</p><Link className="button-primary" to="/">Back to Morrow <ArrowRight size={16} /></Link></main>
}

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return null
}

function AppLayout() {
  const [cartItems, setCartItems] = useState([])
  const bagCount = cartItems.reduce((count, item) => count + item.quantity, 0)

  function addToBag(product, quantity = 1) {
    setCartItems((items) => {
      const currentItem = items.find((item) => item.product.id === product.id)
      if (currentItem) return items.map((item) => item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item)
      return [...items, { product, quantity }]
    })
  }

  function updateCartQuantity(productId, quantity) {
    if (quantity < 1) {
      setCartItems((items) => items.filter((item) => item.product.id !== productId))
      return
    }
    setCartItems((items) => items.map((item) => item.product.id === productId ? { ...item, quantity } : item))
  }

  function removeFromCart(productId) {
    setCartItems((items) => items.filter((item) => item.product.id !== productId))
  }

  return (
    <div id="top">
      <ScrollToTop />
      <Header bagCount={bagCount} />
      <Routes>
        <Route path="/" element={<HomePage onAdd={addToBag} />} />
        <Route path="/shop" element={<ShopPage onAdd={addToBag} />} />
        <Route path="/shop/:productId" element={<ProductPage onAdd={addToBag} />} />
        <Route path="/cart" element={<CartPage items={cartItems} onUpdateQuantity={updateCartQuantity} onRemove={removeFromCart} />} />
        <Route path="/story" element={<StoryPage />} />
        <Route path="/coffee-guide" element={<CoffeeGuidePage />} />
        <Route path="/journal" element={<JournalPage />} />
        <Route path="/journal/:slug" element={<JournalArticlePage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/visit" element={<VisitPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  )
}

export default App
