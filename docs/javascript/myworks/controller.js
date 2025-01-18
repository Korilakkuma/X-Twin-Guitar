/** 
 * controller.js
 *
 * @fileoverview This module receives event from "VIEW" (index.html), and sends to "MODEL" (xsound.js). Namely, this module is "CONTROLLER" in MVC model.
 * 
 * MODEL      : xsound.js
 * VIEW       : index.html
 * CONTROLLER : controller.js
 * 
 * JavaScript Libraries :
 *     EventWrapper.js
 *     jQuery / jQuery UI
 *     select2.js
 *
 * Copyright 2012, 2013@Tomohiro IKEDA
 * Released under the MIT license
 */
 
 
 
/**
 * @license
 * sf2synth.js
 * SoundFont Synthesizer for WebMidiLink
 * https://github.com/gree/sf2synth.js
 *
 * The MIT License
 *
 * Copyright (c) 2013 imaya / GREE Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
 
 
 
$(function(){
    X('oneshot').param('transpose', 0.95);

    X('oneshot').module('panner').state(false);
    X('oneshot').module('distortion').state(false);
    X('oneshot').module('filter').state(false);
    X('oneshot').module('autopanner').state(false);
    X('oneshot').module('reverb').state(false);

    X('oneshot').module('wah').state(false).param({
        cutoff    : 1000,
        depth     : 0.5,
        rate      : 2.5,
        resonance : 20
    });

    X('oneshot').module('tremolo').state(false).param({
        depth : 1,
        rate  : 5
    });

    X('oneshot').module('ringmodulator').state(false).param({
        depth : 1,
        rate  : 1000
    });

    X('oneshot').module('phaser').state(false).param({
        stages    : 8,
        frequency : 500,
        depth     : 0.5,
        rate      : 10,
        mix       : 0.8
    });

    X('oneshot').module('flanger').state(false).param({
        time     : 0.005,
        depth    : 0.9,
        rate     : 5,
        mix      : 0.8,
        feedback : 0.8,
        tone     : 8000
    });

    X('oneshot').module('chorus').state(false).param({
        time     : 0.030,
        depth    : 0.6,
        rate     : 0.5,
        mix      : 0.6,
        feedback : 0,
        tone     : 8000
    });

    X('oneshot').module('delay').state(false).param({
        delayTime : 0.500,
        dry       : 1,
        wet       : 0.4,
        feedback  : 0.8,
        tone      : 8000
    });

    $("#effectors").jqDock({
        align    : "bottom",
        distance : 150,
        size     : 125,
        labels   : false,
        duration : 600
    });

    var strings =[
      ['O6 E', 'O6 F', 'O6 F+', 'O6 G', 'O6 G+', 'O6 A', 'O6 A+', 'O6 B', 'O7 C', 'O7 C+', 'O7 D', 'O7 D+', 'O7 E', 'O7 F', 'O7 F+', 'O7 G', 'O7 G+', 'O7 A', 'O7 A+', 'O7 B', 'O8 C', 'O8 C+', 'O8 D', 'O8 D+', 'O8 E'],
      ['O5 B', 'O6 C', 'O6 C+', 'O6 D', 'O6 D+', 'O6 E', 'O6 F', 'O6 F+', 'O6 G', 'O6 G+', 'O6 A', 'O6 A+', 'O6 B', 'O7 C', 'O7 C+', 'O7 D', 'O7 D+', 'O7 E', 'O7 F', 'O7 F+', 'O7 G', 'O7 G+', 'O7 A', 'O7 A+', 'O7 B'],
      ['O5 G', 'O5 G+', 'O5 A', 'O5 A+', 'O5 B', 'O6 C', 'O6 C+', 'O6 D', 'O6 D+', 'O6 E', 'O6 F', 'O6 F+', 'O6 G', 'O6 G+', 'O6 A', 'O6 A+', 'O6 B', 'O7 C', 'O7 C+', 'O7 D', 'O7 D+', 'O7 E', 'O7 F', 'O7 F+', 'O7 G'],
      ['O5 D', 'O5 D+', 'O5 E', 'O5 F', 'O5 F+', 'O5 G', 'O5 G+', 'O5 A', 'O5 A+', 'O5 B', 'O6 C', 'O6 C+', 'O6 D', 'O6 D+', 'O6 E', 'O6 F', 'O6 F+', 'O6 G', 'O6 G+', 'O6 A', 'O6 A+', 'O6 B', 'O7 C', 'O7 C+', 'O7 D'],
      ['O4 A', 'O4 A+', 'O4 B', 'O5 C', 'O5 C+', 'O5 D', 'O5 D+', 'O5 E', 'O5 F', 'O5 F+', 'O5 G', 'O5 G+', 'O5 A', 'O5 A+', 'O5 B', 'O6 C', 'O6 C+', 'O6 D', 'O6 D+', 'O6 E', 'O6 F', 'O6 F+', 'O6 G', 'O6 G+', 'O6 A'],
      ['O4 E', 'O4 F', 'O4 F+', 'O4 G', 'O4 G+', 'O4 A', 'O4 A+', 'O4 B', 'O5 C', 'O5 C+', 'O5 D', 'O5 D+', 'O5 E', 'O5 F', 'O5 F+', 'O5 G', 'O5 G+', 'O5 A', 'O5 A+', 'O5 B', 'O6 C', 'O6 C+', 'O6 D', 'O6 D+', 'O6 E']
    ];

    var flets = [];
   $('[id*="string-"]').children().hide();

    var toMML = function(gtl){
        var regexp = new RegExp('S\(1\|2\|3\|4\|5\|6\|\)F\(\\d\+\)D\(\(\?\:256\|192\|144\|128\|96\|72\|64\|48\|36\|32\|24\|18\|16\|12\|8\|6\|4\|2\|1\)\\.\?\)\(\?\:&S\(1\|2\|3\|4\|5\|6\|\)F\(\\d\+\)D\(\(\?\:256\|192\|144\|128\|96\|72\|64\|48\|36\|32\|24\|18\|16\|12\|8\|6\|4\|2\|1\)\\.\?\)\)\*', 'gi');
        var mml    = gtl;

        flets = [];

        while (true) {
            var matches = regexp.exec(gtl);

            if (matches === null) {
                break;
            }

            var notes = matches[0].split('&');
            var note  = '';

            for (var i = 0, len = notes.length; i < len; i++) {
                var index    = i * 3;
                var string   = matches[index + 1];
                var flet     = matches[index + 2];
                var duration = matches[index + 3];

                if (note === '') {
                    note += (strings[string - 1][flet] + duration);
                } else {
                    note += ('&' + strings[string - 1][flet].replace(/O\d /i, '') + duration);
                }

                flets.push({string : string, flet : flet, duration : duration});
            }

            mml = mml.replace(matches[0], note);
        }

        return mml;
    };

    $("#page").css("opacity", 0.5);

    X.ajax('one-shot-audio/thrashbluesguitar.sf2', 120000, function(event, arrayBuffer){
        var uint8array = new Uint8Array(arrayBuffer);
        var pointer    = 0;

        var chunkLists = [];

        var signature = '';

        ///////////////// RIFF chunk ///////////////

        var parseChunk = function(length){
            var len    = length || (uint8array.length - pointer);
            var offset = pointer;
            var type   = '';
            var size   = 0;

            //Clear
            chunkLists.length = 0;

            while(pointer < (len + offset)){
                type = String.fromCharCode(uint8array[pointer++], uint8array[pointer++], uint8array[pointer++], uint8array[pointer++]);  //'RIFF'

                size = ((uint8array[pointer++]) | (uint8array[pointer++] << 8) | (uint8array[pointer++] << 16) | (uint8array[pointer++] << 24)) >>> 0;

                chunkLists.push({type : type, size : size, offset : pointer});

                pointer += size;

                //padding
                if(((pointer - offset) & 1) === 1)i++;
            }
        };

        parseChunk();

        //Check
        if(chunkLists.length !== 1){
            console.error('ERROR : The length of chunk is invalid !!');
            return;
        }

        ////////////////////////////////////////////



        ///////////////// SIGNATURE ///////////////

        pointer = chunkLists[0].offset;

        signature = String.fromCharCode(uint8array[pointer++], uint8array[pointer++], uint8array[pointer++], uint8array[pointer++]);  //sfbk

        ///////////////////////////////////////////

        parseChunk(chunkLists[0].size - 4);

        //Check
        if(chunkLists.length !== 3){
            console.error('ERROR : sfbk structure is invalid !!');
            return;
        }

        var chunk1 = chunkLists[0];
        var chunk2 = chunkLists[1];
        var chunk3 = chunkLists[2];

        ///////////////// INFO - list ///////////////

        pointer = chunk1.offset;

        //Check
        if(chunk1.type !== 'LIST'){
            console.error('ERROR : chunk type is invalid !! >> ' + chunk1.type);
            return;
        }

        signature = String.fromCharCode(uint8array[pointer++], uint8array[pointer++], uint8array[pointer++], uint8array[pointer++]);

        if(signature !== 'INFO'){
            console.error('ERROR : signature is invalid !! >> ' + signature);
            return;
        }

        //Read structure
        parseChunk(chunk1.size - 4);

        /////////////////////////////////////////////



        ///////////////// sdta - list ///////////////

        pointer = chunk2.offset;

        //Check
        if(chunk2.type !== 'LIST'){
            console.error('ERROR : chunk type is invalid !! >> ' + chunk2.type);
            return;
        }

        signature = String.fromCharCode(uint8array[pointer++], uint8array[pointer++], uint8array[pointer++], uint8array[pointer++]);

        if(signature !== 'sdta'){
            console.error('ERROR : signature is invalid !! >> ' + signature);
            return;
        }

        //Read structure
        parseChunk(chunk2.size - 4);

        //Check
        if(chunkLists.length !== 1){
            console.error('ERROR : TODO');
            return;
        }

        var samplingData = chunkLists[0];

        /////////////////////////////////////////////



        ///////////////// pdta - list ///////////////

        pointer = chunk3.offset;

        //Check
        if(chunk3.type !== 'LIST'){
            console.error('ERROR : chunk type is invalid !! >> ' + chunk3.type);
            return;
        }

        signature = String.fromCharCode(uint8array[pointer++], uint8array[pointer++], uint8array[pointer++], uint8array[pointer++]);

        if(signature !== 'pdta'){
            console.error('ERROR : signature is invalid !! >> ' + signature);
            return;
        }

        //Read structure
        parseChunk(chunk3.size - 4);

        //Check
        if(chunkLists.length !== 9){
            console.error('ERROR : pdta chunk is invalid !!');
            return;
        }

        /////////////////////////////////////////////

        var phdr = chunkLists[0];
        var pbag = chunkLists[1];
        var pmod = chunkLists[2];
        var pgen = chunkLists[3];
        var inst = chunkLists[4];
        var ibag = chunkLists[5];
        var imod = chunkLists[6];
        var igen = chunkLists[7];
        var shdr = chunkLists[8];

        ///////////////// Phdr ///////////////

        var createPresetHeaders = function(chunk){
            var i = chunk.offset;
            var size = chunk.offset + chunk.size;

            //Check
            if(chunk.type !== 'phdr'){
                console.error('ERROR : chunk type is invalid !! >> ' + chunk.type);
                return;
            }

            var outputs = [];

            while(i < size){
                outputs.push({
                  presetName     : String.fromCharCode.apply(null, uint8array.subarray(i, (i += 20))),
                  preset         : (uint8array[i++] | (uint8array[i++] << 8)),
                  bank           : (uint8array[i++] | (uint8array[i++] << 8)),
                  presetBagIndex : (uint8array[i++] | (uint8array[i++] << 8)),
                  library        : ((uint8array[i++] | (uint8array[i++] << 8) | (uint8array[i++] << 16) | (uint8array[i++] << 24)) >>> 0),
                  genre          : ((uint8array[i++] | (uint8array[i++] << 8) | (uint8array[i++] << 16) | (uint8array[i++] << 24)) >>> 0),
                  morphology     : ((uint8array[i++] | (uint8array[i++] << 8) | (uint8array[i++] << 16) | (uint8array[i++] << 24)) >>> 0)
                });
            }

            return outputs;
        };

        var presetHeaders = createPresetHeaders(phdr);

        //////////////////////////////////////



        ///////////////// Pbag ///////////////

        var createPresetZones = function(chunk){
            var i = chunk.offset;
            var size = chunk.offset + chunk.size;

            //Check
            if(chunk.type !== 'pbag'){
                console.error('ERROR : chunk type is invalid !! >> ' + chunk.type);
                return;
            }

            var outputs = [];

            while(i < size){
                outputs.push({
                  presetGeneratorIndex : (uint8array[i++] | (uint8array[i++] << 8)),
                  presetModulatorIndex : (uint8array[i++] | (uint8array[i++] << 8))
                });
            }

            return outputs;
        };

        var presetZones = createPresetZones(pbag);

        //////////////////////////////////////

        var enumeratorTables = [
          'startAddrsOffset',
          'endAddrsOffset',
          'startloopAddrsOffset',
          'endloopAddrsOffset',
          'startAddrsCoarseOffset',
          'modLfoToPitch',
          'vibLfoToPitch',
          'modEnvToPitch',
          'initialFilterFc',
          'initialFilterQ',
          'modLfoToFilterFc',
          'modEnvToFilterFc',
          'endAddrsCoarseOffset',
          'modLfoToVolume',
          , // 14
          'chorusEffectsSend',
          'reverbEffectsSend',
          'pan',
          ,,, // 18,19,20
          'delayModLFO',
          'freqModLFO',
          'delayVibLFO',
          'freqVibLFO',
          'delayModEnv',
          'attackModEnv',
          'holdModEnv',
          'decayModEnv',
          'sustainModEnv',
          'releaseModEnv',
          'keynumToModEnvHold',
          'keynumToModEnvDecay',
          'delayVolEnv',
          'attackVolEnv',
          'holdVolEnv',
          'decayVolEnv',
          'sustainVolEnv',
          'releaseVolEnv',
          'keynumToVolEnvHold',
          'keynumToVolEnvDecay',
          'instrument',
          , // 42
          'keyRange',
          'velRange',
          'startloopAddrsCoarseOffset',
          'keynum',
          'velocity',
          'initialAttenuation',
          , // 49
          'endloopAddrsCoarseOffset',
          'coarseTune',
          'fineTune',
          'sampleID',
          'sampleModes',
          , // 55
          'scaleTuning',
          'exclusiveClass',
          'overridingRootKey'
        ];


        var parseModulators = function(chunk){
            var i = chunk.offset;
            var size = chunk.offset + chunk.size;

            var code = 0;
            var key  = '';

            var outputs = [];

            while(i < size){
                //Src  Oper
                //TODO
                i += 2;

                code = uint8array[i++] | (uint8array[i++] << 8);
                key  = enumeratorTables[code];

                if(key === undefined){
                    outputs.push({
                      type  : key,
                      value : {
                        code   : code,
                        amount : (((uint8array[i] | (uint8array[i + 1] << 8)) << 16) >> 16),
                        lo     : uint8array[i++],
                        hi     : uint8array[i++]
                      }
                    });
                }else {
                    switch(key){
                        case 'keyRange' :
                        case 'velRange' :
                        case 'keynum'   :
                        case 'velocity' :
                            outputs.push({
                              lo : uint8array[i++],
                              hi : uint8array[i++]
                            });

                            break;
                    default :
                        outputs.push({
                          type  : key,
                          value : {
                              amount : (((uint8array[i++] | (uint8array[i++] << 8)) << 16) >> 16)
                          }
                        });

                        break;
                    }
                }

                //AmtSrcOper
                //TODO
                i += 2;

                //Trans Oper
                //TODO
                i += 2;
            }

            return outputs;
        };

        var parseGenerators = function(chunk){
            var i = chunk.offset;
            var size = chunk.offset + chunk.size;

            var code = 0;
            var key  = '';

            var outputs = [];

            while(i < size){
                code = uint8array[i++] | (uint8array[i++] << 8);
                key  = enumeratorTables[code];

                if(key === undefined){
                    outputs.push({
                      type  : key,
                      value : {
                        code   : code,
                        amount : ((uint8array[i] | (uint8array[i + 1] << 8)) << 16) >> 16,
                        lo     : uint8array[i++],
                        hi     : uint8array[i++]
                      }
                    });
                }else {
                    switch(key){
                        case 'keynum'   :
                        case 'keyRange' :
                        case 'velRange' :
                        case 'velocity' :
                            outputs.push({
                              type  : key,
                              value : {
                                lo : uint8array[i++],
                                hi : uint8array[i++]
                              }
                            });

                            break;
                        default :
                            outputs.push({
                              type  : key,
                              value : {
                                amount : (((uint8array[i++] | (uint8array[i++] << 8)) << 16) >> 16)
                              }
                            });

                            break;
                    }
                }
            }

            return outputs;
        };

        ///////////////// Pmod ///////////////

        var createPresetZoneModulators = function(chunk){
            //Check
            if(chunk.type !== 'pmod'){
                console.error('ERROR : chunk type is invalid !! >> ' + chunk.type);
                return;
            }

            return parseModulators(chunk);
        };

        var presetZoneModulators = createPresetZoneModulators(pmod);

        //////////////////////////////////////



        ///////////////// Pgen ///////////////

        var createPresetZoneGenerators = function(chunk){
            //Check
            if(chunk.type !== 'pgen'){
                console.error('ERROR : chunk type is invalid !! >> ' + chunk.type);
                return;
            }

            return parseGenerators(chunk);
        };

        var presetZoneGenerators = createPresetZoneGenerators(pgen);

        //////////////////////////////////////



        ///////////////// Inst ///////////////

        var createInstruments = function(chunk){
            var i = chunk.offset;
            var size = chunk.offset + chunk.size;

            //Check
            if(chunk.type !== 'inst'){
                console.error('ERROR : chunk type is invalid !! >> ' + chunk.type);
                return;
            }

            var outputs = [];

            while(i < size){
                outputs.push({
                  instrumentName     : String.fromCharCode.apply(null, uint8array.subarray(i, (i += 20))),
                  instrumentBagIndex : (uint8array[i++] | (uint8array[i++] << 8))
                });
            }

            return outputs;
        };

        var instruments = createInstruments(inst);

        //////////////////////////////////////



        ///////////////// Ibag ///////////////

        var createInstrumentZones = function(chunk){
            var i = chunk.offset;
            var size = chunk.offset + chunk.size;

            //Check
            if(chunk.type !== 'ibag'){
                console.error('ERROR : chunk type is invalid !! >> ' + chunk.type);
                return;
            }

            var outputs = [];

            while(i < size){
                outputs.push({
                  instrumentGeneratorIndex : (uint8array[i++] | (uint8array[i++] << 8)),
                  instrumentModulatorIndex : (uint8array[i++] | (uint8array[i++] << 8))
                });
            }

            return outputs;
        };

        var instrumentZones = createInstrumentZones(ibag);

        //////////////////////////////////////



        ///////////////// Imod ///////////////

        var createInstrumentZoneModulators = function(chunk){
            var i = chunk.offset;
            var size = chunk.offset + chunk.size;

            //Check
            if(chunk.type !== 'imod'){
                console.error('ERROR : chunk type is invalid !! >> ' + chunk.type);
                return;
            }

            return parseModulators(chunk);
        };

        var instrumentZoneModulators = createInstrumentZoneModulators(imod);

        //////////////////////////////////////



        ///////////////// Igen ///////////////

        var createInstrumentZoneGenerators = function(chunk){
            var i = chunk.offset;
            var size = chunk.offset + chunk.size;

            //Check
            if(chunk.type !== 'igen'){
                console.error('ERROR : chunk type is invalid !! >> ' + chunk.type);
                return;
            }

            return parseGenerators(chunk);
        };

        var instrumentZoneGenerators = createInstrumentZoneGenerators(igen);

        //////////////////////////////////////



        ///////////////// shdr ///////////////

        var samples = [];

        var createSampleHeaders = function(chunk){
            var i = chunk.offset;
            var size = chunk.offset + chunk.size;

            //Check
            if(chunk.type !== 'shdr'){
                console.error('ERROR : chunk type is invalid !! >> ' + chunk.type);
                return;
            }

            var sample = null;

            var sampleName = '';

            var start           = 0;
            var end             = 0;
            var startLoop       = 0;
            var endLoop         = 0;
            var sampleRate      = 0;
            var originalPitch   = 0;
            var pitchCorrection = 0;
            var sampleLink      = 0;
            var sampleType      = 0;

            var fillBuffer = function(buffer, rate){
                var newBuffer = null;
                var multiple  = 1;

                while(rate < 22050){
                    newBuffer = new Int16Array(2 * buffer.length);

                    for(var j = 0, k = 0, len = buffer.length; j < len; j++){
                        newBuffer[k++] = buffer[j];
                        newBuffer[k++] = buffer[j];
                    }

                    buffer    = newBuffer;
                    multiple *= 2;
                    rate     *= 2;
                }

                return {buffer : buffer, multiple : multiple};
            };

            var outputs = [];

            while(i < size){
                sampleName = String.fromCharCode.apply(null, uint8array.subarray(i, (i += 20)));

                start      = (((uint8array[i++] << 0) | (uint8array[i++] << 8) | (uint8array[i++] << 16) | (uint8array[i++] << 24)) >>> 0);
                end        = (((uint8array[i++] << 0) | (uint8array[i++] << 8) | (uint8array[i++] << 16) | (uint8array[i++] << 24)) >>> 0);
                startLoop  = (((uint8array[i++] << 0) | (uint8array[i++] << 8) | (uint8array[i++] << 16) | (uint8array[i++] << 24)) >>> 0);
                endLoop    = (((uint8array[i++] << 0) | (uint8array[i++] << 8) | (uint8array[i++] << 16) | (uint8array[i++] << 24)) >>> 0);
                sampleRate = (((uint8array[i++] << 0) | (uint8array[i++] << 8) | (uint8array[i++] << 16) | (uint8array[i++] << 24)) >>> 0);

                startLoop -= start;
                endLoop   -= start;

                originalPitch   = uint8array[i++];
                pitchCorrection = (uint8array[i++] << 24) >> 24;
                sampleLink      = uint8array[i++] | (uint8array[i++] << 8);
                sampleType      = uint8array[i++] | (uint8array[i++] << 8);

                sample = new Int16Array(new Uint8Array(uint8array.subarray((samplingData.offset + (2 * start)), (samplingData.offset + (2 * end)))).buffer);

                if(sampleRate > 0){
                    var obj = fillBuffer(sample, sampleRate);
                    sample      = obj.buffer;
                    sampleRate *= obj.multiple;
                    startLoop  *= obj.multiple;
                    endLoop    *= obj.multiple;

                    samples.push(sample);

                    outputs.push({
                        sampleName      : sampleName,
                        //start           : start,
                        //end             : end,
                        startLoop       : startLoop,
                        endLoop         : endLoop,
                        sampleRate      : sampleRate,
                        originalPitch   : originalPitch,
                        pitchCorrection : pitchCorrection,
                        sampleLink      : sampleLink,
                        sampleType      : sampleType
                    });
                }
            }

            return outputs;
        };

        var sampleHeaders = createSampleHeaders(shdr);

        //////////////////////////////////////



        ///////////////// create instrument ///////////////

        var createdInstruments = [];

        var zoneInfos = [];

        var instrumentGenerator = {};
        var instrumentModulator = {};

        var bagIndex    = 0;
        var bagIndexEnd = 0;

        var createBagModGen = function(zone, start, end, zoneModGens){
            var modgenInfos = [];

            var modgen = {
              unknown  : [],
              keyRange : {
                hi : 127,
                lo : 0
              }
            };

            var info = {};

            for(var n = start; n < end; n++){
                info = zoneModGens[n];
                modgenInfos.push(info);

                if(info.type === 'unknown'){
                    modgen.unknown.push(info.value);
                }else {
                    modgen[info.type] = info.value;
                }
            }

            return {modgen : modgen, modgenInfo : modgenInfos};
        };

        var createInstrumentGenerator = function(zones, index){
            var modgen = createBagModGen(
              zones,
              zones[index].instrumentGeneratorIndex,
              zones[index + 1] ? zones[index + 1].instrumentGeneratorIndex : instrumentZoneGenerators.length,
              instrumentZoneGenerators
            );

            return {generator : modgen.modgen, generatorInfo : modgen.modgenInfo};
        };

        var createInstrumentModulator = function(zones, index){
            var modgen = createBagModGen(
              zones,
              zones[index].presetModulatorIndex,
              zones[index + 1] ? zones[index + 1].instrumentModulatorIndex : instrumentZoneModulators.length,
              instrumentZoneModulators
            );

            return {modulator : modgen.modgen, modulatorInfo : modgen.modgenInfo};
        };

        for(var j = 0, len = instruments.length; j < len; j++){
            bagIndex    = instruments[j].instrumentBagIndex;
            bagIndexEnd = instruments[j + 1] ? instruments[j + 1].instrumentBagIndex : instrumentZones.length;

            zoneInfos = [];

            for(var k = bagIndex, end = bagIndexEnd; k < end; k++){
                instrumentGenerator = createInstrumentGenerator(instrumentZones, k);
                instrumentModulator = createInstrumentModulator(instrumentZones, k);

                zoneInfos.push({
                  generator         : instrumentGenerator.generator,
                  generatorSequence : instrumentGenerator.generatorInfo,
                  modulator         : instrumentModulator.modulator,
                  modulatorSequence : instrumentModulator.modulatorInfo
                });
            }

            createdInstruments.push({name : instruments[j].instrumentName, info : zoneInfos});
        }

        ///////////////////////////////////////////////////



        ///////////////// create preset ///////////////

        var createdPresets = [];

        var presetGenerator = {};
        var presetModulator = {};

        var instrument = 0;

        var createPresetGenerator = function(zones, index){
            var modgen = createBagModGen(
              zones,
              zones[index].presetGeneratorIndex,
              zones[index + 1] ? zones[index + 1].presetGeneratorIndex : presetZoneGenerators.length,
              presetZoneGenerators
            );

            return {generator : modgen.modgen, generatorInfo : modgen.modgenInfo};
        };

        var createPresetModulator = function(zones, index){
            var modgen = createBagModGen(
                zones,
                zones[index].presetModualtorIndex,
                zones[index + 1] ? zones[index + 1].presetModulatorIndex : presetZoneModulators.length,
                presetZoneModulators
            );

            return {modulator : modgen.modgen, modulatorInfo : modgen.modgenInfo};
        };

        for(var j = 0, len = presetHeaders.length; j < len; j++){
            bagIndex    = presetHeaders[j].presetBagIndex;
            bagIndexEnd = presetHeaders[j + 1] ? presetHeaders[j + 1].presetBagIndex : presetZones.length;

            zoneInfos = [];

            for(var k = bagIndex, end = bagIndexEnd; k < end; k++){
                presetGenerator = createPresetGenerator(presetZones, k);
                presetModulator = createPresetModulator(presetZones, k);

                zoneInfos.push({
                  generator         : presetGenerator.generator,
                  generatorSequence : presetGenerator.generatorInfo,
                  modulator         : presetModulator.modulator,
                  modulatorSequence : presetModulator.modulatorInfo
                });

                if(presetGenerator.generator['instrument'] !== undefined){
                    instrument = presetGenerator.generator['instrument'].amount;
                }else if(presetModulator.modulator['instrument'] !== undefined){
                    instrument = presetModulator.modualtor['instrument'].amount;
                }else {
                    instrument = null;
                }
            }

            createdPresets.push({name : presetHeaders[j].presetName, info : zoneInfos, header : presetHeaders[j], instrument : instrument});
        }

        ///////////////////////////////////////////////////



        ///////////////// create all instrument ///////////////

        var bankSets = [];
        var banks    = [];

        var preset       = {};
        var presetNumber = 0;

        var instrument = {};

        var volAttack  = 0;
        var volDecay   = 0;
        var volSustain = 0;
        var volRelease = 0;
        var modAttack  = 0;
        var modDecay   = 0;
        var modSustain = 0;
        var modRelease = 0;

        var tune       = 0;
        var scale      = 0;
        var freqVibLFO = 0;

        var sampleID     = 0;
        var sampleHeader = {};

        var getModGenAmount = function(generator, enumeratorType, optDefault){
            if(optDefault === undefined)optDefault = 0;

            return generator[enumeratorType] ? generator[enumeratorType].amount : optDefault;
        };

        for(var j = 0, len = createdPresets.length; j < len; j++){
            preset       = createdPresets[j];
            presetNumber = preset.header.preset;

            if(typeof preset.instrument !== 'number')continue;

            instrument = createdInstruments[preset.instrument];

            if(instrument.name.replace(/\0*$/, '') === 'EOI')continue;

            if(bankSets[preset.header.bank] === undefined)bankSets[preset.header.bank] = [];

            banks = bankSets[preset.header.bank];
            banks[presetNumber] = [];
            banks[presetNumber].name = preset.name;

            for(var k = 0, end = instrument.info.length; k < end; k++){
                var generator = instrument.info[k].generator;

                if((generator['keyRange'] === undefined) || (generator['sampleID'] === undefined))continue;

                var volAttack  = getModGenAmount(generator, 'attackVolEnv',  -12000);
                var volDecay   = getModGenAmount(generator, 'decayVolEnv',   -12000);
                var volSustain = getModGenAmount(generator, 'sustainVolEnv');
                var volRelease = getModGenAmount(generator, 'releaseVolEnv', -12000);
                var modAttack  = getModGenAmount(generator, 'attackModEnv',  -12000);
                var modDecay   = getModGenAmount(generator, 'decayModEnv',   -12000);
                var modSustain = getModGenAmount(generator, 'sustainModEnv');
                var modRelease = getModGenAmount(generator, 'releaseModEnv', -12000);

                tune       = getModGenAmount(generator, 'coarseTune') + (getModGenAmount(generator, 'fineTune') / 100);
                scale      = getModGenAmount(generator, 'scaleTuning', 100) / 100;
                freqVibLFO = getModGenAmount(generator, 'freqVibLFO');

                for(var n = generator['keyRange'].lo, range = generator['keyRange'].hi; n <= range; n++){
                    if(banks[presetNumber][n])continue;

                    var sampleID    = getModGenAmount(generator, 'sampleID');
                    var sampleHeader = sampleHeaders[sampleID];

                    banks[presetNumber][n] = {
                      'sample' : samples[sampleID],
                      'sampleRate' : sampleHeader.sampleRate,
                      'basePlaybackRate' : Math.pow(
                        Math.pow(2, (1 / 12)),
                        ((n - getModGenAmount(generator, 'overridingRootKey', sampleHeader.originalPitch) + tune + (sampleHeader.pitchCorrection / 100)) * scale)
                      ),
                      'modEnvToPitch' : (getModGenAmount(generator, 'modEnvToPitch') / 100),
                      'scaleTuning' : scale,
                      'start' : ((getModGenAmount(generator, 'startAddrsCoarseOffset') * 32768) + getModGenAmount(generator, 'startAddrsOffset')),
                      'end'   : ((getModGenAmount(generator, 'endAddrsCoarseOffset') * 32768) + getModGenAmount(generator, 'endAddrsOffset')),
                      'loopStart' : (
                        (sampleHeader.startLoop + getModGenAmount(generator, 'startloopAddrsCoarseOffset') * 32768) +
                        getModGenAmount(generator, 'startloopAddrsOffset')
                      ),
                      'loopEnd' : (
                        (sampleHeader.endLoop + getModGenAmount(generator, 'endloopAddrsCoarseOffset') * 32768) +
                        getModGenAmount(generator, 'endloopAddrsOffset')
                      ),
                      'volAttack'  : Math.pow(2, (volAttack / 1200)),
                      'volDecay'   : Math.pow(2, (volDecay / 1200)),
                      'volSustain' : (volSustain / 1000),
                      'volRelease' : Math.pow(2, (volRelease / 1200)),
                      'modAttack'  : Math.pow(2, (modAttack / 1200)),
                      'modDecay'   : Math.pow(2, (modDecay  / 1200)),
                      'modSustain' : (modSustain / 1000),
                      'modRelease' : Math.pow(2, (modRelease / 1200)),
                      'initialFilterFc' : getModGenAmount(generator, 'initialFilterFc', 13500),
                      'freqVibLFO' : freqVibLFO ? (Math.pow(2, (freqVibLFO / 1200)) * 8.176) : undefined
                    };
                }
            }
        }

        ///////////////////////////////////////////////////////

        var bank     = banks[0];
        var buffers  = [];
        var settings = [];

        var scales = [
                                              78, 79, 80,
          69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
          69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
          69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
          69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
          69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
          69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
          69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
          69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
          69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80
        ];

        for (var i = 0; i < 100; i++) {
            var index = scales[i];
            var mode  = bank[index];
            var setting = {};

            var buffer = X.get().createBuffer(1, mode['sample'].length, mode['sampleRate']);
            buffer.getChannelData(0).set(new Float32Array(mode['sample'].subarray(0, (mode['sample'].length + mode['end']))));

            buffers.push(buffer);

            var rate = 1;

            if ((i >= 0) && (i <= 2)) {
                rate = 0.0625;
            } else if ((i >= 3) && (i <= 14)) {
                rate = 0.125;
            } else if ((i >= 15) && (i <= 26)) {
                rate = 0.25;
            } else if ((i >= 27) && (i <= 38)) {
                rate = 0.5;
            } else if ((i >= 39) && (i <= 50)) {
                rate = 1;
            } else if ((i >= 51) && (i <= 62)) {
                rate = 2;
            } else if ((i >= 63) && (i <= 74)) {
                rate = 4;
            } else if ((i >= 75) && (i <= 86)) {
                rate = 8;
            } else if ((i >= 87) && (i <= 98)) {
                rate = 16;
            } else {
                rate = 32;
            }


            setting.buffer  = i;
            setting.rate    = mode['basePlaybackRate'] * rate * 0.25;
            setting.loop    = false;
            setting.start   = 0/*mode['loopStart'] / mode['sampleRate']*/;
            setting.end     = 0/*mode['loopEnd'] / mode['sampleRate']*/;
            setting.volume  = 1;

            settings.push(setting);
        }

        //Input MML
        var mml1 = 'T100 ';

        mml1 += 'O4  AF+DB2 AEB4 G+4 AF+C+2&AF+C+8 F+8 A8  O5  F+8 AF+D2 AEB4 G+4 AF+D2. BB4  O6  C+AE+2.&C+AE+8  O5  BG+16 AF+16 BG+E2 G+B8 AC+8 G+B8 EG+8 F+C+A4. F+F+8 G+G+8 F+F+8 G+G+4 AF+C+2. BB4 AEB2.&AEB8 G+16 F+16 G+EB2 R4 ';
        mml1 += 'O4  C+8  O3  B16  O4  C+16&C+2 R8 E8 F+8 G+16 G+16 A8 C+4. R4 R8 C+8 F+C+A4 F+C+A4 EBG+8  O3  B8  O4  C+8 D16 C+16&C+2 R4  O5  C+8  O4  B16  O5  C+16&C+2 R8 E8 F+8 G+8 A4. B8 A4. E8 A4 A8 A8 G+8 F+8 G+8 G+8 A2 C+AE+4  O4  BG+E4 ';
        mml1 += 'O5  C+AF+8 C+8 A8 G+16 A16&A8 G+8 F+8 C+16 E16&E1 R8 F+8 F+8 E16 F+16&F+8 F+8 F+16 E8  O4  A16 B2.  O5  C+G+F4 R8 C+8 A8 G+16 A16&A8 A8 G+8 A8 B8. G+16 G+8 E8 R8 E8 E8 E16 F+16&F+4. F+8 F+8. G+16.&G+8 A16 B16&B2 C+G+E4  O4  BG+E4 ';
        mml1 += 'O5  C+AE8 C+8 C+8  O4  B16  O5  C+16&C+8 C+8 E8 F+16 C+16&C+2 R2 DAF+8 D8 D8 C+16 D16&D8 C+8  O4  B8 A8  O5  C+4.  O4  B16 B16&B2 R8  O5  C+16C+16 C+8  O4  B16  O5  C+16&C+8 C+8 E8 F+16 C+16&C+2 C+8  O4  B8 A8 G+8 AF+D8  O5  D8 E8 C+16 D16&D8 D8 E8 F+16 G+16&G+2 A4 G+4 AF+C+2 R4 G+8. G+16 A2 AA4 G+G+4 AA2 EDBG+4 G+G+8. AA16 ';
        mml1 += 'O5  AF+DB2 G+EB4  O4  BG+E4  O5  C+AF+4&C+AF+16 F+16 G+16 A16  O6  C+AF+8  O4  F+8 A8  O5  F+8 AF+DB2 AA4 G+G+4 AG+C+2 R16  O4  C+16 F+16 A16  O5  C+16 F+16 A16 C+16 AEB4 AEB4 AEB4 G+8 G+16 F+16 G+EB4 G+EB4 G+EB4 C+8  O4  B16  O5  C+16&C+2 ';
        mml1 += 'O5  R8 E8 F+8 G+8 A8 C+4. R4 R8 C+16 C+16 F+16 F+8.&F+8. F+16 E16  O4  B8.  O5  C+8 D16 C+16&C+2 R4 C+8  O4  B16  O5  C+16&C+2 R8 E8 F+8 G+8 A4&A16 B8. A4. F+8 A4. A8 G+8 F+8 G+8 G+16 A16&A2.  O4  BG+E4 ';
        mml1 += 'O4  AF+C+8  O5  C+8 A8. G+16 A4 A8 G+16 C+16 E2 R8  O4  B8  O5  E8 G+8 F+C+A8 F+8 F+8 E16 F+16 F+8.  O4  F+16  O5  F+16 E8  O4  A8 B2. R4 R16  O5  C+16 C+16 A16 G+8 A16&A8 A8 G+8 A8 BG+E4 G+8 G+16 E16&E4 E8 E16 F+16&F+4. F+8 F+A8. G+B16&G+B8 AC+16 BD16&BD2 EB4  O4  BG+E8 GE16 AF+16 BGD4 BGD8.  O5  CAF16 CAF4 DBG4';
        mml1 += 'O5  ECG8 E8 E8 D16 E16&E8 E8 G8 A16 E16&E2 R4 CA8  O4  BG8  O5  CAF4 F8 E16 F16&F8 E8 D8 C8 EBG4. D16 D16&D2 R8 E8 E8 D16 E16&E8 E8 G8 A16 E16&E2 R8 DB8 CA8  O4  BG8  O5  CAF8. F16 F8 E16 F16&F8 F8 G8 A8 BGFD2  O6  CFD4  O5  BFD4  O6  CAFC2 R4  O5  BB8. BB16  O6  CC2  CAC4  O5  BGB4  O6  CAFC2  O5  BGFD4  BB8. BB16';
        mml1 += 'O6  CC4  O5  E16 E16 D16 G16 EC8 EC8 E16 D16 C16 D16  O4  BGD4  B8  O5  G8  O4  B4 G8 B8 BG16 AE8.&AE16 E16 A16 B16  O5  C8  O4  B8 A8 G16 E16 FCA4. AA8 GDB4  O3  BG16  O4  CA16 DB8 DB16 CG8.&CG16 EC16 EC16 EC16 EC8 FD8 GE8 EC8 G+EB8 G+EB4 G+E16 F+A16 BG+4. E16 E16  O5  CAF2 DB4 CA8  O4  BG16 AG16 BG4 BG16  O5  CA16 DB8 E16  O4  E16 G+16 B16  O5  C16  O4  B16  O5  C16 D16 DAE16 C16 C8&C16 C16 C16  O4  B16  O5  C8  O4  B8 A8 G8  O5  EBG4&EBG16  O4  B16  O5  D16 C16  O4  BGE8. GE16&GE8 BG8 BG16 AF8.&AF16 F16 A16 B16  O5  CA8 DB8 EC8 CA8 DB4. DB16 CA16  O4  BG8.  O5  CA16&CA8 DB8 DB16 CA8.&CA16  O4  E16 A16 B16  O5  CA8. C16  O4  BG16  O5  CA16 DB8 EBG+4&EBG+16  O4  B16  O5  C16 D16 E4 G+16 E16 F+16 G+16 AFC4 F16 G16 A16 F16 AC8 AC8 AF16 BG16 AF16  O6  CA16 DBG4. CC8  O5  BB4 F24 G24 A24 G24 A24  O6  C24 DB-F2 ECG2';
        mml1 += 'O5  ECG8 E8 E8 D16 E16&E8 E8 G8 A16 E16&E2 R4 CA8  O4  BG8  O5  CAF4 F8 E16 F16&F8 E8 D8 C8 EBG4. D16 D16&D2 R8 E8 E8 D16 E16&E8 E8 G8 A16 E16&E2 R8 DB8 CA8  O4  BG8  O5  CAF8. F16 F8 E16 F16&F8 F8 G8 A8 BGFD2  O6  CFD4  O5  BFD4  O6  CAFC2 R4  O5  BB8. BB16  O6  CC2  CAC4  O5  BGB4  O6  CAFC2  O5  CAF4  BB8. BB16';
        mml1 += 'O6  CC8  O5  E8 E8 D16 E16&E8 E8 G8 A16 E16&E2 R2 R8 F8 F8 E16 F16&F8 E8 D8 C8 E4. D16 D16&D4 R4 R8 E16 E16 E8 D16 E16&E8 E8 G8 A16 E16&E2 R2 R8 F8 F8 E16 F16&F8 F8 G8 A16 A16 B2  O6  CC4  O5  BB4';
        mml1 += 'O6  CAFC2 R4  O5  B8. B16  O6  C2.  O5  BB4  O6  CAFC2 R4  O5  B8. B16  O6  C2  CC4  O5  BB4  O6  CAFC2  R4  O5  B8. B16  O6  C2.  O5  BB4  O6  CAFC2 R4  O5  B8. B16';
        mml1 += 'O6  CC1 R2 C8  O5  G8 E8 C8 R2  O6  DBG2 R2 R4 DD4 CC1 R2 C8  O5  G8 E8 C8 R2  O6  DBG2 R2  O5  GG4 BB4 AFC4  O4  AFC8. AFC16 AFC4 AFC4 GEC4 GEC8. GEC16 GEC4 GEC4 GDB4 GDB8. GDB16 GDB4 G+DB4 AEC4 AEC4 AEC4 GDB4 AFC4 AFC4 AFC4 AFC4 BGD4 BGD8. BGD16 BGD4 BGD8  O5  C16 D16 ECG4 ECG4 FCG4 ECG4 DBG4 GG4 EE4 DBG+4 CAE4 CAE4  O4  BD4 AC4 BGD4  O5  EE4  O4  AA4 GG4 AFC4 AFC4  O5  CC4 FF4 GG2 CC2 DBG4 DBG8. DBG16 DBG4 GDB4 GDB4 GDB4 GDB4 GG4  O6  CAF2  O5  CAF4 CAF4 CGE4 CD4 DD4 EE4 GDB2  O4  GDB4 BG+E4  O5  CAE4 AA4 BB4  O6  CC4 CAF2.  O5  BG8 AF8 GEC2. FD8 EC8 DBG2 GDB4  O4  GDB4 B16 G16 D16  O3  B16  O4  B16 G16 D16  O3  B16  O4  B16 G16 D16  O3  B16  O4  BGD4  O6  CAF2.  O5  BB4  O6  CGE2  O4  BD4  O5  CE4  O4  BD2 GDB4 G+DB4 ECA4 ECA4 ECA4 GDB4 FCA4 AF4 BG4  O5  CA4  GDB2. FF4 ECG2.&ECG8 D16 C16 DBG2. DBG+8 C16  O4  B16  O5  CAE2 CAE4 C8  O4  B16 A16  O4  BGE4&BGE8.  O5  GEB16 GEB8. EBG16&EBG8  O4  A16 G16  O4  AFC4 AFC4 AFC4. G16 F16 GDB4 GDB4 ADB4 BGD4  O5  CGE2 CGE4.  O4  B16 A16 BGD2 BGD4  O5  EBG+4 CAE2 CAE4 ECA4  O4  BGE2 BGE4 BGE4 AFC2 AFC4  O5  CAF4  O4  GEC2  O5  CGE2 DBG2 DBG4 DBG4 DBG4 DBG4 GDB2 CAF2 CAG4 CAF4 CGE4 CC4 DD4 EE4 GDB2. EBG+4 AEC4 AA4 BB4  O6  CC4 CAF2.  O5  BG8 AF8 GEC2. FD8 EC8 DBG1  O4  B16 G16 D16  O3  B16  O4  B16 G16 D16  O3  B16  O4  B16 G16 D16  O3  B16  O4  BGD4  O5  CAGF2 FA4 EG8 DF8 EDCG1';

        var mml2 = 'T100 ';

        mml2 += 'O2  B2  O3  C+2 D1  O2  B2  O3  C+2 D2 E2  O2  A1 E1 F+2 E2  O3  DD1 EE1&EE1 ';
        mml2 += 'O2  A8  O3  C+8 E8 A8 EG+2  O2  A8  O3  C+8 E8 A8  O4  C+AF+E4  O2  E4 D2 E2 A8  O3  E8 A8 E8 BF+C+4 AF+C+4  O2  A8  O3  C+8 E8 A8  O4  EG+2  O3  F+8 A8  O4  C+4  O3  E8 G+8  O4  C+4  O3  D8 F+8 A4  O4  DBG+E2  O2  F+8  O3  C+8 B8 E8 A4 G+G+4 ';
        mml2 += 'O3  F+F+2  O4  C+AF+2  O3  C+8 G+8  O4  EB4  O3  BG+4  G+E4 AF+D2  O4  DAF+2  O3  E8 G+8 B8 G+8  O4  E16 D16  O3  B16 G+16  O4  C+F4 C+AF+2  O3  F+2  BG+EC+2 B8 G+8 E8 C+8 D8 F+8  O4  DA8 F+8  O4  F+DA2 DBG+E4 EE2. ';
        mml2 += 'O3  AA4  O4  C+AE4 EBG+4 EBG+4  O3  F+8 A8  O4  F+C+8  O3  F+8  O4  C+AF+E4  O2  E4 D4  O4  DAF+4 DBAF+4 DBAF+4 DBG+E4  O2  E4  O4  EBA4 EBG+4  O2  A8  O3  E8  O4  EC+A4 EBG+4 EBG+4 C+AF+4 C+AF+4 C+AF+E4 C+AF+E4  O3  AD2 AF+DB2  O3  E8 G+8 B8  O4  E8  EDBG+2  O3  D8 A8  O4  C+8  O3  A8 BG+ED2  O4  C+AF+E4 C+AF+E4 C+AF+E4 C+AF+E4 C+AF+D4.  O3  DD8 EE2 ';
        mml2 += 'O2  B8  O3  F+8 A8 F+8 C+2 D8 F+4 A8  O4  D2  O2  B8  O3  D8 F+8 B8 C+8 E8 G+8  O4  C+8  O3  D8 F+8 A4 D4 DD4  EE2.&EE8  O2  B8  O3  EE4  O2  E4  O3  E16  O2  B8. E4 ';
        mml2 += 'O2  A16  O3  C+16 E16 A16  O4  C+4 EBG+2 EC+AF+4 EC+AF+4 C+AE4  O2  E4 D8 A8  O4  DAF+4  DBG+E2 C+AF+4 C+AF+4 BF+C+4 AF+C+4  O2  A16  O3  C+16 E16 A16  O4  C+4 EBG+2 EC+AF+4 EC+AF+4 C+AE4  O2  E4 D8 A8  O4  DAF+4  DBG+E2 EDA4 EDA4 EC+A4  O3  G+G+4';
        mml2 += 'O3  F+F+4  O4  C+AF+4 C+AF+4 C+AF+4  O3  BG+EC+4 BG+EC+4 BG+EC+4 BG+EC+4 DD4  O4  C+AF+D4 C+AF+D4 C+AF+D4  O3  BG+E4 BG+E4 BG+E4  O4  C+BG+F4  O4  C+AF+2  O3  C+8  O2  B8 A8 F+8  O3  C+C+4 BG+EC+4 BG+EC+4 BG+EC+4 D16 F+16 A16 F+16  O4  D4  O3  DD2  O2  E16 B16  O3  E16 F+16 G+16 B16  O4  E16 F+16 G+E4  O3  E4  O2  G8  O3  D8 G4 G8  O2  G8  O3  GG4';
        mml2 += 'O3  C16 G16  O4  C16 D16 E4 GDB2 ECA4 ECA4 ECAG4 ECAG4 CF2 CAD2  O3  G8  O2  G8 G4  O4  DBGF8 C8  O3  B8 A8 GEC2 GDB2  O2  A8  O3  E8  O4  C8  O3  E8  O4  ECAG2 CF2 CAFD2  O3  G8  O2  G8 G4  O3  GG2  O2  F8  O3  C8 A8 C8 BGFD2  O2  A8  O3  E8  O4  C8  O3  E8 A8 E8  O4  DBG4 CF4  O2  F4  O3  GG2';
        mml2 += 'O2  C8 G8  O4  CGE4 CGEC2  O2  G8  O3  D8 G2. EA4  O2  AA2  O3  AA4  O2  F8  O3  C8 F4  O2  G4 G16 A16 B8  O3  CC4 C4  O2  G4  O3  C4  O2  E4  O3  E2  O2  G+8 B8  O2  F8  O3  C8 A8 C8 F2  O2  G8  O3  D8 G4 G+G+2  O2  A4  O3  A4  O4  ECAG2  O2  E8 B8  O3  G4 E2  O2  F4  O4  CAF4 CAF4 CAF4 DBGF4 DBGF4 DBGF4  O3  G+G+4 AA4 A4  O4  ECAG2  O3  EE4  O4  EDG+4 EDG+4 EDG+4  O3  FF4  O4  FCA4 FCA4 FCA4  O3  GG8  O2  G8 G8 G8 G8 G8 GG4 B-8  O3  F8  O4  D8  O3  F8  O4  B-B-4  O3  B-B-4';
        mml2 += 'O3  C16 G16  O4  C16 D16 E4 GDB2 ECA4 ECA4 ECAG4 ECAG4 CF2 CAD2  O3  G8  O2  G8 G4  O4  DBGF8 C8  O3  B8 A8 GEC2 GDB2  O2  A8  O3  E8  O4  C8  O3  E8  O4  ECAG2 CF2 CAFD2  O3  G8  O2  G8 G4  O3  GG2  O2  F8  O3  C8 A8 C8 BGFD2  O2  A8  O3  E8  O4  C8  O3  E8 A8 E8  O4  DBG4  O2  F8 A8  O3  C8 F8 GG2';
        mml2 += 'O4  ECG4 ECG4 GDB4 GDB4 ECA4 ECA4 ECAG4 ECAG4 CAF4 CAF4 CAFD4 CAFD4 DBGF4 DBGF4 DBGF4  O2  G16 A16 B8  O4  CGEC4 ECG4 GDB4 GDB4 ECA4 ECA4 ECAG4 ECAG4 CAF4 CAF4 CAFD4 CAFD4 DBGF4 DBGF4 DBGF8  O3  D8  O2  G4';
        mml2 += 'O2  F8  O3  C8  A4  O4  DBGF2  O3 A8  O4  C8 E8 C8  O3  A8 E8  O4  DBG4  O3  F8 A8  O4  C8  O3  A8  O4  DBGF2  O3 A8  O4  C8 E8 C8  O3  A8 E8  O4  DBG4  O2  F8  O3  C8 A4  O4  DBGF2 O3 A8  O4  C8 E8 C8  O3  A8 E8  O4  DBG4  O3  F8 A8  O4  C8  O3  A8  O4  DBGF2';
        mml2 += 'O4  CAF4 CAF4 CAF4 CAF4 CGE4 CGE4 CGE4 CGE4 DBG4 DBG4 DBG4 DBG4 ECA4 ECA4 ECA4 ECA4 CAF4 CAF4 CAF4 CAF4 CGE4 CGE4 CGE4 CGE4 DBG4 DBG4 DBG4 DBG4 FDBG4 FDBG4 FDBG4 FDGB4  O2  F8  O3  C8 F2  O2  F4 C2  O2  C2 G2. G+4 A4. E8 A4 G4 F4. F8  O3  F2  O2  G2  O3  G2  C2&C8  O2  G8 C8 A8 G2. G+4 A4. E8 A2 E4. B8  O3  E2  O2  F2.&F8 A16 B16  O3  C4.  O2  G8  O3  C4  O2  C4 G2&G8 D8 G4 G12 A12 B12  O3  C12 D12 E12 F12 G12 A12 B12  O4  C12 D12  O3  F4.  O2  F8 F2  O3  C4. C8 C8  O2  G8  O3  C4  O2  G4. G8  O3  G8  O2  G8 G+4 A8 E8 A2 G4 F4.  O3  C8 F2 C2  O2  C2 G4. G8 G2  O3  GG8  O2  G8 G8 G8  O3  G8 D8  O2  G12  O3  D12  O2  G12 F4. F8  O3  F2  C4. C8 C8  O2  G8  O3  C4  O2  G4. G8 G4 G+4 A8 E8 A2 F4 E4.  O3  C8 F2  O2  G4.  O3  D8 G4  O2  G8 A16 B16  O3  C4. C8 G4 C4  O2  G4. G8 G4 G+4 A4.  O3  E8 A2 E4  O2  B4  E2 F2&F8  O3  C8 F4  O2  G8 D8 G4 G12 B12  O3  C12 D12 C12  O2  B12  O3  C8 C8 C8 C8 D12 C12  O2  B12  O3  C4  O2  G8 B8  O3  C8 D8 G8  O2  G8 G4+ A4. E8 A2 E4. B8  O3  E2  O2  F4. F8 F2  O3  C4.  O2  G8  O3  C4 D8 C8  O2  G4. G8 G2 G8  O3  G8  O2  G4  O3  G8  O2  G8 G8 G8 F4. F8  O3  F2 C4.  O2  G8  O3  C2  O2  G4. G8 G4 G*4 A8 E8 A2 G4 F4.  O3  C8 F2 C4.  O2  G8  O3  C2  O2  G4. G8  O3  G4  O2  G4  G8 G8 G8 G8 G8 G8  O3  GG4 FF1 CC1';

        //var mml = 'MML SAMPLE >>>> ' + mml1 + '  |||||  ' + mml2;
        X('oneshot').setup(buffers, settings);

        window.alert('Loaded !!');
        $("#page").fadeTo(1000, 1.0, "easeInQuint");

        //X('oneshot').module('filter').state(false);

        X('mml').setup({
          start : function(sequence, index){
              if (flets.length === 0) return;

              var flet = flets.shift();

              var str  = flet.string;
              var f    = flet.flet;

              $("#string-" + str + "th").children(".f" + f).show();
          },
          stop : function(sequence, index){
              $('[id*="string-"]').children().hide();
          },
          ended : function(){
              flets = [];
              $('[id*="string-"]').children().hide();
          }
        });

        document.querySelector('#button-start-gtl').addEventListener(EventWrapper.START, function(){
            var mml  = toMML(document.querySelector('textarea').value || document.querySelector('textarea').placeholder);
            var mmls = mml.split(/\|+/);

            X('mml').ready(X('oneshot'), mmls);

            var parts = X('mml').get();

            for (var i = 0, len = parts.length; i < len; i++) {
                X('mml').start(i);
            }
        }, false);
    }, function(error){
        console.error(error);
    });

    var placeholder = '';

    placeholder += 'T180 ';
    placeholder += 'S5F19D8 S5F20D8 S4F17D8 S5F20D8 S4F17D8 S4F19D8 S4F17D8 S4F19D8 S3F16D8 S4F19D8 S3F16D8 S3F17D8  S3F16D8  S3F17D8  S3F19D8  S3F17D8 ';
    placeholder += 'S3F21D2&S3F21D8 S3F21D8 S3F19D8 S3F17D8 ';
    placeholder += 'S3F16D4. S4F17D8 S4F19D8 S3F16D8 S3F17D8 S3F17D8 S3F19D8 ';
    placeholder += 'S2F17D4. S2F18D8 S2F17D8 S3F19D8 S3F17D8 S3F16D8 ';
    placeholder += 'S3F17D4. S3F19D8 R8 S3F17D8 R8 S3F16D8 ';
    placeholder += 'S4F19D4. S5F20D8 S4F17D8 S3F16D8 S3F17D8 S3F19D8 ';
    placeholder += 'S2F17D4. S2F18D8 R8 S2F17D8 R8 S3F19D8 ';
    placeholder += 'S3F16D4. S3F16D8 S3F17D8 S3F16D4 S3F17D8 ';
    placeholder += 'S3F19D8  S4F17D4 S2F22D8&S2F22D2 ';
    placeholder += 'S2F20D4. S2F18D8 S2F17D6 S2F18D6 S2F20D6 S1F16D6 S2F17D6 S1F16D6 S1F17D6 S1F19D6 S2F17D6 ';
    placeholder += 'S1F20D4. S1F22D8 R8 S1F20D8 R8 S1F19D8';
    placeholder += 'S1F20D4. S1F24D8 R8 S1F22D8 R8 S1F20D8 ';
    placeholder += 'S1F13D8 S1F13D16 S1F13D16 S1F15D16 S1F13D16 S1F13D16 S1F13D16 S1F17D16 S1F13D16 S1F13D16 S1F13D16 S1F15D16 S1F13D16 S1F13D16 S1F13D16 ';
    placeholder += 'S1F20D16 S1F13D16 S1F13D16 S1F13D16 S1F19D16 S1F13D16 S1F13D16 S1F13D16 S1F17D16 S1F13D16 S1F13D16 S1F13D16 S1F19D16 S1F13D16 S1F13D16 S1F13D16';
    placeholder += 'S1F19D16 S1F20D16 S1F0D16 S1F0D16 S1F17D16 S1F19D16 S1F0D16 S1F0D16 S1F15D16 S1F17D16 S1F0D16 S1F0D16 S1F13D16 S1F15D16 S1F0D16 S1F0D16 ';
    placeholder += 'S1F12D16  S1F13D16 S1F0D16 S1F0D16  S1F10D16  S1F12D16  S1F0D16 S1F0D16  S1F8D16  S1F10D16  S1F0D16 S1F0D16  S1F7D4';
    placeholder += 'S3F14D2&S3F14D8 S2F12D8 S2F13D8 S2F15D8 ';
    placeholder += 'S1F12D8 S2F15D8 S2F13D8 S2F12D8&S2F12D8 S2F12D8 S2F13D8 S2F15D8 ';
    placeholder += 'S3F12D2&S3F12D8 S5F15D8 S4F14D8 S3F12D8 ';
    placeholder += 'S3F13D8 S4F14D8 S3F13D8 S2F12D8 S3F13D8 S2F12D8 S2F13D8 S3F14D8 ';
    placeholder += 'S2F18D24 S2F13D24 S2F10D24 S2F18D24 S2F13D24 S2F10D24 S2F18D24 S2F13D24 S2F10D24 S2F18D24 S2F13D24 S2F10D24 ';
    placeholder += 'S2F19D24 S2F15D24 S2F10D24 S2F19D24 S2F15D24 S2F10D24 S2F19D24 S2F15D24 S2F10D24 S2F19D24 S2F15D24 S2F10D24 ';
    placeholder += 'S2F20D24 S2F15D24 S2F12D24 S2F20D24 S2F15D24 S2F12D24 S2F20D24 S2F15D24 S2F12D24 S2F20D24 S2F15D24 S2F12D24 ';
    placeholder += 'S2F21D24 S2F17D24 S2F12D24 S2F21D24 S2F17D24 S2F12D24 S2F21D24 S2F17D24 S2F12D24 S2F21D24 S2F17D24 S2F12D24 ';
    placeholder += 'S2F18D4. S3F17D8 S2F18D6 S1F17D6 S1F20D6 ';
    placeholder += 'S1F19D8 S1F17D4 S2F20D8&S2F20D8 S2F20D8 S1F17D8 S1F19D8 ';
    placeholder += 'S1F20D4. S2F17D8&S2F17D8 S1F22D4 S1F20D8 ';
    placeholder += 'S1F19D8 S2F20D8 S3F19D8 S3F17D8';

    document.querySelector('textarea').placeholder = placeholder;

    $("canvas").attr("width", parseInt($("#guitar").css("width"))).attr("height", parseInt($("#guitar").css("height")));
    X('oneshot').module('analyser').domain('time').setup('canvas', 'visualizer').param({
      interval : 'auto',
      shape    : 'line',
      wave     : 'rgba(0, 0, 255, 1.0)',
      grad     : [{offset : 0, color : 'rgba(0, 128, 255, 1.0)'}, {offset : 1, color : 'rgba(0, 0, 255, 1.0)'}],
      grid     : 'none',
      font     : 'none',
      width    : 3,
      right    : 0
      //type     : 'uint',
      //size     : 256
    }).state(true);

    document.querySelector('#effectors').addEventListener('dragstart', function(event){
        event.stopImmediatePropagation();

        if (event.target instanceof HTMLImageElement) {
            //event.dataTransfer.items.add(event.target.id, 'Text');
            event.dataTransfer.setData('Text', event.target.id);
        }
    }, false);

    document.getElementById('connect').addEventListener('dragenter', function(event){
        event.preventDefault();
    }, false);

    document.getElementById('connect').addEventListener('dragover', function(event){
        event.preventDefault();
    }, false);

    document.getElementById('connect').addEventListener('dragleave', function(event){
        event.preventDefault();
    }, false);

    document.getElementById('connect').addEventListener('drop', function(event){
        event.preventDefault();

        //event.dataTransfer.items[0].getAsString(function(string){
            var id = event.dataTransfer.getData('Text');

            $('#connect').find('p').remove();

            switch (id.toLowerCase()) {
                case 'wah' :
                    X('oneshot').module('wah').state(true);
                    $('#connect').append('<img src="images/illust/png/effector-wah.png" alt="Wah" width="125" height="225" />');
                    break;
                case 'tremolo' :
                    X('oneshot').module('tremolo').state(true);
                    $('#connect').append('<img src="images/illust/png/effector-tremolo.png" alt="Tremolo" width="125" height="225" />');
                    break;
                case 'ringmodulator' :
                    X('oneshot').module('ringmodulator').state(true);
                    $('#connect').append('<img src="images/illust/png/effector-ringmodulator.png" alt="Ring Modulator" width="125" height="225" />');
                    break;
                case 'phaser' :
                    X('oneshot').module('phaser').state(true);
                    $('#connect').append('<img src="images/illust/png/effector-phaser.png" alt="Phaser" width="125" height="225" />');
                    break;
                case 'flanger' :
                    X('oneshot').module('flanger').state(true);
                    $('#connect').append('<img src="images/illust/png/effector-flanger.png" alt="Flanger" width="125" height="225" />');
                    break;
                case 'chorus' :
                    X('oneshot').module('chorus').state(true);
                    $('#connect').append('<img src="images/illust/png/effector-chorus.png" alt="Chorus" width="125" height="225" />');
                    break;
                case 'delay' :
                    X('oneshot').module('delay').state(true);
                    $('#connect').append('<img src="images/illust/png/effector-delay.png" alt="Delay" width="125" height="225" />');
                    break;
                default :
                    break;
            }
        //});
    });

    $('#button-clear-connect').on(EventWrapper.CLICK, function(){
        X('oneshot').module('wah').state(false);
        X('oneshot').module('tremolo').state(false);
        X('oneshot').module('ringmodulator').state(false);
        X('oneshot').module('phaser').state(false);
        X('oneshot').module('flanger').state(false);
        X('oneshot').module('chorus').state(false);
        X('oneshot').module('delay').state(false);

        $('#connect').html('<p>Drop Effector</p>');
    });

    //Slider
    X('oneshot').param('masterVolume', 0.25);

    $("#range-master-volume").slider({
      value   : 0.25,
      min     : 0,
      max     : 1,
      step    : 0.05,
      range   : "min",
      animate : "slow",
      slide   : function(event, ui){
          X('oneshot').param('masterVolume', ui.value);
          $("#output-master-volume").text(ui.value);
      }
    }).css("width", "30%").css("margin", "10px 0px");
});
