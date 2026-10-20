"""用 Real-ESRGAN 把封面帧从 960x540 超分到 3840x2160，再缩到 1920x1080 交付"""
import sys, cv2
from realesrgan import RealESRGANer
from basicsr.archs.rrdbnet_arch import RRDBNet

src, dst = sys.argv[1], sys.argv[2]
model = RRDBNet(num_in_ch=3, num_out_ch=3, num_feat=64, num_block=23, num_grow_ch=32, scale=4)
upsampler = RealESRGANer(
    scale=4,
    model_path='https://github.com/xinntao/Real-ESRGAN/releases/download/v0.1.0/RealESRGAN_x4plus.pth',
    model=model, tile=0, pre_pad=0, half=False, device='cpu',
)
img = cv2.imread(src, cv2.IMREAD_UNCHANGED)
output, _ = upsampler.enhance(img, outscale=4)
# 缩到 1920 宽交付（超分后 3840 下采样，边缘更干净）
h, w = output.shape[:2]
output = cv2.resize(output, (1920, int(h * 1920 / w)), interpolation=cv2.INTER_AREA)
cv2.imwrite(dst, output, [cv2.IMWRITE_JPEG_QUALITY, 95])
print('done', output.shape)
