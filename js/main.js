// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark)

// Select the button for dark mode
const btn = document.getElementById('dmb')

// Check for dark mode preference
let prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)')

// Get the user's theme preference from local storage
let currentTheme = localStorage.getItem('theme')
// If user's preference is dark
if (currentTheme == 'dark') {
  // Toggle dark mode
  document.body.classList.toggle('dark-mode')
  btn.innerText = 'Dark Mode'
  // If user's preference is light
} else if (currentTheme == 'light') {
  // Toggle light mode
  document.body.classList.toggle('light-mode')
  btn.innerText = 'Light Mode'
} else {
  btn = btn.innerText
}

// function toggle() {
//   if (document.getElementById('dmb').checked) {
//     prefersDarkMode()
//   } else {
//     !prefersDarkMode()
//   }
// }

// Listen for click on dark mode button
btn.addEventListener('click', function () {
  let currentTheme = localStorage.getItem('theme')
  let prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)')
  // If user's OS setting is dark and matches dark mode
  if (prefersDarkMode.matches) {
    // Toggle light mode
    document.body.classList.toggle('light-mode')
    // Toggle dark mode if light mode is on
    var theme = document.body.classList.contains('light-mode')
      ? 'light'
      : 'dark'
    btn.innerText = 'Light Mode'
    console.log(currentTheme)
  } else if (!prefersDarkMode.matches) {
    // Same thing but for dark mode
    document.body.classList.toggle('dark-mode')
    var theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light'
    btn.innerText = 'Dark Mode'
  } else {
    document.body.classList.toggle('')
    btn.innerText = 'Light Mode'
  }
  // Save current preference
  localStorage.setItem('theme', theme)
})

// Change button dark mode to light mode when clicked and vice versa
// document
//   .getElementsByClassName('btn-toggle')
//   .addEventListener(click, function () {
//     const dmb = document.getElementsById('dmb')

//     if (dmb.innerHTML == 'Dark Mode') {
//       dmb.innerHTML = 'Light Mode'
//     } else {
//     }
//   })

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

  /*
  // Local storage test
  localStorage.setItem('test', 'Hello World')
  console.log(localStorage.getItem('test'))
  localStorage.removeItem('test')
  console.log(localStorage.getItem('test'))
  */

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
