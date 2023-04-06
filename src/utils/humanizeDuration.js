const humanizeDuration = (duration) => {
  if(duration < 1000) {
    return `${duration} μs`
  } else if (duration < 1000000) {
    return `${duration} ms`
  } else {
    return `${duration} s`
  }
}

export default humanizeDuration;
