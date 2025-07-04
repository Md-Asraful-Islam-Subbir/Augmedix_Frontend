import React from 'react'
import './ProductOverview.css'
import Product from '../../components/Product/Product'
import ContactSection from '../../components/ContactSection/ContactSection'
import ClinixNoteAIEngine from '../../components/Product/ClinixNoteAIEngine'
function ProductOverview() {
  return (
    <div>
    <div className="container">
      <h1 className="title">
        Versatile <span className="highlight1">AI solutions</span> for every clinical occasion
      </h1>
      <p className="description">
        ClinixNote gives your organization the ability to provide different levels of AI automation 
        and human-assisted support based on the unique needs of clinicians, specialties, and care settings.
      </p>
    </div>
    <Product/>
    <ClinixNoteAIEngine/>
<ContactSection/>
    </div>
  )
}

export default ProductOverview