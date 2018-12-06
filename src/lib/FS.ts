import commands from './commands'

export type Node = File | Dir
export type Tree = { [key: string]: Node }

export class File {
  contents: string

  constructor (contents: string) {
    this.contents = contents
  }
}

export class Dir {
  children: Tree

  constructor (children: Tree = {}) {
    this.children = children
  }
}

export default class FS {
  public rootDir: Dir
  public workingDir: Dir
  public homeDir: Dir

  constructor () {
    this.rootDir = new Dir()
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
      node = (node as Dir).children[part]
    })

    return node
  }

  pathForNode (node: Node): string | undefined {
    const index = this.nodeIndex()
    return Object.keys(index).find(path => {
      return index[path] === node
    })
  }

  private nodeIndex () {
    const index: Tree = {}

    function mapNode (node: Node, path: string) {
      index[path] = node

      if (node instanceof Dir) {
        Object.keys(node.children).forEach(key => {
          const childPath = path === '/' ? '' : path
          mapNode(node.children[key], `${childPath}/${key}`)
        })
      }
    }

    mapNode(this.rootDir, '/')

    return index
  }
}
