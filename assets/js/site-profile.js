class SiteProfile extends HTMLElement {
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
      <p class="links">
        Links:
        <a href="intent:unwalled.garden/view-address-book?url=${encodeURIComponent(window.location)}">My address book</a>,
        <a href="intent:unwalled.garden/edit-source?url=${encodeURIComponent(window.location)}">View source</a>
        ${this.info.isOwner ? `[ <a href="beaker://settings">Edit my profile</a> ]` : ''}
      </p>
    `
    this.querySelector('.title').textContent = this.info.title || 'Anonymous'
    this.querySelector('.description').textContent = this.info.description || ''
  }
}

customElements.define('site-profile', SiteProfile)
