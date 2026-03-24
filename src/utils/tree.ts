interface TreeNode {
  id?: string | number
  parentId?: string | number | null
  children?: TreeNode[]
  [key: string]: any
}

/**
 * 将列表数据转换为树形结构
 */
export function listToTree<T extends TreeNode>(
  list: T[],
  parentId: string | number | null = null,
  idKey = 'id',
  parentKey = 'parentId',
): T[] {
  return list
    .filter((item) => item[parentKey] === parentId)
    .map((item) => ({
      ...item,
      children: listToTree(list, item[idKey], idKey, parentKey),
    }))
}

/**
 * 将树形结构展平为列表
 */
export function treeToList<T extends TreeNode>(tree: T[], childrenKey = 'children'): T[] {
  const result: T[] = []
  const queue = [...tree]
  while (queue.length) {
    const node = queue.shift()!
    result.push(node)
    const children = node[childrenKey] as T[] | undefined
    if (children?.length) {
      queue.push(...children)
    }
  }
  return result
}

/**
 * 在树形结构中查找节点
 */
export function findTreeNode<T extends TreeNode>(
  tree: T[],
  predicate: (node: T) => boolean,
  childrenKey = 'children',
): T | null {
  for (const node of tree) {
    if (predicate(node)) return node
    const children = node[childrenKey] as T[] | undefined
    if (children?.length) {
      const found = findTreeNode(children, predicate, childrenKey)
      if (found) return found
    }
  }
  return null
}
