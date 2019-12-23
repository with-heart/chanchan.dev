const htm = require('htm')
const vhtml = require('vhtml')
const html = htm.bind(vhtml)

module.exports = ({currentPost, posts, series}) => {
  const href = series.slug
  return html`
    <aside class="table-of-contents">
      <p>This post is part of the <a href=${href}>${series.name}</a> series.</p>

      <ol>
        ${posts.map(post => {
          return html`
            <li id=${post.id} key=${post.id}>
              ${post.id === currentPost.id
                ? post.title
                : html`
                    <a href=${post.slug}>${post.title}</a>
                  `}
            </li>
          `
        })}
      </ol>
    </aside>
  `
}
