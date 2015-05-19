module.exports = function(master, bufSize){
  var proc = master.createAnalyser()
  proc.fftSize = bufSize || 256 * 2 * 2 * 2
  binSize = proc.frequencyBinCount
  var data = new Float32Array(binSize)
  var range = (master.sampleRate / 2) / binSize

  function getPitchIndex(freq){
    return Math.floor(freq / range)
  }
  function pitchRange(index){
    return [index * range, index * range + range]
  }
  function getFreqy(){
    proc.getFloatFrequencyData(data)
    return data
  }
  function getAmpy(){
    proc.getFloatTimeDomainData(data)
    return data
  }
  function connect(node){
    node.connect(proc)
  }
  return {range: pitchRange, freqDex: getPitchIndex, connect: connect, getFreq: getFreqy, getTime:getAmpy}
}
