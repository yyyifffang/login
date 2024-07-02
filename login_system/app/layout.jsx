'use client'

import { Provider } from "react-redux";
import { store } from "./store";

export default function RootLayout({children}){
  return(
    <html lang="en">
        <head/>
        <body>
          <Provider store={store}>
              {children}
          </Provider>
        </body>
    </html>
  )
}