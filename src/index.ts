import { fixDPR } from './fixDPR'
import { ConfettiShape } from './ConfettiShape'

function init() {
  const canvas = <HTMLCanvasElement | null>document.getElementById('canvas')
  const shapes: ConfettiShape[] = []
  
  if (canvas === null) return

  const canvasContext = <CanvasRenderingContext2D>canvas.getContext('2d')

  document.body.addEventListener('click', (event: MouseEvent) => {
    console.log(`Cliked on ${event.pageX} ${event.pageY}`)
    
    for (let i = 0; i < 50; i++) {
      const position = { x: event.pageX, y: event.pageY }
    
      shapes.push(new ConfettiShape(position))
    }
  })

  fixDPR(canvas)

  function loop() {
    // TODO: remove cast
    fixDPR(<HTMLCanvasElement>canvas)
    shapes.forEach((shape) => {
      shape.updatePosition()
      shape.draw(canvasContext)
    })
    setTimeout(loop, 0)
  }

  setTimeout(loop, 0)
}

window.onload = init