import Terminal from './Terminal'

export default abstract class Command {
  public abstract name: string
  public abstract execute(terminal: Terminal): void
}
