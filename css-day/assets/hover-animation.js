const speakerCards = document.querySelectorAll('.speaker-card')

if (speakerCards) {
  const title = document.querySelector('.speakers .title')
  const talkTitle = document.querySelector('.speakers .talk-title')

  speakerCards.forEach((speaker) => {
    speaker.addEventListener('mouseenter', () => {
      const name = speaker.dataset.name
      const talkTitleText = speaker.dataset.talkTitle
      // if the title is already == to the hovered name, return
      if (title.textContent == name) {
        return
      }
      // 1. check if view transition is supported
      // 2. start view transition 
      // 3. add view transition type

      title.textContent = name
      talkTitle.textContent = talkTitleText

    })
  })
}

// if (document.startViewTransition) {
//   // document.startViewTransition({
//   //   update: () => {
//   //     title.textContent = name
//   //     talkTitle.textContent = talkTitleText
//   //   },
//   //   types: ['title-animation']
//   // })
// }