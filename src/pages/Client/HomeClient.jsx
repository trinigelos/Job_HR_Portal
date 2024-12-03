import React from 'react'
import NavbarClient from "./NavbarClient"
import { Outlet } from 'react-router-dom'
import "./HomeClient.css"

export default function HomeClient() {

  return (
    <div>
      <NavbarClient />
                {/* will have two sections: an about part and an email input box to get the database listing */}
                <div className="about-me">
<Outlet />

                </div>
    </div>
  )
}
