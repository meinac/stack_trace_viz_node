const maxDepth = (spans) => {
  return spans.length > 0 ? Math.max.apply(null, spans.map(span => span.spans.length === 0 ? 1 : (maxDepth(span.spans) + 1))) : 0
}

export default maxDepth;
