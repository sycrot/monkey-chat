export function handleBack (refBody: any, setOpenClose: () =>  void) {
  refBody.current.classList.add('animate-pushReverse')

  setTimeout(() => {
    setOpenClose()
  }, 0.3 * 1000)
}

export function handleImage (e: any, setPhotoURL: (value: string) => void, setPhoto: (photo: any) => void) {
  let r = new FileReader()

  r.onload = () => {
    setPhotoURL(r.result as string)
  }
  r.readAsDataURL(e.target?.files[0])

  setPhoto(e)
}