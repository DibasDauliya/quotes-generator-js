const UIquote = document.getElementById('quote'),
  UIauthor = document.getElementById('author'),
  tweetBtn = document.querySelector('.btn-twitter'),
  nextBtn = document.querySelector('.btn-primary'),
  quoteContainer = document.getElementById('quote-container'),
  loader = document.getElementById('loader')

let resData = []
function loading() {
  loader.hidden = false
  quoteContainer.hidden = true
}

function completed() {
  loader.hidden = true
  quoteContainer.hidden = false
}

async function getQuote() {
  try {
    loading()
    const res = await fetch('https://type.fit/api/quotes')
    resData = await res.json()
    setQuote()
  } catch (error) {
    console.log(error)
  }
}

function setQuote() {
  const random = Math.floor(Math.random() * resData.length)
  const randomQuote = resData[random]
  // console.log(randomQuote)
  UIquote.innerHTML = randomQuote.text

  if (randomQuote.author === null) {
    UIauthor.innerHTML = 'Unknown'
  } else {
    UIauthor.innerHTML = randomQuote.author
  }
  completed()
}

// event listener
nextBtn.addEventListener('click', setQuote)
tweetBtn.addEventListener('click', () => {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${UIquote.innerText} - '${UIauthor.innerText}', from the random quote website made by @dibasdauliya33`

  window.open(twitterUrl, '_blank', 'top=500,left=500,width=500, height=500')
})

getQuote()
