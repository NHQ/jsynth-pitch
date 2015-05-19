var detect = require('detect-pitch')

module.exports = function(master, bufSize){
  var proc = master.createScriptProcessor(bufSize || 256 * 2 * 2 * 2, 1, 1)
  proc.onaudioprocess = function(e){
    var signal = e.inputBuffer.getChannelData(0) 
    console.log(master.sampleRate / detect(signal))
//    var out = e.outputBuffer.getChannelData(0)
//    out.set(signal)
  }
  return proc
}
