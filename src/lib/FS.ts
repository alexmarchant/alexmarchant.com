const cache: { [key: string]: any } = {}

export async function getFile (path: string): Promise<any> {
  if (cache[path]) {
    return Promise.resolve(cache[path])
  }

  const res = await fetch(`/fs/${path}`)
  const contentType = res.headers.get('Content-Type')
  let content

  if (!contentType) {
    content = res.text()
  } else if (contentType.includes('application/json')) {
    content = res.json()
  } else if (contentType.includes('text/html')) {
    content = res.text()
  } else {
    content = res.blob()
  }

  cache[path] = content
  return content
}

export async function index (): Promise<Object> {
  return getFile('index.json')
}
