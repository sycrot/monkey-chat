export function pageClickEvent (e: any, menuRef: any, menuOpen: boolean, menuBody: any, setMenuOpen: (value: boolean) => void) {
  if (menuRef.current !== null && !menuRef.current.contains(e.target)) {
    handleOpenCloseMenu(menuOpen, menuBody, setMenuOpen)
  }
}

export function handleOpenCloseMenu (menuOpen: boolean, menuBody: any, setMenuOpen: (value: boolean) => void) {
  if (menuOpen) {
    menuBody.current.classList.add('animate-menuDropdownReverse')

    setTimeout(() => {
      setMenuOpen(false)
    }, 0.3 * 1000)
  } else {
    setMenuOpen(true)
  }
}