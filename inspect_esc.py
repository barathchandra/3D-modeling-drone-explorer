from pygltflib import GLTF2
import os
p = os.path.join('public', 'models', 'esc.glb')
g = GLTF2().load(p)
print('nodes', len(g.nodes or []))
for i,n in enumerate(g.nodes or []):
    print('node', i, repr(n.name), 'mesh', n.mesh, 'children', n.children)
print('meshes', len(g.meshes or []))
for i,m in enumerate(g.meshes or []):
    print('mesh', i, repr(m.name), 'prims', len(m.primitives or []))
    for j, prim in enumerate(m.primitives or []):
        print('  prim', j, 'mode', prim.mode, 'material', prim.material, 'attributes', prim.attributes)
        if prim.indices is not None:
            acc = g.accessors[prim.indices]
            print('    indices type', acc.componentType, 'count', acc.count)
        for attr, idx in (prim.attributes or {}).items():
            acc = g.accessors[idx]
            print('    attr', attr, 'type', acc.type, 'count', acc.count)
print('materials', len(g.materials or []))
for i, mat in enumerate(g.materials or []):
    print('mat', i, repr(mat.name), 'alphaMode', mat.alphaMode, 'doubleSided', mat.doubleSided)
