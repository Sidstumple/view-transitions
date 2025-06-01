const determineTransitionType = (from, to) => {
  // Only run this if an active view transition exists
  const currentUrl = from?.url ? new URL(from.url) : null
  const targetUrl = new URL(to.url)
  // get paths:
  let currentPath = cleanUpURL(currentUrl.pathname)
  let targetPath = cleanUpURL(targetUrl.pathname)

  if (isOverview(currentPath) && isSpeaker(targetPath)) {
    return 'overview-to-speaker'
  } else if (isSpeaker(currentPath) && isOverview(targetPath)) {
    currentPath = currentPath.replace('/css-day/speakers/', '')
    return 'speaker-to-overview'
  } else {
    return 'normal'
  }
}

const isOverview = (path) => {
  return path === 'css-day'
}

const isSpeaker = (path) => {
  return path.includes('speakers')
}

window.addEventListener('pagereveal', async (e) => {
  if (e.viewTransition) {
    let transitionType = 'normal'
    // check if navigation activation is defined and use it to get from- and to url:
    if (navigation?.activation?.from && navigation?.activation?.entry) {
      // from and to url is saved in transitionType
      transitionType = determineTransitionType(navigation.activation.from, navigation.activation.entry)
    }
    // set view transition type, default is 'normal'
    e.viewTransition.types.add(transitionType)
    console.log(transitionType)

    // Cleanup after transition ran
    await e.viewTransition.finished
  }
})



const cleanUpURL = (path) => {
  path = path.replaceAll('/', '')
  path = path.replaceAll('/index.html', '').replaceAll('.html', '').replace('view-transitions', '')
  return path
}