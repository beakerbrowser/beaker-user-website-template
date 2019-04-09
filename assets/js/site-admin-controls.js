class SiteAdminControls extends HTMLElement {
  constructor () {
    super()
    this.info = null
    this.load()
  }

  async load () {
    var self = new DatArchive(window.location)
    this.info = await self.getInfo()
    if (!this.info.isOwner) return
    this.render()
  }

  render () {
    this.innerHTML = `
      Admin:
      <a href="beaker://settings">Edit my profile</a>,
      <a href="intent:unwalled.garden/edit-source?url=${encodeURIComponent(window.location)}">Edit source</a>
    `
  }
}

customElements.define('site-admin-controls', SiteAdminControls)
