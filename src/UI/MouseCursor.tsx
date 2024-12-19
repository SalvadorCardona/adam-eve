interface MouseCursorPropsInterface {}

export const MouseCursor = ({}: MouseCursorPropsInterface) => {
  const containerNodeRef = useRef(null)
  const cursorRef = useRef(null)
  const updateMouse = (e) => {
    // you can directly access the mouse's position in `e`
    // you don't even need the useMouse hook
    cursorRef.current.style.top = `${e.y - SIZE / 2}px`
    cursorRef.current.style.left = `${e.x - SIZE / 2}px`
  }

  useEffect(() => {
    window.addEventListener("mousemove", updateMouse)
    return () => {
      window.removeEventListener("mousemove", updateMouse)
    }
  })

  return <>Hello MouseCursor</>
}
