const GetColorUtils = (population) => {
  return population >= 2629
    ? '#800026'
    : population > 2000
    ? '#BD0026'
    : population > 1500
    ? '#E31A1C'
    : population > 1000
    ? '#FC4E2A'
    : population > 500
    ? '#FD8D3C'
    : population > 0
    ? '#FEB24C'
    : '#FFEDA0'
}

export default GetColorUtils
