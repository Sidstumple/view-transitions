// Based on demo by Jake Archibald and idea by Jesper Vos: https://glitch.com/edit/#!/simple-set-demos?path=gesture%2Fscript.js%3A242%3A0

// popup animation

const trigger = document.querySelector('.info-trigger')
const dialog = document.querySelector('dialog')
const dragDialog = document.querySelector('.info-trigger')
// Track pointer position
let startY = 0
let latestY = 0
let currentProgress = 0
let activeAnimations = null
let dialogHeight = 0
let isOpening = false

const watchDragging = async (downEvent) => {
  startY = downEvent.pageY
  latestY = startY
  currentProgress = 0

  const controller = new AbortController()

  // Start the view transition and wait for it to be ready
  const dialogStatus = isOpening ? 'dialog-closing' : 'dialog-opening'
  const openTransition = document.startViewTransition({
    update: () => {
      document.documentElement.classList.add('grabbing')
      toggleDialog()
      dialogHeight = dialog.offsetHeight
    },
    types: ['dialog-drag', dialogStatus]
  })

  // Wait for the transition to be ready
  await openTransition.ready

  // Get the view transition animations
  activeAnimations = document.getAnimations().filter(
    anim => anim.effect.target === document.documentElement &&
      anim.effect.pseudoElement?.startsWith('::view-transition')
  )

  // Pause all view transition animations
  activeAnimations.forEach(anim => anim.pause())

  // Update animation frame on move
  document.addEventListener('pointermove', (moveEvent) => {
    latestY = moveEvent.pageY
    // Calculate progress based on drag distance
    // When dialog is open startY - latestY is negative, so we need to change 0 and 1
    if (isOpening) {
      currentProgress = Math.max(0, Math.min(0.8, (startY - latestY) / dialogHeight));
    } else {
      currentProgress = Math.max(-.8, Math.min(0, (startY - latestY) / dialogHeight));
      // turn it into a positive number
      currentProgress = Math.abs(currentProgress);
    }

    // Set each view transition animation to that frame
    activeAnimations.forEach(anim => {
      const duration = anim.effect.getComputedTiming().duration
      anim.currentTime = currentProgress * duration
    })
  }, { signal: controller.signal })

  // Handle release
  document.addEventListener('pointerup', async () => {
    controller.abort()
    activeAnimations.forEach(anim => anim.play())
    document.documentElement.classList.remove('grabbing')
  }, { signal: controller.signal })
}





const toggleDialog = () => {
  if (dialog.open) {
    dialog.close()
    isOpening = false
  } else {
    dialog.showModal()
    isOpening = true
  }
}

const initDialog = () => {
  if (!trigger) return

  if (document.startViewTransition) {
    dragDialog.addEventListener('pointerdown', watchDragging)

  } else {
    trigger.addEventListener('click', () => {
      toggleDialog()
    })
  }
}

initDialog()

