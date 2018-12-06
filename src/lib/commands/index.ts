import Cat from './Cat'
import Cowsay from './Cowsay'
import Ls from './Ls'
import Pwd from './Pwd'
import Command from '../Command'

const commands: Array<Command> = [
  new Cat(),
  new Cowsay(),
  new Ls(),
  new Pwd()
]

export default commands
