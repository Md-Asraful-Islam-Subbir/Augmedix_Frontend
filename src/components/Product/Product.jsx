import React from 'react'
import './Product.css'
const Product = () => {
  return (
    <div className="table-container">
      <h2 className="table-title">Compare Augmedix products</h2>

      <table className="comparison-table">
        <thead>
          <tr>
            <th></th> {/* Empty column for feature names */}
            <th className="green-text">Go <br /><span>Self-service</span></th>
            <th className="purple-text">Assist <br /><span>Hybrid</span></th>
            <th className="red-text">Live <br /><span>Full-service</span></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Daily EHR time savings</td>
            <td>1 hour</td>
            <td>1.5 - 2 hours</td>
            <td>2 - 3 hours</td>
          </tr>
          <tr>
            <td>Personalization</td>
            <td>Some</td>
            <td>More</td>
            <td>Most</td>
          </tr>
          <tr>
            <td>Produces AI-drafted notes within seconds</td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
          </tr>
          <tr>
            <td>Web and mobile apps</td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
          </tr>
          <tr>
            <td>HITRUST certified & HIPAA compliant</td>
            <td>✅</td>
            <td>✅</td>
            <td>✅</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default Product