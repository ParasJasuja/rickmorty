import * as React from "react"
import { Link } from "gatsby"
import "../scss/styles.scss"

const NotFoundPage = () => (
  <div className="p-not-found-page">
    <h1 className="p-not-found-page__404">404</h1>
    <p className="p-not-found-page__error">Page Not Found</p>
    <p className="p-not-found-page__error">
      <Link className=" p-not-found-page__error__back" to="/">
        Go back to home
      </Link>
    </p>
  </div>
)

export default NotFoundPage
