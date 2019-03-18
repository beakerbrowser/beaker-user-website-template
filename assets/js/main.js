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
        <a href="intent:unwalled.garden/view-profile?url=${encodeURIComponent(window.location)}">Social Profile</a>,
        <a href="intent:unwalled.garden/edit-source?url=${encodeURIComponent(window.location)}">View Source</a>
      </p>
    `
    this.querySelector('.title').textContent = this.info.title || 'Anonymous'
    this.querySelector('.description').textContent = this.info.description || ''
  }
}

customElements.define('site-profile', SiteProfile)
