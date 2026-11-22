/**
 * ¡Feliz Cumpleaños, Duday Tisay! // From Kuya Ram
 * Realistic Pixelated Envelope + 3D Paper Roll Folding Book + Organic Async Mosaic Butterflies
 */

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const introDialog = document.getElementById('introDialog');
  const envelopeWrapper = document.getElementById('envelopeWrapper');

  const bookExperience = document.getElementById('bookExperience');
  const bookDesk = document.getElementById('bookDesk');
  const restartBookBtn = document.getElementById('restartBookBtn');
  const celebrateBtn = document.getElementById('celebrateBtn');
  const wishResponse = document.getElementById('wishResponse');

  const bgDecorations = document.getElementById('bgDecorations');
  const confettiContainer = document.getElementById('confettiContainer');

  // ---------------------------------------------------------------------------
  // 1. Web Audio Synthesizer (Retro 8-Bit Chimes & Paper Page Flip Sound)
  // ---------------------------------------------------------------------------
  let audioCtx = null;

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  function playTone(freq, type = 'square', duration = 0.09, delay = 0, gainVal = 0.06) {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);

    gain.gain.setValueAtTime(gainVal, ctx.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime + delay + duration);
  }

  function playSound(effect) {
    switch (effect) {
      case 'openEnvelope':
        [523.25, 659.25, 783.99, 1046.5].forEach((f, idx) => {
          playTone(f, 'triangle', 0.14, idx * 0.08, 0.08);
        });
        break;
      case 'bookLand':
        playTone(130, 'sine', 0.18, 0, 0.12);
        playTone(880, 'triangle', 0.15, 0.12, 0.05);
        break;
      case 'pageFlip':
        playTone(420, 'triangle', 0.06, 0, 0.04);
        playTone(580, 'sine', 0.07, 0.04, 0.04);
        break;
      case 'celebrate':
        const notes = [
          { f: 523.25, d: 0.14, t: 0 },
          { f: 523.25, d: 0.14, t: 0.16 },
          { f: 587.33, d: 0.26, t: 0.34 },
          { f: 523.25, d: 0.26, t: 0.64 },
          { f: 698.46, d: 0.26, t: 0.94 },
          { f: 659.25, d: 0.45, t: 1.24 }
        ];
        notes.forEach(n => playTone(n.f, 'square', n.d, n.t, 0.06));
        break;
    }
  }

  // ---------------------------------------------------------------------------
  // 2. Mosaic Pixel Butterflies (Exact Reference Image Style + Async 60fps Flight)
  // ---------------------------------------------------------------------------
  function createPixelButterflySVG(variant = 'pink', size = 28, flapDuration = 0.42, flapDelay = 0) {
    const isPink = variant === 'pink';
    const p = isPink
      ? {
          D: '#381030',
          M: '#8c1d58',
          R: '#c83e7b',
          P: '#ea6da3',
          L: '#f9a8cb',
          C: '#ffe3ee',
          W: '#fff9fc'
        }
      : {
          D: '#240b3b',
          M: '#5e178a',
          R: '#9236c4',
          P: '#be64eb',
          L: '#dfa2ff',
          C: '#f5dcff',
          W: '#fdf7ff'
        };

    const grid = [
      '....MD..............',
      '....MRMD............',
      '....MRPRMD..........',
      '.....MLCLPMD........',
      '.....MLCWCLPMD...MD.',
      '......MLCWWCLPM.MRMD',
      '......MPLCWWCLDMRPMD',
      '.......MPLCWCLDRLPMD',
      '........MPLCLDMLCWMD',
      '......MDMMPLDDLCWLMD',
      '.....MRPLMMDDPLCWPM.',
      '....MRPCWCLDDLCWPM..',
      '....MPCWWCLDDMPLM...',
      '....MPLCWCLMDMPM....',
      '.....MPLLPMDMLCWPM..',
      '......MMMM..MLCWWLM.',
      '............MPLCWLM.',
      '.............MPLLM..',
      '..............MMM...',
      '....................'
    ];

    let rects = '';
    for (let y = 0; y < grid.length; y++) {
      const row = grid[y];
      for (let x = 0; x < row.length; x++) {
        const ch = row[x];
        if (ch !== '.' && p[ch]) {
          rects += `<rect x="${x}" y="${y}" width="0.9" height="0.9" fill="${p[ch]}"/>`;
        }
      }
    }

    return `
      <span class="butterfly-wing-wrap" style="animation-duration: ${flapDuration.toFixed(3)}s; animation-delay: -${flapDelay.toFixed(3)}s;">
        <svg viewBox="0 0 20 20" width="${size}" height="${size}" shape-rendering="crispEdges">
          ${rects}
        </svg>
      </span>
    `;
  }

  function initBackgroundStars() {
    bgDecorations.innerHTML = '';
    const symbols = ['✦', '★', '·', '+'];
    for (let i = 0; i < 16; i++) {
      const el = document.createElement('span');
      el.className = 'bg-pixel-star';
      el.textContent = symbols[i % symbols.length];
      el.style.left = `${Math.random() * 96}%`;
      el.style.top = `${Math.random() * 94}%`;
      el.style.animationDelay = `${Math.random() * 5}s`;
      bgDecorations.appendChild(el);
    }
  }

  // Real Organic Unsynchronized Butterfly Flight Engine (60fps Steering Physics)
  const activeHoverButterflies = [];
  const inlineButterflyStates = [];

  function initButterflies() {
    // 1. Inline text & button butterfly stickers
    const inlineSlots = document.querySelectorAll('.inline-butterfly-slot, .btn-butterfly-icon');
    inlineSlots.forEach((slot, idx) => {
      const variant = slot.dataset.color || (idx % 2 === 0 ? 'pink' : 'purple');
      const uniqueFlapDur = 0.28 + Math.random() * 0.34;
      const uniqueFlapDelay = Math.random() * 1.5;
      slot.innerHTML = createPixelButterflySVG(variant, 25, uniqueFlapDur, uniqueFlapDelay);

      const state = {
        el: slot,
        wingWrap: slot.querySelector('.butterfly-wing-wrap'),
        baseFlap: uniqueFlapDur,
        phaseA: Math.random() * Math.PI * 2,
        phaseB: Math.random() * Math.PI * 2,
        speedA: 1.1 + Math.random() * 1.4,
        speedB: 1.6 + Math.random() * 1.8,
        fleeX: 0,
        fleeY: 0,
        fleeRot: 0
      };
      inlineButterflyStates.push(state);

      const flutterAwayInline = (e) => {
        e.stopPropagation();
        state.fleeX = (Math.random() > 0.5 ? 1 : -1) * (22 + Math.random() * 28);
        state.fleeY = -(16 + Math.random() * 24);
        state.fleeRot = (Math.random() - 0.5) * 45;
        if (state.wingWrap) state.wingWrap.style.animationDuration = '0.13s';
        playTone(740 + Math.random() * 240, 'sine', 0.06, 0, 0.03);

        clearTimeout(slot._returnTimer);
        slot._returnTimer = setTimeout(() => {
          state.fleeX = 0;
          state.fleeY = 0;
          state.fleeRot = 0;
          if (state.wingWrap) state.wingWrap.style.animationDuration = `${state.baseFlap.toFixed(3)}s`;
        }, 1100 + Math.random() * 500);
      };

      slot.addEventListener('pointerenter', flutterAwayInline);
      slot.addEventListener('pointerdown', flutterAwayInline);
    });

    // 2. Free-Flying Butterflies Hovering Above the Paper Book
    const sanctuary = document.getElementById('butterflySanctuary');
    if (!sanctuary) return;
    sanctuary.innerHTML = '';
    activeHoverButterflies.length = 0;

    const count = 8;
    for (let i = 0; i < count; i++) {
      const variant = i % 2 === 0 ? 'pink' : 'purple';
      const size = 32 + (i % 3) * 6;
      const uniqueFlapDur = 0.24 + Math.random() * 0.32;
      const uniqueFlapDelay = Math.random() * 2.0;

      const bEl = document.createElement('div');
      bEl.className = 'hover-butterfly';
      bEl.innerHTML = createPixelButterflySVG(variant, size, uniqueFlapDur, uniqueFlapDelay);

      const startX = 60 + Math.random() * 620;
      const startY = 40 + Math.random() * 390;

      const bObj = {
        el: bEl,
        wingWrap: bEl.querySelector('.butterfly-wing-wrap'),
        baseFlap: uniqueFlapDur,
        x: startX,
        y: startY,
        vx: (Math.random() - 0.5) * 1.8,
        vy: (Math.random() - 0.5) * 1.8,
        targetX: 70 + Math.random() * 600,
        targetY: 50 + Math.random() * 370,
        maxSpeed: 1.15 + Math.random() * 1.15,
        wanderAngle: Math.random() * Math.PI * 2,
        wanderRate: 0.03 + Math.random() * 0.05,
        hoverPauseTimer: 0,
        fleeBoostTimer: 0,
        heading: -25 + (Math.random() - 0.5) * 30,
        nextWaypointTime: performance.now() + 900 + Math.random() * 2200
      };

      const fleeFromTouch = (e) => {
        if (e) e.stopPropagation();
        playTone(820 + Math.random() * 260, 'triangle', 0.07, 0, 0.035);

        const rect = sanctuary.getBoundingClientRect();
        const maxW = Math.max(320, rect.width - 50);
        const maxH = Math.max(360, rect.height - 50);

        let escapeX = 35 + Math.random() * (maxW - 70);
        let escapeY = 30 + Math.random() * (maxH - 60);
        if (Math.hypot(escapeX - bObj.x, escapeY - bObj.y) < 150) {
          escapeX = maxW - bObj.x;
          escapeY = maxH - bObj.y;
        }

        bObj.targetX = Math.max(30, Math.min(maxW - 30, escapeX));
        bObj.targetY = Math.max(25, Math.min(maxH - 25, escapeY));
        const angle = Math.atan2(bObj.targetY - bObj.y, bObj.targetX - bObj.x);
        bObj.vx = Math.cos(angle) * 5.2;
        bObj.vy = Math.sin(angle) * 5.2;
        bObj.fleeBoostTimer = 38;
        bObj.hoverPauseTimer = 0;

        if (bObj.wingWrap) {
          bObj.wingWrap.style.animationDuration = '0.12s';
        }
      };

      bEl.addEventListener('pointerenter', fleeFromTouch);
      bEl.addEventListener('pointerdown', fleeFromTouch);

      sanctuary.appendChild(bEl);
      activeHoverButterflies.push(bObj);
    }
  }

  function startNaturalPhysicsLoop() {
    const sanctuary = document.getElementById('butterflySanctuary');

    function tick(now) {
      const t = now * 0.001;

      // A. Update Inline Butterfly Stickers
      for (let i = 0; i < inlineButterflyStates.length; i++) {
        const s = inlineButterflyStates[i];
        const bobX = Math.sin(t * s.speedA + s.phaseA) * 2.5 + s.fleeX;
        const bobY = Math.cos(t * s.speedB + s.phaseB) * 2.8 + s.fleeY;
        const tilt = Math.sin(t * s.speedA + s.phaseB) * 7 + s.fleeRot;
        s.el.style.transform = `translate3d(${bobX.toFixed(1)}px, ${bobY.toFixed(1)}px, 0px) rotate(${tilt.toFixed(1)}deg)`;
      }

      if (!bookExperience.classList.contains('hidden')) {
        // B. Update Free-Flying Butterflies Over the Book
        const rect = sanctuary ? sanctuary.getBoundingClientRect() : { width: 760, height: 490 };
        const maxW = Math.max(320, rect.width - 44);
        const maxH = Math.max(360, rect.height - 44);

        for (let i = 0; i < activeHoverButterflies.length; i++) {
          const b = activeHoverButterflies[i];

          if (now > b.nextWaypointTime && b.fleeBoostTimer <= 0) {
            if (Math.random() < 0.25) {
              b.hoverPauseTimer = 25 + Math.floor(Math.random() * 45);
            } else {
              b.targetX = 30 + Math.random() * (maxW - 60);
              b.targetY = 25 + Math.random() * (maxH - 50);
            }
            b.nextWaypointTime = now + 1100 + Math.random() * 2600;
          }

          b.wanderAngle += (Math.random() - 0.5) * 0.35 + b.wanderRate;
          const flutterWaveX = Math.cos(b.wanderAngle) * 0.22;
          const flutterWaveY = Math.sin(b.wanderAngle * 1.3) * 0.24;

          if (b.hoverPauseTimer > 0 && b.fleeBoostTimer <= 0) {
            b.hoverPauseTimer--;
            b.vx *= 0.88;
            b.vy *= 0.88;
            b.vx += flutterWaveX * 0.6;
            b.vy += flutterWaveY * 0.6;
          } else {
            const dx = b.targetX - b.x;
            const dy = b.targetY - b.y;
            const dist = Math.hypot(dx, dy) || 1;

            const speedLimit = b.fleeBoostTimer > 0 ? 5.4 : b.maxSpeed;
            const desiredVx = (dx / dist) * speedLimit;
            const desiredVy = (dy / dist) * speedLimit;

            const steerFactor = b.fleeBoostTimer > 0 ? 0.14 : 0.035;
            b.vx += (desiredVx - b.vx) * steerFactor + flutterWaveX;
            b.vy += (desiredVy - b.vy) * steerFactor + flutterWaveY;
          }

          if (b.fleeBoostTimer > 0) {
            b.fleeBoostTimer--;
            if (b.fleeBoostTimer === 0 && b.wingWrap) {
              b.wingWrap.style.animationDuration = `${b.baseFlap.toFixed(3)}s`;
            }
          }

          b.x += b.vx;
          b.y += b.vy;

          if (b.x < 18) { b.x = 18; b.vx = Math.abs(b.vx) * 0.8; b.targetX = maxW * 0.6; }
          if (b.x > maxW) { b.x = maxW; b.vx = -Math.abs(b.vx) * 0.8; b.targetX = maxW * 0.4; }
          if (b.y < 14) { b.y = 14; b.vy = Math.abs(b.vy) * 0.8; b.targetY = maxH * 0.6; }
          if (b.y > maxH) { b.y = maxH; b.vy = -Math.abs(b.vy) * 0.8; b.targetY = maxH * 0.4; }

          const targetTilt = Math.max(-32, Math.min(32, b.vx * 11 - b.vy * 4));
          b.heading += (targetTilt - b.heading) * 0.12;

          b.el.style.transform = `translate3d(${b.x.toFixed(1)}px, ${b.y.toFixed(1)}px, 0px) rotate(${b.heading.toFixed(1)}deg)`;
        }
      }

      requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }

  initBackgroundStars();
  initButterflies();
  startNaturalPhysicsLoop();

  // ---------------------------------------------------------------------------
  // 3. Envelope Opening -> Paper Book Landing Sequence ("Pag lapag sa book")
  // ---------------------------------------------------------------------------
  let isOpening = false;

  function triggerEnvelopeOpening() {
    if (isOpening) return;
    isOpening = true;
    playSound('openEnvelope');

    // Step 1: Pop wax seal, flip pixelated envelope top flap, slide mini book up
    envelopeWrapper.classList.add('is-opening');

    // Step 2: Transition out intro envelope & drop the 3D paper book onto desk
    setTimeout(() => {
      introDialog.classList.add('exit-stage');
    }, 850);

    setTimeout(() => {
      introDialog.classList.add('hidden');
      bookExperience.classList.remove('hidden');
      initOrUpdatePageFlip();
      bookDesk.classList.add('book-landing');
      playSound('bookLand');
      launchConfetti(28);

      setTimeout(() => {
        bookDesk.classList.remove('book-landing');
      }, 950);
    }, 1300);
  }

  envelopeWrapper.addEventListener('click', triggerEnvelopeOpening);
  envelopeWrapper.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      triggerEnvelopeOpening();
    }
  });

  // ---------------------------------------------------------------------------
  // 4. Realistic Diagonal Paper Curl & Roll Engine (StPageFlip + Swipe-Only Guard)
  // ---------------------------------------------------------------------------
  const flipbookRoot = document.getElementById('flipbookRoot');
  let pageFlipInstance = null;
  let isDraggingPaper = false;
  let pointerDownPos = null;

  flipbookRoot.addEventListener('pointerdown', (e) => {
    if (e.target.closest('button')) return;
    pointerDownPos = { x: e.clientX, y: e.clientY };
    isDraggingPaper = false;
  }, true);

  flipbookRoot.addEventListener('pointermove', (e) => {
    if (!pointerDownPos) return;
    const dist = Math.hypot(e.clientX - pointerDownPos.x, e.clientY - pointerDownPos.y);
    if (dist > 9) {
      isDraggingPaper = true;
    }
  }, true);

  flipbookRoot.addEventListener('pointerup', (e) => {
    if (e.target.closest('button')) {
      pointerDownPos = null;
      return;
    }
    if (pointerDownPos && !isDraggingPaper) {
      e.stopImmediatePropagation();
      e.stopPropagation();
    }
    pointerDownPos = null;
    isDraggingPaper = false;
  }, true);

  function initOrUpdatePageFlip() {
    if (pageFlipInstance) {
      pageFlipInstance.update();
      return;
    }

    if (typeof St === 'undefined' || !St.PageFlip) {
      console.error('StPageFlip library not loaded');
      return;
    }

    pageFlipInstance = new St.PageFlip(flipbookRoot, {
      width: 370,
      height: 470,
      size: 'fixed',
      minWidth: 320,
      maxWidth: 420,
      minHeight: 420,
      maxHeight: 520,
      maxShadowOpacity: 0.65,
      showCover: true,
      mobileScrollSupport: false,
      useMouseEvents: true,
      swipeDistance: 25,
      clickEventForward: true,
      flippingTime: 780,
      usePortrait: true,
      startZIndex: 10,
      autoSize: true,
      drawShadow: true
    });

    pageFlipInstance.loadFromHTML(document.querySelectorAll('.book-page'));

    pageFlipInstance.on('flip', () => {
      playSound('pageFlip');
    });
  }

  restartBookBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    playSound('pageFlip');
    if (pageFlipInstance) {
      pageFlipInstance.flip(0);
    }
  });

  // Keyboard navigation (Left/Right arrows for Windows users)
  window.addEventListener('keydown', (e) => {
    if (bookExperience.classList.contains('hidden')) return;
    if (e.key === 'ArrowRight' && pageFlipInstance) {
      pageFlipInstance.flipNext('bottom');
    } else if (e.key === 'ArrowLeft' && pageFlipInstance) {
      pageFlipInstance.flipPrev('bottom');
    }
  });

  window.addEventListener('resize', () => {
    if (pageFlipInstance && !bookExperience.classList.contains('hidden')) {
      pageFlipInstance.update();
    }
  });

  // ---------------------------------------------------------------------------
  // 5. Confetti Celebration Finale
  // ---------------------------------------------------------------------------
  function launchConfetti(count = 45) {
    const colors = ['#ff3ea5', '#b545ff', '#ffee55', '#72efdd', '#ffffff', '#ff85d8'];
    for (let i = 0; i < count; i++) {
      const piece = document.createElement('div');
      piece.className = 'pixel-confetti';
      piece.style.left = `${10 + Math.random() * 80}vw`;
      piece.style.top = `${-10 - Math.random() * 40}px`;
      piece.style.backgroundColor = colors[i % colors.length];
      piece.style.animationDuration = `${1.8 + Math.random() * 1.4}s`;
      piece.style.animationDelay = `${Math.random() * 0.35}s`;
      confettiContainer.appendChild(piece);

      setTimeout(() => {
        piece.remove();
      }, 3400);
    }
  }

  celebrateBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    playSound('celebrate');
    launchConfetti(60);
    wishResponse.classList.remove('hidden');
  });
});
