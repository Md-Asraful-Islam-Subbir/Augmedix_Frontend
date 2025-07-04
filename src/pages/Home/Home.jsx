import React from 'react'
import Header from '../../components/Header/Header'
import Exploy from '../../components/ExployerMenu/Exploy'
import InfoAbout from '../../components/InfoAbout/InfoAbout'
import Culture from '../../components/Culture/Culture'
import PhysicialTalk from '../../components/PhysicianTalk/PhysicialTalk'
import WhyClinixNote from '../../components/PhysicianTalk/WhyClinixNote'
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
        <WhyClinixNote/>
        <EHRPartners/>
        <ContactSection/>
    </div>
  )
}

export default Home