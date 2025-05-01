// // Get the navigation object
// const navigation = window.navigation

const determineTransitionType = (from, to) => {
  // Only run this if an active view transition exists
  const currentUrl = from?.url ? new URL(from.url) : null
  const targetUrl = new URL(to.url)
  // get paths:
  let currentPath = currentUrl.pathname
  let targetPath = targetUrl.pathname
  // remove index.html from paths
  currentPath = currentPath.replace('/index.html', '').replace('.html', '')
  targetPath = targetPath.replace('/index.html', '').replace('.html', '')
  console.log({currentPath, targetPath})
  if (
    currentPath === '/beyond-tellerand/' &&
    targetPath.includes('/beyond-tellerand/speakers/')
  ) {
    return {name: 'overview-to-speaker'}
  } else if (
    currentPath.includes('/beyond-tellerand/speakers/') &&
    targetPath === '/beyond-tellerand/'
  ) {
    return {name: 'speaker-to-overview', currentPath}
  } else {
    return {name: 'normal'}
  }
}

window.addEventListener('pagereveal', async (e) => {
  if (e.viewTransition) {
    // Determine animation type based on the old/new history entries
    let transitionType = 'normal'
    let activeSpeaker = null
    // eslint-disable-next-line no-undef
    if (navigation?.activation?.from && navigation?.activation?.entry) {
      // eslint-disable-next-line no-undef
      transitionType = determineTransitionType(navigation.activation.from, navigation.activation.entry)
      if (transitionType.name === 'speaker-to-overview') {
        activeSpeaker = document.querySelector(`.speaker-card a[href*="${transitionType.currentPath}"]`)
        console.log('activeSpeaker', activeSpeaker)
        if (activeSpeaker) {
          console.log('speaker-to-overview', activeSpeaker)
          activeSpeaker = activeSpeaker.closest('.speaker-card').querySelector('img')
          activeSpeaker.style.viewTransitionClass = 'active-speaker'
        }
      }
    }
    document.documentElement.dataset.transition = transitionType.name

    // Cleanup after transition ran
    await e.viewTransition.finished
    delete document.documentElement.dataset.transition
    if (activeSpeaker) {
      activeSpeaker.style.viewTransitionClass = ''
    }
  }
})