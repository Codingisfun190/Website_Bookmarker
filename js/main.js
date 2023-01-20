// Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark)

// Save bookmark
function saveBookmark(e) {
  // Get form values
  var siteName = document.getElementById('siteName').value
  var siteUrl = document.getElementById('siteUrl').value

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

  // Prevent form from submitting
  e.preventDefault()
}
