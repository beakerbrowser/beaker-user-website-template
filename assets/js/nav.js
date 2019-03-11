var self = new DatArchive(window.location)
var info

async function setupNav () {
  var navEl = document.querySelector('nav')
  info = await self.getInfo()

  // populate profile information
  navEl.querySelector('.title').textContent = info.title
  navEl.querySelector('.description').textContent = info.description
  navEl.querySelector('.links').innerHTML = `
    <a href="intent:unwalled.garden/view-profile?url=${encodeURIComponent(self.url)}">View profile</a>
  `

  // add the admin controls if the visitor is the site owner
  if (info.isOwner) {
    let currentPath = window.location.pathname
    if (currentPath.endsWith('/')) currentPath += 'index.md'
    if (!currentPath.endsWith('.md')) currentPath += '.md'

    // left-hand nav admin controls
    navEl.querySelector('.admin-controls').innerHTML = `
      <hr>
      <p><strong>Admin controls</strong></p>
      <ul>
        <li><a target="_blank" href="intent:unwalled.garden/edit-source?url=${encodeURIComponent(self.url + '/nav.md')}">Edit the nav</a></li>
        <li><a target="_blank" href="intent:unwalled.garden/edit-source?url=${encodeURIComponent(self.url + currentPath)}">Edit the current page</a></li>
        <li><a class="admin-new-page" href="#">New page</a></li>
      </ul>
    `
    navEl.querySelector('.admin-new-page').addEventListener('click', onClickNewPage)

    // main area admin controls
    let bodyAdminControlsEl = document.createElement('div')
    bodyAdminControlsEl.classList.add('admin-controls')
    bodyAdminControlsEl.innerHTML = `
      <p>[ <a target="_blank" href="intent:unwalled.garden/edit-source?url=${encodeURIComponent(self.url + currentPath)}">Edit this page</a> ]</p>
    `
    document.body.querySelector('main').append(bodyAdminControlsEl)
  }
}
setupNav()

// event handlers
// =

async function onClickNewPage (e) {
  e.preventDefault()
  var name = prompt('Enter the name of the new page')
  if (!name) return
  if (!name.startsWith('/')) {
    name = `/${name}`
  }
  if (!name.endsWith('.md') && !name.endsWith('.html')) {
    name += '.md'
  }
  await self.writeFile(name, '')
  window.open(`intent:unwalled.garden/edit-source?url=${encodeURIComponent(self.url + name)}`)
}