export const getBGColor = (id: number) => {
  const colors = [
    'red',
    'blue',
    'green',
    'purple',
    'yellow',
    'pink',
    'black',
    'cyan',
    'gray',
    'orange',
    'indigo',
    'teal'
  ]
  return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)]
}
