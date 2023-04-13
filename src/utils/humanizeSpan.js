const humanizeSpan = (span) => {
  if(span.singleton) {
    return `${span.self_class}.${span.method_name}`
  } else {
    return `${span.self_class}#${span.method_name}`
  }
}

export default humanizeSpan;
