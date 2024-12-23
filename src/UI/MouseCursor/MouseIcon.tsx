import hammerSrc from "@/src/UI/MouseCursor/hammer.png"
import imageHandSrc from "@/src/UI/MouseCursor/hand.png"
import hammerBrokenSrc from "@/src/UI/MouseCursor/hammer-broken.png"
import hammerCanceledSrc from "@/src/UI/MouseCursor/hammer-canceled.png"

export const mouseIcon = {
  build: hammerSrc,
  normal: imageHandSrc,
  removeBuilding: hammerBrokenSrc,
  cantBeBuild: hammerCanceledSrc,
}
