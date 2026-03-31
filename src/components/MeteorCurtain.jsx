import { useEffect, useRef, useState, useCallback } from "react";

// ─── MeteorCanvas ──────────────────────────────────────────────────────────────
// วาดดาวและดาวตกบน canvas
function MeteorCanvas({ speed = 3, density = 4, onComplete }) {
  const canvasRef = useRef(null);
  const stateRef = useRef({ meteors: [], stars: [], frameId: null, phase: "running", frameCount: 0 });

  const initStars = useCallback((W, H) => {
    const stars = [];
    for (let i = 0; i < 140; i++) {
      stars.push({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.3 + 0.2,
        a: Math.random() * 0.5 + 0.2,
        twinkle: Math.random() * Math.PI * 2,
      });
    }
    return stars;
  }, []);

  const createMeteor = useCallback((W, delay) => ({
    x: Math.random() * W * 1.4 - W * 0.2,
    y: -30 - Math.random() * 80,
    len: 80 + Math.random() * 130,
    speed: (3 + Math.random() * 4) * speed * 0.5,
    angle: Math.PI / 4 + (Math.random() - 0.5) * 0.28,
    alpha: 0,
    life: 0,
    maxLife: 55 + Math.random() * 45,
    width: 1 + Math.random() * 1.6,
    delay,
    t: 0,
    born: false,
    done: false,
  }), [speed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const s = stateRef.current;
    s.phase = "running";

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      s.stars = initStars(canvas.width, canvas.height);
    };

    resize();

    const count = 8 + density * 2;
    s.meteors = Array.from({ length: count }, (_, i) =>
      createMeteor(canvas.width, i * Math.max(2, 10 - density))
    );

    const loop = () => {
      const W = canvas.width, H = canvas.height;
      s.frameCount++;

      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);

gradient.addColorStop(0, "rgba(105, 0, 170, 0.4)");
gradient.addColorStop(1, "rgba(250, 255, 118, 0)");


ctx.fillStyle = gradient;
ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillRect(0, 0, W, H);

      // stars
      s.stars.forEach((st) => {
        st.twinkle += 0.018;
        const a = st.a + Math.sin(st.twinkle) * 0.14;
        ctx.beginPath();
        ctx.arc(st.x, st.y, st.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${a})`;
        ctx.fill();
      });

      // meteors
      let allDone = true;
      s.meteors.forEach((m) => {
        m.t++;
        if (m.t < m.delay) { allDone = false; return; }
        m.born = true;
        m.life++;
        m.x += Math.cos(m.angle) * m.speed;
        m.y += Math.sin(m.angle) * m.speed;
        if (m.life < 8) m.alpha = m.life / 8;
        else if (m.life > m.maxLife - 12) m.alpha = (m.maxLife - m.life) / 12;
        else m.alpha = 1;
        if (m.life >= m.maxLife || m.y > H + 40) m.done = true;
        if (!m.done) allDone = false;

        if (!m.born || m.alpha <= 0) return;
        const tx = m.x - Math.cos(m.angle) * m.len;
        const ty = m.y - Math.sin(m.angle) * m.len;
        const grad = ctx.createLinearGradient(tx, ty, m.x, m.y);
        grad.addColorStop(0, "rgba(225, 255, 0, 0)");
        grad.addColorStop(0.6, `rgba(200,220,255,${m.alpha * 0.35})`);
        grad.addColorStop(1, `rgba(255,255,255,${m.alpha})`);
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(m.x, m.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = m.width;
        ctx.lineCap = "round";
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.width, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${m.alpha * 0.95})`;
        ctx.fill();
      });

      if (allDone && s.phase === "running") {
        s.phase = "done";
        onComplete?.();
      }

      s.frameId = requestAnimationFrame(loop);
    };

    s.frameId = requestAnimationFrame(loop);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(s.frameId);
      window.removeEventListener("resize", resize);
    };
  }, [speed, density, createMeteor, initStars, onComplete]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
    />
  );
}

// ─── MeteorCurtain ─────────────────────────────────────────────────────────────
// Overlay ที่ครอบ children ไว้ แล้ว reveal หลังดาวตกเสร็จ
//
// Props:
//   title        string   — ชื่อที่แสดงกลางจอ (default "WELCOME")
//   subtitle     string   — ข้อความเล็กด้านล่าง
//   speed        1-5      — ความเร็วดาวตก
//   density      1-8      — ความหนาแน่นดาวตก
//   revealDelay  number   — ms หลังดาวหมดแล้วเริ่ม reveal (default 400)
//   onDone       fn       — callback หลัง curtain เปิดสมบูรณ์
//   children     ReactNode — เนื้อหาหลักของเพจ
export default function MeteorCurtain({
  title = "WELCOME",
  subtitle = "",
  speed = 3,
  density = 4,
  revealDelay = 400,
  onDone,
  children,
}) {
  const [phase, setPhase] = useState("meteor"); // meteor → text → reveal → done
  const [curtainUp, setCurtainUp] = useState(false);

  const handleMeteorDone = useCallback(() => {
    setPhase("text");
    setTimeout(() => {
      setPhase("reveal");
      setCurtainUp(true);
      setTimeout(() => {
        setPhase("done");
        onDone?.();
      }, 900);
    }, revealDelay + 800);
  }, [revealDelay, onDone]);

  const showText = phase === "text" || phase === "reveal";
  const overlayVisible = phase !== "done";

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {/* Main content (underneath) */}
      <div
        style={{
          width: "100%",
          height: "100%",
          opacity: phase === "done" ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
      >
        {children}
      </div>

      {/* Curtain overlay */}
      {overlayVisible && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgb(255, 255, 255)",
            zIndex: 50,
            // transform: curtainUp ? "translateY(-20%)" : "translateY(0)",
            transition: "transform 0.85s cubic-bezier(0.76,0,0.24,1)",
            overflow: "hidden",
          }}
        >
          {/* Stars + meteors canvas */}
          <MeteorCanvas speed={speed} density={density} onComplete={handleMeteorDone} />

          {/* Center text */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 2,
              pointerEvents: "none",
            }}
          >
            <span
              style={{
                fontSize: "clamp(52px, 5vw, 100px)",
                fontWeight: 300,
                color: showText ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0)",
                letterSpacing: "0.18em",
                transition: "color 1.2s ease, letter-spacing 1.2s ease",
                letterSpacing: showText ? "0.18em" : "0.5em",
                fontFamily: "Great Vibes",
                textAlign: "center",
                textShadow: showText
    ? "0 0 10px rgba(168,85,247,0.8), 0 0 20px rgba(168,85,247,0.6), 0 0 40px rgba(168,85,247,0.4)"
    : "none"
              }}
            >
              {title}
            </span>
            {subtitle && (
              <span
                style={{
                  fontSize: 18,
                  color: showText ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0)",
                  letterSpacing: "0.22em",
                  marginTop: 12,
                  transition: "color 0.6s ease 0.3s",
                  textShadow: showText
  ? "0 0 6px rgba(168,85,247,0.6), 0 0 12px rgba(168,85,247,0.4)"
  : "none",
  
                }}
              >
                {subtitle}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
