# Retro Web Synthesizer

An open-source web-based sound synthesizer built with React, TypeScript, and Tone.js. This polysynth features two oscillators that can be played in tandem by pressing the piano keys. Each oscillator has four waveforms to choose from and is routed through an amplitude envelope, biquadratic filter, and a three bin equalizer allowing full control over the shape and frequencies of the sound. The sound can be altered further with effects including feedback delay, bit-crusher, distortion, and reverb. 

[Live Demo](https://retro-synth.herokuapp.com/)

![screenshot](/screenshots/synth.png)

## Table of Contents
- [Usage / Documentation](#usage--documentation)
  - [Oscillators](#oscillators)
  - [Envelope](#envelope)
  - [Filter](#filter)
  - [Effects](#effects)
    - [Delay](#delay)
    - [BitCrusher](#bitcrusher)
    - [Distortion](#distortion)
    - [Reverb](#reverb)
  - [Equalizer](#equalizer)
  - [Other](#other)
- [Controls](#controls)
	- [Keys](#keys)
  - [Knobs](#knobs)
  - [Sliders](#sliders)
- [Motivation](#motivation)
- [Technologies Used](#technologies-used)
- [TODO](#todo)
- [Contributing](#contributing)
- [Contact](#contact)

## Usage / Documentation

Synthesizers can be pretty intimidating if you're not familiar with them, but are pretty simple once you understand what everything does. If you are new to synthesizers I recommend starting out by playing the keys with the default settings and slowly tweaking basic settings like the oscillator's waveforms or playing with the effects with around 30% on the corresponding wet knob. Be careful to not make too many drastic changes on settings you don't understand because it can be very loud!

### Oscillators
	A single cycle waveform looped to match a specific pitch which creates the synthesizer's base voices.
- Waveform
	> The shape of the sound output by the oscillator. Can be set to: sine, square, triangle, or sawtooth.
- Level
	> The oscillator's volume output in decibels.
- Phase
	> The starting position within the oscillator's cycle in degrees. For example a phase of 180° would start halfway through the oscillator's cycle.
- Detune
	> The detune control signal in cents. For example a detune of 100 cents would shift the sound forward a half step.<br/>
Tip: Try setting one oscillator to -1200 and the other one to 1200 for a cool effect!

### Envelope
	An amplitude envelope which shapes the attack, decay, sustain, and release of the sound.
- Attack
	> The amount of time it takes for the envelope to reach it's maximum value in seconds.
- Decay
	> After the attack portion of the envelope, the value will fall over the duration of the decay time to it's sustain value in seconds.
- Sustain
	> The value in which the envelope rests at after the envelope's attack is triggered before the release.
- Release
	> The amount of time it takes for the envelope to fall to it's minimum value in seconds.

### Filter
	A biquad filter which blocks certain frequencies while allowing others to pass through.
- Type
	> The shape of the filter. Can be set to: allpass, lowpass, highpass, lowshelf, highshelf, notch, or bandpass.<br/>
Note: Some types are unaffected by certain settings, for example allpass lets all frequencies through regardless of settings.
- Rolloff
	> The drop in decibels per octave.
- Resonance
	> The Q or quality factor of the filter.
- Cutoff
	> The frequency in which the filter drops down.
- Gain
	> The ratio of output power to input power of the signal in decibels.

### Effects
#### Delay
	A feedback delay which postpones a signal and can feed the signal back into itself.
- Wet
	> The percentage of the effect's signal that will pass through to the output. 0% has no effect and 100% will only output the effect with none of the original signal.
- Time
	> The amount of time between the original signal and delayed signal in milliseconds.
- Feedback
	> The amount of signal which is fed back into the effect's input.

#### BitCrusher
	BitCrusher down-samples the incoming signal to a different bit depth. Lowering the bit depth of the signal creates distortion.
- Wet
	> The percentage of the effect's signal that will pass through to the output. 0% has no effect and 100% will only output the effect with none of the original signal.
- Bits
	> The bit depth of the effect.

#### Distortion
	A simple effect which alters a signal creating a distorted sound.
- Wet
	> The percentage of the effect's signal that will pass through to the output. 0% has no effect and 100% will only output the effect with none of the original signal.
- Amount
	> The percentage of the intensity of the distortion.

#### Reverb
	A simple convolution which emulates the sound in a closed space with decaying noise.
- Wet
	> The percentage of the effect's signal that will pass through to the output. 0% has no effect and 100% will only output the effect with none of the original signal.
- Decay
	> The duration of the reverb in seconds.

### Equalizer
	An EQ3 which provides three isolated frequency bins and can boost them, lower them, or leave them unchanged.
- Low / Mid / High
	> The gain in decibels for each frequency bin.
- Frequency Low
	> The low/mid crossover frequency.
- Frequency High
	> The mid/high crossover frequency.

### Other
- Volume
	> The master volume of the synthesizer.
- Octave
	> The base octave of the synthesizer.

## Controls
### Keys
> Keys can be played by clicking/touching them or with your computer keyboard with the hotkeys shown below.
![screenshot](/screenshots/keys.png)

### Knobs
> Knobs can be turned by either clicking/touching and dragging or by hovering over them with your mouse and scrolling.<br/>
> Holding <kbd>SHIFT</kbd> while scrolling turns the knobs faster.

### Sliders
> Sliders can be moved up and down by either clicking/touching and dragging or by hovering over them with your mouse and scrolling.<br/>
> Holding <kbd>SHIFT</kbd> while scrolling moves the sliders faster.

## Motivation

This project was created as a portfolio piece to practice and learn new front-end development skills, specifically using React.js and TypeScript. I also wanted to use all custom CSS for styling.

## Technologies Used

- Environment

  - [create-react-app](https://github.com/facebook/create-react-app)

- Web Audio Framework

  - [Tone.js](https://tonejs.github.io/)

- Language
  - [TypeScript](https://www.typescriptlang.org/)

- Testing
  - [Jest](https://jestjs.io/)
  - [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)

## TODO

- [x] Implement click and drag on Knob and Slider components
- [x] Finalize layout
- [ ] Saveable settings
- [ ] Implement Midi control of piano keys
- [x] Make interface mobile friendly


## Contributing

Feel free to contribute by submitting issues or pull requests on Github. Suggestions for improvements and constructive criticism are welcome!

## Contact

You can contact me by sending me a message on [Linked In](https://www.linkedin.com/in/kevin-ungerecht-228610123).
