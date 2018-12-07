import commands from './commands'

export type Tree = { [key: string]: Node }

export abstract class Node {
  abstract parent?: Node
  abstract name: string
}

export class File extends Node {
  contents: string
  parent?: Node
  name: string

  constructor (name: string, contents: string, parent?: Node) {
    super()
    this.name = name
    this.contents = contents
    this.parent = parent
  }
}

export class Dir extends Node {
  children: Array<Node>
  parent?: Node
  name: string

  constructor (name: string, children: Array<Node> = [], parent?: Node) {
    super()
    this.name = name
    this.children = children
    this.parent = parent
  }

  addChild (node: Node) {
    this.children.push(node)
    node.parent = this
  }

  getChildByName (name: string): Node | undefined {
    return this.children.find(child => child.name === name)
  }
}

export default class FS {
  public rootDir: Dir
  public workingDir: Dir
  public homeDir: Dir

  constructor () {
    this.rootDir = new Dir('/')
    this.workingDir = this.rootDir
    this.homeDir = this.rootDir
  }

  nodeAtPath (path: string): Node | undefined {
    let node: Node | undefined

    // Replace home and root shortcuts
    // and set them as the current node
    if (path.slice(0, 2) === '~/') {
      path = path.slice(2)
      node = this.homeDir
    } else if (path.slice(0, 1) === '/') {
      path = path.slice(1)
      node = this.rootDir
    } else {
      node = this.workingDir
    }

    // Work down the path array
    const parts = path.split('/').filter(part => part !== '')
    parts.forEach(part => {
      if (!node) { return }
      if (node instanceof File) {
        node = undefined
        return
      }
      node = (node as Dir).getChildByName(part)
    })

    return node
  }

  pathForNode (node: Node): string | undefined {
    function buildPath (node: Node, parts: Array<string> = []): Array<string> {
      console.log(node, parts)
      parts.unshift(node.name)
      if (!node.parent) { return parts }
      return buildPath(node.parent, parts)
    }

    return buildPath(node).join('/').replace('//', '/')
  }
}
