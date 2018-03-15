const projectPageImages = document.querySelectorAll('.project__page img')
Array.from(projectPageImages).forEach((el) => {
  const toggleFullWidth = () => {
    const mobile = el.parentElement.className.match('mobile')
    const className = `${mobile ? 'mobile' : 'desktop'}-active`
    const oppositeClassName = `${mobile ? 'desktop' : 'mobile'}-active`
    el
      .parentElement
      .parentElement
      .classList
      .toggle(className)
    el
      .parentElement
      .parentElement
      .classList
      .remove(oppositeClassName)
  }

  el.addEventListener('click', toggleFullWidth)
  el.addEventListener('ontouchend', toggleFullWidth)
})

