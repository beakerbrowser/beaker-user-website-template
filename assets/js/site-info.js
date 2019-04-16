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
      <img class="cover" src="/cover">
      <div class="cover-fallback"></div>
      <div class="site-info-inner">
        <img class="thumb" src="/thumb">
        <h1 class="title"></h1>
        <p class="description"></p>
        <p class="links">
          [
            <a href="intent:unwalled.garden/view-feed?url=${encodeURIComponent(window.location)}">Beaker.Social</a>
          ]
        </p>
      </div>
    `
    this.querySelector('.title').textContent = this.info.title || 'Anonymous'
    this.querySelector('.description').textContent = this.info.description || ''
    this.querySelector('.cover').addEventListener('error', e => this.onCoverError())
  }

  onCoverError (e) {
    this.querySelector('.cover').remove()
    this.querySelector('.cover-fallback').classList.add('show')
  }
}

customElements.define('site-info', SiteInfo)
