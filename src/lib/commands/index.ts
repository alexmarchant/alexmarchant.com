import Cat from './Cat'
import Cowsay from './Cowsay'
import Ls from './Ls'
import Pwd from './Pwd'
import Cd from './Cd'
import Clear from './Clear'

import Command from '../Command'

const commands: Array<Command> = [
  new Cat(),
  new Cowsay(),
  new Ls(),
  new Pwd(),
  new Cd(),
  new Clear()
]

export default commands
