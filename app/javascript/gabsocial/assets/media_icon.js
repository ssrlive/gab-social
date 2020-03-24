const MediaIcon = ({
  className = '',
  width = '16px',
  height = '16px',
  viewBox = '0 0 48 48',
  title = 'Media',
}) => (
  <svg
    className={className}
    version='1.1'
    xmlns='http://www.w3.org/2000/svg'
    x='0px'
    y='0px'
    width={width}
    height={height}
    viewBox={viewBox}
    xmlSpace='preserve'
    aria-label={title}
  >
    <g>
      <path d='M 24.87 37.95 C 23.47 37.93 22.13 37.43 21 36.54 L 14 30.33 C 12.91 29.3 11.21 29.21 10 30.14 L 0 37.5 L 0 42.28 C -0 43.56 0.91 44.66 2.2 44.73 C 2.26 44.74 2.33 44.74 2.39 44.73 L 37.85 44.73 C 39.27 44.73 40.69 43.7 40.69 42.28 L 40.69 29.75 L 27.97 37.11 C 27 37.68 25.96 37.97 24.87 37.95 Z M 24.87 37.95' />
      <path d='M 27.19 22.58 C 27.19 24.15 25.92 25.43 24.35 25.43 C 22.78 25.43 21.51 24.15 21.51 22.58 C 21.51 21 22.78 19.74 24.35 19.74 C 25.92 19.74 27.19 21 27.19 22.58 Z M 27.19 22.58' />
      <path d='M 47.41 8.31 C 47 7.75 46.36 7.39 45.66 7.34 L 10.46 3.27 C 9.78 3.21 9 3.4 8.53 3.79 C 8 4.23 7.69 4.82 7.56 5.47 L 6.98 10.51 L 37.85 10.51 C 40.79 10.57 43.17 12.93 43.27 15.87 L 43.27 38.66 C 43.27 38.54 43.86 38.41 44.11 38.15 C 44.65 37.73 44.96 37 44.95 36.41 L 47.99 10.18 C 48 9.51 47.84 8.83 47.41 8.31 Z M 47.41 8.31' />
      <path d='M 37.85 13 L 2.39 13 C 0.97 13 0 14.45 0 15.87 L 0 34.27 L 8.53 28 C 10.69 26.47 13.69 26.6 15.7 28.39 L 22.8 34.6 C 23.87 35.5 25.4 35.64 26.61 34.92 L 40.69 26.72 L 40.69 15.87 C 40.59 14.35 39.37 13.15 37.85 13 Z M 24.35 28 C 21.36 28 18.93 25.58 18.93 22.58 C 18.93 19.59 21.36 17.16 24.35 17.16 C 27.35 17.16 29.78 19.59 29.78 22.58 C 29.78 25.58 27.35 28 24.35 28 Z M 24.35 28' />
    </g>
  </svg>
)

export default MediaIcon