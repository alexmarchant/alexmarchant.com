import Terminal from './Terminal'

export default abstract class Command {
  public abstract name: string
  public abstract async execute(terminal: Terminal): Promise<void>
}
