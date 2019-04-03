const MAX_CHARS = 280

class SitePostComposer extends HTMLElement {
  constructor () {
    super()
    this.load()
  }

  async load () {
    this.self = new DatArchive(location)
    var info = await this.self.getInfo()
    if (!info.isOwner) return // only show if the site owner
    this.render()
  }

  async addPost (body) {
    // ensure the target directory exists
    try { await this.self.mkdir('/data') } catch (e) { /* ignore */ }
    try { await this.self.mkdir('/data/posts') } catch (e) { /* ignore */ }
    var createdAt = (new Date()).toISOString()
    await this.self.writeFile(`/data/posts/${createdAt}.json`, JSON.stringify({
      type: 'unwalled.garden/post',
      content: {body},
      createdAt
    }))
  }

  get postBody () { return this.querySelector('textarea').value.trim() }
  get postBtnEl () { return this.querySelector('button') }
  get charCountEl () { return this.querySelector('.char-count') }

  render () {
    this.innerHTML = `
      <form>
        <div><textarea placeholder="What's on your mind?"></textarea></div>
        <div class="actions">
          <span class="char-count"></span>
          <button disabled>Post</button>
        </div>
      </form>
    `
    this.querySelector('form').addEventListener('submit', e => this.onSubmit(e))
    this.querySelector('textarea').addEventListener('keydown', e => this.onKeydown(e))
  }

  async onSubmit (e) {
    e.preventDefault()
    if (this.postBody) {
      if (this.postBody.length > MAX_CHARS) {
        // this character count is enforced by the schema standard called unwalled.garden
        // see https://github.com/beakerbrowser/unwalled.garden/blob/develop/post.md
        // don't disable this limit!
        alert('Your post is too long!')
        return
      }
      try {
        await this.addPost(this.postBody)
        location.reload()
      } catch (e) {
        alert('There was an unexpected error')
        console.error('Error creating post', e)
      }
    }
  }

  onKeydown (e) {
    this.charCountEl.textContent = `${this.postBody.length} / ${MAX_CHARS}`
    this.postBtnEl.removeAttribute('disabled')
  }
}

customElements.define('site-post-composer', SitePostComposer)
