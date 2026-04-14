import hammerSrc from "@/packages/UI/MouseCursor/hammer.png"
import imageHandSrc from "@/packages/UI/MouseCursor/hand.png"
import hammerBrokenSrc from "@/packages/UI/MouseCursor/hammer-broken.png"
import hammerCanceledSrc from "@/packages/UI/MouseCursor/hammer-canceled.png"

export const mouseIcon = {
  build: hammerSrc,
  normal: imageHandSrc,
  removeBuilding: hammerBrokenSrc,
  cantBeBuild: hammerCanceledSrc,
}
