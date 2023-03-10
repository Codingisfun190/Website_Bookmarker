// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark)

// Select the button for dark mode
const btn = document.getElementById('dmb')

// // Check for dark mode preference
// let prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)')

// Get the user's theme preference from local storage
let currentTheme = localStorage.getItem('theme')
// If user's preference is dark
toggleDark()

// Listen for click on dark mode button
btn.addEventListener('click', () => {
  toggleDark()

  // Save current preference
  localStorage.setItem('theme', currentTheme)
})

function toggleDark() {
  // Toggle dark mode
  document.body.classList.toggle('dark-mode')
  currentTheme = document.body.classList.contains('dark-mode')
    ? 'dark'
    : 'light'
  if (currentTheme == 'dark') {
    btn.innerText = 'Light Mode'
    btn.title = 'Switch to Light Mode'
  } else {
    btn.innerText = 'Dark Mode'
    btn.title = 'Switch to Dark Mode'
  }
}

// Save bookmark
function saveBookmark(e) {
  // Get form values
  var siteName = document.getElementById('siteName').value
  var siteUrl = document.getElementById('siteUrl').value

  if (!validateForm(siteName, siteUrl)) {
    return false
  }

  var bookmark = {
    name: siteName,
    url: siteUrl
  }

  // Test if bookmarks is null
  if (localStorage.getItem('bookmarks') === null) {
    // Initialize array
    var bookmarks = []
    // Add to array
    bookmarks.push(bookmark)
    // Set to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
  } else {
    // Get bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
    // Add bookmark to array
    bookmarks.push(bookmark)
    // Re-set back to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
  }

  // Clear form
  document.getElementById('myForm').reset()

  // Re-fetch bookmarks
  fetchBookmarks()

  // Prevent form from submitting
  e.preventDefault()
}

// Delete bookmark
function deleteBookmark(url) {
  // Get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
  // Loop through bookmarks
  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].url === url) {
      // Remove from array
      bookmarks.splice(i, 1)
    }
  }
  // Re-set back to localStorage
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks))

  // Re-fetch bookmarks
  fetchBookmarks()
}

// Fetch bookmarks
function fetchBookmarks() {
  // Get bookmarks from localStorage
  var bookmarks = JSON.parse(localStorage.getItem('bookmarks'))

  // Get output id
  var bookmarksResults = document.getElementById('bookmarksResults')

  // Build output
  bookmarksResults.innerHTML = ''
  for (var i = 0; i < bookmarks.length; i++) {
    var name = bookmarks[i].name
    var url = bookmarks[i].url

    // bookmarksResults.innerHTML +=
    //   `<div class="well">` +
    //   `<h3>` +
    //   name +
    //   `<a class="btn btn-default" target="_blank" href="` +
    //   url +
    //   `">Visit</a>` +
    //   `<a onclick="deleteBookmark(\`` +
    //   url +
    //   `\`)"class="btn btn-danger" href="#
    //   ">Delete</a>` +
    //   `</h3>` +
    //   `</div>`

    // cleaned up lines 86+
    bookmarksResults.innerHTML += `
      <h3>${name}</h3>
      <a class="btn btn-default" target="_blank" href="${url}">Visit</a>
      <a onclick="deleteBookmark('${url}')" class="btn btn-danger" href="#">Delete</a>
    `
  }
}

// Validate form
function validateForm(siteName, siteUrl) {
  if (!siteName || !siteUrl) {
    alert('Please fill in the form')
    return false
  }

  var expression =
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi
  var regex = new RegExp(expression)

  if (!siteUrl.match(regex)) {
    alert('Please use a valid URL')
    return false
  }

  return true
}

// Add dark mode to website
