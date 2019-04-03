const dateFormatter = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
})

class SitePosts extends HTMLElement {
  constructor () {
    super()
    this.posts = []
    this.load()
  }

  async load () {
    console.log('loading')
    var self = new DatArchive(window.location)
    try {
      var postnames = await self.readdir('/data/posts')
      console.log(postnames)
      postnames.sort((a, b) => b.localeCompare(a))
      this.posts = await Promise.all(postnames.slice(0, 10).map(async (postname) => {
        try {
          return JSON.parse(await self.readFile(`/data/posts/${postname}`))
        } catch (e) {
          console.error('Failed to load post', postname, e)
          return false
        }
      }))
      this.posts = this.posts.filter(Boolean) // filter out any posts that failed to load
    } catch (e) {
      console.error('Failed to load any posts', e)
    }
    console.log(this.posts)
    this.render()
  }

  render () {
    this.posts.forEach(this.renderPost.bind(this))
  }

  renderPost (post) {
    var el = document.createElement('div')
    el.classList.add('post')
    el.innerHTML = `
      <div class="timestamp"></div>
      <div class="body"></div>
    `
    el.querySelector('.timestamp').textContent = dateFormatter.format(new Date(post.createdAt))
    el.querySelector('.body').textContent = post.content.body
    this.append(el)
  }
}

customElements.define('site-posts', SitePosts)
