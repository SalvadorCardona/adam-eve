import hammerSrc from "@/packages/ui/MouseCursor/hammer.png"
import imageHandSrc from "@/packages/ui/MouseCursor/hand.png"
import hammerBrokenSrc from "@/packages/ui/MouseCursor/hammer-broken.png"
import hammerCanceledSrc from "@/packages/ui/MouseCursor/hammer-canceled.png"

export const mouseIcon = {
  build: hammerSrc,
  normal: imageHandSrc,
  removeBuilding: hammerBrokenSrc,
  cantBeBuild: hammerCanceledSrc,
}
