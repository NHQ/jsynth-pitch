var master = new AudioContext
var oz = require('oscillators')
var amod = require('amod')
var jdelay = require('jdelay')
var jsynth = require('jsynth')
var  mic = require('jsynth-mic')(master)
var shift = require('pitch-shift')
var pool = require('typedarray-pool')
var pitcher = require('./xindex')(master)
var detect = require('./detect-pitch')
var shifter = require('../jsynth-pitch-shift')
var frame_size = 512*2*2

var shiftNode = shifter(master, function(t){
  return amod(1, 1/2, t, 6)
})

mic.on('node', function(node){
//  node.connect(master.destination)
  node.connect(shiftNode)
  var delay = jdelay(master.sampleRate / 6, .69, .667)

  var synth = jsynth(master, function(t,s,i){
    
    return delay(i)//, sampleRate / 3, amod(.9, 3, t, 5), .557)
    
  }, frame_size)
  //node.connect(shiftNode)
  //shiftNode.connect(master.destination)
  //synth.connect(master.destination)
  
  //node.connect(synth)
  //synth.connect(shiftNode)
  //shiftNode.connect(master.destination)
//  shiftNode.connect(synth)
//  synth.connect(master.destination)
  //node.connect(master.destination)
  
  var sines = jsynth(master, function(t){
    return Math.sin( t * Math.PI * 2 * 12000)
  })

  pitcher.connect(node)
  //sines.connect(master.destination)
})




setInterval(function(){
  var x = pitcher.getFreq()
  var i = pitcher.freqDex(440)
  var y = pitcher.freqDex(1300)
  var min = 0;
  var max = -100;
  var mini, maxi;
  for(z = 0; z < x.length; z++){
    min = Math.min(min, x[z])
    if(min == x[z]) mini = z
    max = Math.max(max, x[z])
    if(max == x[z]) maxi = z
  }
  console.log(pitcher.range(Math.floor(detect(x))), detect(x), min, max)//x[i], x[y])
}, 1000)

/*
mic.on('node', function(node){
  node.connect(pitcher)
  pitcher.connect(master.destination)
})
*/
