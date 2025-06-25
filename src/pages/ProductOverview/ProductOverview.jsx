import React from 'react'
import './ProductOverview.css'
import Product from '../../components/Product/Product'
import ContactSection from '../../components/ContactSection/ContactSection'
import AugmedixAIEngine from '../../components/Product/AugmedixAIEngine'
function ProductOverview() {
  return (
    <div>
    <div className="container">
      <h1 className="title">
        Versatile <span className="highlight1">AI solutions</span> for every clinical occasion
      </h1>
      <p className="description">
        Augmedix gives your organization the ability to provide different levels of AI automation 
        and human-assisted support based on the unique needs of clinicians, specialties, and care settings.
      </p>
    </div>
    <Product/>
    <AugmedixAIEngine/>
<ContactSection/>
    </div>
  )
}

export default ProductOverview