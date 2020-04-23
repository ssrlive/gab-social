const CopyIcon = ({
  className = '',
  size = '24px',
  title = 'Copy',
}) => (
  <svg
    className={className}
    version='1.1'
    xmlns='http://www.w3.org/2000/svg'
    x='0px'
    y='0px'
    width={size}
    height={size}
    viewBox='0 0 48 48'
    xmlSpace='preserve'
    aria-label={title}
  >
    <g>
      <path d='M 34.285156 8.570312 L 5.144531 8.570312 C 2.300781 8.570312 0 10.875 0 13.714844 L 0 42.855469 C 0 45.699219 2.300781 48 5.144531 48 L 34.285156 48 C 37.125 48 39.429688 45.699219 39.429688 42.855469 L 39.429688 13.714844 C 39.429688 10.875 37.125 8.570312 34.285156 8.570312 Z M 36 42.855469 C 36 43.804688 35.234375 44.570312 34.285156 44.570312 L 5.144531 44.570312 C 4.195312 44.570312 3.429688 43.804688 3.429688 42.855469 L 3.429688 13.714844 C 3.429688 12.765625 4.195312 12 5.144531 12 L 34.285156 12 C 35.234375 12 36 12.765625 36 13.714844 Z M 36 42.855469' />
      <path d='M 42.855469 0 L 12 0 C 9.160156 0 6.855469 2.300781 6.855469 5.144531 C 6.855469 6.089844 7.625 6.855469 8.570312 6.855469 C 9.519531 6.855469 10.285156 6.089844 10.285156 5.144531 C 10.285156 4.195312 11.054688 3.429688 12 3.429688 L 42.855469 3.429688 C 43.804688 3.429688 44.570312 4.195312 44.570312 5.144531 L 44.570312 36 C 44.570312 36.945312 43.804688 37.714844 42.855469 37.714844 C 41.910156 37.714844 41.144531 38.480469 41.144531 39.429688 C 41.144531 40.375 41.910156 41.144531 42.855469 41.144531 C 45.699219 41.144531 48 38.839844 48 36 L 48 5.144531 C 48 2.300781 45.699219 0 42.855469 0 Z M 42.855469 0' />
    </g>
  </svg>
)

export default CopyIcon