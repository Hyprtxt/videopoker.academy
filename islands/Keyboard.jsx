import { useEffect } from "preact/hooks"

export const Keyboard = () => {
  useEffect(() => {
    document.addEventListener("keydown", (event) => {
      // console.log(event.keyCode);
      switch (event.keyCode) {
        case 13:
          document.querySelector("[type=submit]").click()
          break
        case 49:
        case 90:
          document.querySelector(`.hand div:nth-child(1) .card-value`)
            .click()
          break
        case 50:
        case 88:
          document.querySelector(`.hand div:nth-child(2) .card-value`)
            .click()
          break
        case 51:
        case 67:
          document.querySelector(`.hand div:nth-child(3) .card-value`)
            .click()
          break
        case 52:
        case 86:
          document.querySelector(`.hand div:nth-child(4) .card-value`)
            .click()
          break
        case 53:
        case 66:
          document.querySelector(`.hand div:nth-child(5) .card-value`)
            .click()
          break
        default:
          break
      }
    })
  }, [])
  return <div id="keyboard" />
}

export default Keyboard
