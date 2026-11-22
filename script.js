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
  const bookViewport = document.getElementById('bookViewport');
  const modeSingleBtn = document.getElementById('modeSingleBtn');
  const modeSpreadBtn = document.getElementById('modeSpreadBtn');
  const ctrlBothBtn = document.getElementById('ctrlBothBtn');
  const ctrlSwipeBtn = document.getElementById('ctrlSwipeBtn');
  const ctrlClickBtn = document.getElementById('ctrlClickBtn');
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
  // 4. Realistic Diagonal Paper Curl & Roll Engine + Layout & Control Options:
  //    - Hard Book Covers (Front & Back do NOT paper-fold; they open like a rigid cover!)
  //    - Layout Options: "single" (Single Page) | "spread" (Whole Book)
  //    - Control Options: "both" (Swipe + Click) | "swipe" (Swipe Only) | "click" (Click Only)
  //    - Reliable Mobile Touch Swiping from ANY corner, side, or center of the book!
  // ---------------------------------------------------------------------------
  const flipbookMount = document.getElementById('flipbookMount');
  let flipbookRoot = document.getElementById('flipbookRoot');
  const originalPagesMarkup = flipbookRoot.innerHTML;

  let pageFlipInstance = null;
  let currentLayoutMode = 'spread';
  let currentControlMode = 'both'; // 'both' | 'swipe' | 'click'
  let currentBookScale = 1;

  function updateModeButtonsUI() {
    if (currentLayoutMode === 'single') {
      modeSingleBtn.classList.add('active');
      modeSpreadBtn.classList.remove('active');
      bookViewport.classList.add('single-page-mode');
      bookViewport.classList.remove('whole-book-mode');
    } else {
      modeSpreadBtn.classList.add('active');
      modeSingleBtn.classList.remove('active');
      bookViewport.classList.add('whole-book-mode');
      bookViewport.classList.remove('single-page-mode');
    }

    ctrlBothBtn.classList.toggle('active', currentControlMode === 'both');
    ctrlSwipeBtn.classList.toggle('active', currentControlMode === 'swipe');
    ctrlClickBtn.classList.toggle('active', currentControlMode === 'click');

    updateBookResponsiveScale();
  }

  function updateBookResponsiveScale() {
    const availW = window.innerWidth - 16;
    const availH = window.innerHeight - 92;
    const targetW = currentLayoutMode === 'single' ? 370 : 740;
    const targetH = 470;
    currentBookScale = Math.min(1, availW / targetW, availH / targetH);
    bookViewport.style.setProperty('--book-scale', currentBookScale.toFixed(3));
    bookViewport.style.transform = `scale(${currentBookScale.toFixed(3)})`;
  }

  function flipToNextPage(corner = 'bottom') {
    if (!pageFlipInstance) return;
    pageFlipInstance.flipNext(corner);
  }

  function flipToPrevPage(corner = 'bottom') {
    if (!pageFlipInstance) return;
    pageFlipInstance.flipPrev(corner);
  }

  // Reliable Cross-Device Touch & Mouse Swipe + Click Handler attached once to flipbookMount
  function initReliableBookTouchAndMouse() {
    let tracking = null;
    let lastTurnTimestamp = 0;

    function canTurnNow() {
      const now = performance.now();
      if (now - lastTurnTimestamp < 320) return false;
      lastTurnTimestamp = now;
      return true;
    }

    function onStart(clientX, clientY, target) {
      if (target && target.closest('button')) return;
      const rect = flipbookMount.getBoundingClientRect();
      const relX = (clientX - rect.left) / Math.max(1, rect.width);
      const relY = (clientY - rect.top) / Math.max(1, rect.height);

      tracking = {
        startX: clientX,
        startY: clientY,
        lastX: clientX,
        lastY: clientY,
        relX: relX,
        relY: relY,
        swiped: false
      };
    }

    function onMove(clientX, clientY, e) {
      if (!tracking) return;
      tracking.lastX = clientX;
      tracking.lastY = clientY;

      const dx = clientX - tracking.startX;
      const dy = clientY - tracking.startY;

      // Prevent browser vertical pull-to-refresh while swiping horizontally on mobile
      if (Math.abs(dx) > 10 && e && e.cancelable) {
        e.preventDefault();
      }

      // Trigger swipe as soon as finger/mouse moves 24px left or right anywhere on the book!
      if (!tracking.swiped && (currentControlMode === 'both' || currentControlMode === 'swipe')) {
        if (Math.abs(dx) >= 24 && Math.abs(dx) > Math.abs(dy) * 0.8) {
          tracking.swiped = true;
          if (!canTurnNow()) return;
          const corner = tracking.relY < 0.45 ? 'top' : 'bottom';
          if (dx < 0) {
            // Swipe Left -> Next Page
            flipToNextPage(corner);
          } else {
            // Swipe Right -> Previous Page
            flipToPrevPage(corner);
          }
        }
      }
    }

    function onEnd() {
      if (!tracking) return;
      const dx = tracking.lastX - tracking.startX;
      const dy = tracking.lastY - tracking.startY;
      const dist = Math.hypot(dx, dy);

      // If user didn't trigger mid-move swipe, check if release was a quick flick or a tap/click
      if (!tracking.swiped) {
        const corner = tracking.relY < 0.45 ? 'top' : 'bottom';

        if (
          (currentControlMode === 'both' || currentControlMode === 'swipe') &&
          Math.abs(dx) >= 18 &&
          Math.abs(dx) > Math.abs(dy) * 0.75
        ) {
          // Quick short swipe
          if (canTurnNow()) {
            if (dx < 0) {
              flipToNextPage(corner);
            } else {
              flipToPrevPage(corner);
            }
          }
        } else if (
          (currentControlMode === 'both' || currentControlMode === 'click') &&
          dist < 14
        ) {
          // Click / Tap anywhere on the book!
          // Right side (or Front Cover) -> Next Page; Left side -> Previous Page
          if (canTurnNow()) {
            const curIdx = pageFlipInstance ? pageFlipInstance.getCurrentPageIndex() : 0;
            if (curIdx === 0 || tracking.relX >= 0.48) {
              flipToNextPage(corner);
            } else {
              flipToPrevPage(corner);
            }
          }
        }
      }

      tracking = null;
    }

    // Touch Events (100% reliable on Android & iOS mobile browsers)
    flipbookMount.addEventListener(
      'touchstart',
      (e) => {
        if (e.touches.length !== 1) return;
        const t = e.touches[0];
        onStart(t.clientX, t.clientY, e.target);
      },
      { passive: true }
    );

    flipbookMount.addEventListener(
      'touchmove',
      (e) => {
        if (!tracking || e.touches.length !== 1) return;
        const t = e.touches[0];
        onMove(t.clientX, t.clientY, e);
      },
      { passive: false }
    );

    flipbookMount.addEventListener('touchend', () => {
      onEnd();
    });

    // Mouse / Pointer Events for Desktop Windows
    flipbookMount.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return;
      onStart(e.clientX, e.clientY, e.target);
    });

    window.addEventListener('mousemove', (e) => {
      if (!tracking) return;
      onMove(e.clientX, e.clientY, e);
    });

    window.addEventListener('mouseup', () => {
      if (!tracking) return;
      onEnd();
    });
  }

  initReliableBookTouchAndMouse();

  function attachBookInnerButtonListeners(rootEl) {
    const restartBtn = rootEl.querySelector('#restartBookBtn');
    const celebBtn = rootEl.querySelector('#celebrateBtn');
    const wishResp = rootEl.querySelector('#wishResponse');

    if (restartBtn) {
      restartBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        playSound('pageFlip');
        if (pageFlipInstance) {
          pageFlipInstance.flip(0);
        }
      });
    }

    if (celebBtn) {
      celebBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        playSound('celebrate');
        launchConfetti(60);
        if (wishResp) wishResp.classList.remove('hidden');
      });
    }
  }

  function attachInlineButterflies(rootEl) {
    inlineButterflyStates.length = 0;
    const inlineSlots = rootEl.querySelectorAll('.inline-butterfly-slot, .btn-butterfly-icon');
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
  }

  function initOrUpdatePageFlip(preservePageIdx = 0) {
    if (typeof St === 'undefined' || !St.PageFlip) {
      console.error('StPageFlip library not loaded');
      return;
    }

    // Safely dispose previous instance
    if (pageFlipInstance) {
      try {
        pageFlipInstance.destroy();
      } catch (_) {}
      pageFlipInstance = null;
    }

    // Create a brand new flipbookRoot element inside flipbookMount
    // (because StPageFlip.destroy() removes its block element from the DOM)
    flipbookMount.innerHTML = '';
    const freshRoot = document.createElement('div');
    freshRoot.className = 'flipbook-root';
    freshRoot.id = 'flipbookRoot';
    freshRoot.innerHTML = originalPagesMarkup;
    flipbookMount.appendChild(freshRoot);
    flipbookRoot = freshRoot;

    updateModeButtonsUI();

    const isSingle = currentLayoutMode === 'single';

    pageFlipInstance = new St.PageFlip(freshRoot, {
      width: 370,
      height: 470,
      size: 'fixed',
      minWidth: 320,
      maxWidth: 1000,
      minHeight: 400,
      maxHeight: 1000,
      maxShadowOpacity: 0.65,
      showCover: !isSingle,
      mobileScrollSupport: false,
      // Disable StPageFlip's buggy scaled mouse/touch listeners; our universal handler drives flipNext/flipPrev cleanly!
      useMouseEvents: false,
      swipeDistance: 25,
      clickEventForward: true,
      flippingTime: 720,
      usePortrait: isSingle,
      startPage: preservePageIdx,
      startZIndex: 10,
      autoSize: true,
      drawShadow: true
    });

    pageFlipInstance.loadFromHTML(freshRoot.querySelectorAll('.book-page'));
    attachInlineButterflies(freshRoot);
    attachBookInnerButtonListeners(freshRoot);

    pageFlipInstance.on('flip', () => {
      playSound('pageFlip');
    });
  }

  modeSingleBtn.addEventListener('click', () => {
    if (currentLayoutMode === 'single') return;
    const curPage = pageFlipInstance ? pageFlipInstance.getCurrentPageIndex() : 0;
    currentLayoutMode = 'single';
    playSound('pageFlip');
    initOrUpdatePageFlip(curPage);
  });

  modeSpreadBtn.addEventListener('click', () => {
    if (currentLayoutMode === 'spread') return;
    const curPage = pageFlipInstance ? pageFlipInstance.getCurrentPageIndex() : 0;
    currentLayoutMode = 'spread';
    playSound('pageFlip');
    initOrUpdatePageFlip(curPage);
  });

  ctrlBothBtn.addEventListener('click', () => {
    currentControlMode = 'both';
    playSound('pageFlip');
    updateModeButtonsUI();
  });

  ctrlSwipeBtn.addEventListener('click', () => {
    currentControlMode = 'swipe';
    playSound('pageFlip');
    updateModeButtonsUI();
  });

  ctrlClickBtn.addEventListener('click', () => {
    currentControlMode = 'click';
    playSound('pageFlip');
    updateModeButtonsUI();
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
    updateBookResponsiveScale();
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
});
