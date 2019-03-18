import {LitElement, css, html} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'

class SiteProfile extends LitElement {
  static get properties() {
    return {
      info: {type: Object}
    }
  }

  constructor () {
    super()
    this.info = null
    this.load()
  }

  async load () {
    var self = new DatArchive(window.location)
    this.info = await self.getInfo()
  }

  render() {
    if (!this.info) return html``
    return html`
      <img class="thumb" src="/thumb">
      <h1 class="title">${this.info.title || 'Anonymous'}</h1>
      <p class="description">${this.info.description}</p>
      <p class="links">
        Links:
        <a href="intent:unwalled.garden/view-profile?url=${encodeURIComponent(window.location)}">Social Profile</a>,
        <a href="intent:unwalled.garden/edit-source?url=${encodeURIComponent(window.location)}">View Source</a>
      </p>
    `
  }
}
SiteProfile.styles = css`
:host {
  display: block;
  text-align: center;
  margin: 2em;
}

.thumb {
  border-radius: 50%;
  object-fit: cover;
  width: 100px;
  height: 100px;
}
`

customElements.define('site-profile', SiteProfile)
