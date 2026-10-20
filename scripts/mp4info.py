"""解析 mp4 文件的分辨率、时长、码率（读取 mvhd/tkhd atom）"""
import struct, os, sys

def read_atom(f, end, path=""):
    info = {}
    while f.tell() < end:
        pos = f.tell()
        hdr = f.read(8)
        if len(hdr) < 8:
            break
        size, atype = struct.unpack(">I4s", hdr)
        atype = atype.decode("latin1")
        if size == 1:
            size = struct.unpack(">Q", f.read(8))[0]
        if size == 0:
            size = end - pos
        atom_end = pos + size
        p = f"{path}/{atype}"
        if atype == "mvhd":
            ver = f.read(1)[0]
            f.read(3)
            if ver == 1:
                f.read(16); timescale, duration = struct.unpack(">IQ", f.read(12))
            else:
                f.read(8); timescale, duration = struct.unpack(">II", f.read(8))
            info["duration"] = duration / timescale if timescale else 0
        elif atype == "tkhd":
            ver = f.read(1)[0]
            f.read(3)
            if ver == 1:
                f.read(24); f.read(60)
            else:
                f.read(16); f.read(56)
            w, h = struct.unpack(">II", f.read(8))
            info.setdefault("tracks", []).append((w / 65536, h / 65536))
        elif atype in ("moov", "trak", "mdia", "minf", "stbl"):
            info.update(read_atom(f, atom_end, p))
            continue
        f.seek(atom_end)
    return info

for fn in sys.argv[1:]:
    size = os.path.getsize(fn)
    with open(fn, "rb") as f:
        f.seek(0, 2); end = f.tell(); f.seek(0)
        info = read_atom(f, end)
    dur = info.get("duration", 0)
    tracks = [t for t in info.get("tracks", []) if t[0] > 0]
    res = f"{int(tracks[0][0])}x{int(tracks[0][1])}" if tracks else "?"
    br = size * 8 / dur / 1000 if dur else 0
    print(f"{fn}: {size/1024/1024:.1f}MB, {res}, {dur:.1f}s, 码率 {br:.0f}kbps")
