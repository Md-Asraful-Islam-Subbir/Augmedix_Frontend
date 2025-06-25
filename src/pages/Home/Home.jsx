import React from 'react'
import Header from '../../components/Header/Header'
import Exploy from '../../components/ExployerMenu/Exploy'
import InfoAbout from '../../components/InfoAbout/InfoAbout'
import Culture from '../../components/Culture/Culture'
import PhysicialTalk from '../../components/PhysicianTalk/PhysicialTalk'
import WhyAugmedix from '../../components/PhysicianTalk/WhyAugmedix'
import EHRPartners from '../../components/PhysicianTalk/EHRPartners'
import ContactSection from '../../components/ContactSection/ContactSection'

function Home() {
  return (
    <div>
        <Header/>
        <Exploy/>
        <InfoAbout/>
        <Culture/>
        <PhysicialTalk/>
        <WhyAugmedix/>
        <EHRPartners/>
        <ContactSection/>
    </div>
  )
}

export default Home