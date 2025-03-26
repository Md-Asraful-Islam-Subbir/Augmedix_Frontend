import React from 'react'
import Header from '../../components/Header/Header'
import Exploy from '../../components/ExployerMenu/Exploy'
import InfoAbout from '../../components/InfoAbout/InfoAbout'
import Culture from '../../components/Culture/Culture'
import PhysicialTalk from '../../components/PhysicianTalk/PhysicialTalk'

function Home() {
  return (
    <div>
        <Header/>
        <Exploy/>
        <InfoAbout/>
        <Culture/>
        <PhysicialTalk/>
    </div>
  )
}

export default Home