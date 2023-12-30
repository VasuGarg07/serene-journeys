import Lottie from 'lottie-react';

interface AnimationFile {
  lottie: any
}

const LottieAnimation = ({ lottie }: AnimationFile) => {
  return (
    <Lottie animationData={lottie} loop={true} />
  )
}

export default LottieAnimation