import Lottie from 'react-lottie-player'
import lottieJson from './sunny.json'

export default function Animation() {
  return (
    <div>
      <Lottie
        loop
        animationData={lottieJson}
        play
        // style={{ width: 100, height: 100 }}
      />
    </div>
  )
}
