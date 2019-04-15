class SiteInfo extends HTMLElement {
  constructor () {
    super()
    this.info = null
    this.load()
  }

  async load () {
    var self = new DatArchive(window.location)
    this.info = await self.getInfo()
    this.render()
  }

  render () {
    this.innerHTML = `
      <img class="thumb" src="/thumb">
      <h1 class="title"></h1>
      <p class="description"></p>
      <p class="welcome"><span>Welcome to my personal Beaker site!</span></p>
      <p class="links">
        Links:
        <a href="intent:unwalled.garden/view-feed?url=${encodeURIComponent(window.location)}">My social profile</a>,
        <a href="intent:unwalled.garden/view-address-book?url=${encodeURIComponent(window.location)}">My address book</a>
      </p>
    `
    this.querySelector('.title').textContent = this.info.title || 'Anonymous'
    this.querySelector('.description').textContent = this.info.description || ''
  }
}

customElements.define('site-info', SiteInfo)
