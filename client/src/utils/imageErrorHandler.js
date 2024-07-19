import { images } from "../consts/images";

export default function imageErrorHandler(e) {
  e.target.src = images.thumbnailStub;
}
