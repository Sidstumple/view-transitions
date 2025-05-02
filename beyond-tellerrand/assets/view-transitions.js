const determineTransitionType = (from, to) => {
  // Only run this if an active view transition exists
  const currentUrl = from?.url ? new URL(from.url) : null
  const targetUrl = new URL(to.url)
  // get paths:
  let currentPath = currentUrl.pathname
  let targetPath = targetUrl.pathname
  // remove index.html and .html from paths
  currentPath = currentPath.replace('/index.html', '').replace('.html', '').replace('/view-transitions', '')
  targetPath = targetPath.replace('/index.html', '').replace('.html', '').replace('/view-transitions', '')

  if (isOverview(currentPath) && isSpeaker(targetPath)) {
    return {name: 'overview-to-speaker'}
  } else if (isSpeaker(currentPath) && isOverview(targetPath)) {
    currentPath = currentPath.replace('/beyond-tellerrand/speakers/', '')
    return {name: 'speaker-to-overview', currentPath}
  } else if (isSpeaker(currentPath) && isSpeaker(targetPath)) {
    return {name: 'speaker-to-speaker', currentPath, targetPath}
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
        if (activeSpeaker) {
          activeSpeaker = activeSpeaker.closest('.speaker-card').querySelector('img')
          activeSpeaker.style.viewTransitionClass = 'active-speaker'
        }
      }
    }
    console.log(transitionType)
    e.viewTransition.types.add(transitionType.name)

    // Cleanup after transition ran
    await e.viewTransition.finished
    if (activeSpeaker) {
      activeSpeaker.style.viewTransitionClass = ''
    }
  }
})


const isOverview = (path) => {
  return path === '/beyond-tellerrand/' || path === '/beyond-tellerrand'
}

const isSpeaker = (path) => {
  return path.includes('/beyond-tellerrand/speakers/')
}
