const humanizeDuration = (duration) => {
  if(duration < 1000) {
    return `${duration} μs`
  } else if (duration < 1000000) {
    return `${duration / 1000} ms`
  } else {
    return `${duration / 1000000} s`
  }
}

export default humanizeDuration;
