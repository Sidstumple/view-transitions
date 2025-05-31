const speakerCards = document.querySelectorAll('.speaker-card')

if (speakerCards) {
  const title = document.querySelector('.speakers .title')
  const talkTitle = document.querySelector('.speakers .talk-title')

  speakerCards.forEach((speaker) => {
    speaker.addEventListener('mouseenter', () => {
      const name = speaker.dataset.name
      const talkTitleText = speaker.dataset.talkTitle

      if (title.textContent.includes(name)) {
        return
      }
      if (document.startViewTransition) {
        document.startViewTransition({
          update: () => {
            title.textContent = name
            talkTitle.textContent = talkTitleText
          },
          types: ['title-animation']
        })
      } else {
        title.textContent = name
        talkTitle.textContent = talkTitleText
      }
    })
  })
}