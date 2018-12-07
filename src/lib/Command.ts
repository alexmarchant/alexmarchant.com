import Shell from './Shell'

export default abstract class Command {
  public abstract name: string
  public abstract execute(shell: Shell): void
}
